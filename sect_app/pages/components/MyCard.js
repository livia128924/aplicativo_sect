import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

function MyCard(props) {
  return (
    <View style={[styles.container, props.style]} >
     
      <View style={styles.rect}>
        <View style={styles.rect2}>
          <Text style={styles.loremIpsum}>IDENTIFICAÇÃO DO OCUPANTE</Text>
        </View>
       
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontWeight: 'bold'
},
  container: {
    backgroundColor: "white",
  },
  rect: {
    width: 324,
    height: 141,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  rect2: {
    width: 324,
    height: 36,
    backgroundColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  loremIpsum: {

    color: "rgba(255,255,255,1)",
    marginTop: 11,
    marginLeft: 13
  },
  cnpj: {

    color: "#121212",
    marginTop: 17,
    marginLeft: 9
  },
  nome: {

    color: "#121212",
    marginTop: 10,
    marginLeft: 9
  },
  processo: {
    color: "#121212",
    marginTop: 10,
    marginLeft: 9
  }
});

export default MyCard;
