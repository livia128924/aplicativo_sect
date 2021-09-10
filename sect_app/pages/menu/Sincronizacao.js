import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, AsyncStorage, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
//import Mybutton from './components/Mybutton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import { BorderlessButton } from "react-native-gesture-handler";
const db = DatabaseConnection.getConnection();
import { DatabaseConnection } from '../database/database';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import api_metas from '../../services/api_metas';
import axios from 'axios';

///////////////////////
const Drawer = createDrawerNavigator();
//////////////////////////

const Sincronizacao = ({ navigation }) => {

    const [flatListItems, setFlatListLogs] = useState([]);



    useEffect(() => {
        loadDados();

    }, []);


    const api_meta = axios.create({
        baseURL: api_metas(),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
            "Content-Type": "application/json;charset=UTF-8"
        },
    });

   async function onPress(codigo) {
        //alert(codigo);
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM log where situacao = '1' and cod_processo= '${codigo}' `, [], (tx, results) => {
                    //var len = results.rows.length, i;
                    var temp = [];
                    //console.log(results.rows.length);
                    for (let i = 0; i < results.rows.length; ++i) {
                        //console.log(results.rows);
                        var processo = (results.rows.item(i).cod_processo);
                        var valor = (results.rows.item(i).valor);
                        var tabela = (results.rows.item(i).tabela);
                        var campo = (results.rows.item(i).campo);
                        var nome = (results.rows.item(i).nome);
                        //console.log(nome);
                          api_meta.post('/_apps/app_teste/update/index.php', { processo, valor, tabela, campo, nome })
                        .then(function (response) {
                            console.log(response.data);
                            const {status, msg} = response.data;
                            if (status === 'OK') {
                        db.transaction((tx) => {
                            console.log("success");
                           tx.executeSql(`UPDATE log set situacao = '2' where cod_processo = '${codigo}'`, []);
                           console.log(`UPDATE log set situacao = '2' where cod_processo = '${codigo}' `);
                                });
                            } else {
                                console.log("error", msg);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                        loadDados();
                    }
                }, (tx, error) => {
                    console.error("There was a problem with the onPress", error.message);
                    return true;
                }, (tx, success) => {
                    console.log("onPress ", success);
                });
        });

    };


 function loadDados() {
        //console.log("loadDados");
        db.transaction((tx) => {
            //tx.executeSql("DROP TABLE log", []);
            tx.executeSql(
                "SELECT *, COUNT(l.codigo) AS count, p.codigo AS pr_codigo, (SELECT COUNT(*) FROM log l2 WHERE l2.cod_processo = l.cod_processo AND l2.situacao = '2' ) as enviado FROM log l  LEFT JOIN pr p ON pr_codigo = l.cod_processo group by l.cod_processo", [],
                (tx, results) => {
                    //var len = results.rows.length, i;
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i){
                        temp.push(results.rows.item(i));
                    }
                        setFlatListLogs(temp);
                }, function (tx, error) {
                  alert("SELECT Log error: " + error.message);
                }
            );
        }, (err) => {
            //console.error("There was a problem with the tx log", err);
            return true;
        }, (success) => {
            //console.log("log select", success);
        });
    }

    function onPressProcesso(pr_codigo, cod_prss) {
        alert(pr_codigo);
        AsyncStorage.setItem('pr_codigo', pr_codigo.toString());
        AsyncStorage.setItem('cod_prss', cod_prss);
        navigation.navigate('Stepper');

    }


    function CustomDrawerContent(props) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />

            </DrawerContentScrollView>
        );
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="Principal" component={Inicio} />
                <Drawer.Screen name="Processo" component={Inicio} />
                <Drawer.Screen name="Socioecônomico" component={Inicio} />
                <Drawer.Screen name="Configurações" component={Inicio} />
            </Drawer.Navigator>

        </SafeAreaView>
    );

    function Inicio() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.listView}>
                    <Text> N Processo            Regs            Regs.env </Text>
                    <View style={styles.item}>
                        {[...flatListItems].map((item, index) => (
                            <View style={styles.map} key={item.pr_codigo}>
                                <TouchableOpacity onPress={() => onPressProcesso(item.pr_codigo, item.pr_numero_processo,)}
                                    style={styles.title}>
                                    <Text>
                                    {item.pr_numero_processo}
                                    </Text>
                                </TouchableOpacity>
                                <Text
                                    style={styles.title}>
                                    {item.count}
                                </Text>
                                <Text
                                    style={styles.title}>
                                    {item.enviado}
                                </Text>
                                <Button
                                    onPress={() => onPress(item.pr_codigo)}
                                    title=''
                                    //type="clear"
                                    icon={
                                        <Icon
                                            name="database-sync"
                                            size={15}
                                            color="white"
                                        />
                                    }
                                />
                            </View>
                        ))}


                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.button1}
                        onPress={() => navigation.navigate('Câmera')}
                    >
                        <Icon
                            name={'camera'}
                            size={35}
                            color='white'
                            style={styles.btnIcon}
                        />
                        <Text style={{ color: 'white', fontSize: 16 }}>Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button1}
                    //onPress={props.customClick}
                    >
                        <IconFont
                            name={'exchange'}
                            size={35}
                            color='#99ceff'
                            style={styles.btnIcon}
                        />
                        <Text style={{ color: 'white', fontSize: 16 }}>sincronização</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button1}
                        onPress={() => navigation.navigate('Stepper')}
                    >
                        <IconFont
                            name={'edit'}
                            size={35}
                            color='white'
                            style={styles.btnIcon}
                        />
                        <Text style={{ color: 'white', fontSize: 16 }}>produção</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button1}
                        onPress={() => navigation.navigate('Config')}
                    >
                        <IconFont
                            name={'wrench'}
                            size={35}
                            color='white'
                            style={styles.btnIcon}
                        />
                        <Text style={{ color: 'white', fontSize: 16 }}>config</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    topBar: {
        left: 3,
        top: 60,
        width: 30,
        height: 35

    },
    button1: {
        height: 50,
        // width: 70,
         alignItems: 'center',
         top: 3,
         margin:15,
         elevation: 5,
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.8,
         shadowRadius: 2,
    },
    button2: {
        height: 50,
        width: 70,
        alignItems: 'center',
        top: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        left: 40,
    },
    button3: {
        height: 50,
        width: 70,
        alignItems: 'center',
        top: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        left: 80,
    },
    button4: {
        height: 50,
        width: 70,
        alignItems: 'center',
        top: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        left: 90,

    },
    footer: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        height: 68,
        alignItems: 'center',
        display:'flex',
        justifyContent:'space-between',
        backgroundColor: '#4d94ff'
    },
    container: {
        flex: 1,
        padding: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',

    },
    listView: {
        //flex:1,
        //width: '100%',
        height: 210,
        top: 15,
        marginLeft: 25,
        marginRight: 25,
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        padding: 15,
        //justifyContent: 'space-between'

    },
    title: {
        fontSize: 18,
    },
});

export default Sincronizacao;