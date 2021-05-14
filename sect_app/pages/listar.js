import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet, Image, Button } from 'react-native';
import { DatabaseConnection } from './database/database';
import axios from 'axios';
import Mybutton from './components/Mybutton';

// https://moh1.com.br/spf/sis/_apps/app_teste/teste.txt
// https://moh1.com.br/spf/sis/_apps/app_teste/index.php

const db = DatabaseConnection.getConnection();

const ViewAllUser = () => {
    let [flatListItems, setFlatListItems] = useState([]);

   // const [foto, setFoto] = useState([]);

    useEffect(() => {

      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM items',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setFlatListItems(temp);
          }
        );
      });
    }, []);

    async function enviar_foto (dados) {

      axios.post('https://moh1.com.br/spf/sis/_apps/app_teste/index.php', {dados})
       .then(function (response) {
         alert('Foto enviada com sucesso !!!'); // imprimir o conteudo - alert(JSON.stringify(response))
       })
       .catch(function (error) {
        alert('Erro ao enviar'); // imprimir o conteudo - console.log(JSON.stringify(error))
       });
    }
  
    let listItemView = (item) => {
      return (
        <View
          key={item.user_id}
          style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
         <Text style={styles.textheader}>{item.id}</Text>
          <Image
              style={{width: '50%', height: 450, borderRadius: 20}}
              source={{uri: item.image}}
            />
          
          <Mybutton title='Enviar' customClick={() => enviar_foto(item.image)}/> 

        </View>
      );
    };
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            <FlatList
              style={{ marginTop: 30 }}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={flatListItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => listItemView(item)}

            />
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    textheader: {
      color: '#111',
      fontSize: 12,
      fontWeight: '700',
  
    },
    textbottom: {
      color: '#111',
      fontSize: 18,
    },
  });
  
  export default ViewAllUser;
