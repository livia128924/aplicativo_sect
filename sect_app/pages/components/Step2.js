import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, AsyncStorage } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import api from '../../services/api';
import { DatabaseConnection } from '../database/database';
import { Formik, useFormik } from 'formik';
import Yup from 'yup';
const db = DatabaseConnection.getConnection();

const Step2 = (props) => {
    const [sync, setSync] = useState('');
    const [dados_valor, setDados_valor] = useState('');
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



    useEffect(() => {

        var cod_processo = '';
        //carrega o valor do select na tela index.js
        AsyncStorage.getItem('pr_codigo').then(value => {
            //console.log(value);
            setSync(value);
            cod_processo = value;

        });

        AsyncStorage.getItem('codigo').then(codigo => {
            setDados_valor(codigo);
        })


        loadStep2();

        AsyncStorage.getItem('nome_tabela').then(tabela => {
            //console.log(cod_processo);
            if (tabela) {

                db.transaction((tx) => {

                    tx.executeSql(
                        "select * from " + tabela + " where se_ruj_cod_processo = '" + cod_processo + "'", [], (tx, results) => {

                            var row = [];
                            for (let i = 0; i < results.rows.length; ++i) {
                                console.log(results.rows.item(0).se_ruj_acesso);

                                setValorAtividade(results.rows.item(0).se_ruj_inicio_atividades);

                                setValorNaturezaAtv(results.rows.item(i).se_ruj_natureza_atividades);

                                setOutros(results.rows.item(i).se_ruj_natureza_atividades_outros);

                                setComercio(results.rows.item(i).se_ruj_ramo_atividade_comercio);

                                setIndustria(results.rows.item(i).se_ruj_ramo_atividade_industria);

                                setRecursosNaturais(results.rows.item(i).se_ruj_ramo_atividade_recursos_naturais);

                                setT_I(results.rows.item(i).se_ruj_ramo_atividade_tic);

                                //console.log(typeof (results.rows.item(i).se_ruj_municipio));
                                //valor(row);
                            }

                        });
                })
            }//
        });
    }, []);

    async function loadStep2() {

        await db.transaction((tx) => {
            tx.executeSql(
                "select * from aux_inicio_atividades", [], (tx, results) => {
                    //var len = results.rows.length, i;
                    var temp = [];
                    //console.log(len);
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
                    }
                    setItem_aux_inicio_atividades(temp);
                }
            );
            tx.executeSql(
                "select * from aux_natureza_atividades", [], (tx, results) => {
                    //var len = results.rows.length, i;
                    var temp = [];
                    //console.log(len);
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
                        //console.log( results.rows.item(i).nome);
                    }
                    setItem_aux_natureza_atividades(temp);
                }
            );

        }, (err) => {
            console.error("There was a problem with the tx", err);
            return true;
        }, (success) => {
            console.log("all done", success);
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
          tx.executeSql(log_update, [], (tx, results) => {

          });
        })

        AsyncStorage.setItem('nome_tabela', tabela);

        AsyncStorage.setItem('codigo', valor.toString());
    };
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
                    value={parseInt(valorAtividade)}
                    items={itemDescricao}
                    setOpen={setOpenDescricao}
                    setValue={setValorAtividade}
                    setItems={setItem_aux_inicio_atividades}
                    onChangeValue={() => onPressTitle("se_ruj", "se_ruj_inicio_atividades", valorAtividade, sync)}
                    listMode="SCROLLVIEW"

                    placeholder="Selecione::"
                />
                <View ></View>
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
                    value={parseInt(valorNaturezaAtv)}
                    items={itemNaturezaAtv}
                    setOpen={setOpenNaturezaAtv}
                    setValue={setValorNaturezaAtv}
                    setItems={setItem_aux_natureza_atividades}
                    onChangeValue={() => onPressTitle("se_ruj", "se_ruj_natureza_atividades", valorNaturezaAtv, sync)}
                    listMode="SCROLLVIEW"
                    placeholder="Selecione::"
                />
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        style={styles.inputOutros}
                        onChangeText={setOutros}
                        value={outros}
                        onBlur={() => onPressTitle("se_ruj", "se_ruj_natureza_atividades_outros", outros, sync)}
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
                        onBlur={() => onPressTitle("se_ruj", "se_ruj_ramo_atividade_comercio", comercio, sync)}
                        placeholder={"  Comércio"}
                    />
                    <TextInput
                        style={styles.inputOutros}
                        onChangeText={setIndustria}
                        value={industria}
                        onBlur={() => onPressTitle("se_ruj", "se_ruj_ramo_atividade_industria", industria, sync)}
                        placeholder={"  Indústria"}
                    />
                    <TextInput
                        style={styles.inputOutros}
                        onChangeText={setRecursosNaturais}
                        value={recursosNaturais}
                        onBlur={() => onPressTitle("se_ruj", "se_ruj_ramo_atividade_recursos_naturais", recursosNaturais, sync)}
                        placeholder={"  Recursos Naturais"}
                    />
                    <TextInput
                        style={styles.inputOutros}
                        onChangeText={setT_I}
                        value={t_I}
                        onBlur={() => onPressTitle("se_ruj", "se_ruj_ramo_atividade_tic", t_I, sync)}
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
        zIndex:10,

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