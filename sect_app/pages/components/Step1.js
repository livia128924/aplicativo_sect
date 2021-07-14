import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, AsyncStorage, Picker } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DatabaseConnection } from '../database/database';
import { Formik, useFormik } from 'formik';
const db = DatabaseConnection.getConnection();
import Mybutton from './Mybutton';


const Step1 = (props) => {

  const [sync, setSync] = useState(false);

  useEffect(() => {

    //carrega o valor do select na tela index.js
    AsyncStorage.getItem('codigo_pr').then(value => {
      //console.log(value);
      setSync(value);
    });

    AsyncStorage.getItem('nome_tabela').then(tabela => {
      if (tabela) {

        db.transaction((tx) => {
          tx.executeSql(
            "select * from " + tabela+ " where se_ruj_cod_processo = '"  +sync+"'" , [], (tx, results) => {
              //console.log(results.rows);
              var row = [];
              if (results.rows.length > 0 ) {
                //row.push({label: results.rows.item(0).se_ruj_acesso, value:results.item(0).codigo});
                //console.log(results.rows.item(0).se_ruj_municipio);
                setLocalizacao(results.rows.item(0).se_ruj_localizacao);
                setSelectedLanguage(results.rows.item(0).se_ruj_municipio.toString());
                // if( row == setValor){
                //   setItem_aux_acesso
                // }
              }
              // setItem_aux_acesso({label:results.rows.item(0).se_ruj_acesso, value:results.rows.item(i).codigo});
              // setItem_aux_setor_abrangencia({label:results.rows.item(0).se_ruj_setor_abrangencia, value:results.rows.item(i).codigo })
              //setItem_cidades(row);
            });
        })
      }//fim
    });

    //////////////primeira coisa que faz quando entra na tela:  faz um select das tabelas aux para carregar nos components //////////////
    db.transaction((tx) => {
      tx.executeSql(
        "select * from aux_acesso", [], (tx, results) => {
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
        "select * from cidades", [], (tx, results) => {
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
      tx.executeSql(
        "select * from aux_setor_abrangencia", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
            //console.log( results.rows.item(i).nome);
          }
          setItem_aux_setor_abrangencia(temp);
        }
      );
    }, (err) => {
      console.error("There was a problem with the tx", err);
      return true;
    }, (success) => {
    });


  }, []);

  //estado inicial e as funçoes para poder ser atualizadas posteriormente ,


  const [localizacao, setLocalizacao] = useState('');
  const [teste, get_valor_in] = useState('');
  const [aberto, setAberto] = useState(false);
  const [valor, setValor] = useState('null');

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

  const [selectedLanguage, setSelectedLanguage] = useState('');

  //função que aciona quando o estado do componente muda e seta os valores correspondente
  function onPressTitle(tabela, campo, valor, codigo) {
    db.transaction((tx) => {
      const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_ruj_cod_processo = '${codigo}'`;
      console.log(query);
      tx.executeSql(query, [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          alert("INSERIDO COM SUCESSO");
        }

      });

    }, (tx, err) => {
      console.error("error", err);
      return true;
    }, (tx, success) => {
      console.log("tudo certo por aqui", success);
      //get_values(tabela, campo, sync);  ///esse aqui foi a tentativa
    });

    AsyncStorage.setItem('nome_tabela', tabela );
  };


  // function get_values (tabela, campo, codigo){

  //   db.transaction((tx) => {

  //     tx.executeSql(
  //     "select "+campo+" from " +tabela+" where codigo = "+codigo+"" , [], (tx, results) => {
  //       var temp = [];
  //       //console.log(len);
  //       for (let i = 0; i < results.rows.length; ++i) {
  //         temp.push({ label: results.rows.item(i).nome, value:results.rows.item(i).codigo});
  //         console.log(results.rows);

  //       }
  //       // get_valor_in(results.rows.item(i).se_ruj_municipio);

  //       }
  //     );

  //   }, (err) => {
  //     console.error("error", err);
  //     return true;
  //   }, (success) => {
  //   console.log("select", success);
  //   });

  // }



  return (

    <View>
      <View style={styles.form}>
        <View style={styles.rect2}>
          <Text>ÁREA DE ABRANGÊNCIA</Text>
        </View>
        <View style={styles.municipio}>
          <Text >MUNICIPIOS</Text>

        </View>

        <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>{
        setSelectedLanguage (itemValue)
        onPressTitle("se_ruj", "se_ruj_municipio", itemValue, sync)
        }}
        >
          {item.map((cidades, value)=>(
            <Picker.Item label={cidades.label} value={cidades.value} key={cidades.value} />
          ))}

        </Picker>

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
          onChangeValue={() => onPressTitle("se_ruj", "se_ruj_municipio", valor, sync)}
          placeholder={"get_valor_in "} //aqui eu tentei colocar o retorno da funcao do select
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
            onChangeText={localizacao => setLocalizacao(localizacao)}
            value={localizacao}
            onBlur={() => onPressTitle("se_ruj", "se_ruj_localizacao", localizacao, sync)}
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
            onChangeValue={() => onPressTitle("se_ruj", "se_ruj_setor_abrangencia", valorAcesso, sync)}
            setItems={setItem_aux_setor_abrangencia}//aux_setor_abrangencia
            listMode="SCROLLVIEW"
            placeholder="Selecione::"
          />
        </View>
      </View>
      <View>
        <Mybutton
          title='Enviar'
          customClick={() => console.log(setValor)}
        />
      </View>

    </View>
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