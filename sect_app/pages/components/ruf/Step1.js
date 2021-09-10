import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, AsyncStorage } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DatabaseConnection } from '../../database/database';

const db = DatabaseConnection.getConnection();

const Step1 = (props) => {

  const [sync, setSync] = useState('');
  const [dados_valor, setDados_valor] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  const [aberto, setAberto] = useState(false);
  const [valor, setValor] = useState('');
  const [item, setItem_cidades] = useState([]);

  const [abertoAcesso, setAbertoAcesso] = useState(false);
  const [valorAcesso, setValorAcesso] = useState(null);
  const [itemAcesso, setItem_aux_acesso] = useState([]);

  useEffect(() => {

    var cod_processo = '';
    //carrega o valor do select na tela index.js
    AsyncStorage.getItem('pr_codigo').then(value => {
      setSync(value);
      cod_processo = value;
      console.log("cod altoIncremento", cod_processo);

    });
    AsyncStorage.getItem('codigo').then(codigo => {
      setDados_valor(codigo);
    })

    loadDados();

    AsyncStorage.getItem('nome_tabela').then(tabela => {
      if (tabela) {

        db.transaction((tx) => {

          tx.executeSql(
            "select * from " + tabela + " where se_ruf_cod_processo = '" + cod_processo + "'", [], (tx, results) => {
              var x = "";
              var row = [];
              for (let i = 0; i < results.rows.length; ++i) {
                console.log(results.rows);
                setLocalizacao(results.rows.item(0).se_ruf_localizacao);

                setValor(results.rows.item(i).se_ruf_municipio);

                setValorAcesso(results.rows.item(i).se_ruf_acesso);
              }

            },
            function(tx, error) {
              alert('SELECT error: ' + error.message);
          }
          );
        })

      }//
    });

  }, []);



  async function loadDados() {

    //////////////primeira coisa que faz quando entra na tela:  faz um select das tabelas aux para carregar nos components //////////////
  db.transaction((tx) => {
      tx.executeSql(
        "select * from aux_acesso ", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
          }
          setItem_aux_acesso(temp);
        }
      );
      tx.executeSql(
        "select * from cidades ", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({ label: results.rows.item(i).nome, value: results.rows.item(i).codigo });
            //console.log( results.rows.item(i).nome);
          }
          setItem_cidades(temp);
        }
      );
    }, (err) => {
      console.error("There was a problem with the tx", err);
      return true;
    }, (success) => {
    });
  };

  //função que aciona quando o estado do componente muda e seta os valores correspondente
  function onPressTitle(tabela, campo, valor, codigo) {


      db.transaction((tx) => {

        const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_ruf_cod_processo = '${codigo}'`;
        //console.log(query);
        tx.executeSql(query, [], (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            alert("INSERIDO COM SUCESSO");
          }
        });
      }, (tx, err) => {
        console.error("error em alguma coisa", err);
        return true;
      }, (tx, success) => {
        console.log("tudo certo por aqui", success);
        //get_values(tabela, campo, sync);  ///esse aqui foi a tentativa
      });

      var chaves = '"' + tabela + ' ' + campo + ' ' + valor + ' ' + codigo + '"';

      db.transaction((tx) => {
      //tx.executeSql("DROP TABLE log", []);
      const log_delete = "INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + " ,'" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')";
      console.log("INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + " ,'" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')");
      tx.executeSql(log_delete, []);
    });

    db.transaction((tx) => {
      const log_update = "REPLACE INTO log (chave, tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + ", '" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')";
      console.log(log_update);
      tx.executeSql(log_update, []);
    })

    AsyncStorage.setItem('nome_tabela', tabela);

    AsyncStorage.setItem('codigo', valor.toString());
  };

  return (
    <View>
      <View style={styles.form_}>
        <View style={styles.rect2}>
          <Text style={{color:'white', marginLeft:15, marginTop:5}}>ÁREA DE ABRANGÊNCIA</Text>
        </View>

        <View style={styles.title_style}>
          <Text>MUNICIPIOS </Text>
        </View>

        <DropDownPicker
          style={styles.dropdown_style}
          open={aberto}
          value={parseInt(valor)}
          items={item}
          setOpen={setAberto}
          setValue={setValor}
          setItems={setItem_cidades}//cidades
          zIndex={9999}
          listMode="SCROLLVIEW"
          onChangeValue={() => onPressTitle("se_ruf", "se_ruf_municipio", valor, sync)}
          placeholder={"Municipios"} //aqui eu tentei colocar o retorno da funcao do select
        />


        <View style={styles.title_style}>
          <Text>ACESSO</Text>
        </View>
        <DropDownPicker
          style={styles.dropdown_style}
          open={abertoAcesso}
          value={parseInt(valorAcesso)}
          items={itemAcesso}
          setOpen={setAbertoAcesso}
          setValue={setValorAcesso}
          setItems={setItem_aux_acesso}//aux_acesso
          onChangeValue={() => onPressTitle("se_ruf", "se_ruf_acesso", valorAcesso, sync)}
          listMode="SCROLLVIEW"
          placeholder="acesso"
        />

        <View>
          <Text style={styles.title_style}>LOCALIZAÇÃO</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.input_style}
            onChangeText={ setLocalizacao}
            value={localizacao}
            onBlur={() => onPressTitle("se_ruf", "se_ruf_localizacao", localizacao, sync)}
            placeholder={"    Localização"}
          />

        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  form_: {
    width: '95%',
    left:11,
    height: 370,
    //marginLeft: 25,
    marginRight:25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  input_style: {
    height: 40,
    width: '85%',
    marginRight:25,
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
    width: '100%',
    height: 36,
    backgroundColor: "rgba(74,144,226,1)",
    borderRadius: 3,
    //color:  'white',
  },
  title_style: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 15,
  },
  dropdown_style: {
    height: 40,
    width: '85%',
    marginLeft: 30,
    height: 40,
    marginTop: 5,
    borderRadius: 0,
    borderWidth: 1,
  },

});

export default Step1;