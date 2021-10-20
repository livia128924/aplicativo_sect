import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function index({navigation}) {

    const handleCadastroCamera = () => {
        navigation.navigate("Patrimonio - cadastrar");
    }

    const handleConsultarPatrimonio = () => {
        navigation.navigate("Patrimonio - consultar");
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button]} onPress={handleCadastroCamera}>
                    <Icon name="qr-code-outline" size={35} style={styles.buttonIcon}/>
                    <Text style={styles.buttonText}>Cadastrar patrimonio </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button]} onPress={handleConsultarPatrimonio}>
                    <Icon name="clipboard-outline" size={35} style={styles.buttonIcon}/>
                    <Text style={styles.buttonText}>Consultar patrimonio</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    buttonsContainer: {
        flexDirection: 'column',
        marginTop: 40,
        justifyContent: 'space-between',
        alignItems: "center",
    },


    button: {
        height: 170,
        width: '80%',
        backgroundColor: '#28a745',
        borderRadius: 8,
        padding: 10,
        justifyContent: 'center',
        alignItems: "center",
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 3,
        shadowOpacity: 0.6,
        marginBottom: 20,
    },

    buttonText: {
        marginTop: 10,
        fontSize: 19,
        color: '#FFFFFF',
        fontWeight: "600"
    },

    buttonIcon: {
        color: "#FFFFFF",
    }

});