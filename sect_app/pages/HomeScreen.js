import React from 'react';
import {View, SafeAreaView,} from 'react-native';
import Mybutton from './components/Mybutton';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

const HomeScreen = ({navigation}) => {

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1, backgroundColor: 'white'}}>
                <View>
                    <Mybutton 
                        title = 'Câmera'
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
                        title = 'Leitor'
                        customClick={()=>navigation.navigate('Leitor')}
                    />

                    <Mybutton
                        title = 'Listar'
                        customClick={()=>navigation.navigate('Visualizar')}
                    />

                     <Mybutton
                        title = 'Stepper'
                        customClick={()=>navigation.navigate('Stepper')}
                    />
                    
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;