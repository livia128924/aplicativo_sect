import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import api from '../../services/api';
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';
import Step4 from '../components/Step4';
import Step5 from '../components/Step5';
import Step6 from '../components/Step6';
const db = DatabaseConnection.getConnection();
import { DatabaseConnection } from '../database/database';



function ExampleOne({ navigation }) {

  useEffect(()=>{
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT s.*,r.codigo as codigo_rq, p.codigo as codigo_pr FROM pr p INNER JOIN rq r ON r.codigo = p.pr_requerente inner join se_ruj s ON s.se_ruj_cod_processo = p.codigo  where p.pr_numero_processo = 'C1118' ", [], (tx, results) => {

            var temp = [];
            //console.log(len);
            for(let i = 0; i < results.rows.length; i++){
              temp.push({ label: results.rows.item(i)});

             setTitleText(results.rows.item(i).codigo_pr);
             setTitleText2(results.rows.item(i).codigo_rq );
             setTitleText3(results.rows.item(i).codigo );


         AsyncStorage.setItem('codigo_pr', results.rows.item(i).codigo_pr.toString());
           //console.log(AuthContext);
             //codigo_se = results.rows.item(i).codigo;
            }
        }
      );
    },(err) => {
      console.error("There was a problem with the tx", err);
      return true;
    },(success ) => {
      console.log("all done with select",success );
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

  const [titleText, setTitleText] = useState('');
  const [titleText2, setTitleText2] = useState('');
  const [titleText3, setTitleText3] = useState('');
  return (
    <View style={{ flex: 1, marginTop: 0 }}>

      <View style={styles.rect} >
      <Text style={styles.processo}>Processo:  {titleText}</Text>
      <Text style={styles.nome}>requerente:  {titleText2}</Text>
        </View>
      <ProgressSteps>
        <ProgressStep
          label="Area"
          onNext={onNextStep}
          onPrevious={onPrevStep}
        >
          <View>
            <Step1

            />
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