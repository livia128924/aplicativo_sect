import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage } from 'react-native';
//import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import  ProgressSteps from '../../components/ProgressSteps/ProgressSteps'
import ProgressStep  from '../../components/ProgressSteps/ProgressStep';
import api from '../../../services/api';
import Step1 from '../../components/tipos_forms/vu/Step1';

const db = DatabaseConnection.getConnection();
import { DatabaseConnection } from '../../database/database';

function Vu_PJ_progressSteps({ navigation }) {

  useEffect(()=>{

    var  prss= '';
    AsyncStorage.getItem('cod_prss').then(value_prss => {

      setProcesso(value_prss);
      prss=value_prss;
  });
    AsyncStorage.getItem('rq_nome').then(value_nome => {
      //console.log(value_nome);
      setRequerente(value_nome);

  });

  },[]);

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

            <Step1

            />
          </View>
        </ProgressStep>

        {/* <ProgressStep
          label="Atividades"
          onNext={onNextStep}
          onPrevious={onPrevStep}
          previousBtnText={ 'voltar'}
          nextBtnText={'próximo'}
        >
          <Step2 />

        </ProgressStep> */}
        {/* <ProgressStep
          label="Empregados/Associados"
          onPrevious={onPrevStep}
          onNext={onNextStep}
          previousBtnText={ 'voltar'}
          nextBtnText={'próximo'}
        >
          <Step3 />
        </ProgressStep> */}

        {/* <ProgressStep
          label="Infra"
          onPrevious={onPrevStep}
          onNext={onNextStep}
          scrollable={true}
          previousBtnText={ 'voltar'}
          nextBtnText={'próximo'}
        >
          <Step4 />
        </ProgressStep> */}
{/*
        <ProgressStep
          label="Saneamento"
          onPrevious={onPrevStep}
          onNext={onNextStep}
          scrollable={true}
          previousBtnText={ 'voltar'}
          nextBtnText={'próximo'}
        >
          <Step5 />
        </ProgressStep> */}
        {/* <ProgressStep
          label="Patrimonio"
          onPrevious={onPrevStep}
          onNext={onNextStep}
          scrollable={true}
          previousBtnText={ 'voltar'}
          nextBtnText={'próximo'}
        >
          <Step6 />
        </ProgressStep> */}

        {/* <ProgressStep
          label="Relatorio     Fotografico   "
          onPrevious={onPrevStep}
          onNext={onNextStep}
          scrollable={true}
          previousBtnText={ 'voltar'}
          nextBtnText={'próximo'}
        >
          <Step7
          navigation= {navigation}
          />
        </ProgressStep> */}
      </ProgressSteps>

    </View>
  );

}

export default Vu_PJ_progressSteps;

const styles = StyleSheet.create({
  rect: {
    width: '100%',
    height: 75,
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