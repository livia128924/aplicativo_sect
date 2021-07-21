import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, AsyncStorage } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DatabaseConnection } from '../database/database';
import { Formik, useFormik } from 'formik';
import Mybutton from './Mybutton';
import Checkbox from 'expo-checkbox';
import RadioButon from './RadioButton';

const db = DatabaseConnection.getConnection();

const Step1 = (props) => {

  const [sync, setSync] = useState('');
  const [dados_valor, setDados_valor] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [aberto, setAberto] = useState(false);
  const [valor, setValor] = useState('');

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

  const [ischecado, setChecado] = useState([

    { id: 1, name: 'checkbox', label: 'Telha de amianto', value: '1', isChecked: false },
    { id: 2, name: 'checkbox', label: 'Madeira aparelhado', value: '2', isChecked: false },
    { id: 3, name: 'checkbox', label: 'Alumínio ou zinco', value: '3', isChecked: false },
    { id: 4, name: 'checkbox', label: 'Laje de concreto', value: '4', isChecked: false },
    { id: 5, name: 'checkbox', label: 'Telha de barro', value: '5', isChecked: false },
    { id: 6, name: 'checkbox', label: 'Alumínio Galvanizado', value: '6', isChecked: false },
  ]);

  const PROP = [
    {
      key: 'samsung',
      text: 'Samsung',
      isChecked: false
    },
    {
      key: 'apple',
      text: 'Apple',
      isChecked: false
    },
    {
      key: 'motorola',
      text: 'Motorola',
      isChecked: false
    },
    {
      key: 'lenovo',
      text: 'Lenovo',
      isChecked: false
    },
  ];

  useEffect(() => {
    var cod_processo = '';
    //carrega o valor do select na tela index.js
    AsyncStorage.getItem('codigo_pr').then(value => {
      //console.log(value);
      setSync(value);
      cod_processo = value;

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
              for (let i = 0; i < results.rows.length; ++i) {
                //console.log(results.rows.item(0).se_ruj_acesso);

                setLocalizacao(results.rows.item(0).se_ruj_localizacao);

                setValor(results.rows.item(i).se_ruj_municipio);

                setValorAcesso(results.rows.item(i).se_ruj_acesso);

                setValorAbrangencia(results.rows.item(i).se_ruj_setor_abrangencia);

                //muda(results.rows.item(i).se_ruj_material_cobertura);
                x = results.rows.item(i).se_ruj_material_cobertura;

                valor_checked(x.split(','));
              }

            });
        })

      }//
    });

  }, []);



  async function loadDados() {
    //////////////primeira coisa que faz quando entra na tela:  faz um select das tabelas aux para carregar nos components //////////////
    await db.transaction((tx) => {
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
  }

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

    AsyncStorage.setItem('nome_tabela', tabela);

    AsyncStorage.setItem('codigo', valor.toString());
  };


  const handleChange = async (index) => {

    //console.log(index);
    let value = index.value;
    let checked = index.isChecked;

    let _sintomas = [...ischecado];

    _sintomas.forEach(sintoma => {
      if (sintoma.value === value) {
        sintoma.isChecked = !checked;
      }
    });

    //console.log(ischecado);
    return setChecado(_sintomas);

  };

  function muda() {
    //await api
    var str_sintomas = [];

    ischecado.filter(value => value.isChecked === true).map((item) => {
      str_sintomas.push(item.value);
    });
    //console.log(ischecado);
    return str_sintomas.join(",");
  }

  function valor_checked(material_cobertura) {

    let x = [...ischecado];

    //console.log(ischecado.value);
    material_cobertura.forEach(item => {
      //console.log(item);
      x.forEach(sintoma => {
        if (sintoma.value === item) {
          sintoma.isChecked = true;
        }
      });
      //console.log(x);
    });

    return setChecado(x);
  }

function radio (){
 console.log("ok");
}



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
          setOpen={setAberto}
          setValue={setValor}
          setItems={setItem_cidades}//cidades
          zIndex={9999}
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
          <Text style={styles.titulo}>SETOR DE ABRANGÊNCIA</Text>
        </View>
        <View style={styles.checkboxlabel}>

          {[...ischecado].map((item, index) => (
            <View style={styles.checkboxGroup}
              key={item.id}
            >
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                //color={item.isChecked ? '#4630EB' : undefined}
                onValueChange={() => {
                  handleChange(item); onPressTitle("se_ruj", "se_ruj_material_cobertura", muda(), sync)
                }}
              />
              <Text >{item.label}</Text>
            </View>
          ))}

        </View>

        <View style={styles.container}>
          <RadioButon
          PROP={PROP}
          value={radio()}

          //value={()=> onPressTitle("se_ruj", "se_ruj_material_cobertura", PROP, sync )}

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