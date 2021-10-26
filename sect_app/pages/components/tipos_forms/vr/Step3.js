import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
  Image,
  Pressable,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Card, Button, Title, DataTable } from "react-native-paper";
import { Button as Button_native } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DatabaseConnection } from "../../../database/database";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInputMask } from "react-native-masked-text";
const db = DatabaseConnection.getConnection();

const Step3 = ({ navigation, codigo_pr }) => {
  const [sync, setSync] = useState("");
  const [nome, setNome] = useState("");

  const [c_t_form, setC_t_form] = useState({
    codigo: 0,
    descricao: "",
    area: "",
    tratos_culturais: "",
    idade: "",
    producao: "",
    unidade: "",
    acao: "Cadastrar",
  });
  const [a_form, set_a_form] = useState({
    codigo: 0,
    descricao: "",
    cabecas: "",
    finalidades: "",
    acao: "Cadastrar",
  });
  const [ext_form, set_ext_form] = useState({
    codigo: 0,
    descricao: "",
    area: "",
    producao: "",
    unidade: "",
    observacoes: "",
    acao: "Cadastrar",
  });
  const [tipos, setTipos] = useState({
    ct: "ct",
    cp: "",
    p: "",
  });

  const [tipo, setTipo] = useState([{ ct: "CULTURAS TEMPORÁRIAS", cp: "CULTURAS PERMANENTES", p: "PASTAGENS" }]);

  const [tipoTitle, setTipo_title] = useState("");

  const [dados_valor, setDados_valor] = useState([]);
  const [vr_area_total_explorada, set_vr_area_total_explorada] = useState("");
  const [vr_finalidades_tipo, set_vr_finalidades_tipo] = useState("");
  const [vr_finalidades_observacao, set_vr_finalidades_observacao] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible_animais, setModalVisible_animais] = useState(false);
  const [modalVisible_ext, setModalVisible_ext] = useState(false);

  const [cod_req, setCod_req] = useState("");
  const [listItems, setListItems] = useState([]);
  const [listItems_cp, setListItems_cp] = useState([]);
  const [listItems_p, setListItems_p] = useState([]);
  const [listItems_ext, setListItems_ext] = useState([]);
  const [listItems_animais, setListItems_animais] = useState([]);


  AsyncStorage.getItem("codigo").then((codigo) => {
    setDados_valor(codigo);
  });

  useEffect(() => {
    var cod_processo = "";
    //carrega o valor do select na tela index.js
    AsyncStorage.getItem("pr_codigo").then((value) => {
      setSync(value);
      cod_processo = value;
    });

    tipos_pastegens();

    AsyncStorage.getItem("nome_tabela").then((tabela) => {
      if (tabela) {
        db.transaction((tx) => {
          tx.executeSql(
            "select * from " + tabela + " where vr_cod_processo = '" +  codigo_pr +  "'",  [],
            (tx, results) => {
              var row = [];
              for (let i = 0; i < results.rows.length; ++i) {
               // console.log(results.rows.item(0).vr_acesso);
               set_vr_area_total_explorada(
                  results.rows.item(0).vr_area_total_explorada
                );
                set_vr_finalidades_tipo(
                  results.rows.item(0).vr_finalidades_tipo
                );
                set_vr_finalidades_observacao(
                  results.rows.item(0).vr_finalidades_observacao
                );

              }
            }
          );
        });
      } //
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT *, p.codigo AS pr_codigo FROM pr p LEFT JOIN rq r ON r.codigo = p.pr_requerente where p.codigo = '" +
          cod_processo +
          "'",
        [],
        (tx, results) => {
          var row = [];
          for (let i = 0; i < results.rows.length; ++i) {
            setCod_req(results.rows.item(i).pr_requerente);
          }
        },
        function (tx, error) {
          alert("SELECT error: " + error.message);
        }
      );
    });

  }, []);

async function tipos_pastegens(){

//   var tipo_culturais = "";
//  await AsyncStorage.getItem("tipo_culturais").then((tipos) => {
//     console.log(tipos);
//    tipo_culturais = tipos;
//   });

 db.transaction((tx) => {

       tx.executeSql(
        // and tipo = '" + tipos_culturais + "'
        "select * from aux_uea_eaeof where processo = '" + codigo_pr + "' and tipo = 'ct' ",
        [],
        (tx, results) => {
          //var x = "";
          //console.log(results.rows.length);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            ///console.log(results.rows.length);
            temp.push(results.rows.item(i));
          }
          setListItems(temp);
          //console.log( "select * from aux_uea_eaeof where processo = '" + sync + "' and tipo = '" + tipo_culturais + "'");
        },
        function (tx, error) {
          alert("SELECT error: " + error.message);
        }
        );

        tx.executeSql(
          // and tipo = '" + tipos_culturais + "'
          "select * from aux_uea_eaeof where processo = '" + codigo_pr + "' and tipo = 'cp'",
          [],
          (tx, results) => {
            //var x = "";
            //console.log(results.rows.length);
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              ///console.log(results.rows.length);
              temp.push(results.rows.item(i));
            }
            setListItems_cp(temp);
          },
          function (tx, error) {
            alert("SELECT error: " + error.message);
          }
          );

        tx.executeSql(
          // and tipo = '" + tipos_culturais + "'
          "select * from aux_uea_eaeof where processo = '" + codigo_pr + "' and tipo = 'p'",
          [],
          (tx, results) => {
            //var x = "";
           // console.log(results.rows.length);
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              ///console.log(results.rows.length);
              temp.push(results.rows.item(i));
            }
            setListItems_p(temp);
            //console.log( "select * from aux_uea_eaeof where processo = '" + sync + "' and tipo = '" + tipo_culturais + "'");
          },
          function (tx, error) {
            alert("SELECT error: " + error.message);
          }
          );

      tx.executeSql(
        "select * from aux_uea_animais where processo = '" + codigo_pr + "'",
        [],
        (tx, results) => {
          //var x = "";
          // console.log(results.rows.length);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            //console.log(results.rows);
            temp.push(results.rows.item(i));
          }
          setListItems_animais(temp);
        },
        function (tx, error) {
          alert("SELECT error: " + error.message);
        }
      );

      tx.executeSql(
        "select * from aux_uea_extrativismo where processo = '" + codigo_pr + "'",
        [],
        (tx, results) => {
          //var x = "";
          // console.log(results.rows.length);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            //console.log(results.rows);
            temp.push(results.rows.item(i));
          }
          setListItems_ext(temp);
        },
        function (tx, error) {
          alert("SELECT error: " + error.message);
        }
      );


  });
}


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
    tx.executeSql(log_update, [], (tx, results) => {});
  });
  AsyncStorage.setItem("nome_tabela", tabela);
  AsyncStorage.setItem("codigo", valor.toString());
 }

//  function log_table(tabela_log, campo_log, valor_log, codigo_log){

//   var chaves = '"' + tabela + " " + campo + " " + valor + " " + codigo + '"';
//   db.transaction((tx) => {
//     //tx.executeSql("DROP TABLE log", []);
//     const log_delete =
//       "INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" +
//       chaves +
//       " ,'" +
//       tabela +
//       "', '" +
//       campo +
//       "', '" +
//       valor +
//       "', '" +
//       codigo +
//       "', '1')";
//     console.log(
//       "INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" +
//         chaves +
//         " ,'" +
//         tabela +
//         "', '" +
//         campo +
//         "', '" +
//         valor +
//         "', '" +
//         codigo +
//         "', '1')"
//     );
//     tx.executeSql(log_delete, []);
//   });
//   db.transaction((tx) => {
//     const log_update =
//       "REPLACE INTO log (chave, tabela, campo, valor, cod_processo, situacao) VALUES  (" +
//       chaves +
//       ", '" +
//       tabela +
//       "', '" +
//       campo +
//       "', '" +
//       valor +
//       "', '" +
//       codigo +
//       "', '1')";
//     console.log(log_update);
//     tx.executeSql(log_update, [], (tx, results) => {});
//   });
//  }

//funcao de salvar os modals

function onSalvar(tipoTitle) {
  var tipo = tipoTitle;
  //console.log("tipo", tipo);

 AsyncStorage.setItem("tipo_culturais", tipo);

if(tipoTitle === "ct" && tipoTitle === "cp" && tipoTitle === "p" ){
  db.transaction((tx) => {
     const insert= "INSERT INTO aux_uea_eaeof (processo, tipo, descricao , area, tratos_culturais, idade ,producao, unidade) VALUES  ('" + sync + "','" + tipo + "','" + c_t_form.descricao + "' ,'" + c_t_form.area + "', '" + c_t_form.tratos_culturais + "', '" + c_t_form.idade + "', '" + c_t_form.producao + "', '" + c_t_form.producao + "')";
     console.log(insert);
     tx.executeSql(insert, []);

    }, (err) => {
      console.error("se liga ein, deu erro ", err);
      return true;
    }, (success) => {
      tipos_pastegens();
        //log_table(aux_uea_eaeof, campo_log, valor_log, codigo_log)

      //limparCampos();
      console.log("ta tudo certo colega", success);
    });
}
else if(tipoTitle === "a"){
  db.transaction((tx) => {

    const insert_a= "INSERT INTO aux_uea_animais (processo, descricao , cabecas, finalidades) VALUES  ('" + sync + "','" + a_form.descricao + "' ,'" + a_form.cabecas + "', '" + a_form.finalidades + "')";
    console.log(insert_a);

    tx.executeSql(insert_a, []);

    }, (err) => {
      console.error("se liga ein, deu erro ", err);
      return true;
    }, (success) => {
      tipos_pastegens();
      //AsyncStorage.setItem("tipo_culturais", tipo);
      //limparCampos();
      console.log("ta tudo certo colega", success);
    });
}
else if(tipoTitle === "ext"){
  db.transaction((tx) => {

    const insert_ext= "INSERT INTO aux_uea_extrativismo (processo, descricao, area, producao, unidade, observacoes) VALUES  ('" + sync + "','" + ext_form.descricao + "' ,'" + ext_form.area + "', '" + ext_form.producao + "', '" + ext_form.unidade + "', '" + ext_form.observacoes + "')";
    console.log(insert_ext);
    tx.executeSql(insert_ext, []);
    }, (err) => {
      console.error("se liga ein, deu erro ", err);
      return true;
    }, (success) => {
      tipos_pastegens();
      //AsyncStorage.setItem("tipo_culturais", tipo);
      //limparCampos();
      console.log("ta tudo certo colega", success);
    });
}

}

// const limparCampos = () => {
//   setC_t_form(prev => ({
//       ...prev,
//       descricao: "",
//       area: "",
//       tratos_culturais: "",
//       idade: "",
//       producao: "",
//       unidade: "",
//   }));
//   set_a_form(prev => ({
//       ...prev,
//       descricao: "",
//       cabecas: "",
//       finalidades: "",
//   }));
//   set_ext_form(prev => ({
//       ...prev,
//       descricao: "",
//       area: "",
//       producao: "",
//       unidade: "",
//       observacoes: "",
//   }));

// }

function SwitchCase(tipoTitle) {
  switch(tipoTitle) {
    case 'ct':
      return  <Text style={styles.modalText}>Culturais TEMPORÁRIAS</Text>;
    case 'cp':
      return <Text style={styles.modalText}>Culturais PERMANENTES</Text>;
    case 'p':
      return <Text style={styles.modalText}>PASTAGENS</Text>;
    default:
      return <Text style={styles.modalText}></Text>;
  }
}

  return (
    <>
      {/* //modal cp, ct, p */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          {[...tipo].map((item, index) => (
            <ScrollView
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps={"always"}
              style={styles.modalView}
              key={index}
            >
              <View
                style={{
                  top: 10,
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <Button_native
                  type="clear"
                  //icon="camera"
                  //style={[styles.buttonModal, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                  icon={<Icon name="close" size={30} color="#4d94ff" />}
                ></Button_native>
                <View>
                 {SwitchCase(tipoTitle)}
                </View>
              </View>

              <Text style={styles.titulo}>DESCRICAO</Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={styles.input_style}

                  onChangeText={value => {
                    setC_t_form({
                        ...c_t_form,
                        ["descricao"]: value,
                    })
                }}
                  value={c_t_form.descricao}
                  // onBlur={() => {
                  //   c_t_form.descricao === ""
                  //     ? alert("preencha os campos!")
                  //     : setC_t_form(c_t_form.descricao);
                  // }}
                />
              </View>
              <Text style={styles.titulo}>ÁREA (ha)</Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={styles.input_style}
                  onChangeText={(value) => {
                    setC_t_form({
                      ...c_t_form,
                      ["area"]: value,
                    });
                  }}
                  value={c_t_form.area}
                  // onBlur={() => {
                  //   c_t_form.area === ""
                  //     ? alert("preencha os campos!")
                  //     : setC_t_form(c_t_form.area);
                  // }}
                />
              </View>
              <Text style={styles.titulo}>TRATOS CULTURAIS</Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={styles.input_style}
                  onChangeText={(value) => {
                    setC_t_form({
                      ...c_t_form,
                      ["tratos_culturais"]: value,
                    });
                  }}
                  value={c_t_form.tratos_culturais}
                  // onBlur={() => {
                  //   c_t_form.tratos_culturais === ""
                  //     ? alert("preencha os campos!")
                  //     : setC_t_form(c_t_form.tratos_culturais);
                  // }}
                />
              </View>
              <Text style={styles.titulo}>IDADE</Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={styles.input_style}
                  onChangeText={(value) => {
                    setC_t_form({
                      ...c_t_form,
                      ["idade"]: value,
                    });
                  }}
                  value={c_t_form.idade}
                  // onBlur={() => {
                  //   c_t_form.idade === ""
                  //     ? alert("preencha os campos!")
                  //     : setC_t_form(c_t_form.idade);
                  // }}
                />
              </View>
              <Text style={styles.titulo}>PRODUÇÃO</Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={styles.input_style}
                  onChangeText={(value) => {
                    setC_t_form({
                      ...c_t_form,
                      ["producao"]: value,
                    });
                  }}
                  value={c_t_form.producao}
                  // onBlur={() => {
                  //   nome === "" ? alert("preencha os campos!") : setNome(nome);
                  // }}
                />
              </View>
              <Text style={styles.titulo}>UNIDADE</Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={styles.input_style}
                  onChangeText={(value) => {
                    setC_t_form({
                      ...c_t_form,
                      ["unidade"]: value,
                    });
                  }}
                  value={c_t_form.unidade}
                  // onBlur={() => {
                  //   c_t_form.unidade === ""
                  //     ? alert("preencha os campos!")
                  //     : setC_t_form(c_t_form.unidade);
                  // }}
                />
              </View>
              <Pressable
                style={{
                  height: 50,
                  paddingTop: 5,
                }}
                onPress={() => {
                  //alert(tipoTitle);
                  onSalvar(tipoTitle);
                  //setModalVisible(!modalVisible);
                }}
              >
                <Button
                  mode="contained"
                  color="black"
                  style={{
                    backgroundColor: "#4BB543",
                    width: "70%",
                    borderRadius: 3,
                    alignContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>Salvar</Text>
                </Button>
              </Pressable>
            </ScrollView>
          ))}
        </KeyboardAvoidingView>
      </Modal>

      {/* //modal animais */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_animais}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible_animais(!modalVisible_animais);
        }}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          {[...tipo].map((item, index) => (
            <ScrollView
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps={"always"}
              style={styles.modalView}
              key={index}
            >
              <View
                style={{
                  top: 10,
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <Button_native
                  type="clear"
                  //icon="camera"
                  //style={[styles.buttonModal, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible_animais(!modalVisible_animais)
                  }}
                  icon={<Icon name="close" size={30} color="#4d94ff" />}
                ></Button_native>
                <View>
                  {tipoTitle == "a" ? (
                    <Text style={styles.modalText}>ANIMAIS</Text>
                  ) : (
                    false
                  )}
                </View>
              </View>

              <Text style={styles.titulo}>DESCRIÇÃO</Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={styles.input_style}
                  onChangeText={(value) => {
                    set_a_form({
                      ...a_form,
                      ["descricao"]: value,
                    });
                  }}
                  value={a_form.descricao}
                  // onBlur={() => {
                  //   a_form.descricao === ""
                  //     ? alert("preencha os campos!")
                  //     : set_a_form(a_form.descricao);
                  // }}
                />
              </View>
              <Text style={styles.titulo}>Nº DE CABEÇAS</Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={styles.input_style}
                  onChangeText={(value) => {
                    set_a_form({
                      ...a_form,
                      ["cabecas"]: value,
                    });
                  }}
                  value={a_form.cabecas}
                  // onBlur={() => {
                  //   a_form.cabecas === ""
                  //     ? alert("preencha os campos!")
                  //     : set_a_form(a_form.cabecas);
                  // }}
                />
              </View>
              <Text style={styles.titulo}>FINALIDADES</Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={styles.input_style}
                  onChangeText={(value) => {
                    set_a_form({
                      ...a_form,
                      ["finalidades"]: value,
                    });
                  }}
                  value={a_form.finalidades}
                  // onBlur={() => {
                  //   a_form.finalidades === ""
                  //     ? alert("preencha os campos!")
                  //     : set_a_form(a_form.finalidades);
                  // }}
                />
              </View>

              <Pressable
                style={{
                  height: 50,
                  paddingTop: 5,
                }}
                onPress={() => {
                  //alert(tipoTitle);
                  onSalvar(tipoTitle);
                  //setModalVisible(!modalVisible);
                }}
              >
                <Button
                  mode="contained"
                  color="black"
                  style={{
                    backgroundColor: "#4BB543",
                    width: "70%",
                    borderRadius: 3,
                    alignContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>Salvar</Text>
                </Button>
              </Pressable>
            </ScrollView>
          ))}
        </KeyboardAvoidingView>
      </Modal>

      {/* //modal extrativismo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_ext}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible_ext(!modalVisible_ext);
        }}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          {[...tipo].map((item, index) => (
            <ScrollView
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps={"always"}
              style={styles.modalView}
              key={index}
            >
              <View
                style={{
                  top: 10,
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <Button_native
                  type="clear"
                  //icon="camera"
                  //style={[styles.buttonModal, styles.buttonClose]}
                  onPress={() => setModalVisible_ext(!modalVisible_ext)}
                  icon={<Icon name="close" size={30} color="#4d94ff" />}
                ></Button_native>
                <View>
                  {tipoTitle == "ext" ? (
                    <Text style={styles.modalText}>EXTRATIVISMO</Text>
                  ) : (
                    false
                  )}
                </View>
              </View>

              <Text style={styles.titulo}>DESCRIÇÃO</Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={styles.input_style}
                  onChangeText={(value) => {
                    set_ext_form({
                      ...ext_form,
                      ["descricao"]: value,
                    });
                  }}
                  value={ext_form.descricao}
                  // onBlur={() => {
                  //   ext_form.descricao === ""
                  //     ? alert("preencha os campos!")
                  //     : set_ext_form(ext_form.descricao);
                  // }}
                />
              </View>
              <Text style={styles.titulo}>ÁREA (ha)</Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={styles.input_style}
                  onChangeText={(value) => {
                    set_ext_form({
                      ...ext_form,
                      ["area"]: value,
                    });
                  }}
                  value={ext_form.area}
                  // onBlur={() => {
                  //   ext_form.area === ""
                  //     ? alert("preencha os campos!")
                  //     : set_ext_form(ext_form.area);
                  // }}
                />
              </View>
              <Text style={styles.titulo}>PRODUÇÃOS</Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={styles.input_style}
                  onChangeText={(value) => {
                    set_ext_form({
                      ...ext_form,
                      ["producao"]: value,
                    });
                  }}
                  value={ext_form.producao}
                  // onBlur={() => {
                  //   ext_form.producao === ""
                  //     ? alert("preencha os campos!")
                  //     : set_ext_form(ext_form.producao);
                  // }}
                />
              </View>
              <Text style={styles.titulo}>UNIDADE</Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={styles.input_style}
                  onChangeText={(value) => {
                    set_ext_form({
                      ...ext_form,
                      ["unidade"]: value,
                    });
                  }}
                  value={ext_form.unidade}
                  // onBlur={() => {
                  //   ext_form.unidade === ""
                  //     ? alert("preencha os campos!")
                  //     : set_ext_form(ext_form.unidade);
                  // }}
                />
              </View>
              <Text style={styles.titulo}>OBSERVAÇÕES</Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={styles.input_style}
                  onChangeText={(value) => {
                  set_ext_form({
                    ...ext_form,
                    ["observacoes"]: value,
                  });
                  }}
                  value={ext_form.observacoes}
                  // onBlur={() => {
                  //   ext_form.observacoes === ""
                  //     ? alert("preencha os campos!")
                  //     : set_ext_form(ext_form.observacoes);
                  // }}
                />
              </View>

              <Pressable
                style={{
                  height: 50,
                  paddingTop: 5,
                }}
                onPress={() => {
                  //alert(item.cp);
                  onSalvar(tipoTitle);
                  //setModalVisible(!modalVisible);
                }}
              >
                <Button
                  mode="contained"
                  color="black"
                  style={{
                    backgroundColor: "#4BB543",
                    width: "70%",
                    borderRadius: 3,
                    alignContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>Salvar</Text>
                </Button>
              </Pressable>
            </ScrollView>
          ))}
        </KeyboardAvoidingView>
      </Modal>

      <View style={{ alignItems: `center` }}>
        <View style={styles.form9}>
          <View style={styles.rect2}>
            <Text style={styles.titulo_modal}>
              UTILIZAÇÃO ECONÔMICA DA ÁREA
            </Text>
          </View>
          <View>
            <View>
              <View>
                <TouchableOpacity
                  style={{
                    //backgroundColor: "white",
                    height: 50,
                    paddingTop: 5,
                    //paddingLeft: 80,
                  }}
                  //onPress={() => alert(item.ct)}
                  onPress={() => {
                    setTipo_title("ct");
                    setModalVisible(true);
                  }}
                >
                  <Button
                    //icon="camera"
                    mode="contained"
                    color="black"
                    //passar por paramentro os campos que irao para o registro das foto
                    style={{
                      backgroundColor: "#4BB543",
                      width: "70%",
                      borderRadius: 3,
                      alignContent: "center",
                      alignSelf: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text>CULTURAS TEMPORÁRIAS</Text>
                  </Button>
                </TouchableOpacity>
              </View>
              {/* //////////// */}
              <ScrollView horizontal>
                <View style={styles.container}>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Descrição</DataTable.Title>
                      <DataTable.Title>Área (ha)</DataTable.Title>
                      <DataTable.Title>Tratos Culturais</DataTable.Title>
                      <DataTable.Title>Idade</DataTable.Title>
                      <DataTable.Title>Produção</DataTable.Title>
                      <DataTable.Title>Unidade </DataTable.Title>
                      <DataTable.Title>#</DataTable.Title>
                    </DataTable.Header>
                    {[...listItems].map((item, index) => (
                      <DataTable.Row
                        style={{ width: "auto" }}
                        key={item.codigo}
                      >
                        <DataTable.Cell>
                          <Text>{item.descricao}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.area}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.tratos_culturais}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.idade}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.producao}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.unidade}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.tipo}</Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </View>
              </ScrollView>
            </View>

            <View>
              <TouchableOpacity
                style={{
                  //backgroundColor: "white",
                  height: 50,
                  paddingTop: 5,
                  //paddingLeft: 80,
                }}
                onPress={() => {
                  setTipo_title("cp");
                  SwitchCase(tipoTitle);
                  setModalVisible(true);
                }}
              >
                <Button
                  //icon="camera"
                  mode="contained"
                  color="black"
                  //passar por paramentro os campos que irao para o registro das foto
                  style={{
                    backgroundColor: "#4BB543",
                    width: "70%",
                    borderRadius: 3,
                    alignContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>CULTURAS PERMANENTES</Text>
                </Button>
              </TouchableOpacity>

              {/* //////////// */}
              <ScrollView horizontal>
                <View style={styles.container}>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Descrição</DataTable.Title>
                      <DataTable.Title>Área (ha)</DataTable.Title>
                      <DataTable.Title>Tratos Culturais</DataTable.Title>
                      <DataTable.Title>Idade</DataTable.Title>
                      <DataTable.Title>Produção</DataTable.Title>
                      <DataTable.Title>Unidade </DataTable.Title>
                      <DataTable.Title># </DataTable.Title>
                    </DataTable.Header>

                    {[...listItems_cp].map((item, index) => (
                      <DataTable.Row
                        style={{ width: "auto" }}
                        key={item.codigo}
                      >
                     <DataTable.Cell>
                          <Text>{item.descricao}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.area}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.tratos_culturais}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.idade}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.producao}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.unidade}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.tipo}</Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </View>
              </ScrollView>
            </View>

            <View>
              <TouchableOpacity
                style={{
                  //backgroundColor: "white",
                  height: 50,
                  paddingTop: 5,
                  //paddingLeft: 80,
                }}
                onPress={() => {
                  setTipo_title("p");
                  setModalVisible(true);
                }}
              >
                <Button
                  //icon="camera"
                  mode="contained"
                  color="black"
                  //passar por paramentro os campos que irao para o registro das foto
                  style={{
                    backgroundColor: "#4BB543",
                    width: "70%",
                    borderRadius: 3,
                    alignContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>PASTAGENS</Text>
                </Button>
              </TouchableOpacity>

              {/* //////////// */}
              <ScrollView horizontal>
                <View style={styles.container}>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Descrição</DataTable.Title>
                      <DataTable.Title>Área (ha)</DataTable.Title>
                      <DataTable.Title>Tratos Culturais</DataTable.Title>
                      <DataTable.Title>Idade</DataTable.Title>
                      <DataTable.Title>Produção</DataTable.Title>
                      <DataTable.Title>Unidade </DataTable.Title>
                      <DataTable.Title># </DataTable.Title>
                    </DataTable.Header>

                    {[...listItems_p].map((item, index) => (
                      <DataTable.Row
                        style={{ width: "auto" }}
                        key={item.codigo}
                      >
                      <DataTable.Cell>
                          <Text>{item.descricao}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.area}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.tratos_culturais}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.idade}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.producao}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.unidade}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <Text>{item.tipo}</Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </View>
              </ScrollView>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={{
                //backgroundColor: "white",
                height: 50,
                paddingTop: 5,
                //paddingLeft: 80,
              }}
              onPress={() => {
                setTipo_title("a");
                setModalVisible_animais(true);
              }}
            >
              <Button
                //icon="camera"
                mode="contained"
                color="black"
                //passar por paramentro os campos que irao para o registro das foto
                style={{
                  backgroundColor: "#4BB543",
                  width: "70%",
                  borderRadius: 3,
                  alignContent: "center",
                  alignSelf: "center",
                  alignItems: "center",
                }}
              >
                <Text>ANIMAIS</Text>
              </Button>
            </TouchableOpacity>

            {/* //////////// */}
            <ScrollView horizontal>
              <View style={styles.container}>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Descrição</DataTable.Title>
                    <DataTable.Title>nº de cabeças</DataTable.Title>
                    <DataTable.Title>Finalidades</DataTable.Title>
                  </DataTable.Header>

                  {[...listItems_animais].map((item, index) => (
                    <DataTable.Row style={{ width: "auto" }} key={item.codigo}>
                      <DataTable.Cell>
                        <Text>{item.descricao}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text>{item.cabecas}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text>{item.finalidades}</Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </View>
            </ScrollView>
          </View>

          <View>
            <TouchableOpacity
              style={{
                //backgroundColor: "white",
                height: 50,
                paddingTop: 5,
                //paddingLeft: 80,
              }}
              onPress={() => {
                setTipo_title("ext");
                setModalVisible_ext(true);
              }}
            >
              <Button
                //icon="camera"
                mode="contained"
                color="black"
                //passar por paramentro os campos que irao para o registro das foto
                style={{
                  backgroundColor: "#4BB543",
                  width: "70%",
                  borderRadius: 3,
                  alignContent: "center",
                  alignSelf: "center",
                  alignItems: "center",
                }}
              >
                <Text>EXTRATIVISMO</Text>
              </Button>
            </TouchableOpacity>

            {/* //////////// */}
            <ScrollView horizontal>
              <View style={styles.container}>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Descrição</DataTable.Title>
                    <DataTable.Title>Área (ha)</DataTable.Title>
                    <DataTable.Title>Produção</DataTable.Title>
                    <DataTable.Title>Unidade</DataTable.Title>
                    <DataTable.Title>Observações</DataTable.Title>
                  </DataTable.Header>

                  {[...listItems_ext].map((item, index) => (
                    <DataTable.Row style={{ width: "auto" }} key={item.codigo}>
                      <DataTable.Cell>
                        <Text>{item.descricao}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text>{item.area}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text>{item.producao}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text>{item.unidade}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text>{item.observacoes}</Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </View>
            </ScrollView>
          </View>

          <View style={styles.textStyle}>
            <Text>Área total explorada</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <TextInput
              style={styles.input_style}
              onChangeText={set_vr_area_total_explorada}
              keyboardType={`number-pad`}
              value={vr_area_total_explorada}
              onBlur={() =>
                onPressTitle(
                  "vr",
                  "vr_area_total_explorada",
                  vr_area_total_explorada,
                  codigo_pr
                )
              }
              placeholder={"   0,00"}
            />
          </View>

          <View style={styles.textStyle}>
            <Text>G - OUTRAS FINALIDADES</Text>
          </View>

          <View style={styles.textStyle}>
            <Text>Tipo</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TextInput
              style={styles.input_style}
              onChangeText={set_vr_finalidades_tipo}
              value={vr_finalidades_tipo}
              onBlur={() =>
                onPressTitle(
                  "vr",
                  "vr_finalidades_tipo",
                  vr_finalidades_tipo,
                  codigo_pr
                )
              }
              //placeholder={"   0,00"}
            />
          </View>

          <View style={styles.textStyle}>
            <Text>Observação</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TextInput
              style={styles.input_style}
              onChangeText={set_vr_finalidades_observacao}
              value={vr_finalidades_observacao}
              onBlur={() =>
                onPressTitle(
                  "vr",
                  "vr_finalidades_observacao",
                  vr_finalidades_observacao,
                  codigo_pr
                )
              }
              //placeholder={"   0,00"}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 780,
  },
  input_style: {
    height: 40,
    width: "85%",
    marginTop: 5,
    borderWidth: 1,
    backgroundColor: "white",
  },
  modalView: {
    top: 190,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 20,
    height: "auto",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    textAlign: "center",
    fontSize: 20,
    marginLeft: 70,
    width: 170,
  },
  buttonModal: {
  },
  buttonClose: {
    flexDirection: "row",
    alignItems: "stretch",
    display: "flex",

  },
  textStyle: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 10,
  },
  input: {
    width: 278,
    height: 30,
    marginRight: 5,
    borderWidth: 1,
  },
  form9: {
    width: "92%",
    height: "auto",
    paddingBottom: 10,
    marginTop: 10,
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
    color: "#333",
    marginLeft: 30,
    marginTop: 1,
    fontSize: 12,
  },
  titulo_modal: {
    color: "white",
    marginLeft: 9,
    marginTop: 1,
  },
});

export default Step3;
