import React, {useEffect, useState} from 'react';
import {AsyncStorage, Button, Text} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import camera from './pages/camera';
import leitor from './pages/leitor';
import ViewAllUser from './pages/listar';
import Login from "./pages/login";
import ExampleOne from './pages/socio/index'
import Formulario from "./pages/socio/Formulario";

const Stack = createStackNavigator();

const App = () => {

        useEffect(() => {
            AsyncStorage.getItem('codigo').then(codigo => {
                console.log(codigo);
            });
        }, []);

        return (

            <NavigationContainer>

                <Stack.Navigator initialRouteName={'Login'}>
                    <Stack.Screen
                        name='HomeScreen'
                        component={HomeScreen}
                        options={{
                            title: 'SGRF - SECT',
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
                        name='Login'
                        component={Login}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name='Stepper'
                        component={ExampleOne}
                        options={{
                            title: 'Stepper',
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
                        name='Formulario'
                        component={Formulario}
                        options={{
                            title: 'Formulario',
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