import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, AsyncStorage, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Mybutton from './components/Mybutton';
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

const HomeScreen = ({ navigation }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [flatListItems, setFlatListItems] = useState([]);
    const [search, setSearch] = useState('');
    const [sync, setSync] = useState('');

    const [count, setCount] = useState(0);


    function onPress (cod_prss, rq_nome, pr_codigo ) {
    //console.log(cod_prss);
   //navigation.navigate('Stepper');

AsyncStorage.setItem('pr_codigo', pr_codigo.toString());

AsyncStorage.setItem('cod_prss', cod_prss);
   AsyncStorage.setItem('rq_nome', rq_nome);
   navigation.navigate('Stepper');

}

    useEffect(() => {

        db.transaction((tx) => {
            tx.executeSql(
                "SELECT *, p.codigo AS pr_codigo FROM pr p LEFT JOIN rq r ON r.codigo = p.pr_requerente", [], (tx, results) => {
                    //var len = results.rows.length, i;
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    //console.log( results.rows.item(i));
                    setFlatListItems(temp);

                }
            );
        }, (err) => {
            console.error("There was a problem with the tx log", err);
            return true;
        }, (success) => {
            console.log("log select", success);
        });
    }, []);

    const listItemView = (item) => {
        return (
            <View style={styles.item}
                key={item.codigo}
            >
                <TouchableOpacity  style={styles.item}  onPress={() => onPress(item.pr_numero_processo, item.rq_nome, item.pr_codigo)}>
                    <Text
                    style={styles.title}>
                        {item.pr_numero_processo}
                    </Text>
                    <Text style={styles.title}>
                        {item.rq_nome}

                    </Text>
                    <Button
                    title=''
                    type="clear"
                    icon={
                        <Icon
                        name="arrow-right"
                        size={15}
                        color="#4d94ff"
                        />
                    }
                />
                </TouchableOpacity>

            </View>
        );
    };

    // <Item
    //     item={item}

    //     backgroundColor={{ backgroundColor }}
    //     textColor={{ color }}
    // />

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
                <View style={styles.topBar}>

                    <BorderlessButton onPress={() => navigation.navigate('Menu')}>
                        <Icon
                            name={'arrow-left'}
                            size={25}
                            color='black'
                        //style={styles.btnIcon}
                        />
                    </BorderlessButton>
                </View>

                <SearchBar
                    placeholder="Pesquise aqui..."
                    onChangeText={setSearch}
                    value={search}
                    lightTheme={true}
                    round={true}
                    inputStyle={{ backgroundColor: 'white' }}
                    containerStyle={{ backgroundColor: 'white', top: 5, marginLeft: 40, marginRight: 40, borderRadius: 15 }}
                    //placeholderTextColor={'#g5g5g5'}
                    inputContainerStyle={{ backgroundColor: 'white' }}
                //containerStyle={{backgroundColor:'false', }}
                />

                <View style={styles.listView}>
                    <Text style={{ paddingLeft: 10 }}>Processos</Text>
                    <FlatList
                        data={flatListItems}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => listItemView(item)}
                    />
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
                    onPress={() => navigation.navigate('Sincronizacao')}
                    >
                        <IconFont
                            name={'exchange'}
                            size={35}
                            color='white'
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

    topBar: {
        left: 3,
        top: 60,
        //backgroundColor:'false',
        width: 30,
        height: 35

    },
    button1: {
        height: 50,
        width: 70,
        alignItems: 'center',
        //justifyContent: 'center',
        top: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        left: 20,
        //padding: 10,
        //margin: 20,
        //borderRadius: 5,
    },
    button2: {
        height: 50,
        width: 70,
        alignItems: 'center',
        //justifyContent: 'center',
        top: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        left: 40,
        //padding: 10,
        //margin: 20,
        //borderRadius: 5,
    },
    button3: {
        height: 50,
        width: 70,
        alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor:'red',
        top: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        left: 80,
        //padding: 10,
        //margin: 20,
        //borderRadius: 5,
    },
    button4: {
        height: 50,
        width: 70,
        alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor:'red',
        top: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        left: 90,
        //padding: 10,
        //margin: 20,
        //borderRadius: 5,
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
        height: 400,
        top: 25,
        marginLeft: 25,
        marginRight: 25,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'

    },
    title: {
        fontSize: 18,
    },
});

export default HomeScreen;