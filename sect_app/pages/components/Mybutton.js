import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Mybutton = (props) => {
    return (
        <TouchableOpacity
            style = {styles.button}
            onPress = {props.customClick}>
    
            <Text style = {styles.text}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#33a23d',
        color: '#FFF',
        padding: 10,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        borderRadius:5
        
    },

    text: {
        color: 'black',
        fontWeight: 'bold'
    }
});

export default Mybutton;