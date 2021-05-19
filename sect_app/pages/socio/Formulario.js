import React,  { useState, useEffect }from 'react';
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from 'react-native-dropdown-picker';

const Formulario = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  const [OpenAcesso, setOpenAcesso] = useState(false);
  const [AcessoValue, setAcessoValue] = useState(null);
  const [acesso, setAcesso] = useState([
    {label: 'Estrada', value: 'Estrada'},
    {label: 'Rio', value: 'Rio'}
  ]);
  
return(
  <View>

<View style={styles.rectTitle}>
    <View style={styles.containerTitle}>
    <View>
        <Text style={styles.tituloReact}>
        DADOS DO REQUERENTE
        </Text>
      </View>
  <View>
    <Text style={styles.cnpj}>
      Cnpj:
    </Text>
    <Text style={styles.nome}>
      Nome:
    </Text>
    <Text style={styles.processo}>
      Processo:
    </Text>
  </View>
</View>
</View>
    <View style={styles.rect2}>
    <View>
        <Text style={styles.titulo}>
        ÁREA DE ABRANGÊNCIA
        </Text>
      </View>
    <View style={styles.container}>
      <View>
        <Text style={styles.text} >
          Municipios
        </Text>
      </View>
  <Controller
    control={control}
    render={({ field: { onChange, onBlur, value } }) => (
      <DropDownPicker
     style={styles.select} 
     open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
    )}
    name="firstName"
    rules={{ required: true }}
    defaultValue=""
  />
  {errors.firstName && <Text>This is required.</Text>}

   <View>
    <Text style={styles.local}>
   Localização
    </Text>
  </View>   
  <Controller
    control={control}
    render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        style={styles.input}
        onBlur={onBlur}
        onChangeText={value => onChange(value)}
        value={value}
        />
        )}
        name="lastName"
        defaultValue=""
        />

<View>
<Text style={styles.acess}>
Acesso
</Text>
  </View>   
  <Controller
    control={control}
    render={({ field: { onChange, onBlur, value } }) => (
      <DropDownPicker
      style={styles.acesso} 
      labelStyle={{
        fontWeight: "bold",
        backgroundColor:"black"
      }}
       open={OpenAcesso}
       value={AcessoValue}
       items={acesso}
       setOpen={setOpenAcesso}
       setValue={setAcessoValue}
       setItems={setAcesso}
     />
    )}
    name="lastName"
    defaultValue=""
  />
  
  {/* <Button title="Submit" 
  style={styles.salvar}
onPress={handleSubmit(onSubmit)} /> */}
</View>

</View>
</View>
)

};





const styles = StyleSheet.create({
  rect2: {
    marginTop:150,
    width: 390,
    height: 37,
    backgroundColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  rectTitle: {
    marginTop:25,
    width: 390,
    height: 37,
    backgroundColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  acess:{
    marginLeft:25,
    marginTop:15,
  },
  local:{
    marginLeft:25,
    marginTop:15,
  },
  text:{
    marginLeft:25,
    marginTop:10,
  },
  cnpj:{
    marginTop:25,
    marginLeft:25,
    fontSize:15,
  },
  nome:{
    marginTop:15,
    marginLeft:25,
    fontSize:15,
  },
  processo:{
    marginTop:15,
    marginLeft:25,
    fontSize:15,
  },
  titulo:{
    color:"white",
    marginLeft:25,
    marginTop:5,
  },
  tituloReact:{
    color:"white",
    marginLeft:25,
  },
  container:{
    marginTop:10,
    width: 390,
    height: 270,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  containerTitle:{
    marginTop:10,
    width: 390,
    height: 150,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  salvar:{
    marginTop: 25,
    width: 324,
    marginLeft:25,
    height: 40,
  },
  select:{
    marginTop: 13,
    width: 324,
    marginLeft:25,
    height: 40,
  },
  acesso:{
    marginTop: 13,
    width: 324,
    marginLeft:25,
    height: 40,
  },
  input: {
    marginTop: 13,
    width: 324,
    marginLeft:25,
    height: 40,
    borderWidth: 1,
    borderRadius:5,
    borderColor:'black',
    backgroundColor:'#fff',
    color: 'black',
    //fontSize: 18,
  },
});

export default Formulario;