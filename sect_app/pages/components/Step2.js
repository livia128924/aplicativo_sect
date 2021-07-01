import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import api from '../../services/api';
import { DatabaseConnection } from '../database/database';
import { Formik, useFormik } from 'formik';
import Yup from 'yup';
const db = DatabaseConnection.getConnection();

const Step2 = (props) => {
    useEffect(() => {
        // db.transaction((tx) => {
        //     tx.executeSql(
        //       "select * from aux_inicio_atividades",[],  (tx, results) =>{
        //        //var len = results.rows.length, i;
        //        var temp = [];
        //        //console.log(len);
        //        for(let i = 0; i < results.rows.length; ++i){
        //         temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
        //        }
        //        setItem_aux_inicio_atividades(temp);
        //       }
        //     );
        //     tx.executeSql(
        //       "select * from aux_natureza_atividades",[],  (tx, results) =>{
        //        //var len = results.rows.length, i;
        //        var temp = [];
        //        //console.log(len);
        //        for(let i = 0; i < results.rows.length; ++i){
        //         temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
        //         //console.log( results.rows.item(i).nome);
        //        }
        //        setItem_aux_natureza_atividades(temp);
        //       }
        //     );

        //   },(err) => {
        //     console.error("There was a problem with the tx", err);
        //     return true;
        //   },(success ) => {
        //     console.log("all done",success );
        //   });

    }, []);
    const [outros, setOutros] = useState('');
    const [comercio, setComercio] = useState('');
    const [industria, setIndustria] = useState('');
    const [recursosNaturais, setRecursosNaturais] = useState('');
    const [t_I, setT_I] = useState('');
    const [openDescricao, setOpenDescricao] = useState(false);
    const [valorAtividade, setValorAtividade] = useState(null);
    const [itemDescricao, setItem_aux_inicio_atividades] = useState([
        { label: 'descricao', value: 'descricao' },
        { label: 'valor', value: 'valor' }
    ]);

    const [openNaturezaAtv, setOpenNaturezaAtv] = useState(false);
    const [valorNaturezaAtv, setValorNaturezaAtv] = useState(null);
    const [itemNaturezaAtv, setItem_aux_natureza_atividades] = useState([
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
                    setItems={setItem_aux_inicio_atividades}
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
                    setItems={setItem_aux_natureza_atividades}
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