import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";
import { DatabaseConnection } from "../../../database/database";

const db = DatabaseConnection.getConnection();
const Step5 = (props) => {
  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");

  const [se_rrf_equipamentos_domesticos, set_se_rrf_equipamentos_domesticos] = useState([]);
  const [se_rrf_equipamentos_domesticos_outros, set_se_rrf_equipamentos_domesticos_outros] = useState("");
  const [isVisible_equipamentos_domestico, setVisible_equipamentos_domestico] = useState(false);

  const [se_rrf_participacao_organizacao_informal, set_se_rrf_participacao_organizacao_informal] = useState([]);
  const [se_rrf_participacao_organizacao_informal_outros, set_se_rrf_participacao_organizacao_informal_outros] = useState("");
  const [isVisible_organizacao_informal, setVisible_organizacao_informal] = useState(false);

  const [se_rrf_participacao_organizacao_formal, set_se_rrf_participacao_organizacao_formal] = useState([]);
  const [se_rrf_participacao_organizacao_formal_outros, set_se_rrf_participacao_organizacao_formal_outros] = useState("");
  const [isVisible_organizacao_formal, setVisible_organizacao_formal] = useState(false);

  const [se_duf_tipo_construcao, set_se_duf_tipo_construcao] = useState([]);

  const [se_duf_numero_comodos, set_se_duf_numero_comodos] = useState([]);

  const [se_duf_numero_pisos, set_se_duf_numero_pisos] = useState([]);

  const [se_duf_estado_conservacao, set_se_duf_estado_conservacao] = useState([]);


  const [open_se_duf_situacao_imovel, setOpen_se_duf_situacao_imovel] = useState(false);
  const [valor_se_duf_situacao_imovel, setValor_se_duf_situacao_imovel] = useState(null);
  const [item_se_duf_situacao_imovel, setItem_se_duf_situacao_imovel] = useState([]);

  const [open_se_duf_tempo_ocupacao, setOpen_se_duf_tempo_ocupacao] = useState(false);
  const [valor_se_duf_tempo_ocupacao, setValor_se_duf_tempo_ocupacao] = useState(null);
  const [item_se_duf_tempo_ocupacao, setItem_se_duf_tempo_ocupacao] = useState([]);

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

    loadStep5();

  //    AsyncStorage.getItem('nome_tabela').then(tabela => {
  //     //console.log("ok",cod_processo);
  //      if (tabela ) {

  //          db.transaction((tx) => {

  //              tx.executeSql(
  //                  "select * from " + tabela + " where se_duf_cod_processo = '" + cod_processo + "'", [], (tx, results) => {
  //                      //var x = "";
  //                     // console.log(results.rows.length);
  //                      var row = [];
  //                      for (let i = 0; i < results.rows.length; ++i) {

  //                        setSe_duf_equipamentos_domesticos_outros(results.rows.item(0).se_duf_equipamentos_domesticos_outros);

  //                        setSe_duf_organizacao_informal_outros(results.rows.item(0).se_duf_organizacao_informal_outros);

  //                        setSe_duf_organizacao_formal_outros(results.rows.item(0).se_duf_organizacao_formal_outros);


  //                           var x = results.rows.item(i).se_duf_equipamentos_domesticos;
  //                           valor_checked(x.split(','));

  //                           var y = results.rows.item(i).se_duf_organizacao_informal;
  //                          valor_checked_organizacao_informal(y.split(','));

  //                          var w = results.rows.item(i).se_duf_organizacao_formal;
  //                          valor_checked_organizacao_formal(w.split(','));

  //                          //console.log(results.rows.item(i).se_duf_sanitario);
  //                      }

  //                  }, function(tx, error) {
  //                   alert('SELECT error: ' + error.message);
  //               });
  //          })
  //      }
  //  });
  }, []);


  async function loadStep5() {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select * from aux_equipamento_domestico",
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
            set_se_rrf_equipamentos_domesticos(temp);
          }
        );
        tx.executeSql(
          "select * from aux_organizacao_informal",
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
            set_se_rrf_participacao_organizacao_informal(temp);
          }
        );
        tx.executeSql("select * from aux_organizacao_formal", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              id: results.rows.item(i).codigo,
              isChecked: false,
            });
          }
          set_se_rrf_participacao_organizacao_formal(temp);
        });
        tx.executeSql("select * from aux_comodos", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              id: results.rows.item(i).codigo,
              isChecked: false,
            });
          }
          set_se_duf_numero_comodos(temp);
        });
        tx.executeSql("select * from aux_pisos", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              id: results.rows.item(i).codigo,
              isChecked: false,
            });
          }
          set_se_duf_numero_pisos(temp);
        });
        tx.executeSql("select * from aux_estado_conservacao", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              id: results.rows.item(i).codigo,
              isChecked: false,
            });
          }
          set_se_duf_estado_conservacao(temp);
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

  //função que aciona quando o estado do componente muda e seta os valores correspondente
  // function onPressTitle(tabela, campo, valor, codigo) {

  //     ///console.log(codigo);
  //     db.transaction((tx) => {

  //         const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_duf_cod_processo = '${codigo}'`;
  //         //console.log(query);
  //         tx.executeSql(query, [], (tx, results) => {
  //             for (let i = 0; i < results.rows.length; ++i) {
  //                 alert("INSERIDO COM SUCESSO");
  //             }
  //         });
  //     }, (tx, err) => {
  //         //console.error("error em alguma coisa", err);
  //         return true;
  //     }, (tx, success) => {
  //         //console.log("tudo certo por aqui", success);
  //         //get_values(tabela, campo, sync);  ///esse aqui foi a tentativa
  //     });

  //     var chaves = '"' + tabela + ' ' + campo + ' ' + valor + ' ' + codigo + '"';

  //     db.transaction((tx) => {
  //         //tx.executeSql("DROP TABLE log", []);
  //         const log_delete = "INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + " ,'" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')";
  //         console.log("INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + " ,'" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')");
  //         tx.executeSql(log_delete, []);
  //     });

  //     db.transaction((tx) => {
  //         const log_update = "REPLACE INTO log (chave, tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + ", '" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')";
  //         console.log(log_update);
  //         tx.executeSql(log_update, [], (tx, results) => {

  //         });
  //     })
  //       AsyncStorage.setItem('nome_tabela', tabela);


  //     AsyncStorage.setItem('codigo', valor.toString());
  // };


  const handleChange_equipamentos_domestico = (id) => {
    const newState = se_rrf_equipamentos_domesticos.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_se_rrf_equipamentos_domesticos(newState); // atualiza o estado
  };

  const handleChange_organizacao_informal = (id) => {
    const newState = se_rrf_participacao_organizacao_informal.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_se_rrf_participacao_organizacao_informal(newState); // atualiza o estado
  };


  const handleChange_organizacao_formal = (id) => {
    const newState = se_rrf_participacao_organizacao_formal.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_se_rrf_participacao_organizacao_formal(newState); // atualiza o estado
  };

  const handleChange_se_duf_estado_conservacao = (id) => {
    const newState = se_duf_estado_conservacao.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_se_duf_estado_conservacao(newState); // atualiza o estado
  };

  function muda_equipamentos_domestico() {
    //await api
    var str_valores = [];

    se_rrf_equipamentos_domesticos
    .filter((value) => value.isChecked === true)
    .map((item) => {
      // console.log(item);
      str_valores.push(item.id);//19
      {item.id === 19  ?  setVisible_equipamentos_domestico(true) :  setVisible_equipamentos_domestico(false)}
    });
   // console.log(str_valores);
    return str_valores.join(",");
  }

  function muda_organizacao_informal() {
    //await api
    var str_valores = [];

    se_rrf_participacao_organizacao_informal
    .filter((value) => value.isChecked === true)
    .map((item) => {
      // console.log(item);
      str_valores.push(item.id);
      {item.id === 5  ?  setVisible_organizacao_informal(true) :  setVisible_organizacao_informal(false)}
    });
    //console.log(str_valores);
    return str_valores.join(",");
  }

  function muda_organizacao_formal() {
    //await api
    var str_valores = [];

    se_rrf_participacao_organizacao_formal
    .filter((value) => value.isChecked === true)
    .map((item) => {
      // console.log(item);
      str_valores.push(item.id);
      {item.id === 5  ?  setVisible_organizacao_formal(true) :  setVisible_organizacao_formal(false)}
    });
   // console.log(str_valores);
    return str_valores.join(",");
  }

    function muda_se_duf_estado_conservacao() {
      //await api
      var str_valores = [];

      se_duf_estado_conservacao
        .filter((value) => value.isChecked === true)
        .map((item) => {
          // console.log(item);
          str_valores.push(item.id);
        });
      //console.log(ischecado);
      return str_valores.join(",");
  }

    function valor_checked(duf_numero_comodos) {
      db.transaction((tx) => {
        tx.executeSql("select * from aux_equipamento_domestico", [], (tx, results) => {
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
        duf_numero_comodos.forEach((item) => {
          //console.log(duf_sanitario);
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return set_se_duf_numero_comodos(x);
      });
    });
  }

  function valor_checked_se_duf_tipo_construcao(tipo_construcao) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_tipo_construcao", [], (tx, results) => {
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
        tipo_construcao.forEach((item) => {
          //console.log(duf_sanitario);
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return set_se_duf_tipo_construcao(x);
      });
    });
  }

  function valor_checked_organizacao_formal(organizacao_formal) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_organizacao_formal", [], (tx, results) => {
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
        organizacao_formal.forEach((item) => {
          //console.log(duf_sanitario);
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_duf_organizacao_formal(x);
      });
    });
  }

  function valor_checked_se_duf_numero_pisos(numero_pisos) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_pisos", [], (tx, results) => {
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
        numero_pisos.forEach((item) => {
          //console.log(duf_sanitario);
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return set_se_duf_numero_pisos(x);
      });
    });
  }

  function valor_checked_se_duf_estado_conservacao(estado_conservacao) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_estado_conservacao", [], (tx, results) => {
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
        estado_conservacao.forEach((item) => {
          //console.log(duf_sanitario);
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return set_se_duf_estado_conservacao(x);
      });
    });
  }

  return (
    <>
      <View style={styles.form8}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>BENS MÓVEIS</Text>
        </View>
        <View style={styles.municipio}>
          <Text>Equipamento doméstico</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_rrf_equipamentos_domesticos].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_equipamentos_domestico(item.id);
                  muda_equipamentos_domestico();
                 // onPressTitle("se_duf", "se_rrf_equipamentos_domesticos", muda_equipamentos_domestico(), sync );
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>

       {isVisible_equipamentos_domestico ?
        <View  style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_se_rrf_equipamentos_domesticos_outros}
            value={se_rrf_equipamentos_domesticos_outros}
            onBlur={() =>
              onPressTitle("se_rrf", "se_rrf_equipamentos_domesticos_outros", se_rrf_equipamentos_domesticos_outros, sync)
            }
            placeholder={"   outros"}
          />
        </View>
        : null}
      </View>
      <View style={styles.form}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>ORGANIZAÇÃO SOCIAL</Text>
        </View>

        <View style={styles.municipio}>
          <Text>Participação em organização informal</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_rrf_participacao_organizacao_informal].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_organizacao_informal(item.id);
                  muda_organizacao_informal();
                  //onPressTitle("se_duf", "se_rrf_participacao_organizacao_informal", muda_se_duf_tipo_construcao(),sync);
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>
       {isVisible_organizacao_informal ?
        <View  style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_se_rrf_participacao_organizacao_informal_outros}
            value={se_rrf_participacao_organizacao_informal_outros}
            onBlur={() =>
              onPressTitle("se_rrf", "se_rrf_participacao_organizacao_informal_outros", se_rrf_participacao_organizacao_informal_outros, sync)
            }
            placeholder={"   outros"}
          />
        </View>
            : null}

        <View style={styles.municipio}>
          <Text>Participação em organização formal </Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_rrf_participacao_organizacao_formal].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_organizacao_formal(item.id);
                  muda_organizacao_formal();
                  //onPressTitle( "se_rrf", "se_rrf_participacao_organizacao_formal", muda_se_duf_numero_comodos(),sync );
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>

         {isVisible_organizacao_formal ?
          <View  style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_se_rrf_participacao_organizacao_formal_outros}
            value={se_rrf_participacao_organizacao_formal_outros}
            onBlur={() =>
              onPressTitle("se_rrf", "se_rrf_participacao_organizacao_formal_outros", se_rrf_participacao_organizacao_formal_outros, sync)
            }
            placeholder={"   outros"}
          />
        </View>
           : null}

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input_style: {
    height: 40,
    width: "85%",
    marginTop: 10,
    //Left: 10,
    borderWidth: 1,
    backgroundColor: "white",
  },
  drop_down_Style: {
    marginTop: 5,
    height: 40,
    width: "85%",
    display:'flex', alignItems: "center" , alignSelf:'center',
    //marginLeft: 30,
    borderRadius: 0,
    borderWidth: 1,
  },
  form: {
    width: '95%',
    height:'auto',
    //marginLeft: 25,
    paddingBottom:10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,


  },
  inputOutrosDejetos: {
    height: 40,
    width: "85%",
    marginTop: 10,
    marginLeft: 10,
    borderWidth: 1,
    backgroundColor: "white",
  },
  Dejetos: {
    marginTop: 5,
    height: 40,
    width: "85%",
    marginLeft: 30,
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
  form8: {
    width: '95%',
    height: 'auto',
    //marginLeft: 25,
    paddingBottom:10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  municipio: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 15,
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
});

export default Step5;
