import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Pressable, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Checkbox } from 'react-native-paper';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';

function ExampleOne ()  {
  //const { control, handleSubmit, formState: { errors } } = useForm();
  //const onSubmit = data => console.log(data);

  const [checked, setChecked] = React.useState(false);
  const [se_ruj_material_cobertura, setSe_ruj_material_cobertura] = React.useState(false);
  const [se_ruj_sanitario, setSe_ruj_sanitario] = React.useState(false);
  const [se_ruj_coleta_lixo, setSe_ruj_coleta_lixo] = React.useState(false);
  const [se_ruj_rede_energia, setSe_ruj_rede_energia] = React.useState(false);
  const [se_ruj_rede_agua, setSe_ruj_rede_agua] = React.useState(false);
  const [se_ruj_tratamento_agua, setSe_ruj_tratamento_agua] = React.useState(false);
  const [se_ruj_bens_moveis, setSe_ruj_bens_moveis] = React.useState(false);
  const [se_ruj_bens_imoveis, setSe_ruj_bens_imoveis] = React.useState(false);
  
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

  const [openSe_ruj_beneficios_concedidos, setOpenSe_ruj_beneficios_concedidos] = useState(false);
  const [valorSe_ruj_beneficios_concedidos, setValorSe_ruj_beneficios_concedidos] = useState(null);
  const [itemSe_ruj_beneficios_concedidos, setItemSe_ruj_beneficios_concedidos] = useState([
    {label: '800', value: '800'},
    {label: '900', value: '900'}
  ]);

  const [openSe_ruj_tipo_construcao, setOpenSe_ruj_tipo_construcao] = useState(false);
  const [valorSe_ruj_tipo_construcao, setValorSe_ruj_tipo_construcao] = useState(null);
  const [itemSe_ruj_tipo_construcao, setItemSe_ruj_tipo_construcao] = useState([
    {label: '950', value: '950'},
    {label: '1050', value: '1050'}
  ]);

  const [openSe_ruj_numero_comodos, setOpenSe_ruj_numero_comodos] = useState(false);
  const [valorSe_ruj_numero_comodos, setValorSe_ruj_numero_comodos] = useState(null);
  const [itemSe_ruj_numero_comodos, setItemSe_ruj_numero_comodos] = useState([
    {label: '147', value: '147'},
    {label: '258', value: '258'}
  ]);

  const [openSe_ruj_numero_pisos, setOpenSe_ruj_numero_pisos] = useState(false);
  const [valorSe_ruj_numero_pisos, setValorSe_ruj_numero_pisos] = useState(null);
  const [itemSe_ruj_numero_pisos, setItemSe_ruj_numero_pisos] = useState([
    {label: '123', value: '123'},
    {label: '456', value: '456'}
  ]);

  const [openSe_ruj_estado_conservacao, setOpenSe_ruj_estado_conservacao] = useState(false);
  const [valorSe_ruj_estado_conservacao, setValorSe_ruj_estado_conservacao] = useState(null);
  const [itemSe_ruj_estado_conservacao, setItemSe_ruj_estado_conservacao] = useState([
    {label: '123', value: '123'},
    {label: '456', value: '456'}
  ]);
  const [openSe_ruj_destino_dejetos, setOpenSe_ruj_destino_dejetos] = useState(false);
  const [valorSe_ruj_destino_dejetos, setValorSe_ruj_destino_dejetos] = useState(null);
  const [itemSe_ruj_destino_dejetos, setItemSe_ruj_destino_dejetos] = useState([
    {label: '123', value: '123'},
    {label: '456', value: '456'}
  ]);
  const [openSe_ruj_responsabilidade_social, setOpenSe_ruj_responsabilidade_social] = useState(false);
  const [valorSe_ruj_responsabilidade_social, setValorSe_ruj_responsabilidade_social] = useState(null);
  const [itemSe_ruj_responsabilidade_social, setItemSe_ruj_responsabilidade_social] = useState([
    {label: 'Sim', value: 'Sim'},
    {label: 'Nao', value: 'Nao'}
  ]);
  const [openSe_ruj_formacao_atuacao, setOpenSe_ruj_formacao_atuacao] = useState(false);
  const [valorSe_ruj_formacao_atuacao, setValorSe_ruj_formacao_atuacao] = useState(null);
  const [itemSe_ruj_formacao_atuacao, setItemSe_ruj_formacao_atuacao] = useState([
    {label: 'Diretamente da Comunidade', value: 'Diretamente da Comunidade'},
    {label: 'Indiretamente por meio dos colaboradores', value: 'Indiretamente por meio dos colaboradores'}
  ]);
  const [openSe_ruj_investimento_financeiro, setOpenSe_ruj_investimento_financeiro] = useState(false);
  const [valorSe_ruj_investimento_financeiro, setValorSe_ruj_investimento_financeiro] = useState(null);
  const [itemSe_ruj_investimento_financeiro, setItemSe_ruj_investimento_financeiro] = useState([
    {label: 'Menos de 100 mil reais', value: 'Menos de 100 mil reais'},
    {label: 'De 100 a 400 mil reais', value: 'De 100 a 400 mil reais'},
    {label: 'De 400 a 800 mil reais', value: 'De 400 a 800 mil reais'},
    {label: 'Acima de 800 mil reais', value: 'Acima de 800 mil reais'},

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
  const [outrosBeneficios, setOutrosBeneficios] = useState('');
  const [outros_Se_ruj_tipo_construcao, setOutros_Se_ruj_tipo_construcao] = useState('');
  const [outrosSe_ruj_destino_dejetos, setOutrosSe_ruj_destino_dejetos] = useState('');
  const [se_ruj_coleta_lixo_outros, setOutrosSe_ruj_coleta_lixo_outros] = useState('');

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
        {/* <View style={styles.rect}  {...requerente}>
            <Text style={styles.nome}>Nome:</Text>
            <Text style={styles.cnpj}>CNPJ:</Text>
            <Text style={styles.processo}>Processo:</Text>
        </View> */}
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
              <Text >Tipos de Benefícios Concedidos</Text>
              </View>
              <View>
              <DropDownPicker
            style={styles.Mao_de_obra} 
            open={openSe_ruj_beneficios_concedidos}
              value={valorSe_ruj_beneficios_concedidos}
              items={itemSe_ruj_beneficios_concedidos}
              setOpen={setOpenSe_ruj_beneficios_concedidos}
              setValue={setValorSe_ruj_beneficios_concedidos}
              setItems={setItemSe_ruj_beneficios_concedidos}
              placeholder="Selecione::"
            />
              </View>
              <TextInput
              style={styles.inputOutrosBeneficios}
              onChangeText={setOutrosBeneficios}
              value={outrosBeneficios}
              placeholder={"    Outros"}
              />
              </View>

            <View style={{ alignItems: 'center' }}>
          
              <Text>formulario4sdasd step content</Text>
            </View>
          </ProgressStep>

          <ProgressStep
            label="Infra"
            onPrevious={onPrevStep}
            onSubmit={onSubmitSteps}
            scrollable={true}
          >
              <View style={styles.form7}>
            <View style={styles.rect2}>
            <Text style={styles.titulo} >INFRAESTRUTURA DO IMÓVEL</Text>
              </View>
              <View style={styles.municipio}>
              <Text >Tipo de Construção</Text>
              </View>
              <View>
              <DropDownPicker
              style={styles.Mao_de_obra} 
              open={openSe_ruj_tipo_construcao}
              value={valorSe_ruj_tipo_construcao}
              items={itemSe_ruj_tipo_construcao}
              setOpen={setOpenSe_ruj_tipo_construcao}
              setValue={setValorSe_ruj_tipo_construcao}
              setItems={setItemSe_ruj_tipo_construcao}
              placeholder="Selecione::"
            />
              </View>
              <TextInput
              style={styles.inputOutrosBeneficios}
              onChangeText={setOutros_Se_ruj_tipo_construcao}
              value={outros_Se_ruj_tipo_construcao}
              placeholder={"    Outros"}
              />
              
              <View style={styles.municipio}>
              <Text >Nº de Cômodos</Text>
              </View>
              <View>
              <DropDownPicker
              style={styles.Mao_de_obra} 
              open={openSe_ruj_numero_comodos}
              value={valorSe_ruj_numero_comodos}
              items={itemSe_ruj_numero_comodos}
              setOpen={setOpenSe_ruj_numero_comodos}
              setValue={setValorSe_ruj_numero_comodos}
              setItems={setItemSe_ruj_numero_comodos}
              placeholder="Selecione::"
            />
              </View>

              <View style={styles.municipio}>
              <Text >Nº de Pisos</Text>
              </View>
              <View>
              <DropDownPicker
              style={styles.Mao_de_obra} 
              open={openSe_ruj_numero_pisos}
              value={valorSe_ruj_numero_pisos}
              items={itemSe_ruj_numero_pisos}
              setOpen={setOpenSe_ruj_numero_pisos}
              setValue={setValorSe_ruj_numero_pisos}
              setItems={setItemSe_ruj_numero_pisos}
              placeholder="Selecione::"
            />
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"1"}
              onPress={() => {
                setChecked(!checked);
              }}
              />
              <Text style={styles.checkboxText}>Telha de amianto</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_material_cobertura ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"2"}
              onPress={() => {
                setSe_ruj_material_cobertura(!se_ruj_material_cobertura);
              }}
              />
              <Text style={styles.checkboxText}>Madeira aparelhado</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_material_cobertura ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"3"}
              onPress={() => {
                setSe_ruj_material_cobertura(!se_ruj_material_cobertura);
              }}
              />
              <Text style={styles.checkboxText}>Alumínio ou zinco</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_material_cobertura ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"4"}
              onPress={() => {
                setSe_ruj_material_cobertura(!se_ruj_material_cobertura);
              }}
              />
              <Text style={styles.checkboxText}>Laje de concreto</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_material_cobertura ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"5"}
              onPress={() => {
                setSe_ruj_material_cobertura(!se_ruj_material_cobertura);
              }}
              />
              <Text style={styles.checkboxText}>Telha de barro</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_material_cobertura ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"5"}
              onPress={() => {
                setSe_ruj_material_cobertura(!se_ruj_material_cobertura);
              }}
              />
              <Text style={styles.checkboxText}>Alumínio Galvanizado</Text>
              </View>
              
              <View style={styles.municipio}>
              <Text >Estado de Conservação do Imóvel</Text>
              </View>
              <View>
              <DropDownPicker
              style={styles.Mao_de_obra} 
              open={openSe_ruj_estado_conservacao}
              value={valorSe_ruj_estado_conservacao}
              items={itemSe_ruj_estado_conservacao}
              setOpen={setOpenSe_ruj_estado_conservacao}
              setValue={setValorSe_ruj_estado_conservacao}
              setItems={setItemSe_ruj_estado_conservacao}
              placeholder="Selecione::"
            />
              </View>
              </View>

            <View style={{ alignItems: 'center' }}>
          
              <Text>form 5 step conten0t</Text>
            </View>
          </ProgressStep>

          <ProgressStep
            label="Saneamento"
            onPrevious={onPrevStep}
            onSubmit={onSubmitSteps}
            //scrollViewProps={defaultScrollViewProps}
            scrollable={true}
          >
            <View style={styles.form8}>
            <View style={styles.rect2}>
            <Text style={styles.titulo} >SANEAMENTO BÁSICO E INSTALAÇÕES SANITÁRIAS</Text>
              </View>
              <View style={styles.municipio}>
              <Text >Sanitário</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_sanitario ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"1"}
              onPress={() => {
                setSe_ruj_sanitario(!se_ruj_sanitario);
              }}
              />
              <Text style={styles.checkboxText}>Interno</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_sanitario ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"1"}
              onPress={() => {
                setSe_ruj_sanitario(!se_ruj_sanitario);
              }}
              />
              <Text style={styles.checkboxText}>Externo</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_sanitario ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"1"}
              onPress={() => {
                setSe_ruj_sanitario(!se_ruj_sanitario);
              }}
              />
              <Text style={styles.checkboxText}>Ceu aberto</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_sanitario ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"1"}
              onPress={() => {
                setSe_ruj_sanitario(!se_ruj_sanitario);
              }}
              />
              <Text style={styles.checkboxText}>Nao possui</Text>
              </View>
              <View style={styles.municipio}>
                <Text>Destino dos Dejetos</Text>
              </View>
              <View>
            <DropDownPicker
            style={styles.Dejetos} 
            open={openSe_ruj_destino_dejetos}
              value={valorSe_ruj_destino_dejetos}
              items={itemSe_ruj_destino_dejetos}
              setOpen={setOpenSe_ruj_destino_dejetos}
              setValue={setValorSe_ruj_destino_dejetos}
              setItems={setItemSe_ruj_destino_dejetos}
              placeholder="Selecione::"
            />
              </View>
            
            <View style={{ alignItems: 'center' }}> 
            <TextInput 
            style={styles.inputOutrosDejetos}
            onChangeText={setOutrosSe_ruj_destino_dejetos}
            value={outrosSe_ruj_destino_dejetos}
            placeholder={" Outros"}
            />
            </View>
            <View style={styles.municipio}>
              <Text>Lixo</Text>
              </View>
              
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_coleta_lixo ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"1"}
              onPress={() => {
                setSe_ruj_coleta_lixo(!se_ruj_coleta_lixo);
              }}
              />
              <Text style={styles.checkboxText}>Pública</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_coleta_lixo ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"2"}
              onPress={() => {
                setSe_ruj_coleta_lixo(!se_ruj_coleta_lixo);
              }}
              />
              <Text style={styles.checkboxText}>Queima</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_coleta_lixo ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"3"}
              onPress={() => {
                setSe_ruj_coleta_lixo(!se_ruj_coleta_lixo);
              }}
              />
              <Text style={styles.checkboxText}>Enterra</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_coleta_lixo ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"4"}
              onPress={() => {
                setSe_ruj_coleta_lixo(!se_ruj_coleta_lixo);
              }}
              />
              <Text style={styles.checkboxText}>Reaproveita</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_coleta_lixo ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"5"}
              onPress={() => {
                setSe_ruj_coleta_lixo(!se_ruj_coleta_lixo);
              }}
              />
              <Text style={styles.checkboxText}>Outros</Text>
              </View>
              <View style={{ alignItems: 'center' }}> 
            <TextInput 
            style={styles.inputOutrosDejetos}
            onChangeText={setOutrosSe_ruj_coleta_lixo_outros}
            value={se_ruj_coleta_lixo_outros}
            placeholder={" Outros"}
            />
            </View>
            <View style={styles.municipio}>
              <Text>Rede de Energia</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_rede_energia ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"1"}
              onPress={() => {
                setSe_ruj_rede_energia(!se_ruj_rede_energia);
              }}
              />
              <Text style={styles.checkboxText}>Pública</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_rede_energia ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"2"}
              onPress={() => {
                setSe_ruj_rede_energia(!se_ruj_rede_energia);
              }}
              />
              <Text style={styles.checkboxText}>Gerador Particular</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_rede_energia ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"3"}
              onPress={() => {
                setSe_ruj_rede_energia(!se_ruj_rede_energia);
              }}
              />
              <Text style={styles.checkboxText}>Solar</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_rede_energia ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"4"}
              onPress={() => {
                setSe_ruj_rede_energia(!se_ruj_rede_energia);
              }}
              />
              <Text style={styles.checkboxText}>Outros</Text>
              </View>
              <View style={styles.municipio}>
              <Text>Rede de Agua</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_rede_agua ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"1"}
              onPress={() => {
                setSe_ruj_rede_agua(!se_ruj_rede_agua);
              }}
              />
              <Text style={styles.checkboxText}>Rede pública de abastecimento</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_rede_agua ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"2"}
              onPress={() => {
                setSe_ruj_rede_agua(!se_ruj_rede_agua);
              }}
              />
              <Text style={styles.checkboxText}>Manual</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_rede_agua ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"3"}
              onPress={() => {
                setSe_ruj_rede_agua(!se_ruj_rede_agua);
              }}
              />
              <Text style={styles.checkboxText}>Poço artesiano</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_rede_agua ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"4"}
              onPress={() => {
                setSe_ruj_rede_agua(!se_ruj_rede_agua);
              }}
              />
              <Text style={styles.checkboxText}>Outros</Text>
              </View>
              <View style={styles.municipio}>
              <Text>Tratamento da agua</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_tratamento_agua ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"1"}
              onPress={() => {
                setSe_ruj_tratamento_agua(!se_ruj_tratamento_agua);
              }}
              />
              <Text style={styles.checkboxText}>Clorada</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_tratamento_agua ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"2"}
              onPress={() => {
                setSe_ruj_tratamento_agua(!se_ruj_tratamento_agua);
              }}
              />
              <Text style={styles.checkboxText}>Filtrada</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_tratamento_agua ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"3"}
              onPress={() => {
                setSe_ruj_tratamento_agua(!se_ruj_tratamento_agua);
              }}
              />
              <Text style={styles.checkboxText}>Coada</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_tratamento_agua ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"4"}
              onPress={() => {
                setSe_ruj_tratamento_agua(!se_ruj_tratamento_agua);
              }}
              />
              <Text style={styles.checkboxText}>Fervida</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_tratamento_agua ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"5"}
              onPress={() => {
                setSe_ruj_tratamento_agua(!se_ruj_tratamento_agua);
              }}
              />
              <Text style={styles.checkboxText}>Não realiza nenhum tratamento</Text>
              </View>
            </View>
            </ProgressStep>
            <ProgressStep
            label="Patrimonio"
            onPrevious={onPrevStep}
            onSubmit={onSubmitSteps}
            scrollable={true}
          >
            <View style={styles.form9}>
            <View style={styles.rect2}>
            <Text style={styles.titulo}>Patrimonio</Text>
              </View>
              <View style={styles.municipio}>
              <Text>Bens Móveis</Text>
              </View>
               
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"1"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Geladeira comercial</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"2"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Máquinas industriais</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"3"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Equipamento para embalagem</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"4"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Balcão de atendimento</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"5"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Prateleiras</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"5"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Fax</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"6"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Telefone</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"7"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Computador</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"8"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Gerador</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"9"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Moveis para escritório</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"10"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Exaustor</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"11"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Empilhadeira</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"12"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Freezer comercial</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"13"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Fogão industrial</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"14"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Forno Industrial</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"15"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Caixa registradora</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"16"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Balanças eletrônicas</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"17"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Transporte</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"18"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Ar condicionado</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"19"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Equipamento de elevação e transferência</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_moveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"20"}
              onPress={() => {
                setSe_ruj_bens_moveis(!se_ruj_bens_moveis);
              }}
              />
              <Text style={styles.checkboxText}>Guindaste</Text>
              </View>
              
              <View style={styles.municipio}>
              <Text>Bens Imóveis</Text>
              </View>

              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_imoveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"1"}
              onPress={() => {
                setSe_ruj_bens_imoveis(!se_ruj_bens_imoveis);
              }}
              />
              <Text style={styles.checkboxText}>Lote</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_imoveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"2"}
              onPress={() => {
                setSe_ruj_bens_imoveis(!se_ruj_bens_imoveis);
              }}
              />
              <Text style={styles.checkboxText}>Casa</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_imoveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"3"}
              onPress={() => {
                setSe_ruj_bens_imoveis(!se_ruj_bens_imoveis);
              }}
              />
              <Text style={styles.checkboxText}>Prédio</Text>
              </View>
              <View style={styles.checkboxlabel}>
              <Checkbox
              status={se_ruj_bens_imoveis ? 'checked' : 'unchecked'}
              color={"blue"}
              testID={"4"}
              onPress={() => {
                setSe_ruj_bens_imoveis(!se_ruj_bens_imoveis);
              }}
              />
              <Text style={styles.checkboxText}>Apartamento</Text>
              </View>

            </View>

            <View style={styles.form10}>
            <View style={styles.rect2}>
            <Text style={styles.titulo}>RESPONSABILIDADE SOCIAL NA ORGANIZAÇÃO</Text>
              </View>
              <View style={styles.municipio}>
              <Text>Possui programa de responsabilidade social</Text>
              </View>
              <View>
            <DropDownPicker
            style={styles.select} 
            open={openSe_ruj_responsabilidade_social}
            value={valorSe_ruj_responsabilidade_social}
            items={itemSe_ruj_responsabilidade_social}
            setOpen={setOpenSe_ruj_responsabilidade_social}
            setValue={setValorSe_ruj_responsabilidade_social}
              setItems={setItemSe_ruj_responsabilidade_social}
              placeholder="Selecione"
              />
              </View>
              <View style={styles.municipio}>
              <Text>Formação de Atuação</Text>
              </View>
              <View>
            <DropDownPicker
            style={styles.select} 
            open={openSe_ruj_formacao_atuacao}
            value={valorSe_ruj_formacao_atuacao}
            items={itemSe_ruj_formacao_atuacao}
            setOpen={setOpenSe_ruj_formacao_atuacao}
            setValue={setValorSe_ruj_formacao_atuacao}
              setItems={setItemSe_ruj_formacao_atuacao}
              placeholder="Selecione"
              />
              </View>
              <View style={styles.municipio}>
              <Text>Investimento Financeiro destinado</Text>
              </View>
              <View>
            <DropDownPicker
            style={styles.select} 
            open={openSe_ruj_investimento_financeiro}
            value={valorSe_ruj_investimento_financeiro}
            items={itemSe_ruj_investimento_financeiro}
            setOpen={setOpenSe_ruj_investimento_financeiro}
            setValue={setValorSe_ruj_investimento_financeiro}
              setItems={setItemSe_ruj_investimento_financeiro}
              placeholder="Selecione"
              />
              </View>
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
    height: 215,
    marginLeft:25,
    marginTop:10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  form7: {
    width: 340,
    height: 650,
    marginLeft:25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  form8: {
    width: 340,
    height: 1070,
    marginLeft:25,
    marginTop:10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  form9: {
    width: 340,
    height: 890,
    marginLeft:25,
    marginTop:10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  form10: {
    width: 340,
    height: 310,
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
  Dejetos:{
    marginTop:5,
    height: 40,
    width:'85%',
    marginLeft:30,
    borderRadius:0,
    borderWidth: 1,
  },
  
  checkbox:{
    marginTop:5,
    marginLeft:30,
  },
  checkboxlabel:{
    marginTop:5,
    height: 25,
    width:'85%',
    marginLeft:30,

  },
  checkboxText:{
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'stretch',
    position:'absolute',
    marginTop:9,
    marginLeft:40,
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
  inputOutrosDejetos: {
    height: 40,
    width:'85%',
    marginTop:10,
    marginLeft:10,
    borderWidth: 1,
    backgroundColor:'white'
  },
  inputOutrosBeneficios: {
    height: 40,
    width:'85%',
    marginTop:5,
    marginLeft:30,
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