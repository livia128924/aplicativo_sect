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
  

return(
  <View>
  <Controller
    control={control}
    render={({ field: { onChange, onBlur, value } }) => (
      <DropDownPicker
     style={{
        backgroundColor: "crimson"
      }} 
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

  <Button title="Submit" onPress={handleSubmit(onSubmit)} />
</View>
)

};





const styles = StyleSheet.create({

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius:5,
    borderColor:'#fff',
    backgroundColor:'#fff',
    color: 'black',
    //fontSize: 18,
  },
});

export default Formulario;

