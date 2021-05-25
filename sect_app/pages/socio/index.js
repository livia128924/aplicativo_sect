import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Pressable, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';

function ExampleOne ()  {
  //const { control, handleSubmit, formState: { errors } } = useForm();
  //const onSubmit = data => console.log(data);

  
  const [aberto, setAberto] = useState(false);
  const [valor, setValor] = useState(null);
  const [item, setItem] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

    
  const [abertoAcesso, setAbertoAcesso] = useState(false);
  const [valorAcesso, setValorAcesso] = useState(null);
  const [itemAcesso, setItemAcesso] = useState([
    {label: 'samsung', value: 'samsung'},
    {label: 'motorola', value: 'motorola'}
  ]);
  
  const [abertoAbrangencia, setAbertoAbrangencia] = useState(false);
  const [valorAbrangencia, setValorAbrangencia] = useState(null);
  const [itemAbrangencia, setItemAbrangencia] = useState([
    {label: '100', value: '100'},
    {label: '200', value: '200'}
  ]);

  const [openMao_de_obra, setOpenMao_de_obra] = useState(false);
  const [valorMao_de_obra, setValorMao_de_obra] = useState(null);
  const [itemMao_de_obra, setItemMao_de_obra] = useState([
    {label: '500', value: '500'},
    {label: '600', value: '600'}
  ]);
  
  const [openSe_ruj_associados, setOpenSe_ruj_associados] = useState(false);
  const [valorSe_ruj_associados, setValorSe_ruj_associados] = useState(null);
  const [itemSe_ruj_associados, setItemSe_ruj_associados] = useState([
    {label: '50', value: '50'},
    {label: '60', value: '60'}
  ]);

  const [openSe_ruj_cooperados, setOpenSe_ruj_cooperados] = useState(false);
  const [valorSe_ruj_cooperados, setValorSe_ruj_cooperados] = useState(null);
  const [itemSe_ruj_cooperados, setItemSe_ruj_cooperados] = useState([
    {label: '70', value: '70'},
    {label: '80', value: '80'}
  ]);


  useEffect (()=>{
  
      api.post('socio/municipios.php', {})
      .then(function (response) {
         
          const {label}= response.data;
          console.log(response.data);
          setItem(response.data);
      })
},[]);

const [openDescricao, setOpenDescricao] = useState(false);
const [valorAtividade, setValorAtividade ] = useState(null);


const [itemDescricao, setItemDescricao] = useState([
  {label: 'descricao', value: 'descricao'},
  {label: 'valor', value: 'valor'}
]);

const [openNaturezaAtv, setOpenNaturezaAtv] = useState(false);
const [valorNaturezaAtv, setValorNaturezaAtv] = useState(null);
const [itemNaturezaAtv, setItemNaturezaAtv] = useState([
  {label: 'val', value: 'val'},
  {label: 'lab', value: 'lab'}
]);


async function requerente (dados) {

  const [nome,setNome] = useState();

  api.post('socio/requerente.php', {dados})
   .then(function (response) {

    const {nome}=response.data;
   
    setNome(response.data);
   })
   .catch(function (error) {
    alert('Erro ao enviar'); // imprimir o conteudo - console.log(JSON.stringify(error))
   });
}

  
  const [localizacao, setLocalizacao] = useState('');
  const [outros, setOutros] = useState('');
  const [ comercio, setComercio] = useState('');
  const [ industria, setIndustria] = useState('');
  const [ recursosNaturais, setRecursosNaturais] = useState('');
  const [ t_I, setT_I] = useState('');

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
          >
        <View style={styles.form}>
          <View style={styles.rect2}>
              <Text>ÁREA DE ABRANGÊNCIA</Text>
          </View>
            <View style={styles.municipio}>
              <Text >MUNICIPIOS</Text>
              </View>
            <View>
            <DropDownPicker
            style={styles.select} 
            open={aberto}
            value={valor}
            items={item}
            setOpen={setAberto}
            setValue={setValor}
              setItems={setItem}
              placeholder="Municipios"
              />
              </View>
             <View>
            <Text style={styles.acessoText}>ACESSO</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
            </View>
            <View>
            <DropDownPicker
            style={styles.acesso} 
            open={abertoAcesso}
            value={valorAcesso}
            items={itemAcesso}
            setOpen={setAbertoAcesso}
            setValue={setValorAcesso}
              setItems={setItemAcesso}
              placeholder="acesso"
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

          <View style={styles.form_step1}>
            <View style={styles.rect2}>
              <Text style={styles.titulo} >SETOR DE ABRANGÊNCIA</Text>
            </View>
            <View>
            <DropDownPicker
            style={styles.abrangencia} 
            open={abertoAbrangencia}
            value={valorAbrangencia}
            items={itemAbrangencia}
            setOpen={setAbertoAbrangencia}
            setValue={setValorAbrangencia}
              setItems={setItemAbrangencia}
              placeholder="Selecione::"
              />
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
            label="Atividades"
            onNext={onNextStep}
            onPrevious={onPrevStep}
            scrollable={true}
          >
            <View style={styles.form3}>
            <View style={styles.rect2}>
            <Text style={styles.titulo} >INÍCIO DAS ATIVIDADES</Text>
              </View>
              <View style={styles.atividadeTitle}>
              <Text >Inicio da Atividade</Text>
              </View>
            <View>
            <DropDownPicker
            style={styles.atividade} 
            open={openDescricao}
              value={valorAtividade}
              items={itemDescricao}
              setOpen={setOpenDescricao}
              setValue={setValorAtividade}
              setItems={setItemDescricao}
              placeholder="Selecione::"
            />
            </View>
            </View>

            <View style={styles.form4}>
            <View style={styles.rect2}>
            <Text style={styles.titulo} >NATUREZA E RAMO DA ATIVIDADE ECONÔMICA</Text>
              </View>
              <View style={styles.municipio}>
              <Text >Natureza da Atividade</Text>
              </View>
            <View>
            <DropDownPicker
            style={styles.NaturezaAtv} 
            open={openNaturezaAtv}
              value={valorNaturezaAtv}
              items={itemNaturezaAtv}
              setOpen={setOpenNaturezaAtv}
              setValue={setValorNaturezaAtv}
              setItems={setItemNaturezaAtv}
              placeholder="Selecione::"
            />
              </View>
            
            <View style={{ alignItems: 'center' }}> 
            <TextInput 
            style={styles.inputOutros}
            onChangeText={setOutros}
            value={outros}
            placeholder={" Outros"}
            />
            </View>
            <View>
            <Text style={styles.NaturezaAtvTitle}>Ramo da Atividade</Text>
            </View>
            <View style={{ alignItems: 'center' }}> 
            <TextInput 
            style={styles.inputOutros}
            onChangeText={setComercio}
            value={comercio}
            placeholder={"  Comércio"}
            />
            <TextInput 
            style={styles.inputOutros}
            onChangeText={setIndustria}
            value={industria}
            placeholder={"  Indústria"}
            />
            <TextInput 
            style={styles.inputOutros}
            onChangeText={setRecursosNaturais}
            value={recursosNaturais}
            placeholder={"  Recursos Naturais"}
            />
            <TextInput 
            style={styles.inputOutros}
            onChangeText={setT_I}
            value={t_I}
            placeholder={"   Tecnologia da Informação/Comunicação"}
            />

            </View>
            </View>
              
          </ProgressStep>
          <ProgressStep
            label="Empregados/Associados"
            onPrevious={onPrevStep}
            onSubmit={onSubmitSteps}
            scrollable={true}
          >
            <View style={styles.form5}>
            <View style={styles.rect2}>
            <Text style={styles.titulo} >NÚMERO DE EMPREGADOS E/OU ASSOCIADOS, COOPERADOS</Text>
              </View>
              <View style={styles.municipio}>
              <Text >Mão de Obra Empregada</Text>
              </View>
              <View>
            <DropDownPicker
            style={styles.Mao_de_obra} 
            open={openMao_de_obra}
              value={valorMao_de_obra}
              items={itemMao_de_obra}
              setOpen={setOpenMao_de_obra}
              setValue={setValorMao_de_obra}
              setItems={setItemMao_de_obra}
              placeholder="Selecione::"
            />
            </View>
            <View style={styles.municipio}>
              <Text >Número de Associados</Text>
              </View>
              <View>
              <DropDownPicker
            style={styles.Mao_de_obra} 
            open={openSe_ruj_associados}
              value={valorSe_ruj_associados}
              items={itemSe_ruj_associados}
              setOpen={setOpenSe_ruj_associados}
              setValue={setValorSe_ruj_associados}
              setItems={setItemSe_ruj_associados}
              placeholder="Selecione::"
            />
              </View>

              <View style={styles.municipio}>
              <Text >Número de Cooperados</Text>
              </View>
              <View>
              <DropDownPicker
            style={styles.Mao_de_obra} 
            open={openSe_ruj_cooperados}
              value={valorSe_ruj_cooperados}
              items={itemSe_ruj_cooperados}
              setOpen={setOpenSe_ruj_cooperados}
              setValue={setValorSe_ruj_cooperados}
              setItems={setItemSe_ruj_cooperados}
              placeholder="Selecione::"
            />
              </View>
              </View>

            <View style={styles.form6}>
            <View style={styles.rect2}>
            <Text style={styles.titulo} >POLÍTICA DE BENFÍCIOS</Text>
              </View>
              <View style={styles.municipio}>
              <Text >Natureza da Atividade</Text>
              </View>
              <View>
              <DropDownPicker
            style={styles.Mao_de_obra} 
            open={openSe_ruj_beneficios_concedidos}
              value={valorSe_ruj_beneficios_concedidos}
              items={itemSe_ruj_cooperados}
              setOpen={setOpenSe_ruj_cooperados}
              setValue={setValorSe_ruj_cooperados}
              setItems={setItemSe_ruj_cooperados}
              placeholder="Selecione::"
            />
              </View>
              </View>

            <View style={{ alignItems: 'center' }}>
          
              <Text>formulario4sdasd step content</Text>
            </View>
          </ProgressStep>

          <ProgressStep
            label="form5"
            onPrevious={onPrevStep}
            onSubmit={onSubmitSteps}
            scrollViewProps={defaultScrollViewProps}
          >
            <View style={{ alignItems: 'center' }}>
          
              <Text>form 5 step content</Text>
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
  form3: {
    width: 340,
    height: 150,
    marginLeft:25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  form4: {
    width: 340,
    height: 450,
    marginLeft:25,
    marginTop:10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  form5: {
    width: 340,
    height: 340,
    marginLeft:25,
    marginTop:10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  form6: {
    width: 340,
    height: 300,
    marginLeft:25,
    marginTop:10,
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
    zIndex:9999,
    borderRadius:0,
    borderWidth: 1,
  },
  atividade:{
    marginTop:15,
    zIndex:1000,
    height: 40,
    width:'85%',
    marginLeft:30,
    borderRadius:0,
    borderWidth: 1,
  },
  NaturezaAtv:{
    marginTop:5,
    height: 40,
    width:'85%',
    marginLeft:30,
    borderRadius:0,
    borderWidth: 1,
  },
  Mao_de_obra:{
    marginTop:5,
    height: 40,
    width:'85%',
    marginLeft:30,
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
  abrangencia:{
    height: 40,
    width:'85%',
    marginLeft:30,
    height: 40,
    marginTop:20,
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
  inputOutros: {
    height: 40,
    width:'85%',
    marginTop:10,
    marginLeft:10,
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
    marginTop:15,
    marginBottom:9
  },
  atividadeTitle: {
    color: "#121212",
    marginLeft:30,
    marginTop:10,
  },
  NaturezaAtvTitle: {
    color: "#121212",
    marginLeft:30,
    marginTop:10,
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
    marginTop:1
  },
});