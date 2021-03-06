import React, { Component, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Button ,StyleSheet} from 'react-native';
import { DatabaseConnection } from '../database/database';
import Mybutton from '../components/Mybutton';
import MybuttonMaterial from '../components/MyButtonMaterial';
import api_metas from '../../services/api_metas';
const db = DatabaseConnection.getConnection();


const Config = ()=> {

 //console.log(api_metas());
  //cria e faz o drop das tabelas principais
  // useEffect(() => {


  // },[]);

  const api_meta = axios.create({
    baseURL: api_metas(),
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
        "Content-Type": "application/json;charset=UTF-8"
    },
});

  async function load_dados() {

    await api_meta.post('/api/metas.php', {})

      .then(function (response) {
        const metas = response.data;
        var arr = [];
        Object.keys(metas).forEach(function (key, i) {
          arr.push(key);
        });
        var arr_colunas = [];
        var novo_array = [];
        arr.forEach((item) => {
          arr_colunas.push(Object.keys(metas[item]));
          novo_array[item] = Object.keys(metas[item]);
          db.transaction((tx) => {
            tx.executeSql(metas[item], []);
          }, (err) => {
            console.error("There was a problem with the tx metas", err);
            return true;
          }, (success) => {
            console.log("metas", success);
          });
          alert("Criado as tabelas!");
          db.transaction((tx) => {
          //   //tx.executeSql("delete from log", []);

          //  //tx.executeSql("drop table log", []);

            tx.executeSql("CREATE TABLE IF NOT EXISTS log ( chave TEXT UNIQUE , codigo INTEGER, tabela TEXT, campo TEXT, valor BLOB, cod_tabela TEXT, cod_processo TEXT, data TEXT DEFAULT CURRENT_TIMESTAMP, situacao TEXT, tipo TEXT, nome TEXT, PRIMARY KEY(codigo))", []);
          }, (err) => {
            console.error("There was a problem with the log ", err);
            return true;
          }, (success) => {
            console.log("criou a tabela log", success);
          });

        });
      })
      .catch(function (error) {
        console.log('Erro');
      });

    //inseri os dados e select nas tabelas pri
    await api_meta.post('/api/metas_dados.php', {})
      .then(function (response) {
        const metas_dados = response.data;
        var arr = [];
        Object.keys(metas_dados).forEach(function (key, i) {
          arr.push(key);
        });
        var arr_colunas = [];
        var novo_array = [];
        arr.forEach((item) => {
          arr_colunas.push(Object.keys(metas_dados[item]));
          novo_array[item] = Object.keys(metas_dados[item]);
          //console.log(metas_dados[item]);
          db.transaction((tx) => {

            tx.executeSql(metas_dados[item], []);
            tx.executeSql(
              "select * from vu", [], (tx, results) => {
                var len = results.rows.length, i;
                //console.log(len);
                for (i = 0; i < len; i++) {
                  console.log(results.rows.item(i));
                }
              }
            );
          }, (err) => {
            console.error("There was a problem with the tx insert metas_dados", err);
            return true;
          }, (success) => {
            console.log("metas_dados", success);
          });


        });

      })

  }

  //////////////////fim ////////////

  async function sync_dados() {

    db.transaction((tx) => {
      tx.executeSql(
        "select * from se_ruj ", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            console.log(results.rows.item(i))
          }
        }
      );


    }, (err) => {
      console.error("There was a problem with the tx", err);
      return true;
    }, (success) => {
    });

  }

  //////////////////////////////////////////////tabelas auxiliares///////////////////////////////////
  async function aux_dados() {
    //cria as tabelas e faz o drop das tabelas auxiliares
    await api_meta.post('/api/estrutura2.php', {})
    .then(function (response) {
        //console.log(api_meta);
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
            console.error("There was a problem with the tx", err);
            return true;
          }, (success) => {
            //console.log("all done",success );
          });
        });

      })
      .catch(function (error) {
        console.log('Erro');
      });


    //faz o insert e select das tabelas auxiliares
    await api_meta.post('/api/dados3.php', {})
      .then(function (response) {
        const dados2 = response.data;
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
            tx.executeSql(dados2[item], []);
            tx.executeSql(
              "select descricao from aux_acesso", [], (tx, results) => {
                var len = results.rows.length, i;
                //console.log(len);
                for (i = 0; i < len; i++) {
                  //console.log(results.rows.item(i));
                }
              }
            );

          }, (err) => {
            console.error("There was a problem with the tx dados2", err);
            return true;
          }, (success) => {
            console.log("all done = select ", success);
          });

        });
      })
      .catch(function (error) {
        console.log('Erro');
      });

  }
  ///////////////////////////////fim tabelas auxiliares/////////////////////

  return (
    <View style={styles.container}>


      <MybuttonMaterial
        title='criar tabelas principais'
        customClick={load_dados}
        icon='table-star'
      />

      <MybuttonMaterial
        title='sincronizar tabelas principais'
        customClick={sync_dados}
        icon='table-sync'
      />
      <MybuttonMaterial
        title='criar tabelas auxiliares'
        customClick={aux_dados}
        icon='table-plus'
      />
    </View>
  )

}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      padding: 30,
      flexDirection: 'row',
      justifyContent: 'center',

  },

});
export default Config;



