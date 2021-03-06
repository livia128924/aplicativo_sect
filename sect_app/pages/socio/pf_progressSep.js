import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  AsyncStorage,
  ScrollView,
} from "react-native";
import api from "../../services/api";
import Step1 from "../components/tipos_forms/ruf/Step1";
import Step2 from "../components/tipos_forms/ruf/Step2";
import Step3 from "../components/tipos_forms/ruf/Step3";
import Step4 from "../components/tipos_forms/ruf/Step4";
import Step5 from "../components/tipos_forms/ruf/Step5";
import Step6 from "../components/tipos_forms/ruf/Step6";
const db = DatabaseConnection.getConnection();
import { DatabaseConnection } from "../../database/database";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import StepIndicator from "react-native-step-indicator";
import { FlatList } from "react-native-gesture-handler";
import ProgressSteps from "./ProgressSteps/ProgressSteps";
import ProgressStep from "./ProgressSteps/ProgressStep";

function IndexPF({ navigation }) {
  useEffect(() => {
    var prss = "";
    AsyncStorage.getItem("cod_prss").then((value_prss) => {
      setProcesso(value_prss);
      prss = value_prss;
      //console.log("variavel", prss);
    });
    AsyncStorage.getItem("rq_nome").then((value_nome) => {
      //console.log(value_nome);
      setRequerente(value_nome);
    });
  }, []);

  const [currentPage, setCurrentPage] = useState(0);

  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: "handled",
    contentContainerStyle: {
      flex: 1,
      justifyContent: "center",
    },
  };

  const onNextStep = () => {
    console.log("called next step");
  };

  const onformularioStepComplete = () => {
    alert("formulario step completed!");
  };

  const onPrevStep = () => {
    console.log("called previous step");
  };

  const onSubmitSteps = () => {
    navigation.navigate("Relatorio");
  };

  const [processo, setProcesso] = useState("");
  const [requerente, setRequerente] = useState("");

  return (
    <View style={{ flex: 1, marginTop: 0 }}>
      <View style={styles.rect}>
        <Text style={styles.processo}>Processo: {processo}</Text>
        <Text style={styles.nome}>requerente: {requerente}</Text>
      </View>

      <ProgressSteps>
        <ProgressStep
          label="Area"
          onNext={onNextStep}
          onPrevious={onPrevStep}
          previousBtnText={"voltar"}
          nextBtnText={"pr??ximo"}
        >
          <View style={{ display: "flex", alignItems: "center" }}>
            <Step1 />
          </View>
        </ProgressStep>

        <ProgressStep
          label="Ocupa????o"
          onNext={onNextStep}
          onPrevious={onPrevStep}
          previousBtnText={"voltar"}
          nextBtnText={"pr??ximo"}
        >
          <View style={{ display: "flex", alignItems: "center" }}>
            <Step2 />
          </View>
        </ProgressStep>
        <ProgressStep
          label="Dados/Ocupantes/Infraestrutura"
          onPrevious={onPrevStep}
          onNext={onNextStep}
          previousBtnText={"voltar"}
          nextBtnText={"pr??ximo"}
        >
           <View style={{ display: "flex", alignItems: "center" }}>
          <Step3 />
          </View>
        </ProgressStep>

        <ProgressStep
          label="Saneamento Basico"
          onPrevious={onPrevStep}
          onNext={onNextStep}
          previousBtnText={"voltar"}
          nextBtnText={"pr??ximo"}
          scrollable={true}
        >
           <View style={{ display: "flex", alignItems: "center" }}>
          <Step4 />
          </View>
        </ProgressStep>

        <ProgressStep
          label=" Bens      Moveis"
          onPrevious={onPrevStep}
          onNext={onNextStep}
          previousBtnText={"voltar"}
          nextBtnText={"pr??ximo"}
          scrollable={true}
        >
           <View style={{ display: "flex", alignItems: "center" }}>
          <Step5 />
          </View>
        </ProgressStep>
        <ProgressStep
          label="Relatorio     Fotografico   "
          onPrevious={onPrevStep}
          onSubmit={onSubmitSteps}
          previousBtnText={"voltar"}
          finishBtnText={"enviar"}
          scrollable={true}
        >
           <View style={{ display: "flex", alignItems: "center" }}>
          <Step6 navigation={navigation} />
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}

export default IndexPF;

const styles = StyleSheet.create({
  rect: {
    width: "100%",
    //height: 75,
    //position: 'absolute',
    flexDirection: "row",
    top: 1,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  processo: {
    color: "#121212",
    marginTop: 10,
    marginLeft: 9,
  },
  nome: {
    color: "#121212",
    marginTop: 10,
    marginLeft: 9,
  },
  campo: {
    marginLeft: 5,
    top: 3,
    width: "80%",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    marginLeft: 17,
    marginTop: 7,
  },
  button: {
    position: "absolute",
    top: 4,
    right: 4,
    width: "15%",
    height: 30,
    borderRadius: 4,
    backgroundColor: "rgba(74,144,226,1)",
  },
});
