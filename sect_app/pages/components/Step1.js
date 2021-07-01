import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet, View, TextInput , Fragment, Picker} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import api from '../../services/api';
import { DatabaseConnection } from '../database/database';
import { Formik, useFormik } from 'formik';
import Yup from 'yup';
const db = DatabaseConnection.getConnection();
import NetInfo from '@react-native-community/netinfo';
import Mybutton from './Mybutton';

const Step1 = (props) => {

  // NetInfo.fetch().then(state => {
  //   console.log('Connection type', state.type);
  //   console.log('Is connected?', state.isConnected);
  // });


  useEffect(() => {
    //cria as tabelas
    db.transaction((tx) => {
      tx.executeSql(
        "select * from aux_acesso",[],  (tx, results) =>{
         //var len = results.rows.length, i;
         var temp = [];
         //console.log(len);
         for(let i = 0; i < results.rows.length; ++i){
          temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
         }
          setItem_aux_acesso(temp);
        }
      );
      tx.executeSql(
        "select * from cidades",[],  (tx, results) =>{
         //var len = results.rows.length, i;
         var temp = [];
         //console.log(len);
         for(let i = 0; i < results.rows.length; ++i){
          temp.push({ label: results.rows.item(i).nome, value: results.rows.item(i).codigo });
          //console.log( results.rows.item(i).nome);
         }
          setItem_cidades(temp);
        }
      );
      tx.executeSql(
        "select * from aux_setor_abrangencia",[],  (tx, results) =>{
         //var len = results.rows.length, i;
         var temp = [];
         //console.log(len);
         for(let i = 0; i < results.rows.length; ++i){
          temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
          //console.log( results.rows.item(i).nome);
         }
         setItem_aux_setor_abrangencia(temp);
        }
      );

    },(err) => {
      console.error("There was a problem with the tx", err);
      return true;
    },(success ) => {
      console.log("all done",success );
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


  // const yupSchema = Yup.object().shape({
  //     localizacao: Yup
  //         .string()
  //         .required()
  // });

  const initialValues = {
      cidades: '',
      localizacao: '',
      acesso:'',
  }

  return (
    <View>
     <Formik
    initialValues={initialValues}
    //validationSchema={yupSchema}
    onSubmit={values => console.log(values)}
   >
       {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
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
          onChangeValue={itemValue => handleChange('cidades', itemValue)}
          //onPress={() => enviar_()}
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
          //onPress={(value) =>  handleChange(value)}


          listMode="SCROLLVIEW"
          placeholder="acesso"
        />

        <View>
          <Text style={styles.localizacao}>LOCALIZAÇÃO</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.input2}
            onChangeText={handleChange('localizacao')}
            value={values.localizacao}
            onBlur={handleBlur('localizacao')}
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
            onChangeValue={value => console.log(value)}
            setItems={setItem_aux_setor_abrangencia}//aux_setor_abrangencia
            listMode="SCROLLVIEW"
            placeholder="Selecione::"
            />
        </View>
      </View>
      <View>
        <Mybutton
       title='Enviar'
       customClick={() =>console.log(setValor)}
        />
      </View>
      </>
      )}
      </Formik>
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