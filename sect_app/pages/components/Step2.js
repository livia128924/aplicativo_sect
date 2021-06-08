import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import api from '../../services/api';

const Step2 = (props) => {
    useEffect(() => {
        api.post('socio/natureza_atividade.php', {})
        .then(function (response) {

          const { label } = response.data;
          //console.log(response.data);
          setItemNaturezaAtv(response.data);
        });
        api.post('socio/atividades.php', {})
        .then(function (response) {

          const { label } = response.data;
          //console.log(response.data);
          setItemDescricao(response.data);
        });


    }, []);
    const [outros, setOutros] = useState('');
    const [comercio, setComercio] = useState('');
    const [industria, setIndustria] = useState('');
    const [recursosNaturais, setRecursosNaturais] = useState('');
    const [t_I, setT_I] = useState('');
    const [openDescricao, setOpenDescricao] = useState(false);
    const [valorAtividade, setValorAtividade] = useState(null);
    const [itemDescricao, setItemDescricao] = useState([
        { label: 'descricao', value: 'descricao' },
        { label: 'valor', value: 'valor' }
    ]);

    const [openNaturezaAtv, setOpenNaturezaAtv] = useState(false);
    const [valorNaturezaAtv, setValorNaturezaAtv] = useState(null);
    const [itemNaturezaAtv, setItemNaturezaAtv] = useState([
        { label: 'val', value: 'val' },
        { label: 'lab', value: 'lab' }
    ]);


    return (
        <>
            <View style={styles.form3}>
                <View style={styles.rect2}>
                    <Text style={styles.titulo} >INÍCIO DAS ATIVIDADES</Text>
                </View>
                <View style={styles.atividadeTitle}>
                    <Text >Inicio da Atividade</Text>
                </View>
                <DropDownPicker
                    style={styles.atividade}
                    open={openDescricao}
                    value={valorAtividade}
                    items={itemDescricao}
                    setOpen={setOpenDescricao}
                    setValue={setValorAtividade}
                    setItems={setItemDescricao}
                    listMode="SCROLLVIEW"

                    placeholder="Selecione::"
                />
            </View>

            <View style={styles.form4}>
                <View style={styles.rect2}>
                    <Text style={styles.titulo} >NATUREZA E RAMO DA ATIVIDADE ECONÔMICA</Text>
                </View>
                <View style={styles.municipio}>
                    <Text >Natureza da Atividade</Text>
                </View>
                <DropDownPicker
                    style={styles.NaturezaAtv}
                    open={openNaturezaAtv}
                    value={valorNaturezaAtv}
                    items={itemNaturezaAtv}
                    setOpen={setOpenNaturezaAtv}
                    setValue={setValorNaturezaAtv}
                    setItems={setItemNaturezaAtv}
                    listMode="SCROLLVIEW"
                    placeholder="Selecione::"
                />
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        style={styles.inputOutros}
                        onChangeText={setOutros}
                        value={outros}
                        placeholder={" Outros"}
                    />
                </View>
                <View>
                    <Text style={styles.NaturezaAtvTitle}>Ramo da Atividade</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        style={styles.inputOutros}
                        onChangeText={setComercio}
                        value={comercio}
                        placeholder={"  Comércio"}
                    />
                    <TextInput
                        style={styles.inputOutros}
                        onChangeText={setIndustria}
                        value={industria}
                        placeholder={"  Indústria"}
                    />
                    <TextInput
                        style={styles.inputOutros}
                        onChangeText={setRecursosNaturais}
                        value={recursosNaturais}
                        placeholder={"  Recursos Naturais"}
                    />
                    <TextInput
                        style={styles.inputOutros}
                        onChangeText={setT_I}
                        value={t_I}
                        placeholder={"   Tecnologia da Informação/Comunicação"}
                    />

                </View>
            </View>

        </>


    )
};

const styles = StyleSheet.create({
    NaturezaAtvTitle: {
        color: "#121212",
        marginLeft: 30,
        marginTop: 10,
      },
    inputOutros: {
        height: 40,
        width: '85%',
        marginTop: 10,
        marginLeft: 10,
        borderWidth: 1,
        backgroundColor: 'white'
    },
    form4: {
        width: 340,
        height: 450,
        marginLeft: 25,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "rgba(74,144,226,1)",
        borderRadius: 3,

    },
    NaturezaAtv: {
        marginTop: 5,
        height: 40,
        width: '85%',
        marginLeft: 30,
        borderRadius: 0,
        borderWidth: 1,

    },
    form3: {
        width: 340,
        height: 150,
        marginLeft: 25,
        borderWidth: 1,
        borderColor: "rgba(74,144,226,1)",
        borderRadius: 3,
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
    select: {
        height: 40,
        width: '85%',
        marginLeft: 30,
        height: 40,
        borderRadius: 0,
        borderWidth: 1,
    },

    titulo: {
        color: "white",
        marginLeft: 9,
        marginTop: 1
    },
    atividadeTitle: {
        color: "#121212",
        marginLeft: 30,
        marginTop: 10,
    },
    atividade: {
        marginTop: 15,
        height: 40,
        width: '85%',
        marginLeft: 30,
        borderRadius: 0,
        borderWidth: 1
    },
});

export default Step2;