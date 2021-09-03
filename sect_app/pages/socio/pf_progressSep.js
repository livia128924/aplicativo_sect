import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage, ScrollView } from 'react-native';
import api from '../../services/api';
import Step1 from '../components/ruf/Step1';
import Step2 from '../components/ruf/Step2';
import Step3 from '../components/ruf/Step3';
import Step4 from '../components/ruf/Step4';
import Step5 from '../components/ruf/Step5';
import Step6 from '../components/ruf/Step6';
import Swiper from 'react-native-swiper';
const db = DatabaseConnection.getConnection();
import { DatabaseConnection } from '../database/database';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import StepIndicator from 'react-native-step-indicator';
import { FlatList } from 'react-native-gesture-handler';
import  ProgressSteps from './ProgressSteps/ProgressSteps'
import ProgressStep  from './ProgressSteps/ProgressStep';

function IndexPF({ navigation }) {

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
          label="Area"
          onNext={onNextStep}
          onPrevious={onPrevStep}
          previousBtnText={ 'voltar'}
          nextBtnText={'próximo'}
        >
          <View>

            <Step1/>
          </View>
        </ProgressStep>

        <ProgressStep
          label="Ocupação"
          onNext={onNextStep}
          onPrevious={onPrevStep}
          previousBtnText={ 'voltar'}
          nextBtnText={'próximo'}
        >
          <Step2/>

        </ProgressStep>
        <ProgressStep
          label="Dados/Ocupantes/Infraestrutura"
          onPrevious={onPrevStep}
          onNext={onNextStep}
          previousBtnText={ 'voltar'}
          nextBtnText={'próximo'}
        >
          <Step3/>
        </ProgressStep>

        <ProgressStep
          label="Saneamento Basico"
          onPrevious={onPrevStep}
          onNext={onNextStep}
          previousBtnText={ 'voltar'}
          nextBtnText={'próximo'}
          scrollable={true}
        >
          <Step4/>

        </ProgressStep>

        <ProgressStep
          label=" Bens      Moveis"
          onPrevious={onPrevStep}
          onNext={onNextStep}
          previousBtnText={ 'voltar'}
          nextBtnText={'próximo'}
          scrollable={true}
        >
          <Step5 />
        </ProgressStep>
        <ProgressStep
          label="Relatorio     Fotografico   "
          onPrevious={onPrevStep}
          onSubmit={onSubmitSteps}
          previousBtnText={ 'voltar'}
          finishBtnText={'enviar'}
          scrollable={true}
        >
          <Step6
          navigation= {navigation}
          />
        </ProgressStep>
      </ProgressSteps>




    </View>
  );

}

export default IndexPF;

const styles = StyleSheet.create({
  rect: {
    width: '100%',
    //height: 75,
    //position: 'absolute',
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