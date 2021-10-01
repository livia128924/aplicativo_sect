import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { DatabaseConnection } from "../../../database/database";
import { Formik, useFormik } from "formik";
import Checkbox from "expo-checkbox";
import { Modal, RadioButton } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button as Button_native } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
const db = DatabaseConnection.getConnection();

const Step1 = (props) => {
  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");
  const [vu_ocupacao_data, set_vu_ocupacao_data] = useState("");
  const [unmasked, setUnmasked] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [open_vu_superficie, setOpen_vu_superficie] = useState(false);
  const [valor_vu_superficie, setValor_vu_superficie] = useState(null);
  const [item_vu_superficie, setItem_vu_superficie] = useState([]);

  const [open_vu_terreno_plano, setOpen_vu_terreno_plano] = useState(false);
  const [valor_vu_terreno_plano, setValor_vu_terreno_plano] = useState(null);
  const [item_vu_terreno_plano, setItem_vu_terreno_plano] = useState([]);

  const [open_vu_terreno_declive, setOpen_vu_terreno_declive] = useState(false);
  const [valor_vu_terreno_declive, setValor_vu_terreno_declive] =
    useState(null);
  const [item_vu_terreno_declive, setItem_vu_terreno_declive] = useState([]);

  const [open_vu_terreno_elevacao, setOpen_vu_terreno_elevacao] =
    useState(false);
  const [valor_vu_terreno_elevacao, setValor_vu_terreno_elevacao] =
    useState(null);
  const [item_vu_terreno_elevacao, setItem_vu_terreno_elevacao] = useState([]);

  const [open_vu_terreno_depressao, setOpen_vu_terreno_depressao] =
    useState(false);
  const [valor_vu_terreno_depressao, setValor_vu_terreno_depressao] =
    useState(null);
  const [item_vu_terreno_depressao, setItem_vu_terreno_depressao] = useState(
    []
  );

  const [open_vu_ocupacao_reside, setOpen_vu_ocupacao_reside] = useState(false);
  const [valor_vu_ocupacao_reside, setValor_vu_ocupacao_reside] =
    useState(null);
  const [item_vu_ocupacao_reside, setItem_vu_ocupacao_reside] = useState([
    { label: "Sim", value: "s" },
    { label: "Nao", value: "n" },
  ]);

  const [date, setDate] = useState("");
  const [dateInfo, updateDateInfo] = React.useState({
    date: new Date(),
    show: false,
    mode: "date",
  });
  const changeShowMode = () => {
    updateInfo({ show: true, mode: "date" });
  };
  const updateInfo = (info) => {
    updateDateInfo({ ...dateInfo, ...info });
  };
  const handleReservation = () => {};

  useEffect(() => {
    var cod_processo = "";
    //carrega o valor do select na tela index.js
    AsyncStorage.getItem("pr_codigo").then((value) => {
      setSync(value);
      cod_processo = value;
      console.log("cod altoIncremento", cod_processo);
    });

    AsyncStorage.getItem("codigo").then((codigo) => {
      setDados_valor(codigo);
    });

    loadDados();

    // AsyncStorage.getItem('nome_tabela').then(tabela => {
    //   //console.log(cod_processo);
    //   if (tabela) {

    //     db.transaction((tx) => {

    //       tx.executeSql(
    //         "select * from " + tabela + " where se_ruj_cod_processo = '" + cod_processo + "'", [], (tx, results) => {
    //           var x = "";
    //           var row = [];
    //           //console.log(cod_processo, tabela);
    //           for (let i = 0; i < results.rows.length; ++i) {
    //             console.log(results.rows.length);
    //             setLocalizacao(results.rows.item(0).se_ruj_localizacao);

    //             setValor(results.rows.item(i).se_ruj_municipio);

    //             setValorAcesso(results.rows.item(i).se_ruj_acesso);

    //             setValor_Se_ruj_setor_abrangencia(results.rows.item(0).se_ruj_setor_abrangencia);
    //           }

    //         });
    //     })

    //   }//
    // });
  }, []);

  async function loadDados() {
    //////////////primeira coisa que faz quando entra na tela:  faz um select das tabelas aux para carregar nos components //////////////
    db.transaction(
      (tx) => {
        tx.executeSql("select * from aux_superficie ", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_vu_superficie(temp);
        });
        tx.executeSql("select * from aux_plano ", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_vu_terreno_plano(temp);
        });
        tx.executeSql("select * from aux_declive", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_vu_terreno_declive(temp);
        });
        tx.executeSql("select * from aux_elevacao", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_vu_terreno_elevacao(temp);
        });
        tx.executeSql("select * from aux_depressao", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_vu_terreno_depressao(temp);
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
    // db.transaction((tx) => {
    //   const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_ruj_cod_processo = '${codigo}'`;
    //   //console.log(query);
    //   tx.executeSql(query, [], (tx, results) => {
    //     for (let i = 0; i < results.rows.length; ++i) {
    //       alert("INSERIDO COM SUCESSO");
    //     }
    //   });
    // }, (tx, err) => {
    //   console.error("error em alguma coisa", err);
    //   return true;
    // }, (tx, success) => {
    //   console.log("tudo certo por aqui", success);
    //   //get_values(tabela, campo, sync);  ///esse aqui foi a tentativa
    // });
    // var chaves = '"' + tabela + ' ' + campo + ' ' + valor + ' ' + codigo + '"';
    // db.transaction((tx) => {
    //   const log_delete = "INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + " ,'" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')";
    //   console.log("INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + " ,'" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')");
    //   tx.executeSql(log_delete, []);
    // });
    // db.transaction((tx) => {
    //   const log_update = "REPLACE INTO log (chave, tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + ", '" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')";
    //   console.log(log_update);
    //   tx.executeSql(log_update, [], (tx, results) => {
    //   });
    // })
    // AsyncStorage.setItem('nome_tabela', tabela);
    // AsyncStorage.setItem('codigo', valor.toString());
  }

  return (
    <>
      <View style={styles.form}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>IDENTIFICAÇÃO DO IMÓVEL</Text>
        </View>

        <View style={styles.municipio}>
          <Text>Superficie</Text>
        </View>

        <View style={{ alignSelf: "center", alignContent: "center" }}>
          <DropDownPicker
            style={styles.abrangencia}
            open={open_vu_superficie}
            value={parseInt(valor_vu_superficie)}
            items={item_vu_superficie}
            setOpen={setOpen_vu_superficie}
            setValue={setValor_vu_superficie}
            setItems={setItem_vu_superficie} //aux_acesso
            //dropDownDirection='TOP'
            onChangeValue={() =>
              onPressTitle("vu", "vu_superficie", valor_vu_superficie, sync)
            }
            listMode="SCROLLVIEW"
            placeholder=" Brejosa "
          />
        </View>

        <View style={styles.municipio}>
          <Text>Terreno plano</Text>
        </View>
        <View style={{ alignSelf: "center", alignContent: "center" }}>
          <DropDownPicker
            style={styles.abrangencia}
            open={open_vu_terreno_plano}
            value={parseInt(valor_vu_terreno_plano)}
            items={item_vu_terreno_plano}
            setOpen={setOpen_vu_terreno_plano}
            setValue={setValor_vu_terreno_plano}
            setItems={setItem_vu_terreno_plano} //aux_acesso
            //dropDownDirection='TOP'
            onChangeValue={() =>
              onPressTitle(
                "vu",
                "vu_terreno_plano",
                valor_vu_terreno_plano,
                sync
              )
            }
            listMode="SCROLLVIEW"
            placeholder=" Selecione: "
          />
        </View>

        <View style={styles.municipio}>
          <Text>Terreno declive</Text>
        </View>
        <View style={{ alignSelf: "center", alignContent: "center" }}>
          <DropDownPicker
            style={styles.abrangencia}
            open={open_vu_terreno_declive}
            value={parseInt(valor_vu_terreno_declive)}
            items={item_vu_terreno_declive}
            setOpen={setOpen_vu_terreno_declive}
            setValue={setValor_vu_terreno_declive}
            setItems={setItem_vu_terreno_declive} //aux_acesso
            dropDownDirection="TOP"
            onChangeValue={() =>
              onPressTitle(
                "vu",
                "vu_terreno_declive",
                valor_vu_terreno_declive,
                sync
              )
            }
            listMode="SCROLLVIEW"
            placeholder=" Selecione: "
          />
        </View>

        <View style={styles.municipio}>
          <Text>Terreno elevação</Text>
        </View>
        <View style={{ alignSelf: "center", alignContent: "center" }}>
          <DropDownPicker
            style={styles.abrangencia}
            open={open_vu_terreno_elevacao}
            value={parseInt(valor_vu_terreno_elevacao)}
            items={item_vu_terreno_elevacao}
            setOpen={setOpen_vu_terreno_elevacao}
            setValue={setValor_vu_terreno_elevacao}
            setItems={setItem_vu_terreno_elevacao} //aux_acesso
            dropDownDirection="TOP"
            onChangeValue={() =>
              onPressTitle(
                "vu",
                "vu_terreno_elevacao",
                valor_vu_terreno_elevacao,
                sync
              )
            }
            listMode="SCROLLVIEW"
            placeholder=" Selecione: "
          />
        </View>

        <View style={styles.municipio}>
          <Text>Terreno depressão</Text>
        </View>

        <View style={{ alignSelf: "center", alignContent: "center" }}>
          <DropDownPicker
            style={styles.abrangencia}
            open={open_vu_terreno_depressao}
            value={parseInt(valor_vu_terreno_depressao)}
            items={item_vu_terreno_depressao}
            setOpen={setOpen_vu_terreno_depressao}
            setValue={setValor_vu_terreno_depressao}
            setItems={setItem_vu_terreno_depressao} //aux_acesso
            dropDownDirection="TOP"
            onChangeValue={() =>
              onPressTitle(
                "vu",
                "vu_terreno_depressao",
                valor_vu_terreno_depressao,
                sync
              )
            }
            listMode="SCROLLVIEW"
            placeholder=" Selecione: "
          />
        </View>
      </View>
      {/* /////////////////////////////////////modal */}
      {dateInfo.show && (
      <DateTimePicker
        value={dateInfo.date}
        display="default"
        mode={dateInfo.mode}
        maximumDate={new Date()}
        minuteInterval={30}
        onChange={(event, dateTime) => {
          if (dateTime === undefined) {
            updateInfo({ show: false });
          } else if (dateInfo.mode === "time") {
            let timeDate = moment(dateTime);
            updateInfo({
              show: false,
              mode: "date",
              date: moment(dateInfo.date)
                .set("hour", timeDate.get("hour"))
                .set("minute", timeDate.get("minute"))
                .set("minute", timeDate.get("second"))
                .toDate()
            });
          } else {
            updateInfo({ mode: "time", date: dateTime });
          }
        }}
      />
      )}
      {/* ///////////////////////////////////// */}

      <View style={styles.form_step1}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>DADOS RELATIVOS A OCUPAÇÃO</Text>
        </View>

        <View style={styles.municipio}>
          <Text>Reside no Imóvel?</Text>
        </View>
        <View style={{ alignSelf: "center", alignContent: "center" }}>
          <DropDownPicker
            style={styles.abrangencia}
            open={open_vu_ocupacao_reside}
            value={parseInt(valor_vu_ocupacao_reside)}
            items={item_vu_ocupacao_reside}
            setOpen={setOpen_vu_ocupacao_reside}
            setValue={setValor_vu_ocupacao_reside}
            setItems={setItem_vu_ocupacao_reside} //aux_acesso
            //dropDownDirection='BOTTOM'
            onChangeValue={() =>
              onPressTitle(
                "vu",
                "vu_ocupacao_reside",
                valor_vu_ocupacao_reside,
                sync
              )
            }
            listMode="SCROLLVIEW"
            placeholder="Selecione:"
          />
        </View>

        <View style={styles.municipio}>
          <Text>Data da ocupação</Text>
        </View>

        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => changeShowMode()}
        >
          <TextInputMask
            style={styles.input_style}
            type={"datetime"}
            options={{
              format: "YYYY/MM/DD",
            }}
            //  onPressIn={() => {
            //   alert("ok");}}
            value={vu_ocupacao_data}
            onChangeText={set_vu_ocupacao_data}
            ref={(ref) => setUnmasked(ref)}
            placeholder="   00/00/0000"
            onBlur={() => {
              alert(unmasked.getRawValue());
              // console.log(se_ruf_valor_beneficio);
              // mask();
              // onPressTitle(
              //   "vu",
              //   "vu_ocupacao_data",
              //   unmasked.getRawValue(), //retira o R$
              //   sync
              // );
            }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  input_style: {
    height: 40,
    width: "85%",
    marginTop: 10,
    marginLeft: 10,
    borderWidth: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxlabel: {
    marginTop: 5,
    marginLeft: 30,
  },
  form_step1: {
    width: "95%",
    height: "auto",
    paddingBottom: 10,
    marginTop: 10,
    //marginLeft: 20,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
    alignSelf: `center`,
    zIndex: -1,
  },
  localizacao: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 20,
    //marginBottom: 9
  },
  input2: {
    height: 40,
    width: "85%",
    marginTop: 2,
    //marginRight:20,
    borderWidth: 1,
    backgroundColor: "white",
  },
  form: {
    width: "95%",
    height: "auto",
    paddingBottom: 10,
    //marginLeft: 20,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
    alignSelf: `center`,
  },
  rect2: {
    width: "100%",
    height: 36,
    backgroundColor: "rgba(74,144,226,1)",
    borderRadius: 3,
    //zIndex: 2,
  },
  municipio: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 10,
  },
  select: {
    height: 40,
    width: "85%",
    marginLeft: 30,
    height: 40,
    borderRadius: 0,
    borderWidth: 1,
  },
  acessoText: {
    color: "black",
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 9,
  },
  acesso: {
    height: 40,
    width: "85%",
    marginLeft: 30,
    height: 40,
    marginTop: 5,
    borderRadius: 0,
    borderWidth: 1,
  },
  titulo: {
    color: "white",
    marginLeft: 9,
    marginTop: 1,
  },

  abrangencia: {
    height: 40,
    width: "85%",
    // marginLeft: 30,
    height: 40,
    marginTop: 20,
    borderRadius: 0,
    borderWidth: 1,
  },
});

export default Step1;
