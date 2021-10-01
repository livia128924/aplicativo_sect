import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage, ScrollView } from 'react-native';
import api from '../../services/api';
import Step1 from '../components/tipos_forms/rrj/Step1';
import Step2 from '../components/tipos_forms/rrj/Step2';
import Step3 from '../components/tipos_forms/rrj/Step3';
import Step4 from '../components/tipos_forms/rrj/Step4';
import Step5 from '../components/tipos_forms/rrj/Step5';
import Step7 from '../components/tipos_forms/rrj/Step7';
//import Step6 from '../components/rrj/Step6';
import Swiper from 'react-native-swiper';
const db = DatabaseConnection.getConnection();
import { DatabaseConnection } from '../../database/database';
import  ProgressSteps from './ProgressSteps/ProgressSteps'
import ProgressStep  from './ProgressSteps/ProgressStep';

function Index_rrj({ navigation }) {

  useEffect(()=>{

    var  prss= '';
    AsyncStorage.getItem('cod_prss').then(value_prss => {

      setProcesso(value_prss);
      prss=value_prss;
      //console.log("variavel", prss);


  });
    AsyncStorage.getItem('rq_nome').then(value_nome => {
      //console.log(value_nome);
      setRequerente(value_nome);

  });

  },[]);

  const [currentPage, setCurrentPage] = useState(0);
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
    navigation.navigate('Relatorio');
  };

  const [processo, setProcesso] = useState('');
  const [requerente, setRequerente] = useState('');

  return (
    <View style={{ flex: 1, marginTop: 0 }}>

      <View style={styles.rect} >
      <Text style={styles.processo}>Processo:  {processo}</Text>
      <Text style={styles.nome}>requerente:  {requerente}</Text>
        </View >

      <ProgressSteps
      >
        <ProgressStep
          label="Abrangência e Atividades"
          onNext={onNextStep}
          onPrevious={onPrevStep}
          previousBtnText={ 'voltar'}
          nextBtnText={'próximo'}
        >
          <View style={{display:'flex', alignItems:'center'}}>
            <Step1/>
          </View>
        </ProgressStep>

        <ProgressStep
          label="Politica e Infrastrutura"
          onNext={onNextStep}
          onPrevious={onPrevStep}
          previousBtnText={ 'voltar'}
          nextBtnText={'próximo'}
        >
           <View style={{display:'flex', alignItems:'center'}}>
          <Step2/>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Saneamento basico e Inst. sanitarias"
          onPrevious={onPrevStep}
          onNext={onNextStep}
          previousBtnText={ 'voltar'}
          nextBtnText={'próximo'}
        >
          <View style={{display:'flex', alignItems:'center'}}>
          <Step3/>
          </View>
        </ProgressStep>

        <ProgressStep
          label="Patrimonio"
          onPrevious={onPrevStep}
          onNext={onNextStep}
          previousBtnText={ 'voltar'}
          nextBtnText={'próximo'}
          scrollable={true}
        >
            <View style={{display:'flex', alignItems:'center'}}>
          <Step4/>
            </View>
        </ProgressStep>

        <ProgressStep
          label="Responsabilidade-Social"
          onPrevious={onPrevStep}
          onNext={onNextStep}
          previousBtnText={ 'voltar'}
          nextBtnText={'próximo'}
          scrollable={true}
        >
           <View style={{display:'flex', alignItems:'center'}}>
          <Step5 />
          </View>
        </ProgressStep>

        <ProgressStep
          label="Anexo     Fotografico   "
          onPrevious={onPrevStep}
          onSubmit={onSubmitSteps}
          previousBtnText={ 'voltar'}
          finishBtnText={'enviar'}
          scrollable={true}
        >
          <Step7
          navigation= {navigation}
          />
        </ProgressStep>
      </ProgressSteps>




    </View>
  );

}

export default Index_rrj;

const styles = StyleSheet.create({
  rect: {
    width: '100%',
    flexDirection: 'row',
    top:1,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3
  },
  processo: {
    color: "#121212",
    marginTop: 10,
    marginLeft: 9
  },
  nome: {

    color: "#121212",
    marginTop: 10,
    marginLeft: 9
  },
  campo: {
    marginLeft: 5,
    top: 3,
    width: '80%',

  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginLeft: 17,
    marginTop: 7
  },
  button: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: '15%',
    height: 30,
    borderRadius: 4,
    backgroundColor: "rgba(74,144,226,1)",
  },

});