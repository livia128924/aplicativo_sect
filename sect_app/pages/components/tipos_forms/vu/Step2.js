import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInputMask } from "react-native-masked-text";
import { DatabaseConnection } from "../../../database/database";
const db = DatabaseConnection.getConnection();

const Step2 = (props) => {
  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");
  const [unmasked, setUnmasked] = useState("");
  const [vu_ocupacao_data, set_vu_ocupacao_data] = useState("");

  const [open_vu_ocupacao_reside, setOpen_vu_ocupacao_reside] = useState(false);
  const [valor_vu_ocupacao_reside, setValor_vu_ocupacao_reside] =
    useState(null);
  const [item_vu_ocupacao_reside, setItem_vu_ocupacao_reside] = useState([
    { label: "Sim", value: "s" },
    { label: "Nao", value: "n" },
  ]);

  const [open_vu_ocupacao_pacifica, setOpen_vu_ocupacao_pacifica] = useState(false);
  const [valor_vu_ocupacao_pacifica, setValor_vu_ocupacao_pacifica] =
    useState(null);
  const [item_vu_ocupacao_pacifica, setItem_vu_ocupacao_pacifica] = useState([
    { label: "Sim", value: "s" },
    { label: "Nao", value: "n" },
  ]);

  const [open_vu_ocupacao_utilizacao, setOpen_vu_ocupacao_utilizacao] = useState(false);
  const [valor_vu_ocupacao_utilizacao, setValor_vu_ocupacao_utilizacao] = useState(null);
  const [item_vu_ocupacao_utilizacao, setItem_vu_ocupacao_utilizacao] = useState([
    { label: "Sim", value: "s" },
    { label: "Nao", value: "n" },
  ]);

  const [open_vu_ocupacao_benfeitoria, setOpen_vu_ocupacao_benfeitoria] = useState(false);
  const [valor_vu_ocupacao_benfeitoria, setValor_vu_ocupacao_benfeitoria] = useState(null);
  const [item_vu_ocupacao_benfeitoria, setItem_vu_ocupacao_benfeitoria] = useState([]);

  const [vu_ocupacao_benfeitoria_outros, set_vu_ocupacao_benfeitoria_outros] = useState("");

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
      //console.log(value);
      setSync(value);
      cod_processo = value;
    });

    AsyncStorage.getItem("codigo").then((codigo) => {
      setDados_valor(codigo);
    });

    loadStep2();

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

                setValorAtividade(
                  results.rows.item(0).se_ruj_inicio_atividades
                );

                setValorNaturezaAtv(
                  results.rows.item(i).se_ruj_natureza_atividades
                );

                setOutros(
                  results.rows.item(i).se_ruj_natureza_atividades_outros
                );

                setComercio(
                  results.rows.item(i).se_ruj_ramo_atividade_comercio
                );

                setIndustria(
                  results.rows.item(i).se_ruj_ramo_atividade_industria
                );

                setRecursosNaturais(
                  results.rows.item(i).se_ruj_ramo_atividade_recursos_naturais
                );

                setT_I(results.rows.item(i).se_ruj_ramo_atividade_tic);
              }
            }
          );
        });
      } //
    });
  }, []);

  //////////////primeira coisa que faz quando entra na tela:  faz um select das tabelas aux para carregar nos components //////////////
  async function loadStep2() {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from aux_ocupacao_utilizacao", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_vu_ocupacao_utilizacao(temp);
        });
        tx.executeSql("select * from aux_ocupacao_benfeitoria", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_vu_ocupacao_benfeitoria(temp);
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

  return (
    <View>

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

    <View style={styles.municipio}>
      <Text>Utilizações do Imóvel</Text>
    </View>

    <View style={{ alignSelf: "center", alignContent: "center" }}>
      <DropDownPicker
        style={styles.abrangencia}
        open={open_vu_ocupacao_utilizacao}
        value={parseInt(valor_vu_ocupacao_utilizacao)}
        items={item_vu_ocupacao_utilizacao}
        setOpen={setOpen_vu_ocupacao_utilizacao}
        setValue={setValor_vu_ocupacao_utilizacao}
        setItems={setItem_vu_ocupacao_utilizacao} //aux_acesso
        //dropDownDirection='BOTTOM'
        onChangeValue={() =>
          onPressTitle(
            "vu",
            "vu_ocupacao_utilizacao",
            valor_vu_ocupacao_utilizacao,
            sync
            )
          }
          listMode="SCROLLVIEW"
          placeholder="Selecione:"
          />
    </View>

      <View style={styles.municipio}>
        <Text>Exerce a posse pacificamente?</Text>
      </View>


      <View style={{ alignSelf: "center", alignContent: "center" }}>
      <DropDownPicker
        style={styles.abrangencia}
        open={open_vu_ocupacao_pacifica}
        value={parseInt(valor_vu_ocupacao_pacifica)}
        items={item_vu_ocupacao_pacifica}
        setOpen={setOpen_vu_ocupacao_pacifica}
        setValue={setValor_vu_ocupacao_pacifica}
        setItems={setItem_vu_ocupacao_pacifica} //aux_acesso
        //dropDownDirection='BOTTOM'
        onChangeValue={() =>
          onPressTitle(
            "vu",
            "vu_ocupacao_pacifica",
            valor_vu_ocupacao_pacifica,
            sync
            )
          }
          listMode="SCROLLVIEW"
          placeholder="Selecione:"
          />
    </View>

      <View style={styles.municipio}>
        <Text>Ocupação benfeitoria</Text>
      </View>

      <View style={{ alignSelf: "center", alignContent: "center" }}>
      <DropDownPicker
        style={styles.abrangencia}
        open={open_vu_ocupacao_benfeitoria}
        value={parseInt(valor_vu_ocupacao_benfeitoria)}
        items={item_vu_ocupacao_benfeitoria}
        setOpen={setOpen_vu_ocupacao_benfeitoria}
        setValue={setValor_vu_ocupacao_benfeitoria}
        setItems={setItem_vu_ocupacao_benfeitoria} //aux_acesso
        //dropDownDirection='BOTTOM'
        onChangeValue={() =>
          onPressTitle(
            "vu",
            "vu_ocupacao_benfeitoria",
            valor_vu_ocupacao_benfeitoria,
            sync
            )
          }
          listMode="SCROLLVIEW"
          placeholder="Selecione:"
          />
    </View>

    <View style={{ alignItems: "center" }}>
      <TextInput
        style={styles.inputOutros}
        onChangeText={set_vu_ocupacao_benfeitoria_outros}
        value={vu_ocupacao_benfeitoria_outros}
        onBlur={() =>
          onPressTitle(
            "vu",
            "vu_ocupacao_benfeitoria_outros",
            outros,
            sync
            )
          }
          placeholder={" Outros"}
          />
    </View>


</View>

  </View>
  );
};

const styles = StyleSheet.create({
  municipio: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 10,
  },
  input_style: {
    height: 40,
    width: "85%",
    marginTop: 10,
    marginLeft: 10,
    borderWidth: 1,
    backgroundColor: "white",
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
  NaturezaAtvTitle: {
    color: "#121212",
    //marginLeft: 30,
    marginTop: 10,
  },

  inputOutros: {
    height: 40,
    width: "85%",
    marginTop: 10,
    //marginLeft: 10,
    //marginRight:25,
    borderWidth: 1,
    backgroundColor: "white",
  },
  form4: {
    // width: 340,
    // height: 450,
    // marginLeft: 25,
    // marginTop: 10,
    // borderWidth: 1,
    // borderColor: "rgba(74,144,226,1)",
    // borderRadius: 3,
    // zIndex:1
  },
  NaturezaAtv: {
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
  select: {
    height: 40,
    width: "85%",
    marginLeft: 30,
    height: 40,
    borderRadius: 0,
    borderWidth: 1,
  },

  titulo: {
    color: "white",
    marginLeft: 9,
    marginTop: 1,
  },
  atividadeTitle: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 10,
  },
  atividade: {
    marginTop: 15,
    height: 40,
    width: "85%",
    marginLeft: 30,
    borderRadius: 0,
    borderWidth: 1,
  },
});

export default Step2;
