import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage, SafeAreaView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { DatabaseConnection } from "../../database/database";
const db = DatabaseConnection.getConnection();

const Step3 = (props) => {
  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");

  const [outrosBeneficios, setOutrosBeneficios] = useState("");
  const [openMao_de_obra, setOpenMao_de_obra] = useState(false);
  const [valorMao_de_obra, setValorMao_de_obra] = useState(null);
  const [itemMao_de_obra, setItemMao_de_obra] = useState([]);

  const [openSe_ruj_associados, setOpenSe_ruj_associados] = useState(false);
  const [valorSe_ruj_associados, setValorSe_ruj_associados] = useState(null);
  const [itemSe_ruj_associados, setItemSe_ruj_associados] = useState([]);

  const [openSe_ruj_cooperados, setOpenSe_ruj_cooperados] = useState(false);
  const [valorSe_ruj_cooperados, setValorSe_ruj_cooperados] = useState(null);
  const [itemSe_ruj_cooperados, setItemSe_ruj_cooperados] = useState([]);

  const [
    openSe_ruj_beneficios_concedidos,
    setOpenSe_ruj_beneficios_concedidos,
  ] = useState(false);
  const [
    valorSe_ruj_beneficios_concedidos,
    setValorSe_ruj_beneficios_concedidos,
  ] = useState(null);
  const [
    itemSe_ruj_beneficios_concedidos,
    setItemSe_ruj_beneficios_concedidos,
  ] = useState([]);

  useEffect(() => {
    var cod_processo = "";
    //carrega o valor do select na tela index.js
    AsyncStorage.getItem("pr_codigo").then((value) => {
      setSync(value);
      cod_processo = value;
    });

    AsyncStorage.getItem("codigo").then((codigo) => {
      setDados_valor(codigo);
    });

    loadStep3();

    AsyncStorage.getItem("nome_tabela").then((tabela) => {
      //console.log(cod_processo);
      if (tabela) {
        db.transaction((tx) => {
          tx.executeSql(
            "select * from " +
              tabela +
              " where se_ruj_cod_processo = '" +
              cod_processo +
              "'",
            [],
            (tx, results) => {
              var row = [];
              for (let i = 0; i < results.rows.length; ++i) {
                console.log(results.rows.item(0).se_ruj_acesso);

                setValorMao_de_obra(results.rows.item(i).se_ruj_mao_de_obra);

                setValorSe_ruj_associados(
                  results.rows.item(i).se_ruj_associados
                );

                setValorSe_ruj_cooperados(
                  results.rows.item(i).se_ruj_cooperados
                );

                setValorSe_ruj_beneficios_concedidos(
                  results.rows.item(i).se_ruj_beneficios_concedidos
                );

                setOutrosBeneficios(
                  results.rows.item(0).se_ruj_beneficios_concedidos_outros
                );
              }
            }
          );
        });
      }
    });
  }, []);

  //////////////primeira coisa que faz quando entra na tela:  faz um select das tabelas aux para carregar nos components //////////////
  async function loadStep3() {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from aux_cooperados", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItemSe_ruj_cooperados(temp);
        });
        tx.executeSql("select * from aux_associados", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
            //console.log( results.rows.item(i).nome);
          }
          setItemSe_ruj_associados(temp);
        });
        tx.executeSql("select * from aux_mao_de_obra", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
            //console.log( results.rows.item(i).nome);
          }
          setItemMao_de_obra(temp);
        });
        tx.executeSql(
          "select * from aux_tipo_beneficios_sociais",
          [],
          (tx, results) => {
            //var len = results.rows.length, i;
            var temp = [];
            //console.log(len);
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push({
                label: results.rows.item(i).descricao,
                value: results.rows.item(i).codigo,
              });
              //console.log( results.rows.item(i).nome);
            }
            setItemSe_ruj_beneficios_concedidos(temp);
          }
        );
      },
      (err) => {
        console.error("There was a problem with the tx", err);
        return true;
      },
      (success) => {
        console.log("all done", success);
      }
    );
  }

  // //função que aciona quando o estado do componente muda e seta os valores correspondente
  function onPressTitle(tabela, campo, valor, codigo) {
    db.transaction(
      (tx) => {
        const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_ruj_cod_processo = '${codigo}'`;
        console.log(query);
        tx.executeSql(query, [], (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            alert("INSERIDO COM SUCESSO");
          }
        });
      },
      (tx, err) => {
        console.error("error", err);
        return true;
      },
      (tx, success) => {
        console.log("tudo certo por aqui", success);
        //get_values(tabela, campo, sync);  ///esse aqui foi a tentativa
      }
    );

    var chaves = '"' + tabela + " " + campo + " " + valor + " " + codigo + '"';

    db.transaction((tx) => {
      //tx.executeSql("DROP TABLE log", []);
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
        console.log( log_delete);
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
    <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            width: '95%',
            left:11,
            height: 540,
            //marginLeft: 25,
            marginTop: 10,
            borderWidth: 1,
            borderColor: "rgba(74,144,226,1)",
            borderRadius: 3,
            flex:1
          }}
        >
          <View style={styles.rect2}>
            <Text style={styles.titulo}>
              NÚMERO DE EMPREGADOS E/OU ASSOCIADOS, COOPERADOS
            </Text>
          </View>
          <View style={styles.municipio}>
            <Text>Mão de Obra Empregada</Text>
          </View>

          <DropDownPicker
          zIndex={ openMao_de_obra ? 9999 : 0}
            style={styles.dropdown_style}
            open={openMao_de_obra}
            value={parseInt(valorMao_de_obra)}
            items={itemMao_de_obra}
            setOpen={setOpenMao_de_obra}
            setValue={setValorMao_de_obra}
            setItems={setItemMao_de_obra}
            onChangeValue={() =>
              onPressTitle(
                "se_ruj",
                "se_ruj_mao_de_obra",
                valorMao_de_obra,
                sync
              )
            }
            listMode="SCROLLVIEW"
            placeholder="Selecione::"
          />

          <View style={styles.municipio}>
            <Text>Número de Associados</Text>
          </View>

          <DropDownPicker
            style={styles.dropdown_style}
            open={openSe_ruj_associados}
            value={parseInt(valorSe_ruj_associados)}
            items={itemSe_ruj_associados}
            setOpen={setOpenSe_ruj_associados}
            setValue={setValorSe_ruj_associados}
            setItems={setItemSe_ruj_associados}
            onChangeValue={() =>
              onPressTitle(
                "se_ruj",
                "se_ruj_associados",
                valorSe_ruj_associados,
                sync
              )
            }
            listMode="SCROLLVIEW"
            placeholder="Selecione::"
          />

          <View style={styles.municipio}>
            <Text>Número de Cooperados</Text>
          </View>
          <DropDownPicker
            style={styles.dropdown_style}
            open={openSe_ruj_cooperados}
            value={parseInt(valorSe_ruj_cooperados)}
            items={itemSe_ruj_cooperados}
            setOpen={setOpenSe_ruj_cooperados}
            se_ruj_cooperados
            setValue={setValorSe_ruj_cooperados}
            setItems={setItemSe_ruj_cooperados}
            zIndex={ openSe_ruj_cooperados ? 9999 : 0}
            onChangeValue={() =>
              onPressTitle(
                "se_ruj",
                "se_ruj_cooperados",
                valorSe_ruj_cooperados,
                sync
                )
              }
              dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
              placeholder="Selecione::"
              />

        <View style={styles.politica}>
          <Text style={styles.titulo}>POLÍTICA DE BENFÍCIOS</Text>
        </View>
        <View style={styles.municipio}>
          <Text>Tipos de Benefícios Concedidos</Text>
        </View>
        <DropDownPicker
          style={styles.dropdown_style}
          open={openSe_ruj_beneficios_concedidos}
          value={parseInt(valorSe_ruj_beneficios_concedidos)}
          items={itemSe_ruj_beneficios_concedidos}
          setOpen={setOpenSe_ruj_beneficios_concedidos}
          setValue={setValorSe_ruj_beneficios_concedidos}
          setItems={setItemSe_ruj_beneficios_concedidos}
          onChangeValue={() =>
            onPressTitle(
              "se_ruj",
              "se_ruj_beneficios_concedidos",
              valorSe_ruj_beneficios_concedidos,
              sync
            )
          }
          //dropDownDirection="BOTTOM"
          listMode="SCROLLVIEW"
          placeholder="Selecione::"
        />
        <TextInput
          style={styles.inputOutrosBeneficios}
          onChangeText={setOutrosBeneficios}
          value={outrosBeneficios}
          onBlur={() =>
            onPressTitle(
              "se_ruj",
              "se_ruj_beneficios_concedidos_outros",
              outrosBeneficios,
              sync
            )
          }
          placeholder={"    Outros"}
        />
</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form6: {
    width: 340,
    height: 215,
    marginLeft: 25,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  form5: {
    // width: 340,
    // height: 340,
    // marginLeft: 25,
    // marginTop: 10,
    // borderWidth: 1,
    // borderColor: "rgba(74,144,226,1)",
    // borderRadius: 3,
  },
  municipio: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 15,
  },
  dropdown_style: {
    marginTop: 5,
    height: 40,
    width: "85%",
    marginLeft: 30,
    borderRadius: 0,
    borderWidth: 1,
  },
  input2: {
    height: 40,
    width: "85%",
    marginTop: 2,
    borderWidth: 1,
    backgroundColor: "white",
  },

  rect2: {
    width: '100%',
    height: 36,
    backgroundColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  politica:{
    marginTop:30,
    width: '100%',
    height: 36,
    backgroundColor: "rgba(74,144,226,1)",
    borderRadius: 3,
    zIndex:1
  },
  acessoText: {
    color: "#121212",
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 9,
  },
  titulo: {
    color: "white",
    marginLeft: 9,
    marginTop: 1,
  },
  abrangencia: {
    height: 40,
    width: "85%",
    marginLeft: 30,
    height: 40,
    marginTop: 20,
    borderRadius: 0,
    borderWidth: 1,
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

export default Step3;
