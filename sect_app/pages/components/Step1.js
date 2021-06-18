import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import api from '../../services/api';
import { DatabaseConnection } from '../database/database';

const db = DatabaseConnection.getConnection();

const Step1 = (props) => {

  useEffect(() => {

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
          console.log("tabela = " + item + " campos: " + novo_array[item]); // lista tabelas e colunas
          var tabela = [item];
          var dados = [novo_array[item]];

          db.transaction(tx =>  {

            tx.executeSql(
              "create table if not exists "+item+" ("+dados+");",
            );
          });
          console.log( "create table if not exists "+item+" ("+dados+");");
        });

      });

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
        arr.forEach((nome_tabela, i) => {
          console.log("tabela_nome = " + nome_tabela + " valores: " + dados_array[nome_tabela]); // lista tabelas e colunas
          var tabela = [nome_tabela];
          var valores = [dados_array[nome_tabela][1]];
          var dados = ["ok"];

          db.transaction(tx =>  {

            tx.executeSql(
              "insert into "+tabela+" ("+dados+") values ("+valores+");",
            );
          });
          console.log( "insert into "+tabela+" ("+dados+") values ("+valores+");");
        });

      });

  }, []);

  // async function inserir() {
  //   if (aberto) {

  //     db.transaction(function (tx) {
  //       tx.executeSql(
  //         'INSERT INTO teste (descricao) VALUES (\'manaus\'), (\'sgsgs\')',
  //         [],
  //         (tx, results) => {
  //           console.log('Results', results.rowsAffected);
  //           if (results.rowsAffected > 0) {
  //             console.log(results);
  //             alert(
  //               'Sucesso',
  //               [
  //                 {
  //                   text: 'Ok'
  //                 },
  //               ],
  //               { cancelable: false }
  //             );
  //           } else alert('Erro ao tentar Registrar');
  //         }
  //       );
  //     });
  //   }
  // }

  // async function itemTeste() {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       'SELECT * FROM teste',
  //       [],
  //       (tx, results) => {
  //         var temp = [];
  //         for (let i = 0; i < results.rows.length; ++i) {
  //           //temp.push(results.rows.item(i));
  //           temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
  //           //console.log(results.rows.item(i).descricao);
  //         }
  //         setItem(temp);
  //         //console.log(item)
  //       }
  //     );
  //   });
  // }

  const [localizacao, setLocalizacao] = useState('');
  const [aberto, setAberto] = useState(false);
  const [valor, setValor] = useState(null);
  const [item, setItem] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);

  const [abertoAcesso, setAbertoAcesso] = useState(false);
  const [valorAcesso, setValorAcesso] = useState(null);
  const [itemAcesso, setItemAcesso] = useState([
    { label: 'samsung', value: 'samsung' },
    { label: 'motorola', value: 'motorola' }
  ]);
  const [abertoAbrangencia, setAbertoAbrangencia] = useState(false);
  const [valorAbrangencia, setValorAbrangencia] = useState(null);
  const [itemAbrangencia, setItemAbrangencia] = useState([
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
          setItems={setItem}
          zIndex={9999}
          listMode="SCROLLVIEW"
          placeholder="Municipios"
        //onPress={inserir}
        //onOpen={() => alert('hi!')}
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
          setItems={setItemAcesso}
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
            setItems={setItemAbrangencia}
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