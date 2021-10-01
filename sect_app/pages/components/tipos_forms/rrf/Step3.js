import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";
import { DatabaseConnection } from "../../../database/database";
import { TextInputMask } from "react-native-masked-text";
const db = DatabaseConnection.getConnection();

const Step3 = (props) => {
  const [sync, setSync] = useState("");

  const [se_rrf_onde_reside_outros, set_se_rrf_onde_reside_outros] = useState("");

  const [se_rrf_situacao_imovel_outros, set_se_rrf_situacao_imovel_outros] = useState("");

  const [se_rrf_tipo_documento_outros, set_se_rrf_tipo_documento_outros] = useState("");

  const [se_rrf_tipo_construcao_outros, set_se_rrf_tipo_construcao_outros] = useState("");

  const [aberto_se_rrf_tipo_ocupacao, setAberto_se_rrf_tipo_ocupacao] = useState(false);
  const [valor_se_rrf_tipo_ocupacao, setValor_se_rrf_tipo_ocupacao] = useState(null);
  const [item_se_rrf_tipo_ocupacao, setItem_se_rrf_tipo_ocupacao] = useState([]);

  const [aberto_se_rrf_tempo_ocupacao, setAberto_se_rrf_tempo_ocupacao] = useState(false);
  const [valor_se_rrf_tempo_ocupacao, setValor_se_rrf_tempo_ocupacao] = useState(null);
  const [item_se_rrf_tempo_ocupacao, setItem_se_rrf_tempo_ocupacao] = useState([]);

  const [aberto_se_rrf_onde_reside, setAberto_se_rrf_onde_reside] = useState(false);
  const [valor_se_rrf_onde_reside, setValor_se_rrf_onde_reside] = useState(null);
  const [item_se_rrf_onde_reside, setItem_se_rrf_onde_reside] = useState([]);

  const [isVisible_onde_reside, setVisible_onde_reside] = useState(false);

  const [aberto_se_rrf_tipo_construcao, setAberto_se_rrf_tipo_construcao] = useState(false);
  const [valor_se_rrf_tipo_construcao, setValor_se_rrf_tipo_construcao] = useState(null);
  const [item_se_rrf_tipo_construcao, setItem_se_rrf_tipo_construcao] = useState([]);

  const [isVisible_tipo_construcao, setVisible_tipo_construcao] = useState(false);

  const [aberto_se_rrf_numero_comodos, setAberto_se_rrf_numero_comodos] = useState(false);
  const [valor_se_rrf_numero_comodos, setValor_se_rrf_numero_comodos] = useState(null);
  const [item_se_rrf_numero_comodos, setItem_se_rrf_numero_comodos] = useState([]);

  const [aberto_se_rrf_numero_pisos, setAberto_se_rrf_numero_pisos] = useState(false);
  const [valor_se_rrf_numero_pisos, setValor_se_rrf_numero_pisos] = useState(null);
  const [item_se_rrf_numero_pisos, setItem_se_rrf_numero_pisos] = useState([]);

  const [aberto_se_rrf_estado_conservacao, setAberto_se_rrf_estado_conservacao] = useState(false);
  const [valor_se_rrf_estado_conservacao, setValor_se_rrf_estado_conservacao] = useState(null);
  const [item_se_rrf_estado_conservacao, setItem_se_rrf_estado_conservacao] = useState([]);


  const [se_rrf_situacao_imovel, set_se_rrf_situacao_imovel] =useState([]);
  const [isVisible_situacao_imovel, setVisible_situacao_imovel] =useState(false);

  const [se_rrf_tipo_documento, set_se_rrf_tipo_documento] =useState([]);
  const [isVisible_tipo_documento, setVisible_tipo_documento] =useState(false);

  useEffect(() => {
    var cod_processo = "";
    //carrega o valor do select na tela index.js
    AsyncStorage.getItem("pr_codigo").then((value) => {
      //console.log(value);
      setSync(value);
      cod_processo = value;
    });

    // AsyncStorage.getItem('codigo').then(codigo => {
    //     setDados_valor(codigo);
    // })

    loadStep3();

    //   AsyncStorage.getItem('nome_tabela').then(tabela => {
    //     //console.log(cod_processo);
    //     if (tabela) {

    //         db.transaction((tx) => {

    //             tx.executeSql(
    //                 "select * from " + tabela + " where rq = '" + cod_processo + "'", [], (tx, results) => {

    //                     var row = [];
    //                     for (let i = 0; i < results.rows.length; ++i) {
    //                         console.log(results.rows.item(0).se_duf_acesso);

    //                         //setValorMao_de_obra(results.rows.item(i).se_duf_mao_de_obra);

    //                         setSe_duf_situacao_imovel_outros(results.rows.item(i).se_duf_situacao_imovel_outros);

    //                         setSe_duf_tipo_documento_outros(results.rows.item(0).se_duf_tipo_documento_outros);

    //                         setValorSe_duf_tipo_ocupacao(results.rows.item(i).se_duf_tipo_ocupacao);

    //                         setValorSe_duf_tempo_ocupacao(results.rows.item(i).se_duf_tempo_ocupacao);

    //                         setValorSe_duf_onde_reside(results.rows.item(i).se_duf_onde_reside);

    //                         setSe_duf_onde_reside_outros(results.rows.item(0).se_duf_onde_reside_outros);

    //                         var x = results.rows.item(i).se_duf_situacao_imovel;
    //                         valor_checked(x.split(","));

    //                         var y = results.rows.item(i).se_duf_tipo_documento;
    //                         valor_checked_tipo_documento(y.split(","));

    //                         var w = results.rows.item(i).se_duf_material_cobertura;
    //                         valor_checked_material_cobertura(w.split(","));

    //                         //console.log(typeof (results.rows.item(i).se_duf_title_style));
    //                         //valor(row);
    //                     }

    //                 });
    //         })
    //     }
    // });
  }, []);

  //////////////primeira coisa que faz quando entra na tela:  faz um select das tabelas aux para carregar nos components //////////////
  async function loadStep3() {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select * from aux_situacao_imovel",
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push({
                label: results.rows.item(i).descricao,
                id: results.rows.item(i).codigo,
                isChecked: false,
              });
            }
            set_se_rrf_situacao_imovel(temp);
          }
        );
        tx.executeSql("select * from aux_tipo_documento", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              id: results.rows.item(i).codigo,
              isChecked: false,
            });
          }
          set_se_rrf_tipo_documento(temp);
        });
        tx.executeSql("select * from aux_tipo_ocupacao", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_se_rrf_tipo_ocupacao(temp);
        });
        tx.executeSql("select * from aux_tempo_ocupacao", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_se_rrf_tempo_ocupacao(temp);
        });
        tx.executeSql("select * from aux_onde_reside", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_se_rrf_onde_reside(temp);
        });
        tx.executeSql(
          "select * from aux_tipo_construcao",
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push({
                label: results.rows.item(i).descricao,
                value: results.rows.item(i).codigo,
              });
            }
            setItem_se_rrf_tipo_construcao(temp);
          }
        );
        tx.executeSql("select * from aux_comodos", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_se_rrf_numero_comodos(temp);
        });
        tx.executeSql("select * from aux_pisos", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_se_rrf_numero_pisos(temp);
        });
        tx.executeSql(
          "select * from aux_estado_conservacao",
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push({
                label: results.rows.item(i).descricao,
                value: results.rows.item(i).codigo,
              });
            }
            setItem_se_rrf_estado_conservacao(temp);
          }
        );
      },
      (tx, err) => {
        console.error("There was a problem with the tx", err);
        return true;
      },
      (tx, success) => {
        console.log("all done", success);
      }
    );
  }

  //   //função que aciona quando o estado do componente muda e seta os valores correspondente
  //   function onPressTitle(tabela, campo, valor, codigo) {

  //     db.transaction((tx) => {
  //         const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_duf_cod_processo = '${codigo}'`;
  //         console.log(query);
  //         tx.executeSql(query, [], (tx, results) => {
  //             for (let i = 0; i < results.rows.length; ++i) {
  //                 alert("INSERIDO COM SUCESSO");
  //             }
  //         });

  //     }, (tx, err) => {
  //         console.error("error", err);
  //         return true;
  //     }, (tx, success) => {
  //         console.log("tudo certo por aqui", success);
  //         //get_values(tabela, campo, sync);  ///esse aqui foi a tentativa
  //     });

  //     var chaves = '"' + tabela + ' ' + campo + ' ' + valor + ' ' + codigo + '"';

  //     db.transaction((tx) => {
  //       //tx.executeSql("DROP TABLE log", []);
  //       const log_delete = "INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + " ,'" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')";
  //       console.log("INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + " ,'" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')");
  //       tx.executeSql(log_delete, []);
  //     });

  //     db.transaction((tx) => {
  //       const log_update = "REPLACE INTO log (chave, tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + ", '" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')";
  //       console.log(log_update);
  //       tx.executeSql(log_update, [], (tx, results) => {

  //       });
  //     })

  //     AsyncStorage.setItem('nome_tabela', tabela);

  //     AsyncStorage.setItem('codigo', valor.toString());

  // };

  const handleChange_situacao_imovel = (id) => {
    const newState = se_rrf_situacao_imovel.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_se_rrf_situacao_imovel(newState); // atualiza o estado
  };
  const handleChange_tipo_documento = (id) => {
    const newState = se_rrf_tipo_documento.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_se_rrf_tipo_documento(newState); // atualiza o estado
  };

  function muda_situacao_imovel() {
    //await api
    var str_valores = [];

    se_rrf_situacao_imovel
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
        {item.id === 4  ?  setVisible_situacao_imovel(true) :  setVisible_situacao_imovel(false)}
      });
    console.log(str_valores);
    return str_valores.join(",");
  }
  function muda_tipo_documento() {
    //await api
    var str_valores = [];

    se_rrf_tipo_documento
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
        {item.id === 6  ?  setVisible_tipo_documento(true) :  setVisible_tipo_documento(false)}
      });
    //console.log(str_valores);
    return str_valores.join(",");
  }


  function valor_checked_situacao_imovel(rq_conjuge_filiacao) {
    db.transaction((tx) => {
      //console.log(temp);
      let x = temp;
      //console.log(x);
      rq_conjuge_filiacao.forEach((item) => {
        x.forEach((val) => {
          if (val.id == item) {
            val.isChecked = true;
          }
        });
      });

      return set_rq_conjuge_filiacao(x);
    });
  }

  return (
    <>
      <View style={styles.form5}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>DADOS DO OCUPANTE EM RELAÇÃO AO IMÓVEL</Text>
        </View>
        <View style={styles.titulo_style}>
          <Text>Situação do Imóvel</Text>
        </View>
        <View style={styles.checkboxlabel}>
            {[...se_rrf_situacao_imovel].map((item, index) => (
              <View style={styles.checkboxGroup} key={item.id}>
                <Checkbox
                  style={styles.checkbox}
                  value={item.isChecked}
                  onValueChange={() => {
                    handleChange_situacao_imovel(item.id);
                    muda_situacao_imovel();
                   // onPressTitle("se_rrf", "se_rrf_situacao_imovel", muda_situacao_imovel(), sync);
                  }}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>
        {isVisible_situacao_imovel ?
        <View  style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_se_rrf_situacao_imovel_outros}
            value={se_rrf_situacao_imovel_outros}
            onBlur={() =>
              onPressTitle("se_rrf", "se_rrf_situacao_imovel_outros", se_rrf_situacao_imovel_outros, sync)
            }
            placeholder={"   outros"}
          />
        </View>
           : null}

        <View style={styles.titulo_style}>
          <Text>Tipo de Documento</Text>
        </View>

        <View style={styles.checkboxlabel}>
            {[...se_rrf_tipo_documento].map((item, index) => (
              <View style={styles.checkboxGroup} key={item.id}>
                <Checkbox
                  style={styles.checkbox}
                  value={item.isChecked}
                  onValueChange={() => {
                    handleChange_tipo_documento(item.id);
                    muda_tipo_documento();
                    //onPressTitle("se_rrf", "se_rrf_tipo_documento", muda_tipo_documento(), sync);
                  }}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>
          {isVisible_tipo_documento ?
          <View  style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_se_rrf_tipo_documento_outros}
            value={se_rrf_tipo_documento_outros}
            onBlur={() =>
              onPressTitle("se_rrf", "se_rrf_tipo_documento_outros", se_rrf_tipo_documento_outros, sync)
            }
            placeholder={"   outros"}
          />
        </View>
          : null}

        <View style={styles.titulo_style}>
          <Text>Ocupações</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <DropDownPicker
            style={styles.dropdown_style}
            open={aberto_se_rrf_tipo_ocupacao}
            value={valor_se_rrf_tipo_ocupacao}
            items={item_se_rrf_tipo_ocupacao}
            setOpen={setAberto_se_rrf_tipo_ocupacao}
            setValue={setValor_se_rrf_tipo_ocupacao}
            setItems={setItem_se_rrf_tipo_ocupacao} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle("se_rrf", "se_rrf_tipo_ocupacao", valor_se_rrf_tipo_ocupacao, sync)
            }
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>

        <View style={styles.titulo_style}>
          <Text>Tempo de Ocupação</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <DropDownPicker
            style={styles.dropdown_style}
            open={aberto_se_rrf_tempo_ocupacao}
            value={valor_se_rrf_tempo_ocupacao}
            items={item_se_rrf_tempo_ocupacao}
            setOpen={setAberto_se_rrf_tempo_ocupacao}
            setValue={setValor_se_rrf_tempo_ocupacao}
            setItems={setItem_se_rrf_tempo_ocupacao} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle("se_rrf", "se_rrf_tempo_ocupacao", valor_se_rrf_tempo_ocupacao, sync)
            }
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>

        <View style={styles.titulo_style}>
          <Text>Onde Reside</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <DropDownPicker
            style={styles.dropdown_style}
            open={aberto_se_rrf_onde_reside}
            value={valor_se_rrf_onde_reside}
            items={item_se_rrf_onde_reside}
            setOpen={setAberto_se_rrf_onde_reside}
            setValue={setValor_se_rrf_onde_reside}
            setItems={setItem_se_rrf_onde_reside} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            dropDownDirection="TOP"
            onChangeValue={() =>{
              valor_se_rrf_onde_reside === 3 ? setVisible_onde_reside(true) : setVisible_onde_reside(false);
              //onPressTitle("se_rrf", "se_rrf_onde_reside", valor_se_rrf_onde_reside, sync)
            }}
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>
        {isVisible_onde_reside ?
          <View  style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_se_rrf_onde_reside_outros}
            value={se_rrf_onde_reside_outros}
            onBlur={() =>
              onPressTitle("se_rrf", "se_rrf_onde_reside_outros", se_rrf_onde_reside_outros, sync)
            }
            placeholder={"   outros"}
          />
        </View>
        : null}
      </View>

      <View style={styles.form6}>

        <View style={styles.rect2}>
          <Text style={styles.titulo}>INFRAESTRUTURA DO IMÓVEL</Text>
        </View>
        <View style={styles.titulo_style}>
          <Text>Tipo de Construção</Text>
        </View>
        <View style={{ alignItems: "center" }}>
        <DropDownPicker
            style={styles.dropdown_style}
            open={aberto_se_rrf_tipo_construcao}
            value={valor_se_rrf_tipo_construcao}
            items={item_se_rrf_tipo_construcao}
            setOpen={setAberto_se_rrf_tipo_construcao}
            setValue={setValor_se_rrf_tipo_construcao}
            setItems={setItem_se_rrf_tipo_construcao} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            dropDownDirection="TOP"
            onChangeValue={() =>{
              //console.log(valor_se_rrf_tipo_construcao)
              valor_se_rrf_tipo_construcao === 4 ? setVisible_tipo_construcao(true) : setVisible_tipo_construcao(false);
              //onPressTitle("se_rrf", "se_rrf_onde_reside", valor_se_rrf_onde_reside, sync)
            }}
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>

        {isVisible_tipo_construcao ?
          <View  style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_se_rrf_tipo_construcao_outros}
            value={se_rrf_tipo_construcao_outros}
            onBlur={() =>
              onPressTitle("se_rrf", "se_rrf_tipo_construcao_outros", se_rrf_tipo_construcao_outros, sync)
            }
            placeholder={"   outros"}
          />
        </View>
        : null}

        <View style={styles.titulo_style}>
          <Text>Nº de Cômodos</Text>
        </View>
        <View style={{ alignItems: "center" }}>
        <DropDownPicker
            style={styles.dropdown_style}
            open={aberto_se_rrf_numero_comodos}
            value={valor_se_rrf_numero_comodos}
            items={item_se_rrf_numero_comodos}
            setOpen={setAberto_se_rrf_numero_comodos}
            setValue={setValor_se_rrf_numero_comodos}
            setItems={setItem_se_rrf_numero_comodos} //cidades
            //zIndex={9999}
            listMode="SCROLLVIEW"
            dropDownDirection="TOP"
            onChangeValue={() =>{
              //console.log(valor_se_rrf_tipo_construcao)
              //valor_se_rrf_tipo_construcao === 4 ? setVisible_tipo_construcao(true) : setVisible_tipo_construcao(false);
              //onPressTitle("se_rrf", "se_rrf_onde_reside", valor_se_rrf_onde_reside, sync)
            }}
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>


        <View style={styles.titulo_style}>
          <Text>Nº de Piso</Text>
        </View>
        <View style={{ alignItems: "center" }}>
        <DropDownPicker
            style={styles.dropdown_style}
            open={aberto_se_rrf_numero_pisos}
            value={valor_se_rrf_numero_pisos}
            items={item_se_rrf_numero_pisos}
            setOpen={setAberto_se_rrf_numero_pisos}
            setValue={setValor_se_rrf_numero_pisos}
            setItems={setItem_se_rrf_numero_pisos} //cidades
           // zIndex={9999}
            listMode="SCROLLVIEW"
            dropDownDirection="TOP"
            onChangeValue={() =>{
              //console.log(valor_se_rrf_tipo_construcao)
              //valor_se_rrf_tipo_construcao === 4 ? setVisible_tipo_construcao(true) : setVisible_tipo_construcao(false);
              //onPressTitle("se_rrf", "se_rrf_onde_reside", valor_se_rrf_onde_reside, sync)
            }}
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>

        <View style={styles.titulo_style}>
          <Text>Estado de Conservação do Imóvel</Text>
        </View>
        <View style={{ alignItems: "center" }}>
        <DropDownPicker
            style={styles.dropdown_style}
            open={aberto_se_rrf_estado_conservacao}
            value={valor_se_rrf_estado_conservacao}
            items={item_se_rrf_estado_conservacao}
            setOpen={setAberto_se_rrf_estado_conservacao}
            setValue={setValor_se_rrf_estado_conservacao}
            setItems={setItem_se_rrf_estado_conservacao} //cidades
           // zIndex={9999}
            listMode="SCROLLVIEW"
            dropDownDirection="TOP"
            onChangeValue={() =>{
              //console.log(valor_se_rrf_tipo_construcao)
              //valor_se_rrf_tipo_construcao === 4 ? setVisible_tipo_construcao(true) : setVisible_tipo_construcao(false);
              //onPressTitle("se_rrf", "se_rrf_onde_reside", valor_se_rrf_onde_reside, sync)
            }}
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>
      </View>


    </>
  );
};

const styles = StyleSheet.create({
  eleitorStyle: {
    flexDirection: "row",
    //alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    height: 'auto',
    width:'85%',
    flexWrap:'wrap'
  },
  collumStyle:{
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  input_style_titulo: {
    height: 40,
    width: "100%",
    marginTop: 10,
    //marginLeft: 10,
    borderWidth: 1,
    backgroundColor: "white",
  },
  input_style_zona: {
    height: 40,
    width: "100%",
    marginTop: 10,
    // marginLeft: 10,
    backgroundColor: "red",
    borderWidth: 1,
    backgroundColor: "white",
  },
  checkbox: {
    //alignContent:'space-around',
  },
  checkboxGroup: {
    // backgroundColor:'red',
    //height:20,
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxlabel: {
    // width: "100%",
    // //textAlign:'center',
    // flexDirection: "row",
    // height: 45,
    // alignItems: "center",
    // display: "flex",
    // justifyContent: "space-evenly",
     marginTop: 5,
    marginLeft: 30,
  },
  form6: {
    width: "95%",
    height: 'auto',
    paddingBottom:10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  form7: {
    width: "95%",
    height: 'auto',
    paddingBottom:10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  form5: {
    width: "95%",
    height: 'auto',
    marginTop: 10,
    paddingBottom:10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  title_style: {
    color: "#121212",
    //marginLeft: 30,
    marginTop: 10,
    alignItems: "center",
  },
  titulo_style: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 10,
    //alignItems: "center",
  },
  dropdown_style: {
    marginTop: 5,
    height: 40,
    width: "85%",
    marginLeft: 30,
    borderRadius: 0,
    borderWidth: 1,
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
  input_style: {
    height: 40,
    width: "85%",
    marginTop: 10,
    //Left: 10,
    borderWidth: 1,
    backgroundColor: "white",
  },
});

export default Step3;
