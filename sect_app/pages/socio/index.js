import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import api from '../../services/api';

function ExampleOne ()  {
  //const { control, handleSubmit, formState: { errors } } = useForm();
  //const onSubmit = data => console.log(data);

  
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

useEffect (()=>{
  
      api.post('socio/municipios.php', {})
      .then(function (response) {
         
          const {label}= response.data;
          console.log(response.data);
          setItems(response.data);
      })
},[]);

  
  const [text, onChangeText] = useState('');
  const [number,onChangeNumber] = useState('');


  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center'
    }
  };

  const onNextStep = () => {
    console.log('called next step');
  };

  const onformularioStepComplete = () => {
    alert('formulario step completed!');
  };

  const onPrevStep = () => {
    console.log('called previous step');
  };

  const onSubmitSteps = () => {
    console.log('called on submit step.');
  };

  
    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        <View style={styles.rect}>
            <Text style={styles.nome}>Nome:</Text>
            <Text style={styles.cnpj}>CNPJ:</Text>
            <Text style={styles.processo}>Processo:</Text>
        </View>
        <ProgressSteps>
          <ProgressStep
            label="formulario"
            onNext={onformularioStepComplete}
            onPrevious={onPrevStep}
            scrollViewProps={defaultScrollViewProps}
          >
            <View style={{ alignItems: 'center' }}>
            <DropDownPicker
            style={styles.select} 
            open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Municipios"
            />
            <TextInput 
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
          <TextInput 
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
            <Text>formulario step content</Text>
            </View>
          </ProgressStep>
          <ProgressStep
            label="formulario2"
            onNext={onNextStep}
            onPrevious={onPrevStep}
            scrollViewProps={defaultScrollViewProps}
          >
            <View style={{ alignItems: 'center' }}>
              <Text>formulario2 step content</Text>
            </View>
          </ProgressStep>
          <ProgressStep
            label="formulario3"
            onNext={onNextStep}
            onPrevious={onPrevStep}
            scrollViewProps={defaultScrollViewProps}
          >
            <View style={{ alignItems: 'center' }}>
              <Text>formulario3 step content</Text>
            </View>
          </ProgressStep>
          <ProgressStep
            label="formulario4"
            onPrevious={onPrevStep}
            onSubmit={onSubmitSteps}
            scrollViewProps={defaultScrollViewProps}
          >
            <View style={{ alignItems: 'center' }}>
              <Text>formulario4 step content</Text>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    );
  
    }

export default ExampleOne;

const styles = StyleSheet.create({

  select:{
    height: 40,
    width:'85%',
    marginLeft:30,
    height: 40,
    borderRadius:0,
    borderWidth: 1,
  },
  input: {
    height: 40,
    width:'85%',
    marginTop:10,
    borderWidth: 1,
  },
    text: {
    color: 'black',
    fontWeight: 'bold'
},
  container: {
    backgroundColor: "white",
  },
  rect: {
    width: 324,
    height: 120,
    marginLeft:30,
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
    marginTop: 15,
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