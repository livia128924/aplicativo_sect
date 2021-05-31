import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button } from 'react-native-paper';


const Relatorio = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);


  return (
    <View style={{ flex: 1, marginTop: 15 }}>
      <View style={styles.form}>
        <View style={styles.rect2}>
          <Text style={styles.title}>RELATÓRIO FOTOGRÁFICO</Text>
        </View>
        <View style={styles.text}>
          <Text >Nova Imagem</Text>
        </View>
        <View style={{paddingTop:5, paddingLeft:60}}>
        <Button 
        icon="camera" 
        mode="outlined" 
        color="black"
        onPress={() => console.log('Pressed')}
        style={{width:'60%', borderRadius: 3}}
        >
          Incluir Imagem
        </Button>
          </View>

      </View>

    </View>
  )

};





const styles = StyleSheet.create({
  form: {
    width: 340,
    height: 370,
    marginLeft: 25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  rect2: {
    width: 340,
    height: 36,
    backgroundColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  text: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 15,
  },
  title: {
    color: "white",
    marginLeft: 10,
    marginTop: 5,
  },
});

export default Relatorio;