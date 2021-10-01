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

const Step6 = ({ navigation }) => {
  const [sync, setSync] = useState("");
  const [nome, setNome] = useState("");
  const [data_nascimento, set_data_nascimento] = useState("");
  const [renda, set_renda] = useState("");
  const [unmasked, setUnmasked] = useState("");
  const [unmasked_renda, setUnmasked_renda] = useState("");
  const [dados_valor, setDados_valor] = useState([]);


  const [modalVisible, setModalVisible] = useState(false);

  const [dados, setDados] = useState([]);

  const [text, setText] = useState("");

  const [cod_req, setCod_req] = useState("");
  const [listItems, setListItems] = useState([]);

  const [open_se_duf_parentesco, setOpen_se_duf_parentesco] = useState(false);
  const [valor_se_duf_parentesco, setValor_se_duf_parentesco] = useState(null);
  const [item_se_duf_parentesco, setItem_se_duf_parentesco] = useState([]);

  const [open_sexo, setOpen_sexo] = useState(false);
  const [valor_sexo, setValor_sexo] = useState(null);
  const [item_sexo, setItem_sexo] = useState([
    { label: "Femenino", value: "f" },
    { label: "Masculino", value: "m" },
  ]);

  const [open_grau_instrucao, setOpen_grau_instrucao] = useState(false);
  const [valor_grau_instrucao, setValor_grau_instrucao] = useState(null);
  const [item_grau_instrucao, setItem_grau_instrucao] = useState([
    { label: "1 Nao Alfabetizado", value: "NA" },
    { label: "2 Ens.Fundamental Incompleto", value: "EFI" },
    { label: "3 Ens.Fundamental Completo", value: "EFC" },
    { label: "4 Ens.Medio Inconpleto", value: "EMI" },
    { label: "5 Ens.Medio Completo", value: "EMC" },
    { label: "6 Ens.Superior Completo", value: "ESC" },
    { label: "7 Ens.Superior Incompleto", value: "ESI" },
  ]);

  const [open_ctps, setOpen_ctps] = useState(false);
  const [valor_ctps, setValor_ctps] = useState(null);
  const [item_ctps, setItem_ctps] = useState([
    { label: "Sim", value: "S" },
    { label: "Nao", value: "N" },
  ]);

  const [open_ocupacao, setOpen_ocupacao] = useState(false);
  const [valor_ocupacao, setValor_ocupacao] = useState(null);
  const [item_ocupacao, setItem_ocupacao] = useState([]);

  AsyncStorage.getItem("codigo").then((codigo) => {
    setDados_valor(codigo);
  });


  useEffect(() => {

    var cod_processo = "";
    //carrega o valor do select na tela index.js
    AsyncStorage.getItem("pr_codigo").then((value) => {
      //console.log(value);
      setSync(value);
      cod_processo = value;
    });
    db.transaction((tx) => {
      tx.executeSql(
          "select * from aux_se_ef where processo = '" + sync + "'", [], (tx, results) => {
              //var x = "";
             // console.log(results.rows.length);
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                //console.log(results.rows);
                temp.push(results.rows.item(i));
              }
              setListItems(temp);

          }, function(tx, error) {
           alert('SELECT error: ' + error.message);
       });
  })
    // AsyncStorage.getItem("codigo").then((codigo) => {
    //   setDados_valor(codigo);
    // });

    loadStep6();
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT *, p.codigo AS pr_codigo FROM pr p LEFT JOIN rq r ON r.codigo = p.pr_requerente where p.codigo = '" + cod_processo + "'", [], (tx, results) => {
                var row = [];
                for (let i = 0; i < results.rows.length; ++i) {
                  setCod_req(results.rows.item(i).pr_requerente);
                }
            }, function(tx, error) {
            alert('SELECT error: ' + error.message);
        });


    })

  }, []);


  async function loadStep6() {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from aux_parentesco", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: i +  results.rows.item(i).descricao,
              value: results.rows.item(i).descricao,
              //isChecked: false,
            });
          }
          setItem_se_duf_parentesco(temp);
        });
        tx.executeSql("select * from aux_profissoes", [], (tx, results) => {
          var temp = [];
          var x= "_";
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: i +x+ results.rows.item(i).descricao,
              value: results.rows.item(i).descricao,
              //isChecked: false,
            });
          }
          setItem_ocupacao(temp);
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
  // = useCallback(() => {
  const onSalvar = useCallback((
    nome,
    parentesco,
    data_nascimento,
    sexo,
    instrucao,
    ocupacao,
    ctps,
    renda
  ) =>{

//console.log(dados_ef);

//console.log( "'"+ sync + "' ,'"+ cod_req +"'");

        db.transaction((tx) => {
          //tx.executeSql("DROP TABLE se_ef", []);
  const insert= "INSERT INTO aux_se_ef (processo , requerente, nome, parentesco, data_nascimento, sexo ,instrucao, ocupacao, ctps, renda) VALUES  ('" + sync + "' ,'" + cod_req + "', '" + nome + "', '" + parentesco + "', '" + data_nascimento + "', '" + sexo + "','" + instrucao + "', '" + ocupacao + "', '" + ctps + "', '" + renda + "')";
            tx.executeSql(insert, []);
          }, (err) => {
            console.error("se liga ein, deu erro ", err);
            return true;
          }, (success) => {
            console.log("ta tudo certo colega", success);
          });


          db.transaction((tx) => {
            tx.executeSql(
                "select * from aux_se_ef where processo = '" + sync + "'", [], (tx, results) => {
                    //var x = "";
                   // console.log(results.rows.length);
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                      //console.log(results.rows);
                      temp.push(results.rows.item(i));
                    }
                    setListItems(temp);

                }, function(tx, error) {
                 alert('SELECT error: ' + error.message);
             });
        })
        // const handleClick = useCallback(() => {
        //   console.log('Clicked!');
        // }, []);

      }, []);

  return (
    <>
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
          <ScrollView
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps={"always"}
            style={styles.modalView}
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
              <Text style={styles.modalText}>Estrutura Familiar</Text>
            </View>

            <Text style={styles.titulo}>NOME</Text>
            <View style={{ alignItems: "center" }}>
              <TextInput
                style={styles.input_style}
                onChangeText={setNome}
                value={nome}
                onBlur={() => {
                  nome === "" ? alert("preencha os campos!") : setNome(nome);
                }}
                placeholder={"    "}
              />
            </View>
            <Text style={styles.titulo}>PARENTESCO</Text>
            <View style={{ alignItems: "center" }}>
              <DropDownPicker
                style={styles.drop_down_Style}
                zIndex={open_se_duf_parentesco ? 9999 : 0}
                open={open_se_duf_parentesco}
                value={valor_se_duf_parentesco}
                items={item_se_duf_parentesco}
                setOpen={setOpen_se_duf_parentesco}
                setValue={setValor_se_duf_parentesco}
                setItems={setItem_se_duf_parentesco}
                onChangeValue={() => {
                  alert(valor_se_duf_parentesco);
                }}
                listMode="SCROLLVIEW"
                placeholder="Selecione::"
              />
            </View>
            <Text style={styles.titulo}>DATA DE NASCIMENTO</Text>
            <View style={{ alignItems: "center" }}>
              <TextInputMask
                style={styles.input_style}
                type={"datetime"}
                options={{
                  format: "DD-MM-YYYY",
                }}
                value={data_nascimento}
                onChangeText={set_data_nascimento}
                //ref={(ref) => setUnmasked(ref)}
                placeholder={"   00-00-0000"}
                onBlur={() => data_nascimento}
              />
            </View>
            <Text style={styles.titulo}>SEXO</Text>
            <View style={{ alignItems: "center" }}>
              <DropDownPicker
                style={styles.drop_down_Style}
                zIndex={open_sexo ? 9999 : 0}
                open={open_sexo}
                value={valor_sexo}
                items={item_sexo}
                setOpen={setOpen_sexo}
                setValue={setValor_sexo}
                setItems={setItem_sexo} //cidades
                listMode="SCROLLVIEW"
                onChangeValue={() => console.log(valor_sexo)}
                placeholder="Selecione::" //aqui eu tentei colocar o retorno da funcao do select
              />
            </View>
            <Text style={styles.titulo}>INSTRUÇÃO</Text>
            <View style={{ alignItems: "center" }}>
              <DropDownPicker
                style={styles.drop_down_Style}
                zIndex={open_grau_instrucao ? 9999 : 0}
                open={open_grau_instrucao}
                value={valor_grau_instrucao}
                items={item_grau_instrucao}
                setOpen={setOpen_grau_instrucao}
                setValue={setValor_grau_instrucao}
                setItems={setItem_grau_instrucao} //cidades
                listMode="SCROLLVIEW"
                onChangeValue={() => valor_grau_instrucao}
                placeholder="Selecione::" //aqui eu tentei colocar o retorno da funcao do select
              />
            </View>
            <Text style={styles.titulo}>OCUPAÇÃO</Text>
            <View style={{ alignItems: "center" }}>
              <DropDownPicker
                style={styles.drop_down_Style}
                open={open_ocupacao}
                value={valor_ocupacao}
                items={item_ocupacao}
                setOpen={setOpen_ocupacao}
                setValue={setValor_ocupacao}
                setItems={setItem_ocupacao} //cidades
                zIndex={9999}
                listMode="SCROLLVIEW"
                onChangeValue={() => valor_ocupacao}
                placeholder="Selecione::" //aqui eu tentei colocar o retorno da funcao do select
              />
            </View>
            <Text style={styles.titulo}>CARTEIRA DE TRABALHO</Text>
            <View style={{ alignItems: "center" }}>
              <DropDownPicker
                style={styles.drop_down_Style}
                open={open_ctps}
                value={valor_ctps}
                items={item_ctps}
                setOpen={setOpen_ctps}
                setValue={setValor_ctps}
                setItems={setItem_ctps} //cidades
                zIndex={9999}
                listMode="SCROLLVIEW"
                onChangeValue={() => valor_ctps}
                placeholder="Selecione::" //aqui eu tentei colocar o retorno da funcao do select
              />
            </View>

            <Text style={styles.titulo}>RENDA</Text>
            <View style={{ alignItems: "center" }}>
              <TextInputMask
                style={styles.input_style}
                type={"money"}
                options={{
                  precision: 2,
                  delimiter: ".",
                  unit: "R$",
                }}
                value={renda}
                onChangeText={set_renda}
                ref={(ref) => setUnmasked_renda(ref)}
                placeholder="   R$00.00"
                onBlur={() => {
                  alert(unmasked_renda.getRawValue());
                }}
              />
            </View>

            <Pressable
              style={{
                //backgroundColor: "white",
                height: 50,
                paddingTop: 5,
                //paddingLeft: 80,
              }}
              onPress={() => {
                onSalvar(
                  nome,
                  valor_se_duf_parentesco,
                  data_nascimento,
                  valor_sexo,
                  valor_grau_instrucao,
                  valor_ocupacao,
                  valor_ctps,
                  unmasked_renda.getRawValue()
                ),
                  setModalVisible(!modalVisible);
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
                <Text>Salvar</Text>
              </Button>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      <View style={styles.form9}>
        <View style={styles.rect2}>
          <Text style={styles.titulo_modal}>ESTRUTURA FAMILIAR</Text>
        </View>
        <TouchableOpacity
          style={{
            //backgroundColor: "white",
            height: 50,
            paddingTop: 5,
            //paddingLeft: 80,
          }}
          onPress={() => setModalVisible(true)}
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
            <Text>Adcionar</Text>
          </Button>
        </TouchableOpacity>

        {/* //////////// */}
        <ScrollView horizontal>
        <View style={styles.container}>
        <DataTable>
        <DataTable.Header >
          <DataTable.Title >Nome</DataTable.Title>
          <DataTable.Title>Grau Parentesco</DataTable.Title>
          <DataTable.Title >Data de Nascimento</DataTable.Title>
          <DataTable.Title >Sexo</DataTable.Title>
          <DataTable.Title >Grau de Instrução</DataTable.Title>
          <DataTable.Title >Ocupação</DataTable.Title>
          <DataTable.Title >CTPS</DataTable.Title>
          <DataTable.Title >Renda (R$)</DataTable.Title>
        </DataTable.Header>

        {[...listItems].map((item, index) => (
        <DataTable.Row  style={{ width:'auto'}} key={item.codigo}>

          <DataTable.Cell><Text>{item.nome}</Text></DataTable.Cell>
          <DataTable.Cell><Text>{item.parentesco}</Text></DataTable.Cell>
          <DataTable.Cell ><Text>{item.data_nascimento}</Text></DataTable.Cell>
          <DataTable.Cell ><Text>{item.sexo}</Text></DataTable.Cell>
          <DataTable.Cell ><Text>{item.instrucao}</Text></DataTable.Cell>
          <DataTable.Cell ><Text>{item.ocupacao}</Text></DataTable.Cell>
          <DataTable.Cell ><Text>{item.ctps}</Text></DataTable.Cell>
          <DataTable.Cell ><Text>{item.renda}</Text></DataTable.Cell>

        </DataTable.Row>
  ))}
          </DataTable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //paddingTop: 100,
    //paddingHorizontal: 30,
    width:780,
  },
  drop_down_Style: {
    marginTop: 5,
    height: 40,
    width: "85%",
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    //marginLeft: 30,
    borderRadius: 0,
    borderWidth: 1,
  },
  input_style: {
    height: 40,
    width: "85%",
    marginTop: 5,
    //marginLeft: 30,
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
    //padding: 35,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    //flex: 1,
    //justifyContent: "flex-start",
    //alignItems: "flex-end",
  },
  modalText: {
    //marginBottom: 10,
    textAlign: "center",
    // alignContent:'flex-end'
    //bottom:30,
    fontSize: 20,
    marginLeft: 70,
    width: 170,
    //backgroundColor:'blue'
  },
  buttonModal: {
    ///borderRadius: 20,
    //padding: 20,
    //elevation: 2,
  },
  buttonClose: {
    flexDirection: "row",
    alignItems: "stretch",
    display: "flex",
    // justifyContent: "flex-end",
    // alignContent:'flex-end'
    //height: "auto",
    //width: 720,
    //flexWrap:'wrap'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  rowStyle: {
    flexDirection: "row",
    //alignItems: "center",
    display: "flex",
    justifyContent: "space-around",
    height: "auto",
    width: 'auto',
    //flexWrap:'wrap'
  },

  collumStyle: {
    //flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    //alignSelf: "center",
    //display:'flex',
    // flexWrap:'wrap',
    //backgroundColor:'red'
  },
  collumStyle_: {
    display: "flex",
    flexWrap: "wrap",
    //width: 40,
    //height: 40,
    //alignContent: "center",
    //alignItems: "center",
    //alignSelf: "center",
    height: "auto",
    padding: 15,
  },
  textSyle: {
    //height:30,

    color: "#333",
    flexWrap: "wrap",
    //width: 120,
    //backgroundColor:'red'
  },
  inputNome: {
    height: 40,
    width: "100%",
    marginTop: 10,
    marginLeft: 0,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "white",
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
    //marginLeft: 25,
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

export default Step6;
