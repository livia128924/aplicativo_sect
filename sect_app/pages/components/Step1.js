import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import api from '../../services/api';
import { DatabaseConnection } from '../database/database';

const db = DatabaseConnection.getConnection();

const Step1 = (props) => {

  useEffect(() => {
    //cria as tabelas
    api.post('socio/municipios.json', {})
      .then(function (response) {
        const { dados } = response.data;
        var arr = [];
        var arr_colunas = [];
        Object.keys(dados).forEach(function (key, i) {
          arr.push(key);
        });
        var arr_colunas = [];
        var novo_array = [];
        arr.forEach((item) => {
          arr_colunas.push(Object.keys(dados[item]));
          novo_array[item] = Object.keys(dados[item]);
        });
        arr.forEach((item, i) => {
          //var dados;
          //console.log("tabela = " + item + " campos: " + novo_array[item]); // lista tabelas e colunas
          var tabela = [item];
          //var dados = [novo_array[item]];

          db.transaction(tx => {
            tx.executeSql(
              "drop table if exists " + item + ";",
            );
          });

          db.transaction(tx => {
            tx.executeSql(
              "create table if not exists " + item + " (" + novo_array[item] + ");",
            );
          });
          console.log("create table if not exists " + item + " (" + novo_array[item] + ");");
          console.log(dados);
          //nomes_colunas = dados;

        });

      });

    //console.log(nomes_colunas);

    // async function select_json(nome_tabela, item) {
    //   db.transaction((tx) => {
    //     tx.executeSql(
    //       "SELECT * FROM " + nome_tabela + " ",
    //       [],
    //       (tx, results) => {
    //         //var len = results.rows.length;
    //         var temp = [];
    //         for (let i = 0; i < results.rows.length; ++i) {
    //           //temp.push(results.rows.item(i));
    //           temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
    //         }
    //         //var y =nome_tabela;
    //         // var x = "setItem_";
    //         // //eval("x+nome_tabela");
    //         // var nome = eval("x+nome_tabela");
    //         // //eval("window[nome](temp)");
    //         // //var obj = { a: 20, b: 30 };
    //         // //var propname = getPropname();  //retorna "a" ou "b"
    //         // //var result = obj;
    //         // console.log(eval("nome=temp"));
    //         // var novo = eval;
    //         // novo(temp);
    //         //console.log(eval(novo(temp)));
    //         //console.log(eval("x+nome_tabela"));

    //         console.log(temp);
    //         if(nome_tabela =="cidades"){
    //           console.log(nome_tabela);
    //           setItem_cidades(temp);
    //         }else if(nome_tabela =="aux_acesso"){
    //           setItem_aux_acesso(temp)
    //         }else if(nome_tabela == "aux_setor_abrangencia"){
    //           setItem_aux_setor_abrangencia(temp)
    //         }

    //         //console.log("ok");
    //         //setItem_cidades(temp);

    //       }
    //     )
    //   });


    // }

    //da o insert na tabela criada pegando os dados via api em formato json
    api.post('sincroninzacao/dados.json', {})
      .then(function (response) {
        const { dados } = response.data;
        var arr = [];
        var arr_colunas = [];
        Object.keys(dados).forEach(function (key, i) {
          arr.push(key);
        });
        var arr_colunas = [];
        var dados_array = [];
        arr.forEach((nome_tabela) => {
          arr_colunas.push(Object.keys(dados[nome_tabela]));
          dados_array[nome_tabela] = Object.keys(dados[nome_tabela]);
        });

        console.log(arr_colunas);
        arr.forEach((nome_tabela, i) => {

          var lista_colunas = dados[nome_tabela];
          //console.log(lista_colunas);
          Object.keys(lista_colunas).forEach(function (item, indice) {
            var variavel = "(";
            Object.keys(lista_colunas[item]).forEach(function (subItem, subIndice) {
              variavel += "'" + lista_colunas[item][subItem] + "'";// coloca o valor atual na string
              if (lista_colunas[item][subIndice + 1] != null) {
                variavel += ","
              }
            });
            variavel += ")";
            if (lista_colunas[item + 1] != null) {
              variavel += "(";
            } else {
              //variavel += '\n';
            }

            db.transaction(tx => {

              tx.executeSql(
                "insert into " + nome_tabela + " values " + variavel + ";",
              );
            });
            //console.log("insert into " + nome_tabela + " values " + variavel + ";");
          });
          //console.log(dados[nome_tabela].codigo);

          // //console.log(temp);
          // setItem(temp);
          // setItemAcesso(temp);
          //setItem(select_json(temp));
          // select_json(nome_tabela, setItem);
          //(select_json(nome_tabela));


        });
      });

  }, []);



  const [localizacao, setLocalizacao] = useState('');

  const [aberto, setAberto] = useState(false);
  const [valor, setValor] = useState(null);
  const [item, setItem_cidades] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);

  const [abertoAcesso, setAbertoAcesso] = useState(false);
  const [valorAcesso, setValorAcesso] = useState(null);
  const [itemAcesso, setItem_aux_acesso] = useState([
    { label: 'samsung', value: 'samsung' },
    { label: 'motorola', value: 'motorola' }
  ]);
  const [abertoAbrangencia, setAbertoAbrangencia] = useState(false);
  const [valorAbrangencia, setValorAbrangencia] = useState(null);
  const [itemAbrangencia, setItem_aux_setor_abrangencia] = useState([
    { label: '100', value: '100' },
    { label: '200', value: '200' }
  ]);


  return (
    <>
      <View style={styles.form}>
        <View style={styles.rect2}>
          <Text>ÁREA DE ABRANGÊNCIA</Text>
        </View>
        <View style={styles.municipio}>
          <Text >MUNICIPIOS</Text>
        </View>
        <DropDownPicker
          style={styles.select}
          open={aberto}
          value={valor}
          items={item}
          setOpen={setAberto}
          setValue={setValor}
          setItems={setItem_cidades}//cidades
          zIndex={9999}
          listMode="SCROLLVIEW"
          placeholder="Municipios"
        />
        <View>
          <Text style={styles.acessoText}>ACESSO</Text>
        </View>
        <DropDownPicker
          style={styles.acesso}
          open={abertoAcesso}
          value={valorAcesso}
          items={itemAcesso}
          setOpen={setAbertoAcesso}
          setValue={setValorAcesso}
          setItems={setItem_aux_acesso}//aux_acesso
          listMode="SCROLLVIEW"
          placeholder="acesso"
        />

        <View>
          <Text style={styles.localizacao}>LOCALIZAÇÃO</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.input2}
            onChangeText={setLocalizacao}
            value={localizacao}
            placeholder={"    Localização"}
          />
          <Text>formulario step content</Text>
        </View>
      </View>

      <View style={styles.form_step1}>
        <View style={styles.rect2}>
          <Text style={styles.titulo} >SETOR DE ABRANGÊNCIA</Text>
        </View>
        <View style={styles.dropAtividades}>
          <DropDownPicker
            style={styles.abrangencia}
            open={abertoAbrangencia}
            value={valorAbrangencia}
            items={itemAbrangencia}
            setOpen={setAbertoAbrangencia}
            setValue={setValorAbrangencia}
            setItems={setItem_aux_setor_abrangencia}//aux_setor_abrangencia
            listMode="SCROLLVIEW"

            placeholder="Selecione::"
          />
        </View>
      </View>
    </>


  )
};

const styles = StyleSheet.create({
  form: {
    width: 340,
    height: 370,
    marginLeft: 25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  form_step1: {
    marginTop: 15,
    width: 340,
    height: 150,
    marginLeft: 25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  localizacao: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 9
  },
  input2: {
    height: 40,
    width: '85%',
    marginTop: 2,
    borderWidth: 1,
    backgroundColor: 'white'
  },
  form: {
    width: 340,
    height: 370,
    marginLeft: 25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  rect2: {
    width: 340,
    height: 36,
    backgroundColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  municipio: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 15,
  },
  select: {
    height: 40,
    width: '85%',
    marginLeft: 30,
    height: 40,
    borderRadius: 0,
    borderWidth: 1,
  },
  acessoText: {
    color: "#121212",
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 9
  },
  acesso: {
    height: 40,
    width: '85%',
    marginLeft: 30,
    height: 40,
    marginTop: 5,
    borderRadius: 0,
    borderWidth: 1,
  },
  titulo: {
    color: "white",
    marginLeft: 9,
    marginTop: 1
  },
  dropAtividades: {
    zIndex: 9999,
  },
  abrangencia: {
    height: 40,
    width: '85%',
    marginLeft: 30,
    height: 40,
    marginTop: 20,
    borderRadius: 0,
    borderWidth: 1,
  },
});

export default Step1;