import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {RectButton} from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';

export default function index({navigation}) {

    const handleCadastroCamera = () => {
        navigation.navigate("Patrimonio - cadastrar");
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <RectButton style={[styles.button]} onPress={handleCadastroCamera}>
                    <Icon name="qr-code-outline" size={30} color="#042"/>
                    <Text style={styles.buttonText}>Cadastrar patrimonio </Text>
                </RectButton>

                <RectButton style={[styles.button]}>
                    <Icon name="search-outline" size={30} color="#042"/>
                    <Text style={styles.buttonText}>Consultar patrimonio</Text>
                </RectButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between',
    },

    button: {
        height: 150,
        width: '48%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        justifyContent: 'center',
        alignItems: "center",
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 0.8,
    },

    buttonText: {
        marginTop: 10,
        fontSize: 16,
        color: '#444',
        fontWeight: "600"
    }

});