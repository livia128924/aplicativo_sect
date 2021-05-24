import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Pressable, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';

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



async function requerente (dados) {

  const [nome,setNome] = useState();

  api.post('socio/requerente.php', {dados})
   .then(function (response) {

    const {nome}=response.data;
    console.log(response.data);
    setNome(response.data);
   })
   .catch(function (error) {
    alert('Erro ao enviar'); // imprimir o conteudo - console.log(JSON.stringify(error))
   });
}

  
  const [localizacao, setLocalizacao] = useState('');
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
      <View style={{ flex: 1, marginTop: 15 }}>
        <View style={styles.rect}  {...requerente}>
            <Text style={styles.nome}>Nome:</Text>
            <Text style={styles.cnpj}>CNPJ:</Text>
            <Text style={styles.processo}>Processo:</Text>
        </View>
        <ProgressSteps>
          <ProgressStep
            label="Area"
            onNext={onformularioStepComplete}
            onPrevious={onPrevStep}
            scrollable={true}

          >
            <View style={styles.form}>
            <View style={styles.rect2}>
              <Text style={styles.titulo} >ÁREA DE ABRANGÊNCIA</Text>
            <View>
            <Text style={styles.municipio}>MUNICIPIOS</Text>
            </View>
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
            </View>
             <View>
            <Text style={styles.acessoText}>ACESSO</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
            <DropDownPicker
            style={styles.acesso} 
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
              placeholder="Acesso"
            />
            </View>
            <View>
            <Text style={styles.localizacao}>LOCALIZAÇÃO</Text>
            </View>
            <View style={{ alignItems: 'center' }}> 
            <TextInput 
            style={styles.input2}
            onChangeText={setLocalizacao}
            value={localizacao}
            placeholder={"    Localização"}
            />
            <Text>formulario step content</Text>
            </View>
          </View>
          </View>

          <View style={styles.form_step1}>
            <View style={styles.rect2}>
              <Text style={styles.titulo} >SETOR DE ABRANGÊNCIA</Text>
              <View>
            <Text style={styles.municipio}>Setor de Abrangência</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
            <DropDownPicker
            style={styles.select} 
            open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Selecione"
            />
            </View>
            </View>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Documentação"
            onNext={onNextStep}
            onPrevious={onPrevStep}
            scrollable={true}
            >
            <View style={styles.form2}>
            <View style={styles.rect2}>
            <Text style={styles.titulo} >DOCUMENTAÇÃO COLHIDA EM CAMPO</Text>
              </View>
            <View style={styles.inputGroup}>
          
              <Text style={styles.campo}>Cadastro Nacional de Pessoa Jurídica - CNPJ</Text>
              
            <TouchableOpacity style={styles.button}>
            <Icon
            name="camera"
            size={15}
            color="white"
            style={styles.icon}
            />
            </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
            <Text style={styles.campo}>Cópia de Identidade do Representante Legal</Text>
            <TouchableOpacity style={styles.button}>
            <Icon
            name="camera"
            size={15}
            color="white"
            style={styles.icon}
            />
            </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
            <Text style={styles.campo}>Cópia do CPF do Representante Legal</Text>
            <TouchableOpacity style={styles.button}>
            <Icon
            name="camera"
            size={15}
            color="white"
            style={styles.icon}
            />
            </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
            <Text style={styles.campo}>Contrato ou Estatuto Social</Text>
            <TouchableOpacity style={styles.button}>
            <Icon
            name="camera"
            size={15}
            color="white"
            style={styles.icon}
            />
            </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
            <Text style={styles.campo}>Termo de Posse (em se tratando de Associação)</Text>
            <TouchableOpacity style={styles.button}>
            <Icon
            name="camera"
            size={15}
            color="white"
            style={styles.icon}
            />
            </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
            <Text style={styles.campo}>Ata de Eleição, devidamente assinada pelos associados</Text>
            <TouchableOpacity style={styles.button}>
            <Icon
            name="camera"
            size={15}
            color="white"
            style={styles.icon}
            />
            </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
            <Text style={styles.campo}>Comprovante de Residência da Área (Água, Luz ou IPTU)</Text>
            <TouchableOpacity style={styles.button}>
            <Icon
            name="camera"
            size={15}
            color="white"
            style={styles.icon}
            />
            </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
            <Text style={styles.campo}>Balanço Patrimonial e Livro Caixa</Text>
            <TouchableOpacity style={styles.button}>
            <Icon
            name="camera"
            size={15}
            color="white"
            style={styles.icon}
            />
            </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
            <Text style={styles.campo}>Cópia da Dec. do Inp. de Renda (último exercício entregue a Receita Federal)</Text>
            <TouchableOpacity style={styles.button}>
            <Icon
            name="camera"
            size={15}
            color="white"
            style={styles.icon}
            />
            </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
            <Text style={styles.campo}>Comprovante de Posse (Recibo de compra e venda com e/ou sem registro)</Text>
            <TouchableOpacity style={styles.button}>
            <Icon
            name="camera"
            size={15}
            color="white"
            style={styles.icon}
            />
            </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
            <Text style={styles.campo}>Instrumento Público de Representação (validade de 1 (um) ano...)</Text>
            <TouchableOpacity style={styles.button}>
            <Icon
            name="camera"
            size={15}
            color="white"
            style={styles.icon}
            />
            </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
            <Text style={styles.campo}>Declaração, devidamente, assinada de que não é, bem como seus sócios, proprietário de outro imóvel rural ou urbano</Text>
            <TouchableOpacity style={styles.button}>
            <Icon
            name="camera"
            size={15}
            color="white"
            style={styles.icon}
            />
            </TouchableOpacity>
            </View>

            </View>
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
  campo:{
  marginLeft:5,
  top:3,
  width:'80%',

  },
  icon:{
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch',
  marginLeft:17,
  marginTop: 7
  },
  button: {
    position:'absolute',
    top:4,
    right:4,
    width:'15%',
    height: 30,
    borderRadius: 4,
    backgroundColor: "rgba(74,144,226,1)",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  foto:{
    height: 10,
    width:'20%',
    marginLeft:10,
  },
  inputGroup:{
    position:'relative',
    height: 40,
    width:'95%',
    marginLeft:10,
    marginTop:10,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor:"white"
  },
  form: {
    width: 340,
    height:370,
    marginLeft:25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  form2: {
    width: 340,
    height: 670,
    marginLeft:25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  form_step1: {
    marginTop:15,
    width: 340,
    height: 150,
    marginLeft:25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  select:{
    height: 40,
    width:'85%',
    marginLeft:30,
    
    height: 40,
    borderRadius:0,
    borderWidth: 1,
  },
  acesso:{
    height: 40,
    width:'85%',
    marginLeft:30,
    height: 40,
    marginTop:5,
    borderRadius:0,
    borderWidth: 1,
  },
  input: {
    height: 40,
    width:'85%',
    marginTop:10,
    borderWidth: 1,
  },
  input2: {
    height: 40,
    width:'85%',
    marginTop:2,
    borderWidth: 1,
    backgroundColor:'white'
  },
  container: {
    backgroundColor: "white",
  },
  rect: {
    width: 340,
    height: 120,
    marginLeft:20,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  rect2: {
    width: 340,
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
  municipio: {
    color: "#121212",
    marginLeft:30,
    marginTop:25,
    marginBottom:9
  },
  acessoText: {
    color: "#121212",
    marginTop:20,
    marginLeft:30,
    marginBottom:9
  },
  localizacao: {
    color: "#121212",
    marginLeft:30,
    marginTop:20,
    marginBottom:9
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
  },
  titulo: {
    color: "white",
    marginLeft: 9,
    marginTop:5
  },
});