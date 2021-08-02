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

///////////////////////
const Drawer = createDrawerNavigator();
//////////////////////////

const Sincronizacao = ({ navigation }) => {

    const [flatListItems, setFlatListLogs] = useState([]);
    const [enviados, setEnviados] = useState('');

    function onPress() {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM log LEFT JOIN rq r where r.pr_codigo = codTabela and situacao = '1'", [], (tx, results) => {
                    //var len = results.rows.length, i;
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    //setEnviados(temp);

                    tx.executeSql("UPDATE log set situacao = '2' LEFT JOIN rq r where r.pr_codigo = codTabela", []);
                }
            );
        }, (err) => {
            console.error("There was a problem with the onPress", err);
            return true;
        }, (success) => {
            console.log("onPress ", success);
        });

    };

    useEffect(() => {


        db.transaction((tx) => {
            tx.executeSql(
                "SELECT *, COUNT(l.codigo) AS count, p.codigo AS pr_codigo (SELECT COUNT(*) FROM log l2 WHERE l2.codTabela = l.codTabela AND l2.situacao = '2') as enviado FROM log l LEFT JOIN rq r LEFT JOIN pr p where r.codigo = p.pr_requerente and pr_codigo = l.codTabela group by p.pr_numero_processo", [], (tx, results) => {
                    //var len = results.rows.length, i;
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    //console.log(temp);
                    setFlatListLogs(temp);

                }
            );
        }, (err) => {
            console.error("There was a problem with the tx log", err);
            return true;
        }, (success) => {
            console.log("log select", success);
        });
    }, []);

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
                    <Text>    N Processo                 Registros     enviadas</Text>
                    <View style={styles.item}>
                        {[...flatListItems].map((item, index) => (
                            <View style={styles.map} key={item.pr_codigo}>
                                <Text
                                    style={styles.title}>
                                    {item.pr_numero_processo}
                                </Text>
                                <Text
                                    style={styles.title}>
                                     {item.count}
                                </Text>
                                <Button
                                    onPress={onPress}
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