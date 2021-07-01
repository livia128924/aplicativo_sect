import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import api from '../../services/api';
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';
import Step4 from '../components/Step4';
import Step5 from '../components/Step5';
import Step6 from '../components/Step6';


function ExampleOne({ navigation }) {


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


  return (
    <View style={{ flex: 1, marginTop: 0 }}>

      {/* <View style={styles.rect}  {...requerente}>
            <Text style={styles.nome}>Nome:</Text>
            <Text style={styles.cnpj}>CNPJ:</Text>
            <Text style={styles.processo}>Processo:</Text>
        </View> */}
      <ProgressSteps>
        {/* step1 */}
        <ProgressStep
          label="Area"
          onNext={onformularioStepComplete}
          onPrevious={onPrevStep}
        >
          <View>
            <Step1 />
          </View>
        </ProgressStep>

        <ProgressStep
          label="Atividades"
          onNext={onNextStep}
          onPrevious={onPrevStep}
        >
          <Step2 />

        </ProgressStep>
        <ProgressStep
          label="Empregados/Associados"
          onPrevious={onPrevStep}
          onNext={onNextStep}

        >
          <Step3 />

          <View style={{ alignItems: 'center' }}>

            <Text>formulario4sdasd step content</Text>
          </View>
        </ProgressStep>

        <ProgressStep
          label="Infra"
          onPrevious={onPrevStep}
          onNext={onNextStep}
          scrollable={true}
        >
          <Step4 />
          <View style={{ alignItems: 'center' }}>

            <Text>form 5 step conten0t</Text>
          </View>
        </ProgressStep>

        <ProgressStep
          label="Saneamento"
          onPrevious={onPrevStep}
          onNext={onNextStep}
          //scrollViewProps={defaultScrollViewProps}
          scrollable={true}
        >
          <Step5 />
        </ProgressStep>
        <ProgressStep
          label="Patrimonio"
          onPrevious={onPrevStep}
          onSubmit={onSubmitSteps}
          scrollable={true}
        >
          <Step6 />
        </ProgressStep>
      </ProgressSteps>

    </View>
  );

}

export default ExampleOne;

const styles = StyleSheet.create({
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