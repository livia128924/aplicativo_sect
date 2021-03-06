import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import { DatabaseConnection } from "../../../database/database";
import Checkbox from "expo-checkbox";
import { TextInputMask } from "react-native-masked-text";
import DropDownPicker from "react-native-dropdown-picker";
const db = DatabaseConnection.getConnection();

const Step2 = (props) => {
  const [sync, setSync] = useState("");
  const [se_rrj_material_cobertura, setItem_se_rrj_material_cobertura] = useState([]);
  const [aberto_se_rrj_beneficios_concedidos, setAberto_se_rrj_beneficios_concedidos] = useState(false);
  const [valor_se_rrj_beneficios_concedidos, setValor_se_rrj_beneficios_concedidos] = useState(null);
  const [item_se_rrj_beneficios_concedidos, setItem_se_rrj_beneficios_concedidos] = useState([]);

  const [aberto_se_rrj_tipo_construcao, setAberto_se_rrj_tipo_construcao] = useState(false);
  const [valor_se_rrj_tipo_construcao, setValor_se_rrj_tipo_construcao] = useState(null);
  const [item_se_rrj_tipo_construcao, setItem_se_rrj_tipo_construcao] = useState([]);

  const [aberto_se_rrj_numero_comodos, setAberto_se_rrj_numero_comodos] = useState(false);
  const [valor_se_rrj_numero_comodos, setValor_se_rrj_numero_comodos] = useState(null);
  const [item_se_rrj_numero_comodos, setItem_se_rrj_numero_comodos] = useState([]);

  const [aberto_se_rrj_numero_pisos, setAberto_se_rrj_numero_pisos] = useState(false);
  const [valor_se_rrj_numero_pisos, setValor_se_rrj_numero_pisos] = useState(null);
  const [item_se_rrj_numero_pisos, setItem_se_rrj_numero_pisos] = useState([]);

  const [aberto_se_rrj_estado_conservacao, setAberto_se_rrj_estado_conservacao] = useState(false);
  const [valor_se_rrj_estado_conservacao, setValor_se_rrj_estado_conservacao] = useState(null);
  const [item_se_rrj_estado_conservacao, setItem_se_rrj_estado_conservacao] = useState([]);

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

    loadStep2();

    AsyncStorage.getItem("nome_tabela").then((tabela) => {
      //console.log(cod_processo);
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
              var row = [];

              for (let i = 0; i < results.rows.length; ++i) {

                setValor_se_rrj_beneficios_concedidos(
                  results.rows.item(0).se_rrj_beneficios_concedidos
                );

                setValor_se_rrj_tipo_construcao(
                  results.rows.item(0).se_rrj_tipo_construcao
                );

                setValor_se_rrj_numero_comodos(
                  results.rows.item(0).se_rrj_numero_comodos
                );
                setValor_se_rrj_numero_pisos(
                  results.rows.item(0).se_rrj_numero_pisos
                );
                setValor_se_rrj_estado_conservacao(
                  results.rows.item(0).se_rrj_estado_conservacao
                );

                //console.log(typeof (results.rows.item(i).se_duf_municipio));
                //valor(row);

                var x = results.rows.item(i).se_rrj_material_cobertura;
                valor_checked(x.split(","));
                console.log("asdasf",x);
              }
            }
          );
        });
      } //
    });
  }, []);

  // function mask() {
  //   unmasked.getRawValue()
  // }

  //////////////primeira coisa que faz quando entra na tela:  faz um select das tabelas aux para carregar nos components //////////////
  async function loadStep2() {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from aux_politica_de_beneficios", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_se_rrj_beneficios_concedidos(temp);
        });
        tx.executeSql("select * from aux_tipo_construcao", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_se_rrj_tipo_construcao(temp);
        });
        tx.executeSql("select * from aux_comodos", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_se_rrj_numero_comodos(temp);
        });
        tx.executeSql("select * from aux_pisos", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_se_rrj_numero_pisos(temp);
        });
        tx.executeSql("select * from aux_cobertura", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              id: results.rows.item(i).codigo,
              isChecked: false
            });
          }
          setItem_se_rrj_material_cobertura(temp);
        });
        tx.executeSql("select * from aux_estado_conservacao", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
             // isChecked: false
            });
          }
          setItem_se_rrj_estado_conservacao(temp);
        });
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

  //fun????o que aciona quando o estado do componente muda e seta os valores correspondente
  function onPressTitle(tabela, campo, valor, codigo) {

      db.transaction((tx) => {
          const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_rrj_cod_processo = '${codigo}'`;
          console.log(query);
          tx.executeSql(query, [], (tx, results) => {
              for (let i = 0; i < results.rows.length; ++i) {
                  alert("INSERIDO COM SUCESSO");
              }
          });

      }, (tx, err) => {
          console.error("error", err);
          return true;
      }, (tx, success) => {
          console.log("tudo certo por aqui", success);
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

  const handleChange = (id) => {
    const newState = se_rrj_material_cobertura.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na fun????o
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });
    //console.log("newState",newState);
    setItem_se_rrj_material_cobertura(newState); // atualiza o estado
  };

  function muda() {
    //await api
    var str_valores = [];

    se_rrj_material_cobertura
      .filter((value) => value.isChecked === true)
      .map((item) => {
        //console.log(item);
        str_valores.push(item.id);
      });
   //console.log("muda", str_valores);
    return str_valores.join(",");
  }


  function valor_checked(material_cobertura) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_cobertura", [], (tx, results) => {
        //var len = results.rows.length, i;
        var temp = [];
        //console.log(len);
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push({
            label: results.rows.item(i).descricao,
            id: results.rows.item(i).codigo,
            isChecked: false,
          });
        }
        //console.log(temp);
        let x = temp;

        //console.log(x);
        material_cobertura.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setItem_se_rrj_material_cobertura(x);
      });
    });
  }


  return (
    <>
      <View style={styles.form3}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>POL??TICA DE BENF??CIOS</Text>
        </View>

        <View style={styles.title_style}>
          <Text>Tipos de Benef??cios Concedidos</Text>
        </View>

        <View style={{ alignSelf: "center", width: "85%" }}>
        <DropDownPicker
            zIndex={aberto_se_rrj_beneficios_concedidos ? 9999 : 0}
            style={styles.dropdown_style}
            open={aberto_se_rrj_beneficios_concedidos}
            value={valor_se_rrj_beneficios_concedidos}
            items={item_se_rrj_beneficios_concedidos}
            setOpen={setAberto_se_rrj_beneficios_concedidos}
            setValue={setValor_se_rrj_beneficios_concedidos}
            setItems={setItem_se_rrj_beneficios_concedidos} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            dropDownDirection="TOP"
            onChangeValue={() =>
              onPressTitle(
                "se_rrj",
                "se_rrj_beneficios_concedidos",
                valor_se_rrj_beneficios_concedidos,
                sync
              )}
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
          />
          </View>
      </View>

      <View style={styles.form4}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>INFRAESTRUTURA DO IM??VEL</Text>
        </View>
        <View style={styles.title_style}>
          <Text>Tipo de Constru????o</Text>
        </View>

        <View style={{ alignSelf: "center", width: "85%" }}>
          <DropDownPicker
            zIndex={aberto_se_rrj_tipo_construcao ? 9999 : 0}
            style={styles.dropdown_style}
            open={aberto_se_rrj_tipo_construcao}
            value={valor_se_rrj_tipo_construcao}
            items={item_se_rrj_tipo_construcao}
            setOpen={setAberto_se_rrj_tipo_construcao}
            setValue={setValor_se_rrj_tipo_construcao}
            setItems={setItem_se_rrj_tipo_construcao} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle(
                "se_rrj",
                "se_rrj_tipo_construcao",
                valor_se_rrj_tipo_construcao,
                sync
              )
            }
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>
        <View style={styles.title_style}>
          <Text>N?? de C??modos</Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
        <DropDownPicker
            zIndex={aberto_se_rrj_numero_comodos ? 9999 : 0}
            style={styles.dropdown_style}
            open={aberto_se_rrj_numero_comodos}
            value={valor_se_rrj_numero_comodos}
            items={item_se_rrj_numero_comodos}
            setOpen={setAberto_se_rrj_numero_comodos}
            setValue={setValor_se_rrj_numero_comodos}
            setItems={setItem_se_rrj_numero_comodos} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle(
                "se_rrj",
                "se_rrj_numero_comodos",
                valor_se_rrj_numero_comodos,
                sync
              )
            }
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
          />
</View>
        <View style={styles.title_style}>
          <Text>N?? de Pisos</Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
        <DropDownPicker
            zIndex={aberto_se_rrj_numero_pisos ? 9999 : 0}
            style={styles.dropdown_style}
            open={aberto_se_rrj_numero_pisos}
            value={valor_se_rrj_numero_pisos}
            items={item_se_rrj_numero_pisos}
            setOpen={setAberto_se_rrj_numero_pisos}
            setValue={setValor_se_rrj_numero_pisos}
            setItems={setItem_se_rrj_numero_pisos} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle(
                "se_rrj",
                "se_rrj_numero_pisos",
                valor_se_rrj_numero_pisos,
                sync
              )
            }
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
          />
</View>
        <View style={styles.title_style}>
          <Text>Material da Cobertura</Text>
        </View>

          <View style={styles.checkboxlabel}>
            {[...se_rrj_material_cobertura].map((item, index) => (
              <View style={styles.checkboxGroup} key={item.id}>
                <Checkbox
                  style={styles.checkbox}
                  value={item.isChecked}
                  onValueChange={() => {
                    handleChange(item.id);
                    onPressTitle("se_rrj", "se_rrj_material_cobertura", muda(), sync);
                  }}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>

        <View style={styles.title_style}>
          <Text>Estado de Conserva????o do Im??vel</Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
        <DropDownPicker
            zIndex={aberto_se_rrj_estado_conservacao ? 9999 : 0}
            style={styles.dropdown_style}
            open={aberto_se_rrj_estado_conservacao}
            value={valor_se_rrj_estado_conservacao}
            items={item_se_rrj_estado_conservacao}
            setOpen={setAberto_se_rrj_estado_conservacao}
            setValue={setValor_se_rrj_estado_conservacao}
            setItems={setItem_se_rrj_estado_conservacao} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle(
                "se_rrj",
                "se_rrj_estado_conservacao",
                valor_se_rrj_estado_conservacao,
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
  checkboxGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxlabel: {
    marginTop: 5,
    marginLeft: 30,
  },

  form4: {
    width: "95%",
    height: 'auto',
    paddingBottom:10,
    //marginLeft: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  form3: {
  width: "95%",
    height: "auto",
    paddingBottom: 10,
    marginTop: 10,
    //marginLeft: 20,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  rect2: {
    width: "100%",
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

export default Step2;
