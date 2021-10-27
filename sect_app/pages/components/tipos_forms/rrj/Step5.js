import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";
import { DatabaseConnection } from "../../../database/database";

const db = DatabaseConnection.getConnection();
const Step5 = (props) => {
  const [sync, setSync] = useState("");
  const [value_se_rrj_informacaoes_adicionais, set_se_rrj_informacaoes_adicionais] = useState("");

  const [open_se_rrj_responsabilidade_social, setOpen_se_rrj_responsabilidade_social] = useState(false);
  const [valor_se_rrj_responsabilidade_social, setValor_se_rrj_responsabilidade_social] = useState(null);
  const [item_se_rrj_responsabilidade_social, setItem_se_rrj_responsabilidade_social] = useState([
    { label: "Sim", value: "s" },
    { label: "Nao", value: "n" },
  ]);

  const [open_se_rrj_formacao_atuacao, setOpen_se_rrj_formacao_atuacao] = useState(false);
  const [valor_se_rrj_formacao_atuacao, setValor_se_rrj_formacao_atuacao] = useState(null);
  const [item_se_rrj_formacao_atuacao, setItem_se_rrj_formacao_atuacao] = useState([
    { label: "Sim", value: "s" },
    { label: "Nao", value: "n" },
  ]);

  const [open_se_rrj_investimento_financeiro, setOpen_se_rrj_investimento_financeiro] = useState(false);
  const [valor_se_rrj_investimento_financeiro, setValor_se_rrj_investimento_financeiro] = useState(null);
  const [item_se_rrj_investimento_financeiro, setItem_se_rrj_investimento_financeiro] = useState([]);

  useEffect(() => {
    var cod_processo = "";
    //carrega o valor do select na tela index.js
    AsyncStorage.getItem("pr_codigo").then((value) => {
      //console.log(value);
      setSync(value);
      cod_processo = value;
    });

    // AsyncStorage.getItem("codigo").then((codigo) => {
    //   setDados_valor(codigo);
    // });

    loadStep5();

     AsyncStorage.getItem('nome_tabela').then(tabela => {
      //console.log("ok",cod_processo);
       if (tabela ) {

           db.transaction((tx) => {

               tx.executeSql(
                   "select * from " + tabela + " where se_rrj_cod_processo = '" + cod_processo + "'", [], (tx, results) => {
                       //var x = "";
                      // console.log(results.rows.length);
                       var row = [];
                       for (let i = 0; i < results.rows.length; ++i) {

                        setValor_se_rrj_responsabilidade_social(results.rows.item(0).se_rrj_responsabilidade_social);

                        setValor_se_rrj_formacao_atuacao(results.rows.item(0).se_rrj_formacao_atuacao);

                        setValor_se_rrj_investimento_financeiro(results.rows.item(0).se_rrj_investimento_financeiro);

                        set_se_rrj_informacaoes_adicionais(results.rows.item(0).se_rrj_informacaoes_adicionais);

                           //console.log(results.rows.item(i).se_rrj_sanitario);
                       }

                   }, function(tx, error) {
                    alert('SELECT error: ' + error.message);
                });
           })
       }
   });
  }, []);


  async function loadStep5() {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select * from aux_formacao_atuacao",
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push({
                label: results.rows.item(i).descricao,
                value: results.rows.item(i).codigo,
                //isChecked: false,
              });
            }
            setItem_se_rrj_formacao_atuacao(temp);
          }
        );

        tx.executeSql("select * from aux_investimento_financeiro", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
              //isChecked: false,
            });
          }
          setItem_se_rrj_investimento_financeiro(temp);
        });
      },
      (err) => {
        // console.error("There was a problem with the tx", err);
        return true;
      },
      (success) => {
        // console.log("all done", success);
      }
    );
  }


  //função que aciona quando o estado do componente muda e seta os valores correspondente
  function onPressTitle(tabela, campo, valor, codigo) {

      ///console.log(codigo);
      db.transaction((tx) => {

          const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_rrj_cod_processo = '${codigo}'`;
          //console.log(query);
          tx.executeSql(query, [], (tx, results) => {
              for (let i = 0; i < results.rows.length; ++i) {
                  alert("INSERIDO COM SUCESSO");
              }
          });
      }, (tx, err) => {
          //console.error("error em alguma coisa", err);
          return true;
      }, (tx, success) => {
          //console.log("tudo certo por aqui", success);
          //get_values(tabela, campo, sync);  ///esse aqui foi a tentativa
      });

      var chaves = '"' + tabela + ' ' + campo + ' ' + valor + ' ' + codigo + '"';

      db.transaction((tx) => {
          //tx.executeSql("DROP TABLE log", []);
          const log_delete = "INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + " ,'" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')";
          console.log("INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + " ,'" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')");
          tx.executeSql(log_delete, []);
      });

      db.transaction((tx) => {
          const log_update = "REPLACE INTO log (chave, tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + ", '" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')";
          console.log(log_update);
          tx.executeSql(log_update, [], (tx, results) => {

          });
      })
        AsyncStorage.setItem('nome_tabela', tabela);


      AsyncStorage.setItem('codigo', valor.toString());
  };

  return (
    <>
      <View style={styles.form}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>RESPONSABILIDADE SOCIAL NA ORGANIZAÇÃO</Text>
        </View>
        <View style={styles.title_style}>
          <Text>Possui programa de responsabilidade social</Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
        <DropDownPicker
          style={styles.drop_down_Style}
          zIndex={open_se_rrj_responsabilidade_social ? 9999 : 0}
          open={open_se_rrj_responsabilidade_social}
          value={parseInt(valor_se_rrj_responsabilidade_social)}
          items={item_se_rrj_responsabilidade_social}
          setOpen={setOpen_se_rrj_responsabilidade_social}
          setValue={setValor_se_rrj_responsabilidade_social}
          setItems={setItem_se_rrj_responsabilidade_social}
          onChangeValue={() =>
            onPressTitle(
              "se_rrj",
              "se_rrj_responsabilidade_social",
              valor_se_rrj_responsabilidade_social,
              sync
              )
            }
            listMode="SCROLLVIEW"
            placeholder="Selecione::"
            />
        </View>
        <View style={styles.title_style}>
          <Text>Formação de Atuação</Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
        <DropDownPicker
          style={styles.drop_down_Style}
          zIndex={open_se_rrj_formacao_atuacao ? 9999 : 0}
          open={open_se_rrj_formacao_atuacao}
          value={parseInt(valor_se_rrj_formacao_atuacao)}
          items={item_se_rrj_formacao_atuacao}
          setOpen={setOpen_se_rrj_formacao_atuacao}
          setValue={setValor_se_rrj_formacao_atuacao}
          setItems={setItem_se_rrj_formacao_atuacao}
          onChangeValue={() =>
            onPressTitle(
              "se_rrj",
              "se_rrj_formacao_atuacao",
              valor_se_rrj_formacao_atuacao,
              sync
              )
            }
            listMode="SCROLLVIEW"
            placeholder="Selecione::"
            />
            </View>

        <View style={styles.title_style}>
          <Text>Investimento Financeiro destinado</Text>
        </View>

        <View style={{ alignSelf: "center", width: "85%" }}>
        <DropDownPicker
          style={styles.drop_down_Style}
          zIndex={open_se_rrj_investimento_financeiro ? 9999 : 0}
          open={open_se_rrj_investimento_financeiro}
          value={parseInt(valor_se_rrj_investimento_financeiro)}
          items={item_se_rrj_investimento_financeiro}
          setOpen={setOpen_se_rrj_investimento_financeiro}
          setValue={setValor_se_rrj_investimento_financeiro}
          setItems={setItem_se_rrj_investimento_financeiro}
          onChangeValue={() =>
            onPressTitle(
              "se_rrj",
              "se_rrj_investimento_financeiro",
              valor_se_rrj_investimento_financeiro,
              sync
              )
            }
            listMode="SCROLLVIEW"
            placeholder="Selecione::"
            />
</View>
      </View>
      <View style={styles.form}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>INFORMAÇÕES ADICIONAIS</Text>
        </View>

        <View style={styles.title_style}>
          <Text>Informações adicionais</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_se_rrj_informacaoes_adicionais}
            value={value_se_rrj_informacaoes_adicionais}
            onBlur={() =>
              onPressTitle(
                "se_rrj",
                "se_rrj_informacaoes_adicionais",
                value_se_rrj_informacaoes_adicionais,
                sync
              )
            }
            placeholder={"    "}
          />
        </View>


      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input_style: {
    height: 40,
    width: "85%",
    marginTop: 10,
    //marginLeft: 10,
    //marginRight:25,
    borderWidth: 1,
    backgroundColor: "white",
  },
  drop_down_Style: {
    height: 40,
    marginTop: 5,
    borderRadius: 0,
    borderWidth: 1,
  },
  form: {
    width: '95%',
    height:'auto',
    //marginLeft: 25,
    paddingBottom:10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  title_style: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 15,
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
});

export default Step5;
