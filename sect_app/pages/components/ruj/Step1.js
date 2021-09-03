import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, AsyncStorage } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DatabaseConnection } from '../../database/database';
import { Formik, useFormik } from 'formik';
import Checkbox from 'expo-checkbox';
import { RadioButton } from 'react-native-paper';

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
const [open_Se_ruj_setor_abrangencia, setOpen_Se_ruj_setor_abrangencia] = useState(false);
const [valor_Se_ruj_setor_abrangencia, setValor_Se_ruj_setor_abrangencia]= useState(null);
  const [item_Se_ruj_setor_abrangencia, setItem_Se_ruj_setor_abrangencia] = useState([]);

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
      //console.log(cod_processo);
      if (tabela) {

        db.transaction((tx) => {

          tx.executeSql(
            "select * from " + tabela + " where se_ruj_cod_processo = '" + cod_processo + "'", [], (tx, results) => {
              var x = "";
              var row = [];
              //console.log(cod_processo, tabela);
              for (let i = 0; i < results.rows.length; ++i) {
                console.log(results.rows.length);
                setLocalizacao(results.rows.item(0).se_ruj_localizacao);

                setValor(results.rows.item(i).se_ruj_municipio);

                setValorAcesso(results.rows.item(i).se_ruj_acesso);

                setValor_Se_ruj_setor_abrangencia(results.rows.item(0).se_ruj_setor_abrangencia);
              }

            });
        })

      }//
    });

  }, []);



  async function loadDados() {

    //////////////primeira coisa que faz quando entra na tela:  faz um select das tabelas aux para carregar nos components //////////////
  db.transaction((tx) => {
      tx.executeSql(
        "select * from aux_acesso ", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
          }
          setItem_aux_acesso(temp);
        }
      );
      tx.executeSql(
        "select * from cidades ", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({ label: results.rows.item(i).nome, value: results.rows.item(i).codigo });
          }
          setItem_cidades(temp);
        }
      );
      tx.executeSql(
        "select * from aux_setor_abrangencia", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
          }
          setItem_Se_ruj_setor_abrangencia(temp);
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

      const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_ruj_cod_processo = '${codigo}'`;
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
      const log_delete = "INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + " ,'" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')";
      console.log("INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + " ,'" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')");
      tx.executeSql(log_delete, []);
    });

    db.transaction((tx) => {
      const log_update = "REPLACE INTO log (chave, tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + ", '" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')";
      console.log(log_update);
      tx.executeSql(log_update, [], (tx, results) => {

      });
    })

    AsyncStorage.setItem('nome_tabela', tabela);

    AsyncStorage.setItem('codigo', valor.toString());
  };

  return (

    <View>
      <View style={styles.form}>
        <View style={styles.rect2}>
          <Text>ÁREA DE ABRANGÊNCIA</Text>
        </View>

        <View style={styles.municipio}>
          <Text>MUNICIPIOS </Text>
        </View>
        <DropDownPicker
          style={styles.select}
          open={aberto}
          value={parseInt(valor)}
          items={item}
          zIndex={9999}
          setOpen={setAberto}
          setValue={setValor}
          setItems={setItem_cidades}//cidades
          listMode="SCROLLVIEW"
          onChangeValue={() => onPressTitle("se_ruj", "se_ruj_municipio", valor, sync)}
          placeholder={"Municipios"} //aqui eu tentei colocar o retorno da funcao do select
        />


        <View>
          <Text style={styles.acessoText}>ACESSO</Text>
        </View>
        <DropDownPicker
          style={styles.acesso}
          open={abertoAcesso}
          value={parseInt(valorAcesso)}
          items={itemAcesso}
          setOpen={setAbertoAcesso}
          setValue={setValorAcesso}
          setItems={setItem_aux_acesso}//aux_acesso
          onChangeValue={() => onPressTitle("se_ruj", "se_ruj_acesso", valorAcesso, sync)}
          listMode="SCROLLVIEW"
          placeholder="acesso"
        />

        <View>
          <Text style={styles.localizacao}>LOCALIZAÇÃO</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.input2}
            onChangeText={ setLocalizacao}
            value={localizacao}
            onBlur={() => onPressTitle("se_ruj", "se_ruj_localizacao", localizacao, sync)}
            placeholder={"    Localização"}
          />
        </View>
      </View>

<View>

      <View style={styles.form_step1}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>SETOR DE ABRANGÊNCIA</Text>
        </View>

        <DropDownPicker
          style={styles.abrangencia}
          open={open_Se_ruj_setor_abrangencia}
          value={parseInt(valor_Se_ruj_setor_abrangencia)}
          items={item_Se_ruj_setor_abrangencia}
          setOpen={setOpen_Se_ruj_setor_abrangencia}
          setValue={setValor_Se_ruj_setor_abrangencia}
          setItems={setItem_Se_ruj_setor_abrangencia}//aux_acesso
          dropDownDirection='BOTTOM'
          onChangeValue={() => onPressTitle("se_ruj", "se_ruj_setor_abrangencia", valor_Se_ruj_setor_abrangencia, sync)}
          listMode="SCROLLVIEW"
          placeholder="Setor Abrangência"
          />

          </View>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkboxlabel: {
    marginTop: 5,
    marginLeft: 30,
  },
  form: {

  },
  form_step1: {
    marginTop: 15,
    width: 340,
    height:200,
    marginLeft: 25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
    zIndex:1
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
    height: 320,
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
    zIndex:2
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