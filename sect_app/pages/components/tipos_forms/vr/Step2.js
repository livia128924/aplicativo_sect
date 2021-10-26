import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInputMask } from "react-native-masked-text";
import { DatabaseConnection } from "../../../database/database";
const db = DatabaseConnection.getConnection();

const Step2 = (props) => {

  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");
  const [unmasked, setUnmasked] = useState("");
  const [vr_denominacao, set_vr_denominacao] = useState("");
  const [vr_area_pretendida, set_vr_area_pretendida] = useState("");
  const [vr_perimetro, set_vr_perimetro] = useState("");

  const [vr_escala, set_vr_escala] = useState("");
  const [vr_localizacao, set_vr_localizacao] = useState("");
  const [vr_area_solo_superior, set_vr_area_solo_superior] = useState("");
  const [vr_area_solo_comum, set_vr_area_solo_comum] = useState("");
  const [vr_area_solo_inferior, set_vr_area_solo_inferior] = useState("");

  const [open_vr_ocupacao_benfeitoria, setOpen_vr_ocupacao_benfeitoria] = useState(false);
  const [valor_vr_ocupacao_benfeitoria, setValor_vr_ocupacao_benfeitoria] = useState(null);
  const [item_vr_ocupacao_benfeitoria, setItem_vr_ocupacao_benfeitoria] = useState([]);

  const [open_vr_condicoes_acesso, setOpen_vr_condicoes_acesso] = useState(false);
  const [valor_vr_condicoes_acesso, setValor_vr_condicoes_acesso] = useState(null);
  const [item_vr_condicoes_acesso, setItem_vr_condicoes_acesso] = useState([]);

  const [open_vr_municipio, setOpen_vr_municipio] = useState(false);
  const [valor_vr_municipio, setValor_vr_municipio] = useState(null);
  const [item_vr_municipio, setItem_vr_municipio] = useState([]);

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
              " where vr_cod_processo = '" +
              cod_processo +
              "'",
            [],
            (tx, results) => {
              var row = [];
              for (let i = 0; i < results.rows.length; ++i) {
               // console.log(results.rows.item(0).vr_acesso);
                set_vr_localizacao(
                  results.rows.item(0).vr_localizacao
                );
                set_vr_denominacao(
                  results.rows.item(0).vr_denominacao
                );
                setValor_vr_municipio(
                  results.rows.item(i).vr_municipio
                );
                set_vr_area_solo_superior(
                  results.rows.item(0).vr_area_solo_superior
                );
                set_vr_area_solo_comum(
                  results.rows.item(0).vr_area_solo_comum
                );
                set_vr_area_solo_inferior(
                  results.rows.item(0).vr_area_solo_inferior
                );
                setValor_vr_condicoes_acesso(
                  results.rows.item(i).vr_condicoes_acesso
                );

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

        tx.executeSql("select * from aux_ocupacao_benfeitoria", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_vr_ocupacao_benfeitoria(temp);
        });
        tx.executeSql("select * from aux_condicoes_acesso", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_vr_condicoes_acesso(temp);
        });
        tx.executeSql("select * from cidades", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({ label: results.rows.item(i).nome, value: results.rows.item(i).codigo });
          }
          setItem_vr_municipio(temp);
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

  return (
    <View>
    <View style={styles.form_step1}>
    <View style={styles.rect2}>
      <Text style={styles.titulo}>IDENTIFICAÇÃO DO IMÓVEL</Text>
    </View>

    <View style={styles.municipio}>
      <Text>Denominação</Text>
    </View>
    <View style={{ alignItems: "center" }}>
      <TextInput
      style={styles.input2}
      onChangeText={set_vr_denominacao}
      value={vr_denominacao}
      onBlur={() =>
      onPressTitle("vr", "vr_denominacao", vr_denominacao, sync)
      }
      />
    </View>
{/*
    <View style={styles.municipio}>
      <Text>Dimensões</Text>
    </View>
    <View style={styles.municipio}>
      <Text>Área pretendida (ha)</Text>
    </View>
    <View style={{ alignItems: "center" }}>
      <TextInput
      style={styles.input2}
      onChangeText={set_vr_area_pretendida}
      value={vr_area_pretendida}
      onBlur={() =>
      onPressTitle("vr", "vr_area_pretendida", vr_area_pretendida, sync)
      }
      placeholder={"   0,00"}
      />
    </View> */}
    {/* <View style={styles.municipio}>
      <Text> Perímetro (m2)</Text>
    </View>
    <View style={{ alignItems: "center" }}>
      <TextInput
      style={styles.input2}
      onChangeText={set_vr_perimetro}
      value={vr_perimetro}
      onBlur={() =>
      onPressTitle("vr", "vr_perimetro", vr_perimetro, sync)
      }
      placeholder={"   0,00"}
      />
    </View> */}


      <View style={styles.municipio}>
        <Text>Localizacao</Text>
      </View>
      <View style={{ alignItems: "center" }}>
      <TextInput
      style={styles.input2}
      onChangeText={set_vr_localizacao}
      value={vr_localizacao}
      onBlur={() =>
      onPressTitle("vr", "vr_localizacao", vr_localizacao, sync)
      }
      placeholder={"  "}
      />
    </View>


      <View style={styles.municipio}>
        <Text>Município</Text>
      </View>

      <View style={{ alignSelf: "center", alignContent: "center" }}>
      <DropDownPicker
        style={styles.select}
        open={open_vr_municipio}
        value={parseInt(valor_vr_municipio)}
        items={item_vr_municipio}
        setOpen={setOpen_vr_municipio}
        setValue={setValor_vr_municipio}
        setItems={setItem_vr_municipio}
        dropDownDirection='TOP'

        onChangeValue={() =>
          onPressTitle(
            "vr",
            "vr_municipio",
            valor_vr_municipio,
            sync
            )
          }
          listMode="SCROLLVIEW"
          placeholder="Selecione:"
          />
    </View>
</View>
    <View style={styles.form_step1}>
    <View style={styles.rect2}>
      <Text style={styles.titulo}>POTENCIALIDADE APARENTE DO SOLO</Text>
    </View>

    <View style={{
    color: "#121212",
    marginLeft: 30,
    marginTop: 10,
    width:`80%`
    }}>
      <Text>Solos superiores (férteis e/ou cobertos de matas com madeira de lei)</Text>
    </View>
    <View style={styles.municipio}>
      <Text>Área (ha)</Text>
    </View>
    <View style={{ alignItems: "center" }}>
      <TextInput
      style={styles.input2}
      onChangeText={set_vr_area_solo_superior}
      keyboardType={ "numeric"}
      value={vr_area_solo_superior}
      onBlur={() =>
      onPressTitle("vr", "vr_area_solo_superior", vr_area_solo_superior, sync)
      }
      placeholder="  0,00"
      />
    </View>

    <View style={styles.municipio}>
      <Text>Solos mais comuns na região</Text>
    </View>
    <View style={styles.municipio}>
      <Text>Área (ha)</Text>
    </View>
    <View style={{ alignItems: "center" }}>
      <TextInput
      style={styles.input2}
      onChangeText={set_vr_area_solo_comum}
      keyboardType={ "numeric"}
      value={vr_area_solo_comum}
      onBlur={() =>
      onPressTitle("vr", "vr_area_solo_comum", vr_area_solo_comum, sync)
      }
      placeholder={"   0,00"}
      />
    </View>
    <View style={styles.municipio}>
      <Text>Solos inferiores (francos acidentados e/ou aproveitáveis parte do ano) várzea</Text>
    </View>
    <View style={styles.municipio}>
      <Text>Área (ha)</Text>
    </View>
    <View style={{ alignItems: "center" }}>
      <TextInput
      style={styles.input2}
      keyboardType={"numeric"}
      onChangeText={set_vr_area_solo_inferior}
      value={vr_area_solo_inferior}
      onBlur={() =>
      onPressTitle("vr", "vr_area_solo_inferior", vr_area_solo_inferior, sync)}
      placeholder={"   0,00"}
      />
    </View>
</View>
    <View style={styles.form_step1}>
    <View style={styles.rect2}>
      <Text style={styles.titulo}>CONDIÇÕES DE ACESSO</Text>
    </View>

    <View style={styles.municipio}>
      <Text>Condições de acesso</Text>
    </View>
    <View style={{ width:'84%', alignSelf: "center", alignContent: "center" }}>
      <DropDownPicker
        style={styles.abrangencia}
        open={open_vr_condicoes_acesso}
        value={parseInt(valor_vr_condicoes_acesso)}
        items={item_vr_condicoes_acesso}
        setOpen={setOpen_vr_condicoes_acesso}
        setValue={setValor_vr_condicoes_acesso}
        setItems={setItem_vr_condicoes_acesso} //aux_acesso
        //dropDownDirection='BOTTOM'
        dropDownContainerStyle={{
         // backgroundColor: "#dfdfdf",
         //height:'auto',
          display:'flex',
          alignContent:'center',
        }}
        onChangeValue={() =>
          onPressTitle(
            "vr",
            "vr_condicoes_acesso",
            valor_vr_condicoes_acesso,
            sync
            )
          }
          listMode="SCROLLVIEW"
          placeholder="Selecione:"
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
    // marginLeft: 30,
    height: 40,
    //marginTop: 20,
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
    //marginLeft: 30,
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
