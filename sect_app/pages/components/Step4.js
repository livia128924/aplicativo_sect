import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Checkbox } from 'react-native-paper';
import api from '../../services/api';

const Step4 = (props) => {
    useEffect(() => {
        api.post('socio/pisos.php', {})
        .then(function (response) {

          const { label } = response.data;
          //console.log(response.data);
          setItemSe_ruj_numero_pisos(response.data);
        });

        api.post('socio/tipo_construcao.php', {})
        .then(function (response) {

          const { label } = response.data;
          //console.log(response.data);
          setItemSe_ruj_tipo_construcao(response.data);
        });
        api.post('socio/comodos.php', {})
        .then(function (response) {

          const { label } = response.data;
          //console.log(response.data);
          setItemSe_ruj_numero_comodos(response.data);
        });
        api.post('socio/conservacao.php', {})
        .then(function (response) {

          const { label } = response.data;
          //console.log(response.data);
          setItemSe_ruj_estado_conservacao(response.data);
        });
    }, []);
    const [openSe_ruj_tipo_construcao, setOpenSe_ruj_tipo_construcao] = useState(false);
    const [valorSe_ruj_tipo_construcao, setValorSe_ruj_tipo_construcao] = useState(null);
    const [itemSe_ruj_tipo_construcao, setItemSe_ruj_tipo_construcao] = useState([
        { label: '950', value: '950' },
        { label: '1050', value: '1050' }
    ]);
    const [openSe_ruj_numero_comodos, setOpenSe_ruj_numero_comodos] = useState(false);
    const [valorSe_ruj_numero_comodos, setValorSe_ruj_numero_comodos] = useState(null);
    const [itemSe_ruj_numero_comodos, setItemSe_ruj_numero_comodos] = useState([
      { label: '147', value: '147' },
      { label: '258', value: '258' }
    ]);
    const [openSe_ruj_numero_pisos, setOpenSe_ruj_numero_pisos] = useState(false);
    const [valorSe_ruj_numero_pisos, setValorSe_ruj_numero_pisos] = useState(null);
    const [itemSe_ruj_numero_pisos, setItemSe_ruj_numero_pisos] = useState([
      { label: '123', value: '123' },
      { label: '456', value: '456' }
    ]);
    const [openSe_ruj_estado_conservacao, setOpenSe_ruj_estado_conservacao] = useState(false);
    const [valorSe_ruj_estado_conservacao, setValorSe_ruj_estado_conservacao] = useState(null);
    const [itemSe_ruj_estado_conservacao, setItemSe_ruj_estado_conservacao] = useState([
      { label: '123', value: '123' },
      { label: '456', value: '456' }
    ]);
    const [outros_Se_ruj_tipo_construcao, setOutros_Se_ruj_tipo_construcao] = useState('');
    const [telhaDeAmianto, setTelhaDeAmianto] = React.useState(false);
    const [madeiraAparelhado, setMadeiraAparelhado] = React.useState(false);
    const [aluminioOuZinco, setAluminioOuZinco] = React.useState(false);
    const [lageDeConcreto, setLageDeConcreto] = React.useState(false);
    const [telhaDeBarro, setTelhaDeBarro] = React.useState(false);
    const [aluminioGalvanizado, setAluminioGalvanizado] = React.useState(false);


    return (
        <>
            <View style={styles.form7}>
                <View style={styles.rect2}>
                    <Text style={styles.titulo} >INFRAESTRUTURA DO IMÓVEL</Text>
                </View>
                <View style={styles.municipio}>
                    <Text >Tipo de Construção</Text>
                </View>
                <DropDownPicker
                    style={styles.Mao_de_obra}
                    open={openSe_ruj_tipo_construcao}
                    value={valorSe_ruj_tipo_construcao}
                    items={itemSe_ruj_tipo_construcao}
                    setOpen={setOpenSe_ruj_tipo_construcao}
                    setValue={setValorSe_ruj_tipo_construcao}
                    setItems={setItemSe_ruj_tipo_construcao}
                    listMode="SCROLLVIEW"
                    placeholder="Selecione::"
                />
                <TextInput
                    style={styles.inputOutrosBeneficios}
                    onChangeText={setOutros_Se_ruj_tipo_construcao}
                    value={outros_Se_ruj_tipo_construcao}
                    placeholder={"    Outros"}
                />

                <View style={styles.municipio}>
                    <Text >Nº de Cômodos</Text>
                </View>
                <DropDownPicker
                    style={styles.Mao_de_obra}
                    open={openSe_ruj_numero_comodos}
                    value={valorSe_ruj_numero_comodos}
                    items={itemSe_ruj_numero_comodos}
                    setOpen={setOpenSe_ruj_numero_comodos}
                    setValue={setValorSe_ruj_numero_comodos}
                    setItems={setItemSe_ruj_numero_comodos}
                    listMode="SCROLLVIEW"
                    placeholder="Selecione::"
                />
                <View style={styles.municipio}>
                    <Text >Nº de Pisos</Text>
                </View>

                <DropDownPicker
                    style={styles.Mao_de_obra}
                    open={openSe_ruj_numero_pisos}
                    value={valorSe_ruj_numero_pisos}
                    items={itemSe_ruj_numero_pisos}
                    setOpen={setOpenSe_ruj_numero_pisos}
                    setValue={setValorSe_ruj_numero_pisos}
                    setItems={setItemSe_ruj_numero_pisos}
                    listMode="SCROLLVIEW"
                    placeholder="Selecione::"
                />

                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={telhaDeAmianto ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"1"}
                        onPress={() => {
                            setTelhaDeAmianto(!telhaDeAmianto);
                        }}
                    />
                    <Text style={styles.checkboxText}>Telha de amianto</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={madeiraAparelhado ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"2"}
                        onPress={() => {
                            setMadeiraAparelhado(!madeiraAparelhado);
                        }}
                    />
                    <Text style={styles.checkboxText}>Madeira aparelhado</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={aluminioOuZinco ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"3"}
                        onPress={() => {
                            setAluminioOuZinco(!aluminioOuZinco);
                        }}
                    />
                    <Text style={styles.checkboxText}>Alumínio ou zinco</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={lageDeConcreto ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"4"}
                        onPress={() => {
                            setLageDeConcreto(!lageDeConcreto);
                        }}
                    />
                    <Text style={styles.checkboxText}>Laje de concreto</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={telhaDeBarro ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"5"}
                        onPress={() => {
                            setTelhaDeBarro(!telhaDeBarro);
                        }}
                    />
                    <Text style={styles.checkboxText}>Telha de barro</Text>
                </View>

                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={aluminioGalvanizado ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"5"}
                        onPress={() => {
                            setAluminioGalvanizado(!aluminioGalvanizado);
                        }}
                    />
                    <Text style={styles.checkboxText}>Alumínio Galvanizado</Text>
                </View>

                <View style={styles.municipio}>
                    <Text >Estado de Conservação do Imóvel</Text>
                </View>
                <View>
                    <DropDownPicker
                        style={styles.Mao_de_obra}
                        open={openSe_ruj_estado_conservacao}
                        value={valorSe_ruj_estado_conservacao}
                        items={itemSe_ruj_estado_conservacao}
                        setOpen={setOpenSe_ruj_estado_conservacao}
                        setValue={setValorSe_ruj_estado_conservacao}
                        setItems={setItemSe_ruj_estado_conservacao}
                        listMode="SCROLLVIEW"
                        placeholder="Selecione::"
                    />
                </View>
            </View>

        </>


    )
};

const styles = StyleSheet.create({
    checkboxText: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignSelf: 'stretch',
        position: 'absolute',
        marginTop: 9,
        marginLeft: 40,
      },
    checkboxlabel: {
        marginTop: 5,
        height: 25,
        width: '85%',
        marginLeft: 30,

      },
    form7: {
        width: 340,
        height: 650,
        marginLeft: 25,
        borderWidth: 1,
        borderColor: "rgba(74,144,226,1)",
        borderRadius: 3
    },
    municipio: {
        color: "#121212",
        marginLeft: 30,
        marginTop: 15,
    },
    Mao_de_obra: {
        marginTop: 5,
        height: 40,
        width: '85%',
        marginLeft: 30,
        borderRadius: 0,
        borderWidth: 1,

    },
    input2: {
        height: 40,
        width: '85%',
        marginTop: 2,
        borderWidth: 1,
        backgroundColor: 'white'
    },

    rect2: {
        width: 340,
        height: 36,
        backgroundColor: "rgba(74,144,226,1)",
        borderRadius: 3,
    },

    titulo: {
        color: "white",
        marginLeft: 9,
        marginTop: 1
    },
    dropAtividades: {
        zIndex: 9999,
    },

    inputOutrosBeneficios: {
        height: 40,
        width: '85%',
        marginTop: 5,
        marginLeft: 30,
        borderWidth: 1,
        backgroundColor: 'white'
    },
});

export default Step4;