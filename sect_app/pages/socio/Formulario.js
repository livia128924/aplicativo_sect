import React from 'react';
import { Text, SafeAreaView, View, StyleSheet, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Formulario = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

return(
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>cnpj:</Text>
        <Text style={styles.text}>nome:</Text>
        <Text style={styles.text}>processo:</Text>

        
      
      </View>
    </View>
    <View style={styles.container}>
      <View style={styles.card}>
      <Text style={styles.text2}>municipio:</Text>
   <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
        <View style={styles.card2}>
        <Text>testefg</Text>
        </View>
      </View>
    </View>

    
    </View>
  </SafeAreaView>
)

};


const styles = StyleSheet.create({


  
  text: {
    marginTop: 17,
    marginLeft: 9,
    //backgroundColor:'blue',
    color: 'black',
    fontSize: 14

  },
  text2: {
    marginTop: 40,
    marginLeft: 9,
    //backgroundColor:'blue',
    color: 'black',
    fontSize: 14

  },
  card: {
    //backgroundColor:'#f2f2f2',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'black',
    borderRadius:5,
    width: 340,
    height: 141,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3

  },
  card2:{
    position:'absolute',
    width: 339,
    height: 36,
    backgroundColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
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

