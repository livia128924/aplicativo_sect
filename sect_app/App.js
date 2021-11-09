import React, {useEffect} from 'react';
import {AsyncStorage, StyleSheet} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import Menu from './pages/menu/Menu';
import Sincronizacao from './pages/menu/Sincronizacao';
import camera from './pages/camera';
import relatorio_camera from './pages/socio/relatorio_camera';
import leitor from './pages/leitor';
import ViewAllUser from './pages/listar';
import Login from "./pages/login";
import Index from './pages/socio/pj_progressStep';
import IndexPF from './pages/socio/pf_progressSep';
import IndexPF_D from './pages/socio/pf_D_progressStep';
import Relatorio from "./pages/socio/Relatorio";
import Config from './pages/menu/config';
import Index_rrj from './pages/socio/progressSteps_rrj';
import Index_rrf from './pages/socio/progressSteps_rrf';
import Patrimonio from './pages/patrimonio/index';
import Patrimonio_camera from './pages/patrimonio/cadastro';
import PatrimonioConsultar from './pages/patrimonio/consultar';
import PatrimonioVisualizar from './pages/patrimonio/visualizar';

const Stack = createStackNavigator();

const App = () => {

        useEffect(() => {
            AsyncStorage.getItem('codigo').then(codigo => {
                // console.log(codigo);
            });
        }, []);

        return (

            <NavigationContainer>

                <Stack.Navigator initialRouteName={'Patrimonio'}>
                    <Stack.Screen
                        name='Patrimonio'
                        component={Patrimonio}
                        options={{
                            title: 'Módulo de Patrimônio',
                            headerStyle: {
                                backgroundColor: '#FFF',
                            },

                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />

                    <Stack.Screen
                        name='Patrimonio - cadastrar'
                        component={Patrimonio_camera}
                        options={{
                            title: 'Cadastrar patrimônio',
                            headerStyle: {
                                backgroundColor: '#FFF',
                            },

                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />

                    <Stack.Screen
                        name='Patrimonio - consultar'
                        component={PatrimonioConsultar}
                        options={{
                            title: 'Consultar patrimônio',
                            headerStyle: {
                                backgroundColor: '#FFF',
                            },

                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />

                    <Stack.Screen
                        name='Patrimonio - visualizar'
                        component={PatrimonioVisualizar}
                        options={{
                            title: 'Visualizar patrimônio',
                            headerStyle: {
                                backgroundColor: '#FFF',
                            },

                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />

                    <Stack.Screen
                        name='Menu'
                        component={Menu}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name='Sincronizacao'
                        component={Sincronizacao}
                        options={{
                            title: 'Sincronizacao',
                            headerStyle: {
                                backgroundColor: '#FFF',
                            },

                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            }
                        }}
                    />
                    <Stack.Screen
                        name='HomeScreen'
                        component={HomeScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name='Login'
                        component={Login}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name='Stepper_PJ'
                        component={Index}
                        options={{
                            title: 'SOCIOECONÔMICO (FUNDIÁRIA) URBANO - PJ',
                            headerStyle: {
                                backgroundColor: '#FFF',
                            },
                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                fontSize: 13
                            },
                        }}
                    />
                    <Stack.Screen
                        name='Stepper_PF'
                        component={IndexPF}
                        options={{
                            title: 'SOCIOECONÔMICO (FUNDIÁRIA) URBANO - PF',
                            headerStyle: {
                                backgroundColor: '#FFF',
                            },
                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                fontSize: 13
                            },
                        }}
                    />
                    <Stack.Screen
                        name='Stepper_PF_D'
                        component={IndexPF_D}
                        options={{
                            title: 'SOCIOECONÔMICO DESAPROPRIACAO URBANO - PF',
                            headerStyle: {
                                backgroundColor: '#FFF',
                            },
                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                fontSize: 13
                            },
                        }}
                    />
                    <Stack.Screen
                        name='Stepper_rrj'
                        component={Index_rrj}
                        options={{
                            title: 'SOCIOECONÔMICO (FUNDIÁRIA) RURAL - PJ',
                            headerStyle: {
                                backgroundColor: '#FFF',
                            },
                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                fontSize: 13
                            },
                        }}
                    />
                    <Stack.Screen
                        name='Stepper_rrf'
                        component={Index_rrf}
                        options={{
                            title: 'SOCIOECONÔMICO (FUNDIÁRIA) RURAL - Pf',
                            headerStyle: {
                                backgroundColor: '#FFF',
                            },
                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                fontSize: 13
                            },
                        }}
                    />
                    <Stack.Screen
                        name='Config'
                        component={Config}
                        options={{
                            title: 'Config',
                            headerStyle: {
                                backgroundColor: '#FFF',
                            },
                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <Stack.Screen
                        name='Relatorio'
                        component={Relatorio}
                        options={{
                            title: 'Relatorio',
                            headerStyle: {
                                backgroundColor: '#FFF',
                            },
                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <Stack.Screen
                        name='Câmera'
                        component={camera}
                        options={{
                            title: 'Câmera',
                            headerStyle: {
                                backgroundColor: '#FFF',
                            },

                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <Stack.Screen
                        name='Relatorio_camera'
                        component={relatorio_camera}
                        options={{
                            title: 'Relatorio_camera',
                            headerStyle: {
                                backgroundColor: '#FFF',
                            },

                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />

                    <Stack.Screen
                        name='Leitor'
                        component={leitor}
                        options={{
                            title: 'Leitor QR Code',
                            headerStyle: {
                                backgroundColor: '#FFF',
                            },

                            headerTintColor: '#black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />

                    <Stack.Screen
                        name='Visualizar'
                        component={ViewAllUser}
                        options={{
                            title: 'Visualizar',
                            headerStyle: {
                                backgroundColor: '#FFF',
                            },

                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
;


export default App;