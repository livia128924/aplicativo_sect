import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { DatabaseConnection } from "../../../database/database";
import { TextInputMask } from "react-native-masked-text";
import Checkbox from "expo-checkbox";

const db = DatabaseConnection.getConnection();

const Step1 = () => {
  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [ value_se_rrj_descricao_ramo_atividades, set_se_rrj_descricao_ramo_atividades ] = useState("");
  const [aberto, setAberto] = useState(false);
  const [valor, setValor_municipios] = useState("");
  const [item, setItem_cidades] = useState([]);
  const [abertoAcesso, setAbertoAcesso] = useState(false);
  const [valorAcesso, setValorAcesso] = useState(null);
  const [itemAcesso, setItem_aux_acesso] = useState([]);

  const [aberto_se_rrj_inicio_atividades, setAberto_se_rrj_inicio_atividades] = useState(false);
  const [valor_se_rrj_inicio_atividades, setValor_se_rrj_inicio_atividades] = useState(null);
  const [item_se_rrj_inicio_atividades, setItem_se_rrj_inicio_atividades] = useState([]);

  const [aberto_se_rrj_setor_abrangencia, setAberto_se_rrj_setor_abrangencia] = useState(false);
  const [valor_se_rrj_setor_abrangencia, setValor_se_rrj_setor_abrangencia] =  useState(null);
  const [item_se_rrj_setor_abrangencia, setItem_se_rrj_setor_abrangencia] = useState([]);

  const [ aberto_se_rrj_natureza_atividades,   setAberto_se_rrj_natureza_atividades,] = useState(false);
  const [ valor_se_rrj_natureza_atividades,setValor_se_rrj_natureza_atividades] = useState(null);
  const [item_se_rrj_natureza_atividades, setItem_se_rrj_natureza_atividades] = useState([]);

  const [aberto_se_rrj_ramo_atividades, setAberto_se_rrj_ramo_atividades] = useState(false);
  const [valor_se_rrj_ramo_atividades, setValor_se_rrj_ramo_atividades] = useState(null);
  const [item_se_rrj_ramo_atividades, setItem_se_rrj_ramo_atividades] =useState([]);

  const [aberto_se_rrj_mao_de_obra, setAberto_se_rrj_mao_de_obra] =  useState(false);
  const [valor_se_rrj_mao_de_obra, setValor_se_rrj_mao_de_obra] =  useState(null);
  const [item_se_rrj_mao_de_obra, setItem_se_rrj_mao_de_obra] = useState([]);

  const [aberto_se_rrj_associados, setAberto_se_rrj_associados] = useState(false);
  const [valor_se_rrj_associados, setValor_se_rrj_associados] = useState(null);
  const [item_se_rrj_associados, setItem_se_rrj_associados] = useState([]);

  const [aberto_se_rrj_cooperados, setAberto_se_rrj_cooperados] =  useState(false);
  const [valor_se_rrj_cooperados, setValor_se_rrj_cooperados] = useState(null);
  const [item_se_rrj_cooperados, setItem_se_rrj_cooperados] = useState([]);

  useEffect(() => {
    var cod_processo = "";
    //carrega o valor do select na tela index.js
    AsyncStorage.getItem("pr_codigo").then((value) => {
      setSync(value);
      cod_processo = value;
      console.log("cod altoIncremento", cod_processo);
    });
    // AsyncStorage.getItem('codigo').then(codigo => {
    //   setDados_valor(codigo);
    // })
    loadDados();

    AsyncStorage.getItem("nome_tabela").then((tabela) => {
      if (tabela) {
        db.transaction((tx) => {
          tx.executeSql(
            "select * from " +
              tabela +
              " where se_rrj_cod_processo = '" +
              cod_processo +
              "'",
            [],
            (tx, results) => {
              var x = "";
              var row = [];
              for (let i = 0; i < results.rows.length; ++i) {
                setLocalizacao(results.rows.item(0).se_rrj_localizacao);

                setValor_municipios(results.rows.item(i).se_rrj_municipio);
                setValorAcesso(results.rows.item(i).se_rrj_acesso);
                setValor_se_rrj_inicio_atividades(results.rows.item(i).se_rrj_inicio_atividades);
                setValor_se_rrj_setor_abrangencia(results.rows.item(i).se_rrj_setor_abrangencia);
                setValor_se_rrj_natureza_atividades(results.rows.item(i).se_rrj_natureza_atividades);
                setValor_se_rrj_ramo_atividades(results.rows.item(i).se_rrj_ramo_atividades);
                set_se_rrj_descricao_ramo_atividades(results.rows.item(i).se_rrj_descricao_ramo_atividades);
                setValor_se_rrj_mao_de_obra(results.rows.item(i).se_rrj_mao_de_obra);
                setValor_se_rrj_associados(results.rows.item(i).se_rrj_associados);
                setValor_se_rrj_cooperados(results.rows.item(i).se_rrj_cooperados);

                // var x = results.rows.item(i).se_ruf_tipo_atividades;
                // valor_checked(x.split(","));
              }
            },
            function (tx, error) {
              alert("SELECT error: " + error);
            }
          );
        });
      } //
    });
  }, []);

  async function loadDados() {
    //////////////primeira coisa que faz quando entra na tela:  faz um select das tabelas aux para carregar nos components //////////////
    db.transaction(
      (tx) => {
        tx.executeSql("select * from aux_acesso ", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_aux_acesso(temp);
        });
        tx.executeSql("select * from cidades ", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).nome,
              value: results.rows.item(i).codigo,
            });
            //console.log( results.rows.item(i).nome);
          }
          setItem_cidades(temp);
        });
        tx.executeSql(
          "select * from aux_inicio_atividades ",
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
            setItem_se_rrj_inicio_atividades(temp);
          }
        );
        tx.executeSql(
          "select * from aux_setor_abrangencia ",
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
            setItem_se_rrj_setor_abrangencia(temp);
          }
        );
        tx.executeSql(
          "select * from aux_natureza_atividades ",
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
            setItem_se_rrj_natureza_atividades(temp);
          }
        );
        tx.executeSql(
          "select * from aux_ramo_atividades ",
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
            setItem_se_rrj_ramo_atividades(temp);
          }
        );
        tx.executeSql("select * from aux_mao_de_obra ", [], (tx, results) => {
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
          setItem_se_rrj_mao_de_obra(temp);
        });
      },
      (err) => {
        console.error("There was a problem with the tx", err);
        return true;
      },
      (success) => {}
    );
  }

  //função que aciona quando o estado do componente muda e seta os valores correspondente
  function onPressTitle(tabela, campo, valor, codigo) {
    db.transaction(
      (tx) => {
        const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_rrj_cod_processo = '${codigo}'`;
        //console.log(query);
        tx.executeSql(query, [], (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            alert("INSERIDO COM SUCESSO");
          }
        });
      },
      (tx, err) => {
        console.error("error", err.message);
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
      console.log(
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
          "', '1')"
      );
      tx.executeSql(log_delete, []);
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
      console.log(log_update);
      tx.executeSql(log_update, []);
    });
    AsyncStorage.setItem("nome_tabela", tabela);
    AsyncStorage.setItem("codigo", valor.toString());
  }
  return (
    <>
      <View style={styles.form_}>
        <View style={styles.rect2}>
          <Text style={{ color: "white", marginLeft: 15, marginTop: 5 }}>
            ÁREA DE ABRANGÊNCIA
          </Text>
        </View>

        <View style={styles.title_style}>
          <Text>MUNICIPIOS </Text>
        </View>

        <View style={{ alignSelf: "center", width: "85%" }}>
          <DropDownPicker
            style={styles.dropdown_style}
            open={aberto}
            value={parseInt(valor)}
            items={item}
            setOpen={setAberto}
            setValue={setValor_municipios}
            setItems={setItem_cidades} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle("se_rrj", "se_rrj_municipio", valor, sync)
            }
            placeholder={"Municipios"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>
        <View style={styles.title_style}>
          <Text>ACESSO</Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
          <DropDownPicker
            style={styles.dropdown_style}
            open={abertoAcesso}
            value={parseInt(valorAcesso)}
            items={itemAcesso}
            setOpen={setAbertoAcesso}
            setValue={setValorAcesso}
            setItems={setItem_aux_acesso} //aux_acesso
            onChangeValue={() =>
              onPressTitle("se_rrj", "se_rrj_acesso", valorAcesso, sync)
            }
            listMode="SCROLLVIEW"
            placeholder="acesso"
          />
        </View>
        <View style={styles.title_style}>
          <Text>LOCALIZAÇÃO</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={setLocalizacao}
            value={localizacao}
            onBlur={() =>
              onPressTitle("se_rrj", "se_rrj_localizacao", localizacao, sync)
            }
            placeholder={"    Localização"}
          />
        </View>
      </View>
      {/* //////////////////////////////////////////////////// */}
      <View style={styles.form_titular}>
        <View style={styles.rect2}>
          <Text style={{ color: "white", marginLeft: 15, marginTop: 5 }}>
            INICIO DAS ATIVIDADES
          </Text>
        </View>

        <View style={styles.title_style}>
          <Text>Inicio das atividades </Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
          <DropDownPicker
            style={styles.dropdown_style}
            open={aberto_se_rrj_inicio_atividades}
            value={valor_se_rrj_inicio_atividades}
            items={item_se_rrj_inicio_atividades}
            setOpen={setAberto_se_rrj_inicio_atividades}
            setValue={setValor_se_rrj_inicio_atividades}
            setItems={setItem_se_rrj_inicio_atividades} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle(
                "se_rrj",
                "rq_sexo",
                valor_se_rrj_inicio_atividades,
                sync
              )
            }
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>

        <View style={styles.title_style}>
          <Text>Setor de Abrangência </Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
          <DropDownPicker
            zIndex={aberto_se_rrj_setor_abrangencia ? 9999 : 0}
            style={styles.dropdown_style}
            open={aberto_se_rrj_setor_abrangencia}
            value={valor_se_rrj_setor_abrangencia}
            items={item_se_rrj_setor_abrangencia}
            setOpen={setAberto_se_rrj_setor_abrangencia}
            setValue={setValor_se_rrj_setor_abrangencia}
            setItems={setItem_se_rrj_setor_abrangencia} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle(
                "se_rrj",
                "se_rrj_setor_abrangencia",
                valor_se_rrj_setor_abrangencia,
                sync
              )
            }
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>

        <View style={styles.title_style}>
          <Text>Natureza da Atividade</Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
          <DropDownPicker
            zIndex={aberto_se_rrj_natureza_atividades ? 9999 : 0}
            style={styles.dropdown_style}
            open={aberto_se_rrj_natureza_atividades}
            value={valor_se_rrj_natureza_atividades}
            items={item_se_rrj_natureza_atividades}
            setOpen={setAberto_se_rrj_natureza_atividades}
            setValue={setValor_se_rrj_natureza_atividades}
            setItems={setItem_se_rrj_natureza_atividades} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle(
                "se_rrj",
                "se_rrj_natureza_atividades",
                valor_se_rrj_natureza_atividades,
                sync
              )
            }
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>

        <View style={styles.title_style}>
          <Text>Ramo de Atividade</Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
        <DropDownPicker
          style={styles.dropdown_style}
          // zIndex={aberto_se_rrj_ramo_atividades ? 9999 : 0}
          open={aberto_se_rrj_ramo_atividades}
          value={valor_se_rrj_ramo_atividades}
          items={item_se_rrj_ramo_atividades}
          setOpen={setAberto_se_rrj_ramo_atividades}
          setValue={setValor_se_rrj_ramo_atividades}
          setItems={setItem_se_rrj_ramo_atividades} //cidades
          // zIndex={9999}
          dropDownDirection="TOP"
          listMode="SCROLLVIEW"
          onChangeValue={() =>
            onPressTitle(
              "se_rrj",
              "se_rrj_ramo_atividades",
              valor_se_rrj_ramo_atividades,
              sync
            )
          }
          placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
        />
</View>
        <View style={styles.title_style}>
          <Text>Descricao </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_se_rrj_descricao_ramo_atividades}
            value={value_se_rrj_descricao_ramo_atividades}
            onBlur={() =>
              onPressTitle(
                "se_rrj",
                "se_rrj_descricao_ramo_atividades",
                value_se_rrj_descricao_ramo_atividades,
                sync
              )
            }
            placeholder={"    "}
          />
        </View>
      </View>
      {/* ////////////////////////////////// */}
      <View style={styles.form_titular}>
        <View style={styles.rect2}>
          <Text style={{ color: "white", marginLeft: 15, marginTop: 5 }}>
            NÚMERO DE EMPREGADOS E/OU ASSOCIADOS, COOPERADOS
          </Text>
        </View>

        <View style={styles.title_style}>
          <Text>Mão de Obra Empregada</Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
        <DropDownPicker
          style={styles.dropdown_style}
          // zIndex={aberto_se_rrj_ramo_atividades ? 9999 : 0}
          open={aberto_se_rrj_mao_de_obra}
          value={valor_se_rrj_mao_de_obra}
          items={item_se_rrj_mao_de_obra}
          setOpen={setAberto_se_rrj_mao_de_obra}
          setValue={setValor_se_rrj_mao_de_obra}
          setItems={setItem_se_rrj_mao_de_obra} //cidades
          // zIndex={9999}
          dropDownDirection="TOP"
          listMode="SCROLLVIEW"
          onChangeValue={() =>
            onPressTitle(
              "se_rrj",
              "se_rrj_mao_de_obra",
              valor_se_rrj_mao_de_obra,
              sync
            )
          }
          placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
        />
</View>
        <View style={styles.title_style}>
          <Text>Número de Associados </Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
        <DropDownPicker
          style={styles.dropdown_style}
          // zIndex={aberto_se_rrj_ramo_atividades ? 9999 : 0}
          open={aberto_se_rrj_associados}
          value={valor_se_rrj_associados}
          items={item_se_rrj_associados}
          setOpen={setAberto_se_rrj_associados}
          setValue={setValor_se_rrj_associados}
          setItems={setItem_se_rrj_associados} //cidades
          // zIndex={9999}
          dropDownDirection="TOP"
          listMode="SCROLLVIEW"
          onChangeValue={() =>
            onPressTitle(
              "se_rrj",
              "se_rrj_associados",
              valor_se_rrj_associados,
              sync
            )
          }
          placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
        />
        </View>
        <View style={styles.title_style}>
          <Text>Número de Cooperados</Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
        <DropDownPicker
          style={styles.dropdown_style}
          // zIndex={aberto_se_rrj_ramo_atividades ? 9999 : 0}
          open={aberto_se_rrj_cooperados}
          value={valor_se_rrj_cooperados}
          items={item_se_rrj_cooperados}
          setOpen={setAberto_se_rrj_cooperados}
          setValue={setValor_se_rrj_cooperados}
          setItems={setItem_se_rrj_cooperados} //cidades
          dropDownDirection="TOP"
          listMode="SCROLLVIEW"
          onChangeValue={() =>
            onPressTitle(
              "se_rrj",
              "se_rrj_cooperados",
              valor_se_rrj_cooperados,
              sync
            )
          }
          placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
        />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    //alignContent:'space-around',
  },
  checkboxGroup: {
    // backgroundColor:'red',
    //height:20,
    alignItems: "center",
  },
  checkboxlabel: {
    width: "100%",
    //textAlign:'center',
    flexDirection: "row",
    height: 45,
    alignItems: "center",
    display: "flex",
    justifyContent: "space-evenly",
  },
  form_: {
    width: "95%",
    height: "auto",
    paddingBottom: 10,
    marginTop: 10,
    //marginLeft: 20,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  form_titular: {
    width: "95%",
    //left: 11,
    height: "auto",
    paddingBottom: 10,
    marginTop: 15,
    //   marginRight: 25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  input_style: {
    height: 40,
    width: "85%",
    marginTop: 10,
    //marginLeft: 10,
    //marginRight:25,
    borderWidth: 1,
    backgroundColor: "white",
  },
  form: {
    width: 340,
    height: 370,
    //marginLeft: 25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  rect2: {
    width: "100%",
    height: "auto",
    paddingBottom: 10,
    backgroundColor: "rgba(74,144,226,1)",
    borderRadius: 3,
    //color:  'white',
  },
  title_style: {
    color: "#121212",
    marginLeft: 40,
    marginTop: 15,
  },
  dropdown_style: {
    height: 40,
    //width: "85%",
    //marginLeft: 30,
    //height: 40,
    marginTop: 5,
    borderRadius: 0,
    borderWidth: 1,
  },
});

export default Step1;
