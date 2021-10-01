import React,{useState,useEffect,useRef, Component} from 'react';
import { StyleSheet, Text, View , SafeAreaView, TouchableOpacity,Modal, Image, AsyncStorage, Dimensions} from 'react-native';
import {Camera} from 'expo-camera';
import {FontAwesome} from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import {DatabaseConnection} from '../database/database';

import { AntDesign, MaterialIcons } from '@expo/vector-icons';
//sis.sect.am.gov.br/_apps/app_teste
//expo install expo-media-library
//expo install expo-camera

const db  = DatabaseConnection.getConnection();

export default function App({navigation}) {
  const cameraRef = useRef();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission,setHasPermission] = useState(null);
  const [capturedPhoto,setCapturePhoto] = useState(null);
  const [captudedBase64, setcaptudedBase64] = useState(null);
  const [open,setOpen] = useState(false);
  const camRef = useRef(null);
  const [sync, setSync] = useState('');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);




  useEffect(() => {

    onHandlePermission();
  }, []);

  const onHandlePermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  //Resposta da Permissao

  if(hasPermission === null)
  {
    return <View/>;
  }

  if(hasPermission === false)
  {
    return <Text>Acesso negado! </Text>;
  }

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.2, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;
      setCapturePhoto(data.uri);
      setOpen(true);
      setcaptudedBase64(data.base64);
    }
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };
  // async function takePicture()
  // {
  //   if(camRef)
  //   {
  //     const data = await camRef.current.takePictureAsync({base64: true}); //enabled base64 - insert into ({base64: true})
  //     setCapturePhoto(data.uri);
  //     setcaptudedBase64(data.base64);
  //     setOpen(true);

  //     //console.log(data); //banco
  //   }
  // }

  // async function savePicture(){
  // let { status } = await MediaLibrary.requestPermissionsAsync()
  //   const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
  //   .then(() => {
  //     alert('Salvo com sucesso!.');
  //     console.log(capturedPhoto);
  //   })
  //   .catch(error => {
  //     console.log('err',error);
  //   })
  // }

  async function savePictureCloud()
  {
    if (capturedPhoto) {
      await cameraRef.current.pausePreview();
      setIsPreview(true);

     let base64Img = `data:image/jpg;base64,${captudedBase64}`;
                                            //181247      ruj_relatorio_imagem    ruj
      await AsyncStorage.multiGet(["codigo_tab_camera", "campo_relatorio_img", "tabela"]).then(response => {
        //var cod_tabela = tabela;
        var codigo_tab_camera = response[0][1];
        var campo_relatorio_img = response[1][1];
        var tabela = response[2][1];
        console.log(codigo_tab_camera);
        console.log(campo_relatorio_img);
        console.log(tabela);

      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO log (valor, tabela, campo, situacao, cod_processo, tipo) VALUES (?,?,?,?,?,?)', [ base64Img , tabela, campo_relatorio_img, '1', codigo_tab_camera , 'i'],
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

      db.transaction((tx) => {tx.executeSql( "SELECT * FROM log where tipo = 'i'",[] )});
    }
        )
    }
  }

  return (
    <SafeAreaView style={styles.container}>

    <Camera
      ref={cameraRef}
      style={styles.container}
      type={cameraType}
      onCameraReady={onCameraReady}
    />



    <View style={styles.container}>
    {isPreview && (
    <TouchableOpacity
      onPress={cancelPreview}
      style={styles.closeButton}
      activeOpacity={0.7}
    >
      <AntDesign name='close' size={32} color='#fff' />
    </TouchableOpacity>
  )}
    {!isPreview && (
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
          <MaterialIcons name='flip-camera-ios' size={28} color='white' />
        </TouchableOpacity>

        <TouchableOpacity
            activeOpacity={0.7}
            disabled={!isCameraReady}
            onPress={onSnap}
            style={styles.capture}
          />
      </View>
    )}
  </View>

    {/* <TouchableOpacity style={styles.button} onPress={takePicture}>
      <FontAwesome name='camera' size={23} color='#FFF'/>
    </TouchableOpacity> */}


      { capturedPhoto &&
        <Modal
          animationType = 'slide'
          transparent = {false}
          visible={open}
        >
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center', margin: 20}}>

            <View style={{margin: 10, flexDirection: 'row'}}>

            <TouchableOpacity style={{margin: 10}} onPress={()=>  navigation.goBack()}>
              <FontAwesome name='window-close' size={50} color='#FF0000'/>
            </TouchableOpacity>

            <TouchableOpacity style={{margin: 10}} onPress={ console.log("ok") }>
              <FontAwesome name='upload' size={50} color='#121212'/>
            </TouchableOpacity>

            <TouchableOpacity style={{margin: 10}} onPress={ savePictureCloud }>
              <FontAwesome name='cloud' size={50} color='#121212'/>

            </TouchableOpacity>
            </View>

            <Image
              style={{width: '100%', height: 450}}
              source={{uri: capturedPhoto}}
            />

          </View>
        </Modal>
      }
    </SafeAreaView>

  );
}
const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

const styles = StyleSheet.create({

  closeButton: {
    position: 'absolute',
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A45FF',
    opacity: 0.7
  },
  capture: {
    backgroundColor: '#5A45FF',
    borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30
  },
  bottomButtonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 28,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    ...StyleSheet.absoluteFillObject
  },
  text: {
    color: '#fff'
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
