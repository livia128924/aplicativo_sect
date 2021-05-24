import React from 'react';
import {View, SafeAreaView, AsyncStorage, Button} from 'react-native';
import Mybutton from './components/Mybutton';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';

Icon.loadFont();

const Drawer = createDrawerNavigator();

const HomeScreen = ({navigation}) => {

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
        <SafeAreaView style={{flex: 1}}>

            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props}/>}>
                <Drawer.Screen name="Principal" component={Inicio}/>
                <Drawer.Screen name="Processo" component={Inicio}/>
                <Drawer.Screen name="Socioecônomico" component={Inicio}/>
                <Drawer.Screen name="Configurações" component={Inicio}/>
            </Drawer.Navigator>

        </SafeAreaView>
    );

    function Inicio() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View>
                    <Mybutton
                        title='Câmera'
                        customClick={() => navigation.navigate('Câmera')}
                        icon={

                            <Icon
                                name="fa fa-camera"
                                size={15}
                                color="white"
                            />
                        }
                    />

                    <Mybutton
                        title='Leitor'
                        customClick={() => navigation.navigate('Leitor')}
                    />

                    <Mybutton
                        title='Listar'
                        customClick={() => navigation.navigate('Visualizar')}
                    />

                    <Mybutton
                        title='Stepper'
                        customClick={() => navigation.navigate('Stepper')}
                    />

                </View>
            </View>
        );
    }
};


export default HomeScreen;