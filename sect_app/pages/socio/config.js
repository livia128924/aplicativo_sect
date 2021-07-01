import React, { Component, useEffect } from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';
import { DatabaseConnection } from '../database/database';
import Mybutton from '../components/Mybutton';
const db = DatabaseConnection.getConnection();

function Config({ navigation }) {

  useEffect(() => {
    //cria as tabelas
    axios.post('http://192.168.0.151:8082/api/estrutura2.php', {})
      .then(function (response) {
        const dados = response.data;
        //console.log(dados);
        var arr = [];
        Object.keys(dados).forEach(function (key, i) {
          arr.push(key);
        });
        var arr_colunas = [];
        var novo_array = [];
        arr.forEach((item) => {
          arr_colunas.push(Object.keys(dados[item]));
          novo_array[item] = Object.keys(dados[item]);
          //console.log(dados[item]);

          db.transaction((tx) => {
            tx.executeSql(
              dados[item], [], (tx, result) => {
                //console.log(tx, result);
              }
            );


          }, (err) => {
            //console.error("There was a problem with the tx", err);
            return true;
          }, (success) => {
            //console.log("all done",success );
          });
        });
        // db.transaction((tx) => {
        //   tx.executeSql(
        //     "insert into aux_acesso (descricao) values ('teste')"
        //   );
        //   tx.executeSql(
        //     "select descricao from aux_acesso", [], (tx, rows) => {
        //       console.log(tx, rows);
        //     }
        //   );

        // }, (err) => {
        //   console.error("There was a problem with the tx", err);
        //   return true;
        // }, (success) => {
        //   console.log("all done" + success);
        // });

      })
      .catch(function (error) {
        console.log('Erro');
      });

      //function dados ()

     axios.post('http://192.168.0.151:8082/api/dados2.php', {})
     .then(function (response) {
       const  dados2 = response.data;
       //console.log(dados2);
       var arr = [];
       Object.keys(dados2).forEach(function (key, i) {
         arr.push(key);
       });
       var arr_colunas = [];
       var novo_array = [];
       arr.forEach((item) => {
         arr_colunas.push(Object.keys(dados2[item]));
         novo_array[item] = Object.keys(dados2[item]);
         //console.log(dados2[item]);
         db.transaction((tx) => {
           tx.executeSql(dados2[item],[]);
           tx.executeSql(
             "select descricao from aux_acesso",[],  (tx, results) =>{
              var len = results.rows.length, i;
              console.log(len);
              for(i = 0; i< len; i++){
                console.log(results.rows.item(i));
              }
             }
           );

         },(err) => {
           console.error("There was a problem with the tx", err);
           return true;
         },(success ) => {
           console.log("all done",success );
         });


       });
     })
     .catch(function (error) {
       console.log('Erro');
      });


  }, []);


  return (
    <View>
      <Text>Teste
      </Text>
      <Mybutton
      title='Estrutura tb aux'
      //customClick={() => navigation.navigate('Config')}
  />
       <Mybutton
      title='dados tb aux'
      //customClick={() => navigation.navigate('Config')}
  />
    </View>
  )

}
export default Config;