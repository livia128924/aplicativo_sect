import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

IconFontAwesome.loadFont();



const Mybutton = (props) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={props.customClick}>

            <IconFontAwesome
                name={props.icon}
                size={40}
                color='#042'
                style={styles.btnIcon} />
            <Text style={styles.text}>
                {props.title}
            </Text>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    btnIcon: {
        height:'auto',
        width: 'auto',
        alignItems: 'center',
        textAlign:'center'
    },
    button: {
        height: 170,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        //padding: 5,
        margin: 10,
        width: 160,
        borderRadius: 5,
    },
    text: {
        marginTop:5,
        color: 'black',
        fontWeight: 'bold'
    }
});

export default Mybutton;