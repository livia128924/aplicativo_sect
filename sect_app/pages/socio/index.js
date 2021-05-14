import React from 'react';
import {View, SafeAreaView,} from 'react-native';
import Mybutton from '../components/Mybutton';
import Icon from 'react-native-vector-icons/FontAwesome';

const Socio = ({navigation}) => {
    return(
        <SafeAreaView style={{flex:1}}>
        <View style={{flex:1, backgroundColor: 'white'}}>
        <Mybutton 
                        title = 'Formulario'
                        customClick={() => navigation.navigate('Formulario')}
                        icon={

                            <Icon
                              name="fa fa-camera"
                              size={15}
                              color="white"
                            />
                          }
                    />
        <Mybutton 
                        title = 'Formulario2 '
                        customClick={() => navigation.navigate('Formulario2')}
                        icon={

                            <Icon
                              name="fa fa-camera"
                              size={15}
                              color="white"
                            />
                          }
                    />
        </View>
        </SafeAreaView>
    )
}
export default Socio;