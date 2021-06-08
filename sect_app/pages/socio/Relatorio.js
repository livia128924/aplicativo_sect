import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, FlatList, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button } from 'react-native-paper';
import { DatabaseConnection } from '../database/database';
import Mybutton from '../components/Mybutton';

const db = DatabaseConnection.getConnection();

const Relatorio = ({navigation}) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  const [text, setText] = useState('');

  let [flatListItems, setFlatListItems] = useState([]);

  // const [foto, setFoto] = useState([]);

   useEffect(() => {
  loadFotos();
   }, []);

   async function loadFotos(){
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM foto_relatorio',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
   }

   async function enviar_foto (dados) {

     axios.post('https://moh1.com.br/spf/sis/_apps/app_teste/index.php', {dados})
      .then(function (response) {
        alert('Foto enviada com sucesso !!!'); // imprimir o conteudo - alert(JSON.stringify(response))
      })
      .catch(function (error) {
       alert('Erro ao enviar'); // imprimir o conteudo - console.log(JSON.stringify(error))
      });
   }
   async function deletar_foto (id) {

    //console.log('DELETE FROM foto_relatorio  WHERE id =' + id);return false;
    await db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM foto_relatorio  WHERE id = ?`, [id],
        (tx, results) => {
          alert('Excluido com sucesso'); 
          
          loadFotos();
        }
      );
    });
   }
   async function nome_foto (name) {

    //console.log('DELETE FROM foto_relatorio  WHERE id =' + id);return false;
    await db.transaction((tx) => {
      tx.executeSql(
        `INSERT name FROM foto_relatorio  WHERE id = ?`, [name],
        (tx, results) => {
          alert('Nome adcionado com sucesso'); 
          
          loadFotos();
        }
      );
    });
   }

   let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: '#EEE', marginTop: 20, padding: 10, borderRadius: 10 }}>
       <Text style={styles.textheader}>Adcionar nome</Text>
       <TextInput
        style={styles.input}
        placeholder="Nome da Imagem"
        onChangeText={text => item.nome}
        defaultValue={text}
        value={item.nome}
      />
      <Text style={{padding: 10, fontSize: 16}}>
        {text.split(' ').map((word) => word).join(' ')}
      </Text>

        <Image
            style={{width: '100%', height: 450}}
            source={{uri: item.image}}
          />
        
        <Mybutton title='Enviar' customClick={() => enviar_foto(item.image)}/> 
        <Mybutton title='Deletar' customClick={() => deletar_foto(item.id)}/> 

      </View>
  
    );
  };


  return (
    <View style={{ flex: 1, marginTop: 15 }}>
      <View style={styles.form}>
        <View style={styles.rect2}>
          <Text style={styles.title}>RELATÓRIO FOTOGRÁFICO</Text>
        </View>
        <View style={styles.text}>
          <Text >Nova Imagem</Text>
        </View>
        <View style={{paddingTop:5, paddingLeft:80}}>
        <Button 
        icon="camera" 
        mode="outlined" 
        color="black"
        onPress={() => navigation.navigate('Relatorio_camera')}
        style={{width:'70%', borderRadius: 3}}
        >
          Incluir Imagem
        </Button>
          </View>
        
          <View style={{ flex: 1 }}>
            <FlatList
              style={{ marginTop: 10 }}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={flatListItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => listItemView(item)}

            />
          </View>

      </View>

    </View>
  )

};





const styles = StyleSheet.create({
    input: {
    height: 40,
    marginRight:5,
    borderWidth: 1,
  },
  form: {
    width: 359,
    height: 730,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  rect2: {
    width: 359,
    height: 36,
    backgroundColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  text: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 15,
  },
  title: {
    color: "white",
    marginLeft: 10,
    marginTop: 5,
  },
});

export default Relatorio;