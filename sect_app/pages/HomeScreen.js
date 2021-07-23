import React from 'react';
import { View, SafeAreaView, AsyncStorage, Button, StyleSheet, Text, FlatList } from 'react-native';
import Mybutton from './components/Mybutton';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import MybuttonMaterial from './components/MyButtonMaterial';


const Drawer = createDrawerNavigator();

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'item1',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'item2',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'item3',
    },
];


const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Button
            title='Câmera'
            icon='camera'
        />

    </View>
);

const HomeScreen = ({ navigation }) => {

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );


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
                    onPress={Logout}
                />
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
            <View>

                <View style={styles.container}>
                    <Mybutton
                        title='Câmera'
                        customClick={() => navigation.navigate('Câmera')}
                        icon='camera'
                    />

                    <Mybutton
                        title='Leitor'
                        customClick={() => navigation.navigate('Leitor')}
                        icon='barcode'
                    />

                    {/* <Mybutton
                        title='Listar'
                        customClick={() => navigation.navigate('Visualizar')}
                        icon='list'
                    /> */}

                    <MybuttonMaterial
                        title='Stepper'
                        customClick={() => navigation.navigate('Stepper')}
                        icon='format-list-checks'
                    />
                    <Mybutton
                        title='Config'
                        customClick={() => navigation.navigate('Config')}
                        icon='gears'
                    />
                </View >

                <View style={styles.listView}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>

            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',

    },
    listView: {

        width: '100%',
        height: 300,
        top: 300,
        textAlign: 'center',
        backgroundColor: 'white',
        //alignContent: 'center',
        justifyContent: 'center'
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 18,
    },
});

export default HomeScreen;