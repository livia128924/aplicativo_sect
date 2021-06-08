import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import api from '../../services/api';

const Step1 = (props) => {
  useEffect(() => {
    api.post('socio/setor_abrangencia.php', {})
    .then(function (response) {
      const { label } = response.data;
      //console.log(response.data);
      setItemAbrangencia(response.data);
    });
    api.post('socio/acesso.php', {})
    .then(function (response) {

      const { label } = response.data;
      //console.log(response.data);
      setItemAcesso(response.data);
    });

    api.post('socio/municipios.json', {})
      .then(function (response) {

        const { label } = response.data;
        console.log(response.data);
        setItem(response.data);
      });


}, []);
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
                zIndex={5000}
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