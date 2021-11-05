import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { DatabaseConnection } from "../../../database/database";
import { TextInputMask, getRawValue } from "react-native-masked-text";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";

const db = DatabaseConnection.getConnection();

const Step1 = (props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const [date_ocupacao_atual, setDate_ocupacao_atual] = useState(new Date());
  const [mode_ocupacao_atual, setMode_ocupacao_atual] = useState("date");
  const [show_ocupacao_atual, setShow_ocupacao_atual] = useState(false);

  const onChange_ocupacao_atual = (event, selectedDate) => {
    //if(vr_ocupacao_data_atual  === null){
    // var x =  selectedDate.split('-');
    // console.log(x.join("/"));
    var x = selectedDate;
    let str = selectedDate;
    let moments = moment(str);
    console.log("data formatada", moments.format("YYYY/MM/DD"));
    set_vr_ocupacao_data_atual(x);


    //console.log("data selecionada", x);
    const currentDate_ocupacao_atual = selectedDate || date;
    setShow_ocupacao_atual(Platform.OS === "ios");
    setDate_ocupacao_atual(currentDate_ocupacao_atual);
    //}
    //else{
    // alert("ok");
    //}
  };

  const showMode_ocupacao_atual = (currentMode) => {
    setShow_ocupacao_atual(true);
    setMode_ocupacao_atual(currentMode);
  };

  const showDatepicker_ocupacao_atual = () => {
    showMode_ocupacao_atual("date");
  };

  const [vr_ocupacao_primitiva_data, set_vr_ocupacao_primitiva_data] =
    useState("");
  const [unmasked, setUnmasked] = useState("");
  const [vr_ocupacao_data_atual, set_vr_ocupacao_data_atual] = useState("");
  const [vr_ocupacao_documento_qual, set_vr_ocupacao_documento_qual] =
    useState("");
  const [vr_nome_transmitente, set_vr_nome_transmitente] = useState("");

  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");
  const [vr_total_pessoas_residentes, set_vr_total_pessoas_residentes] =
    useState("");
  const [aberto_vr_ocupacao_utilizacao, setAberto_vr_ocupacao_utilizacao] =
    useState(false);
  const [valor_vr_ocupacao_utilizacao, setValor_vr_ocupacao_utilizacao] =
    useState("");

  const [item_vr_ocupacao_utilizacao, setItem_vr_ocupacao_utilizacao] =
    useState([]);
  const [aberto_vr_ocupacao_primitiva, setAberto_vr_ocupacao_primitiva] =
    useState(false);
  const [valor_vr_ocupacao_primitiva, setValor_vr_ocupacao_primitiva] =
    useState(null);
  const [item_vr_ocupacao_primitiva, setItem_vr_ocupacao_primitiva] = useState([
    { label: "Sim", value: "S" },
    { label: "Nao", value: "N" },
  ]);
  const [aberto_vr_ocupacao_reside, setAberto_vr_ocupacao_reside] =
    useState(false);
  const [valor_vr_ocupacao_reside, setValor_vr_ocupacao_reside] =
    useState(null);
  const [item_vr_ocupacao_reside, setItem_vr_ocupacao_reside] = useState([
    { label: "Sim", value: "S" },
    { label: "Nao", value: "N" },
  ]);
  const [aberto_vr_ocupacao_documento, setAberto_vr_ocupacao_documento] =
    useState(false);
  const [valor_vr_ocupacao_documento, setValor_vr_ocupacao_documento] =
    useState(null);
  const [item_vr_ocupacao_documento, setItem_vr_ocupacao_documento] = useState([
    { label: "Sim", value: "S" },
    { label: "Nao", value: "N" },
  ]);
  const [aberto_vr_ocupacao_pacifica, setAberto_vr_ocupacao_pacifica] =
    useState(false);
  const [valor_vr_ocupacao_pacifica, setValor_vr_ocupacao_pacifica] =
    useState(null);
  const [item_vr_ocupacao_pacifica, setItem_vr_ocupacao_pacifica] = useState([
    { label: "Sim", value: "S" },
    { label: "Nao", value: "N" },
  ]);

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

    AsyncStorage.getItem("nome_tabela").then((tabela) => {
      //console.log(cod_processo);
      if (tabela) {
        db.transaction((tx) => {
          tx.executeSql(
            "select * from " +
              tabela +
              " where vr_cod_processo = '" +
              cod_processo +
              "'",
            [],
            (tx, results) => {
              var x = "";
              var row = [];
              //console.log(cod_processo, tabela);
              for (let i = 0; i < results.rows.length; ++i) {
                console.log(results.rows.length);
                set_vr_nome_transmitente(
                  results.rows.item(0).vr_nome_transmitente
                );
                set_vr_ocupacao_documento_qual(
                  results.rows.item(0).vr_ocupacao_documento_qual
                );

                setValor_vr_ocupacao_utilizacao(
                  results.rows.item(i).vr_ocupacao_utilizacao
                );

                setValor_vr_ocupacao_primitiva(
                  results.rows.item(i).vr_ocupacao_primitiva
                );
                setValor_vr_ocupacao_reside(
                  results.rows.item(i).vr_ocupacao_reside
                );
                setValor_vr_ocupacao_documento(
                  results.rows.item(i).vr_ocupacao_documento
                );
                setValor_vr_ocupacao_pacifica(
                  results.rows.item(i).vr_ocupacao_pacifica
                );
                set_vr_ocupacao_data_atual(
                  results.rows.item(i).vr_ocupacao_data_atual
                );
              }
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
        tx.executeSql(
          "select * from aux_ocupacao_utilizacao ",
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push({
                label: results.rows.item(i).descricao,
                value: results.rows.item(i).codigo,
              });
            }
            setItem_vr_ocupacao_utilizacao(temp);
          }
        );
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
    //console.log(tabela, campo, valor, codigo);
    db.transaction(
      (tx) => {
        const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE vr_cod_processo = '${codigo}'`;
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

  var x_value = "";

  function isValueValid(value) {
    //console.log(value.isValid());
   // var y = "";
    if (value.isValid() === false) {
      alert("Por favor digite uma data correta.");
    } else {
      onPressTitle(
        "vr",
        "vr_ocupacao_data_atual",
        vr_ocupacao_data_atual,
        sync
      );
      setNewDate();
    }
  }
  
  function setNewDate() {
    var x = vr_ocupacao_data_atual.split("/").reverse();
    // console.log(x.join("/"));
    var y = x.join("/");
    console.log("'" + y + "'");
    setDate_ocupacao_atual(new Date(y));
    //console.log("dasda",x_value.getRawValue())
  }

  // const numberValue = unmasked.getRawValue()
  //console.log(numberValue) // Number

  return (
    <>
      <View style={styles.form}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>DADOS RELATIVO À OCUPAÇÃO</Text>
        </View>

        <View style={styles.titleStyle}>
          <Text>Utilizações do Imóvel</Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
          <DropDownPicker
            style={styles.DropdrownStyle}
            open={aberto_vr_ocupacao_utilizacao}
            value={parseInt(valor_vr_ocupacao_utilizacao)}
            items={item_vr_ocupacao_utilizacao}
            zIndex={9999}
            setOpen={setAberto_vr_ocupacao_utilizacao}
            setValue={setValor_vr_ocupacao_utilizacao}
            setItems={setItem_vr_ocupacao_utilizacao} //cidades
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle(
                "vr",
                "vr_ocupacao_utilizacao",
                valor_vr_ocupacao_utilizacao,
                sync
              )
            }
            placeholder={"Selecione:"}
          />
        </View>

        <View style={{ alignContent: "center", alignItems: "center" }}>
          <View style={styles.rowStyle}>
            <View style={styles.DropdrownStyle_Container_collumn}>
              <View>
                <Text style={{ color: "#121212" }}>É ocupação primitiva?</Text>
              </View>
              <DropDownPicker
                style={styles.DropdrownStyle_row}
                open={aberto_vr_ocupacao_primitiva}
                value={valor_vr_ocupacao_primitiva}
                items={item_vr_ocupacao_primitiva}
                setOpen={setAberto_vr_ocupacao_primitiva}
                setValue={setValor_vr_ocupacao_primitiva}
                setItems={setItem_vr_ocupacao_primitiva} //aux_acesso
                onChangeValue={() =>
                  onPressTitle(
                    "vr",
                    "vr_ocupacao_primitiva",
                    valor_vr_ocupacao_primitiva,
                    sync
                  )
                }
                listMode="SCROLLVIEW"
                placeholder="Selecione:"
              />
            </View>

            <View style={styles.TextInputStyle_Container_collumn}>
              <View>
                <Text style={{ color: "#121212" }}>
                  Data da ocupação primitiva
                </Text>
              </View>
              <View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    //mode={mode}
                    maximumDate={new Date()}
                    //is24Hour={true}
                    display="calendar"
                    onChange={onChange}
                  />
                )}
              </View>
              <TouchableOpacity
                //  style={{ alignItems: "center" }}
                onPress={showTimepicker}
              >
                <View style={styles.searchSection}>
                  <Icon
                    style={styles.searchIcon}
                    name="calendar-month"
                    size={20}
                    color="#000"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="00/00/0000"
                    format="YYYY-MM-DD"
                    onChangeText={(searchString) => {
                      this.setState({ searchString });
                    }}
                    underlineColorAndroid="transparent"
                  />
                </View>
              </TouchableOpacity>
              {/* <Text>{date.toString().substr(4, 12)}</Text> */}
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.localizacao}>Nome do Transmitente da Posse</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input2}
            onChangeText={set_vr_nome_transmitente}
            value={vr_nome_transmitente}
            onBlur={() =>
              onPressTitle(
                "vr",
                "vr_nome_transmitente",
                vr_nome_transmitente,
                sync
              )
            }
          />
        </View>
        <View style={{ alignContent: "center", alignItems: "center" }}>
          <View style={styles.rowStyle}>
            <View style={styles.DropdrownStyle_Container_collumn}>
              <View>
                <Text style={styles.localizacao}>Reside no imóvel?</Text>
              </View>
              <DropDownPicker
                style={styles.DropdrownStyle_row}
                open={aberto_vr_ocupacao_reside}
                value={valor_vr_ocupacao_reside}
                items={item_vr_ocupacao_reside}
                setOpen={setAberto_vr_ocupacao_reside}
                setValue={setValor_vr_ocupacao_reside}
                setItems={setItem_vr_ocupacao_reside} //aux_acesso
                onChangeValue={() =>
                  onPressTitle(
                    "vr",
                    "vr_ocupacao_reside",
                    valor_vr_ocupacao_reside,
                    sync
                  )
                }
                listMode="SCROLLVIEW"
                placeholder="Selecione:"
              />
            </View>

            <View style={styles.TextInputStyle_Container_collumn}>
              <View>
                <Text style={styles.localizacao}>Data da ocupação atual</Text>
              </View>
              <View>
                {show_ocupacao_atual && (
                  <DateTimePicker
                    mode="date"
                    value={date_ocupacao_atual}
                    maximumDate={new Date()}
                    //display="calendar"
                    is24Hour={false}
                    locale="pt-BR"
                    onChange={onChange_ocupacao_atual}
                    timeZoneOffsetInSeconds={0}
                    timeZoneOffsetInMinutes={0}
                  />
                )}
              </View>
              <TouchableOpacity onPress={showDatepicker_ocupacao_atual}>
                <View style={styles.searchSection}>
                  <Icon
                    style={styles.searchIcon}
                    name="calendar-month"
                    size={20}
                    color="#000"
                  />
                  {/* <TextInput
                
                  placeholder="00/00/0000"
                  format="YYYY-MM-DD"
                  onChangeText={
                    set_vr_ocupacao_data_atual}
                  underlineColorAndroid="transparent"
                /> */}
                  <TextInputMask
                    style={styles.input}
                    type={"datetime"}
                    options={{ format: "DD/MM/YYYY" }}
                    value={vr_ocupacao_data_atual}
                    onChangeText={set_vr_ocupacao_data_atual}
                    ref={(ref) => (x_value = ref)}
                    onBlur={() => {
                      //console.log(x_value);
                      isValueValid(x_value);
                    }}
                  />
                </View>
              </TouchableOpacity>
              {/* <Text >{vr_ocupacao_data_atual}</Text> */}
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.localizacao}>Possui algum documento?</Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
          <DropDownPicker
            style={styles.DropdrownStyle}
            open={aberto_vr_ocupacao_documento}
            value={valor_vr_ocupacao_documento}
            items={item_vr_ocupacao_documento}
            setOpen={setAberto_vr_ocupacao_documento}
            setValue={setValor_vr_ocupacao_documento}
            setItems={setItem_vr_ocupacao_documento} //aux_acesso
            onChangeValue={() =>
              onPressTitle(
                "vr",
                "vr_ocupacao_documento",
                valor_vr_ocupacao_documento,
                sync
              )
            }
            listMode="SCROLLVIEW"
            placeholder="Selecione:"
          />
        </View>

        <View>
          <Text style={styles.localizacao}>Qual?</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input2}
            onChangeText={set_vr_ocupacao_documento_qual}
            value={vr_ocupacao_documento_qual}
            onBlur={() =>
              onPressTitle(
                "vr",
                "vr_ocupacao_documento_qual",
                vr_ocupacao_documento_qual,
                sync
              )
            }
            //placeholder={"    "}
          />
        </View>

        <View>
          <Text style={styles.localizacao}>
            Exerce mansa e pacificamente a posse?
          </Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
          <DropDownPicker
            style={styles.DropdrownStyle}
            open={aberto_vr_ocupacao_pacifica}
            value={valor_vr_ocupacao_pacifica}
            items={item_vr_ocupacao_pacifica}
            setOpen={setAberto_vr_ocupacao_pacifica}
            setValue={setValor_vr_ocupacao_pacifica}
            setItems={setItem_vr_ocupacao_pacifica} //aux_acesso
            onChangeValue={() =>
              onPressTitle(
                "vr",
                "vr_ocupacao_pacifica",
                valor_vr_ocupacao_pacifica,
                sync
              )
            }
            listMode="SCROLLVIEW"
            placeholder="Selecione:"
          />
        </View>
        <View>
          <Text style={styles.localizacao}>Total de pessoas residentes</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input2}
            keyboardType={"number-pad"}
            onChangeText={set_vr_total_pessoas_residentes}
            value={vr_total_pessoas_residentes}
            onBlur={() =>
              onPressTitle(
                "vr",
                "vr_total_pessoas_residentes",
                vr_total_pessoas_residentes,
                sync
              )
            }
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  TextInputStyle_Container_collumn: {
    flexDirection: "column",
    width: "45%",
    height: 50,
    //backgroundColor:'red'
  },
  DropdrownStyle_Container_collumn: {
    flexDirection: "column",
    width: "45%",
    height: 100,
    display: "flex",
  },
  DropdrownStyle_row: {
    width: "auto",
    height: 40,
    marginTop: 15,
    borderRadius: 0,
    borderWidth: 1,
  },
  input: {
    width: "81%",
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
  },
  searchSection: {
    //flex: 1,
    flexDirection: "row",
    height: 40,
    marginTop: 15,
    borderWidth: 1,
    backgroundColor: "white",
  },
  searchIcon: {
    padding: 10,
  },

  rowStyle: {
    flexDirection: "row",
    marginTop: 10,
    display: "flex",
    justifyContent: "space-around",
    height: "auto",
    width: "85%",
    flexWrap: "wrap",
  },
  form_step1: {
    marginTop: 15,
    width: "95%",
    left: 11,
    height: 200,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
    zIndex: 1,
  },
  localizacao: {
    color: "#121212",
    marginLeft: 30,
  },
  input2: {
    height: 40,
    width: "85%",
    //marginRight:25,
    marginTop: 2,
    borderWidth: 1,

    backgroundColor: "white",
  },
  form: {
    width: "95%",
    height: "auto",
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  rect2: {
    width: "100%",
    height: 36,
    backgroundColor: "rgba(74,144,226,1)",
    borderRadius: 3,
    zIndex: 2,
  },
  titleStyle: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 15,
  },
  DropdrownStyle: {
    height: 40,
    //width: "85%",
    //marginLeft: 30,
    //height: 40,
    marginTop: 5,
    borderRadius: 0,
    borderWidth: 1,
  },
  titulo: {
    color: "white",
    marginLeft: 9,
    marginTop: 1,
  },
});

export default Step1;
