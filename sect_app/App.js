import React, {useEffect, useState} from 'react';
import {AsyncStorage, Button, Text, Pressable, StyleSheet} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import camera from './pages/camera';
import relatorio_camera from './pages/socio/relatorio_camera';
import leitor from './pages/leitor';
import ViewAllUser from './pages/listar';
import Login from "./pages/login";
import ExampleOne from './pages/socio/index'
import Relatorio from "./pages/socio/Relatorio";
import Config from './pages/socio/config';
import { IconButton, Colors } from 'react-native-paper';
//import { mdiDotsVerticalCircle } from '@mdi/js';
import Icon from 'react-native-vector-icons/Ionicons';
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
                            // headerRight: () => (
                            //     <IconButton
                            //     style={styles.button}
                            //     icon="camera"
                            //     color={Colors.red500}
                            //     size={20}
                            //     onPress={() => console.log('Pressed')}
                            //   />
                            //   ),
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


const styles = StyleSheet.create({
    button: {
    left:350,

      elevation: 3,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });

export default App;