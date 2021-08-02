import React from 'react';
import { View, SafeAreaView, AsyncStorage, StyleSheet, Text, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import Mybutton from '../components/Mybutton';


import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import MybuttonMaterial from '../components/MyButtonMaterial';


const Drawer = createDrawerNavigator();


const Menu = ({ navigation }) => {


    async function Logout() {
        await AsyncStorage.removeItem('codigo');
        await navigation.navigate('Login');
    }

    function CustomDrawerContent(props) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Sair"

                />
            </DrawerContentScrollView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="Principal" component={MenuInicio} />
                <Drawer.Screen name="Processo" component={MenuInicio} />
                <Drawer.Screen name="Socioecônomico" component={MenuInicio} />
                <Drawer.Screen name="Configurações" component={MenuInicio} />
            </Drawer.Navigator>

        </SafeAreaView>
    );

    function MenuInicio() {
        return (
            <View>

                <View style={styles.container}>
                    <Mybutton
                        title='Processos'
                        customClick={() => navigation.navigate('HomeScreen')}
                        icon='group'
                    />
                    <MybuttonMaterial
                        title=''
                        customClick={() => navigation.navigate('')}
                        icon='image-off'
                    />
                    <MybuttonMaterial
                        title=''
                        customClick={() => navigation.navigate('')}
                        icon='image-off'
                    />
                    <MybuttonMaterial
                        title=''
                        customClick={() => navigation.navigate('')}
                        icon='image-off'
                    />
                    <MybuttonMaterial
                        title=''
                        customClick={() => navigation.navigate('')}
                        icon='image-off'
                    />
                    <MybuttonMaterial
                        title=''
                        customClick={() => navigation.navigate('')}
                        icon='image-off'
                    />


                </View >

            </View>
        );
    }
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 45,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

    },
    listView: {
        //flex:1,
        //width: '100%',
        height: 400,
        top: 300,
        //textAlign: 'center',

        //alignContent: 'center',
        //justifyContent: 'center'
    },
    item: {
        flex:1,
        flexDirection: 'row',
        padding: 10,
        justifyContent:'space-between'

    },
    title: {
        fontSize: 18,
    },
});

export default Menu;