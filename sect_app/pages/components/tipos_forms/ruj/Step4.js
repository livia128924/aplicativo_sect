import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";
import { DatabaseConnection } from "../../../database/database";
const db = DatabaseConnection.getConnection();

const Step4 = (props) => {
  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");
  const [openSe_ruj_tipo_construcao, setOpenSe_ruj_tipo_construcao] =
    useState(false);
  const [valorSe_ruj_tipo_construcao, setValorSe_ruj_tipo_construcao] =
    useState(null);
  const [itemSe_ruj_tipo_construcao, setItemSe_ruj_tipo_construcao] = useState([
    { label: "950", value: "950" },
    { label: "1050", value: "1050" },
  ]);
  const [openSe_ruj_numero_comodos, setOpenSe_ruj_numero_comodos] =
    useState(false);
  const [valorSe_ruj_numero_comodos, setValorSe_ruj_numero_comodos] =
    useState(null);
  const [itemSe_ruj_numero_comodos, setItemSe_ruj_numero_comodos] = useState([
    { label: "147", value: "147" },
    { label: "258", value: "258" },
  ]);
  const [openSe_ruj_numero_pisos, setOpenSe_ruj_numero_pisos] = useState(false);
  const [valorSe_ruj_numero_pisos, setValorSe_ruj_numero_pisos] =
    useState(null);
  const [itemSe_ruj_numero_pisos, setItemSe_ruj_numero_pisos] = useState([
    { label: "123", value: "123" },
    { label: "456", value: "456" },
  ]);

  const [itemAbrangencia, setItem_aux_setor_abrangencia] = useState([]);

  const [openSe_ruj_estado_conservacao, setOpenSe_ruj_estado_conservacao] =
    useState(false);
  const [valorSe_ruj_estado_conservacao, setValorSe_ruj_estado_conservacao] =
    useState(null);
  const [itemSe_ruj_estado_conservacao, setItemSe_ruj_estado_conservacao] =
    useState([
      { label: "123", value: "123" },
      { label: "456", value: "456" },
    ]);
  const [outros_Se_ruj_tipo_construcao, setOutros_Se_ruj_tipo_construcao] =
    useState("");

  const [se_ruj_material_cobertura, setSe_ruj_material_cobertura] = useState(
    []
  ); ///checkbox

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

    loadStep4();

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
              var x = "";
              var row = [];
              for (let i = 0; i < results.rows.length; ++i) {
                console.log(results.rows.item(0).se_ruj_acesso);

                setValorSe_ruj_tipo_construcao(
                  results.rows.item(i).se_ruj_tipo_construcao
                );

                setOutros_Se_ruj_tipo_construcao(
                  results.rows.item(0).se_ruj_tipo_construcao_outros
                );

                setValorSe_ruj_numero_comodos(
                  results.rows.item(i).se_ruj_numero_comodos
                );

                setValorSe_ruj_numero_pisos(
                  results.rows.item(i).se_ruj_numero_pisos
                );

                setValorSe_ruj_estado_conservacao(
                  results.rows.item(i).se_ruj_estado_conservacao
                );

                x = results.rows.item(i).se_ruj_material_cobertura;
                valor_checked(x.split(","));
              }
            }
          );
        });
      } //
    });
  }, []);

  async function loadStep4() {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select * from aux_tipo_construcao",
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
            }
            setItemSe_ruj_tipo_construcao(temp);
          }
        );
        tx.executeSql("select * from aux_comodos", [], (tx, results) => {
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
          setItemSe_ruj_numero_comodos(temp);
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
            //console.log( results.rows.item(i).nome);
          }
          setItemSe_ruj_numero_pisos(temp);
        });
        tx.executeSql(
          ////nao mecher
          "select * from aux_cobertura",
          [],
          (tx, results) => {
            //var len = results.rows.length, i;
            var temp = [];
            //console.log(len);
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push({
                label: results.rows.item(i).descricao,
                id: results.rows.item(i).codigo,
                isChecked: false,
              });
              //console.log( results.rows.item(i).nome);
            }
            setSe_ruj_material_cobertura(temp);
          }
        );
        tx.executeSql(
          "select * from aux_estado_conservacao",
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
            setItemSe_ruj_estado_conservacao(temp);
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
        //console.log(query);
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

  const handleChange = (id) => {
    const newState = se_ruj_material_cobertura.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setSe_ruj_material_cobertura(newState); // atualiza o estado
  };

  function muda() {
    //await api
    var str_valores = [];

    se_ruj_material_cobertura
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
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
          //console.log(ruj_sanitario);
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_ruj_material_cobertura(x);
      });
    });
  }

  return (
    <>
      <View style={styles.form7}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>INFRAESTRUTURA DO IMÓVEL</Text>
        </View>
        <View style={styles.title_style}>
          <Text>Tipo de Construção</Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
        <DropDownPicker
          style={styles.dropdown_style}
          open={openSe_ruj_tipo_construcao}
          value={parseInt(valorSe_ruj_tipo_construcao)}
          items={itemSe_ruj_tipo_construcao}
          setOpen={setOpenSe_ruj_tipo_construcao}
          setValue={setValorSe_ruj_tipo_construcao}
          setItems={setItemSe_ruj_tipo_construcao}
          zIndex={ openSe_ruj_tipo_construcao ? 9999 : 0}
          onChangeValue={() =>
            onPressTitle(
              "se_ruj",
              "se_ruj_tipo_construcao",
              valorSe_ruj_tipo_construcao,
              sync
            )
          }
          listMode="SCROLLVIEW"
          placeholder="Selecione::"
        />
        </View>
        <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.inputOutrosBeneficios}
          onChangeText={setOutros_Se_ruj_tipo_construcao}
          value={outros_Se_ruj_tipo_construcao}
          onBlur={() =>
            onPressTitle(
              "se_ruj",
              "se_ruj_tipo_construcao_outros",
              outros_Se_ruj_tipo_construcao,
              sync
            )
          }
          placeholder={"    Outros"}
        />
        </View>

        <View style={styles.title_style}>
          <Text>Nº de Cômodos</Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
        <DropDownPicker
          style={styles.dropdown_style}
          open={openSe_ruj_numero_comodos}
          value={parseInt(valorSe_ruj_numero_comodos)}
          items={itemSe_ruj_numero_comodos}
          setOpen={setOpenSe_ruj_numero_comodos}
          setValue={setValorSe_ruj_numero_comodos}
          setItems={setItemSe_ruj_numero_comodos}
          zIndex={ openSe_ruj_numero_comodos ? 9999 : 0}
          onChangeValue={() =>
            onPressTitle(
              "se_ruj",
              "se_ruj_numero_comodos",
              valorSe_ruj_numero_comodos,
              sync
            )
          }
          listMode="SCROLLVIEW"
          placeholder="Selecione::"
        />
        </View>
        <View style={styles.title_style}>
          <Text>Nº de Pisos</Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
        <DropDownPicker
          style={styles.dropdown_style}
          open={openSe_ruj_numero_pisos}
          value={parseInt(valorSe_ruj_numero_pisos)}
          items={itemSe_ruj_numero_pisos}
          setOpen={setOpenSe_ruj_numero_pisos}
          setValue={setValorSe_ruj_numero_pisos}
          setItems={setItemSe_ruj_numero_pisos}
          zIndex={ openSe_ruj_numero_pisos ? 9999 : 0}
          onChangeValue={() =>
            onPressTitle(
              "se_ruj",
              "se_ruj_numero_pisos",
              valorSe_ruj_numero_pisos,
              sync
            )
          }
          listMode="SCROLLVIEW"
          placeholder="Selecione::"
        />
        </View>
        <View style={styles.title_style}>
          <Text>Material da Corbertura</Text>
        </View>
        <View style={styles.checkboxlabel}>
          {[...se_ruj_material_cobertura].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange(item.id);
                  onPressTitle(
                    "se_ruj",
                    "se_ruj_material_cobertura",
                    muda(),
                    sync
                  );
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.title_style}>
          <Text>Estado de Conservação do Imóvel</Text>
        </View>
        <View>
        <View style={{ alignSelf: "center", width: "85%" }}>
          <DropDownPicker
            style={styles.dropdown_style}
            open={openSe_ruj_estado_conservacao}
            value={parseInt(valorSe_ruj_estado_conservacao)}
            items={itemSe_ruj_estado_conservacao}
            setOpen={setOpenSe_ruj_estado_conservacao}
            setValue={setValorSe_ruj_estado_conservacao}
            setItems={setItemSe_ruj_estado_conservacao}
            onChangeValue={() =>
              onPressTitle(
                "se_ruj",
                "se_ruj_estado_conservacao",
                valorSe_ruj_estado_conservacao,
                sync
              )
            }
            listMode="SCROLLVIEW"
            placeholder="Selecione::"
          />
          </View>
        </View>
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
    width: "95%",
    height: "auto",
    paddingBottom: 10,
    marginTop:10,
    //marginLeft: 20,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  title_style: {
    color: "#121212",
    marginLeft: 40,
    marginTop: 15,
  },
  dropdown_style: {
    height: 40,
    marginTop: 5,
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
    marginTop: 10,
    //marginLeft: 10,
    //marginRight:25,
    borderWidth: 1,
    backgroundColor: "white",
  },
});

export default Step4;
