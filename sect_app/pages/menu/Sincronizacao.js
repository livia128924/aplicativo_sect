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
import api from '../../services/api';

///////////////////////
const Drawer = createDrawerNavigator();
//////////////////////////

const Sincronizacao = ({ navigation }) => {

    const [flatListItems, setFlatListLogs] = useState([]);
    const [enviados, setEnviados] = useState('');
    const [valor, setValor] = useState('');

    useEffect(() => {
        loadDados();
    }, []);

    function onPress(codigo) {
        //alert(codigo);
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM log where situacao = '2' and cod_processo= '${codigo}' `, [], (tx, results) => {
                    //var len = results.rows.length, i;
                    var temp = [];
                    console.log(results.rows.length);
                    for (let i = 0; i < results.rows.length; ++i) {

                        var processo = (results.rows.item(i).cod_processo);
                        var valor = (results.rows.item(i).valor);
                        var tabela = (results.rows.item(i).tabela);
                        var campo = (results.rows.item(i).campo);
                        //console.log(results.rows);
                        api.post('update/index.php', { processo, valor, tabela, campo })
                        .then(function (response) {
                            //const { processo, dados } = response.data;
                            //const codigo = response.data.dados.painel_usuario_logado;
                        })
                        .catch(function (error) {
                            alert(error);
                        });
                        //setEnviados(temp);

                    }
                    loadDados();
                }
                );
                tx.executeSql(`UPDATE log set situacao = '2' where cod_processo = '${codigo}' `, []);
                console.log(`UPDATE log set situacao = '2' where cod_processo = '${codigo}' `);
        }, (err) => {
            //console.error("There was a problem with the onPress", err);
            return true;
        }, (success) => {
            //console.log("onPress ", success);
        });

    };


    function onPressProcesso(pr_codigo, cod_prss) {
        alert(pr_codigo);
        AsyncStorage.setItem('pr_codigo', pr_codigo.toString());
        AsyncStorage.setItem('cod_prss', cod_prss);
        navigation.navigate('Stepper');

    }

    async function loadDados() {
        db.transaction((tx) => {
            //tx.executeSql("DROP TABLE log", []);
            tx.executeSql(
                "SELECT *, COUNT(l.codigo) AS count, p.codigo AS pr_codigo, (SELECT COUNT(*) FROM log l2 WHERE l2.cod_processo = l.cod_processo AND l2.situacao = '2') as enviado FROM log l LEFT JOIN rq r LEFT JOIN pr p where r.codigo = p.pr_requerente and pr_codigo = l.cod_processo group by p.pr_numero_processo", [], (tx, results) => {
                    //var len = results.rows.length, i;
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                    temp.push(results.rows.item(i));
                    //console.log(temp);
                    setFlatListLogs(temp);
                   //console.log(temp)
                }
            );
        }, (err) => {
            //console.error("There was a problem with the tx log", err);
            return true;
        }, (success) => {
            //console.log("log select", success);
        });
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
                    <Text>    N Processo          Registros     enviadas</Text>
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
                        style={styles.button2}
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
                        style={styles.button3}
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
                        style={styles.button4}
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
        padding: 10,
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
        width: 70,
        alignItems: 'center',
        top: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        left: 20,
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