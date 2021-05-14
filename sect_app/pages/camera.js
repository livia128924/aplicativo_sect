import React,{useState,useEffect,useRef, Component} from 'react';
import { StyleSheet, Text, View , SafeAreaView, TouchableOpacity,Modal, Image} from 'react-native';
import {Camera} from 'expo-camera';
import {FontAwesome} from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import {DatabaseConnection} from './database/database';

//sis.sect.am.gov.br/_apps/app_teste
//expo install expo-media-library
//expo install expo-camera


const db  = DatabaseConnection.getConnection();

export default function App() {

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission,setHasPermission] = useState(null);
  const [capturedPhoto,setCapturePhoto] = useState(null);
  const [open,setOpen] = useState(false);
  const camRef = useRef(null);

  useEffect(() => {
    
    (async () => {
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status=== 'granted');
    })();


    //Permissao acesso a camera

    {/*(async () => {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      //console.log(status);
      setHasPermission(status=== 'granted');
    })();
    */}

    (async () => {

      db.transaction(tx => {
        tx.executeSql(
          "create table if not exists items (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, image TEXT);"
        );
      });

    })();
    

  },[]);

  //Resposta da Permissao

  if(hasPermission === null)
  {
    return <View/>;
  }

  if(hasPermission === false)
  {
    return <Text>Acesso negado! </Text>;
  } 
  

  async function takePicture()
  {
    if(camRef)
    {
      const data = await camRef.current.takePictureAsync({base64: true}); //enabled base64 - insert into ({base64: true})
      setCapturePhoto(data.uri);
      setOpen(true);
      
      console.log(data); //banco
    }
  }

  async function savePicture()
  {
    
    const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
    .then(() => {
      alert('Salvo com sucesso!.');
      console.log(capturedPhoto);
    })
    .catch(error => {
      console.log('err',error);
    }) 
  }

  async function savePictureCloud()
  {
    if(capturedPhoto)
    {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO items (image) VALUES (?)',
          [capturedPhoto],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log(results);
              alert(
                'Sucesso',
                'Foto Registrada com Sucesso !!!',
                [
                  {
                    text: 'Ok'
                  },
                ],
                { cancelable: false }
              );
            } else alert('Erro ao tentar Registrar Imagem !!!');
          }
        );
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={{flex: 1}}
        type={type}
        ref= {camRef}
      >
      
      <View style={{flex:1, backgroundColor: 'transparent', flexDirection: 'row'}}>
        <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
        }}
        onPress = {() => {
          setType(
            type == Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
          );
        }}
        >
          <Text style={{fontSize: 20, marginBottom: 13, color: '#FFF'}} FontAwesome='window-close'>Trocar</Text>
        </TouchableOpacity>
        
      </View>
      </Camera>

      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <FontAwesome name='camera' size={23} color='#FFF'/>
      </TouchableOpacity>

      { capturedPhoto &&
        <Modal
          animationType = 'slide'
          transparent = {false}
          visible={open}
        >
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center', margin: 20}}>

            <View style={{margin: 10, flexDirection: 'row'}}>

            <TouchableOpacity style={{margin: 10}} onPress={()=> setOpen(false)}> 
              <FontAwesome name='window-close' size={50} color='#FF0000'/>
            </TouchableOpacity>

            <TouchableOpacity style={{margin: 10}} onPress={ savePicture }> 
              <FontAwesome name='upload' size={50} color='#121212'/>
            </TouchableOpacity>

            <TouchableOpacity style={{margin: 10}} onPress={ savePictureCloud }> 
              <FontAwesome name='cloud' size={50} color='#121212'/>
              
            </TouchableOpacity>
            </View>

            <Image
              style={{width: '100%', height: 450, borderRadius: 20}}
              source={{uri: capturedPhoto}}
            />

          </View>
        </Modal>
      }
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    margin: 20,
    borderRadius: 10,
    height: 50
  } 
});
