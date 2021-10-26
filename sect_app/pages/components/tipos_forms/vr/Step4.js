import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";
import { DatabaseConnection } from "../../../database/database";
const db = DatabaseConnection.getConnection();

const Step4 = (props) => {

  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");
  const [vr_edificacoes, set_vr_edificacoes] = useState("");
  const [vr_implementos, set_vr_implementos] = useState("");
  const [vr_benfeitorias, set_vr_benfeitorias] = useState("");
  const [vr_observacoes_vistoriador, set_vr_observacoes_vistoriador] = useState("");


  useEffect(() => {
    var cod_processo = "";
    //carrega o valor do select na tela index.js
    AsyncStorage.getItem("pr_codigo").then((value) => {
      //console.log(value);
      setSync(value);
      cod_processo = value;
    });

    AsyncStorage.getItem("codigo").then((codigo) => {
      setDados_valor(codigo);
    });


    AsyncStorage.getItem("nome_tabela").then((tabela) => {
      //console.log("cod", cod_processo);
      if (tabela) {
        db.transaction((tx) => {
          tx.executeSql(
            "select * from " + tabela + " where vr_cod_processo = '" + cod_processo + "'",
            [],
            (tx, results) => {
              var x = "";
              var row = [];
              for (let i = 0; i < results.rows.length; ++i) {
                //console.log(results.rows.item(0).se_ruj_acesso);

                set_vr_edificacoes(
                  results.rows.item(i).vr_edificacoes
                );

                set_vr_benfeitorias(
                  results.rows.item(0).vr_benfeitorias
                );

                set_vr_implementos(
                  results.rows.item(i).vr_implementos
                );
                set_vr_observacoes_vistoriador(
                  results.rows.item(i).vr_observacoes_vistoriador
                );
              }
            }
          );
        });
      } //
    });
  }, []);


  // //função que aciona quando o estado do componente muda e seta os valores correspondente
   function onPressTitle(tabela, campo, valor, codigo) {
    db.transaction(
      (tx) => {
        const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE vr_cod_processo = '${codigo}'`;
        console.log(query);
        tx.executeSql(query, [], (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            alert("INSERIDO COM SUCESSO");
          }
        });
      },
      (tx, err) => {
        console.error("error em alguma coisa", err);
        return true;
      },
      (tx, success) => {
        console.log("tudo certo por aqui", success);
        //get_values(tabela, campo, sync);  ///esse aqui foi a tentativa
      }
    );

    var chaves = '"' + tabela + " " + campo + " " + valor + " " + codigo + '"';

    db.transaction((tx) => {
      const log_delete =
        "INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" +
        chaves +
        " ,'" +
        tabela +
        "', '" +
        campo +
        "', '" +
        valor +
        "', '" +
        codigo +
        "', '1')";
        tx.executeSql(log_delete, []);
        console.log(log_delete);
    });

    db.transaction((tx) => {
      const log_update =
        "REPLACE INTO log (chave, tabela, campo, valor, cod_processo, situacao) VALUES  (" +
        chaves +
        ", '" +
        tabela +
        "', '" +
        campo +
        "', '" +
        valor +
        "', '" +
        codigo +
        "', '1')";
        tx.executeSql(log_update, [], (tx, results) => {});
        console.log(log_update);
    });

    AsyncStorage.setItem("nome_tabela", tabela);

    AsyncStorage.setItem("codigo", valor.toString());
  }

  return (
    <>
      <View style={styles.form7}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>EDIFICAÇÕES RESIDÊNCIAS E NÃO RESIDÊNCIASL</Text>
        </View>
        <View style={styles.municipio}>
          <Text>Descriminação</Text>
        </View>

        <TextInput
          style={styles.inputOutrosBeneficios}
          onChangeText={set_vr_edificacoes}
          value={vr_edificacoes}
          onBlur={() =>
            onPressTitle(
              "vr",
              "vr_edificacoes",
              vr_edificacoes,
              sync
            )
          }
          //placeholder={"    Outros"}
        />


      </View>
      <View style={styles.form7}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>OUTRAS BENFEITORIAS EXISTENTES</Text>
        </View>
        <View style={styles.municipio}>
          <Text>Descriminação</Text>
        </View>

        <TextInput
          style={styles.inputOutrosBeneficios}
          onChangeText={set_vr_benfeitorias}
          value={vr_benfeitorias}
          onBlur={() =>
            onPressTitle(
              "vr",
              "vr_benfeitorias",
              vr_benfeitorias,
              sync
            )
          }
          //placeholder={"    Outros"}
        />

      </View>
      <View style={styles.form7}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>IMPLEMENTOS E SIMILARES</Text>
        </View>
        <View style={styles.municipio}>
          <Text>Descriminação</Text>
        </View>

        <TextInput
          style={styles.inputOutrosBeneficios}
          onChangeText={set_vr_implementos}
          value={vr_implementos}
          onBlur={() =>
            onPressTitle(
              "vr",
              "vr_implementos",
              vr_implementos,
              sync
            )
          }
          //placeholder={"    Outros"}
        />

      </View>
      <View style={styles.form7}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>OBSERVAÇÕES DO VISTORIADOR</Text>
        </View>
        <View style={styles.municipio}>
          <Text>Observações</Text>
        </View>

        <TextInput
          style={styles.inputOutrosBeneficios}
          multiline = {true}
          numberOfLines = {4}
          onChangeText={set_vr_observacoes_vistoriador}
          value={vr_observacoes_vistoriador}
          onBlur={() =>
            onPressTitle(
              "vr",
              "vr_observacoes_vistoriador",
              vr_observacoes_vistoriador,
              sync
            )
          }
          //placeholder={"    Outros"}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  checkboxGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxlabel: {
    marginTop: 5,
    marginLeft: 30,
  },
  form7: {
    width: '95%',
    left:11,
    height: 'auto',
    paddingBottom:10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  municipio: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 15,
  },
  Mao_de_obra: {
    marginTop: 5,
    height: 40,
    width: "85%",
    marginLeft: 30,
    borderRadius: 0,
    borderWidth: 1,
  },
  rect2: {
    width: '100%',
    height: 36,
    backgroundColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },

  titulo: {
    color: "white",
    marginLeft: 9,
    marginTop: 1,
  },
  inputOutrosBeneficios: {
    height: 40,
    width: "85%",
    marginTop: 5,
    marginLeft: 30,
    borderWidth: 1,
    backgroundColor: "white",
  },
});

export default Step4;
