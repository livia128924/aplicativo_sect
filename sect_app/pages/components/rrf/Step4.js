import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";

import { DatabaseConnection } from "../../database/database";
const db = DatabaseConnection.getConnection();

const Step4 = (props) => {
  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");

  const [se_duf_sanitario, setSe_duf_sanitario] = useState([]);

  const [se_duf_coleta_lixo, setSe_duf_coleta_lixo] = useState([]);

  const [se_duf_rede_energia, setSe_duf_rede_energia] = useState([]);

  const [se_duf_rede_coleta_agua, setSe_duf_rede_coleta_agua] = useState([]);

  const [se_duf_tratamento_agua, setSe_duf_tratamento_agua] = useState([]);

  const [openSe_duf_destino_dejetos, setOpenSe_duf_destino_dejetos] = useState(false);
  const [valorSe_duf_destino_dejetos, setValorSe_duf_destino_dejetos] = useState(null);
  const [itemSe_duf_destino_dejetos, setItemSe_duf_destino_dejetos] = useState([
    { label: "123", value: "123" },
    { label: "456", value: "456" },
  ]);
  const [se_duf_destino_dejetos_outros, setSe_duf_destino_dejetos_outros] = useState("");

  const [se_duf_coleta_lixo_outros, setSe_duf_coleta_lixo_outros] = useState("");

  const [se_duf_rede_energia_outros, setSe_duf_rede_energia_outros] = useState("");

  const [se_duf_rede_coleta_agua_outros, setSe_duf_rede_coleta_agua_outros] = useState("");

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

    loadStep4();

    // AsyncStorage.getItem('nome_tabela').then(tabela => {
    //     //console.log(cod_processo);
    //     if (tabela) {

    //         db.transaction((tx) => {
    //             tx.executeSql(
    //                 "select * from " + tabela + " where se_duf_cod_processo = '" + cod_processo + "'", [], (tx, results) => {
    //                    var x = "";
    //                    var y = "";
    //                    var w = "";
    //                    var z = "";
    //                    var t = "";
    //                     var row = [];
    //                     for (let i = 0; i < results.rows.length; ++i) {
    //                         console.log(results.rows.item(0).se_duf_acesso);

    //                         setSe_duf_destino_dejetos_outros(results.rows.item(0).se_duf_destino_dejetos_outros);

    //                         setSe_duf_coleta_lixo_outros(results.rows.item(0).se_duf_coleta_lixo_outros);

    //                         setSe_duf_rede_energia_outros(results.rows.item(0).se_duf_rede_energia_outros);

    //                         setSe_duf_rede_coleta_agua_outros(results.rows.item(0).se_duf_rede_coleta_agua_outros);

    //                         setValorSe_duf_destino_dejetos(results.rows.item(i).se_duf_destino_dejetos);

    //                         x = results.rows.item(i).se_duf_sanitario;
    //                         valor_checked_duf_sanitario(x.split(','));

    //                          y= results.rows.item(i).se_duf_coleta_lixo;
    //                          valor_checked_duf_coleta_lixo(y.split(','));

    //                          w= results.rows.item(i).se_duf_rede_energia;
    //                          valor_checked_duf_rede_energia(w.split(','));

    //                          z= results.rows.item(i).se_duf_rede_coleta_agua;
    //                          valor_checked_duf_rede_coleta_agua(z.split(','));

    //                          t= results.rows.item(i).se_duf_tratamento_agua;
    //                          valor_checked_duf_tratamento_agua(t.split(','));
    //                     }

    //                 });
    //         })
    //     }//
    // });
  }, []);

  async function loadStep4() {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from aux_sanitario", [], (tx, results) => {
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
          setSe_duf_sanitario(temp);
        });
        tx.executeSql(
          "select * from aux_destino_dejetos",
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
            setItemSe_duf_destino_dejetos(temp);
          }
        );
        tx.executeSql("select * from aux_coleta_lixo", [], (tx, results) => {
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
          setSe_duf_coleta_lixo(temp);
        });

        tx.executeSql(
          ////nao mecher
          "select * from aux_rede_energia",
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
            setSe_duf_rede_energia(temp);
          }
        );
        tx.executeSql(
          "select * from aux_rede_agua",
          [],
          (tx, results) => {
            //var len = results.rows.length, i;
            var temp = [];
            //console.log(len);
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push({
                label: results.rows.item(i).descricao,
                id: results.rows.item(i).codigo,
                isChecked:false
              });
              //console.log( results.rows.item(i).nome);
            }
            setSe_duf_rede_coleta_agua(temp);
          }
        );
        tx.executeSql(
          "select * from aux_tratamento_agua",
          [],
          (tx, results) => {
            //var len = results.rows.length, i;
            var temp = [];
            //console.log(len);
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push({
                label: results.rows.item(i).descricao,
                id: results.rows.item(i).codigo,
                isChecked:false
              });
              //console.log( results.rows.item(i).nome);
            }
            setSe_duf_tratamento_agua(temp);
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
//   function onPressTitle(tabela, campo, valor, codigo) {

//       db.transaction((tx) => {

//           const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_duf_cod_processo = '${codigo}'`;
//           //console.log(query);
//           tx.executeSql(query, [], (tx, results) => {
//               for (let i = 0; i < results.rows.length; ++i) {
//                   alert("INSERIDO COM SUCESSO");
//     }
//   });
//       }, (tx, err) => {
//           console.error("error em alguma coisa", err);
//           return true;
//       }, (tx, success) => {
//           console.log("tudo certo por aqui", success);
//           //get_values(tabela, campo, sync);  ///esse aqui foi a tentativa
//       });

//       var chaves = '"' + tabela + ' ' + campo + ' ' + valor + ' ' + codigo + '"';

//       db.transaction((tx) => {
//           //tx.executeSql("DROP TABLE log", []);
//           const log_delete = "INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + " ,'" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')";
//           console.log("INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + " ,'" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')");
//           tx.executeSql(log_delete, []);
//       });

//       db.transaction((tx) => {
//           const log_update = "REPLACE INTO log (chave, tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + ", '" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')";
//           console.log(log_update);
//           tx.executeSql(log_update, [], (tx, results) => {

//           });
//       })

//       AsyncStorage.setItem('nome_tabela', tabela);

//       AsyncStorage.setItem('codigo', valor.toString());

// };

  const handleChange = (id) => {
    const newState = se_duf_sanitario.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }
      return label;
    });

    setSe_duf_sanitario(newState); // atualiza o estado
  };

  const handleChange_coleta_lixo = (id) => {
    const newState = se_duf_coleta_lixo.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }
      return label;
    });

    setSe_duf_coleta_lixo(newState); // atualiza o estado
  };
  const handleChange_coleta_agua = (id) => {
    const newState = se_duf_rede_coleta_agua.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }
      return label;
    });

    setSe_duf_rede_coleta_agua(newState); // atualiza o estado
  };

  const handleChange_rede_energia = (id) => {
    const newState = se_duf_rede_energia.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }
      return label;
    });

    setSe_duf_rede_energia(newState); // atualiza o estado
  };

  const handleChange_tratamento_agua = (id) => {
    const newState = se_duf_tratamento_agua.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }
      return label;
    });

    setSe_duf_tratamento_agua(newState); // atualiza o estado
  };


  function muda_duf_sanitario() {
    //await api
    var str_valores = [];

    se_duf_sanitario
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function muda_duf_coleta_lixo() {
    //await api
    var str_valores = [];

    se_duf_coleta_lixo
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function muda_duf_rede_energia() {
    //await api
    var str_valores = [];

    se_duf_coleta_lixo
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function muda_coleta_agua() {
    //await api
    var str_valores = [];

    se_duf_rede_coleta_agua
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function muda_tratamento_agua() {
    //await api
    var str_valores = [];

    se_duf_tratamento_agua
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function valor_checked_duf_sanitario(duf_sanitario) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_sanitario", [], (tx, results) => {
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
        duf_sanitario.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_duf_sanitario(x);
      });
    });
  }

  function valor_checked_duf_coleta_lixo(coleta_lixo) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_coleta_lixo", [], (tx, results) => {
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
        coleta_lixo.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_duf_coleta_lixo(x);
      });
    });
  }

  function valor_checked_duf_rede_energia(rede_energia) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_rede_energia", [], (tx, results) => {
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
        rede_energia.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_duf_rede_energia(x);
      });
    });
  }

  function valor_checked_duf_rede_coleta_agua(coleta_agua) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_coleta_agua", [], (tx, results) => {
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
        coleta_agua.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_duf_rede_coleta_agua(x);
      });
    });
  }

  function valor_checked_duf_tratamento_agua(tratamento_agua) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_tratamento_agua", [], (tx, results) => {
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
        tratamento_agua.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });
        return setSe_duf_tratamento_agua(x);
      });
    });
  }


  return (
    <>
      <View style={styles.form7}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>
            SANEAMENTO BÁSICO E INSTALAÇÕES SANITÁRIAS
          </Text>
        </View>
        <View style={styles.title_style}>
          <Text>Sanitário</Text>
        </View>
        <View style={styles.checkboxlabel}>
          {[...se_duf_sanitario].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange(item.id);
                  onPressTitle("se_duf", "se_duf_sanitario", muda_duf_sanitario(), sync);
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.title_style}>
          <Text>Destino dos Dejetos</Text>
        </View>
        <DropDownPicker
          style={styles.drop_down_Style}
          open={openSe_duf_destino_dejetos}
          value={parseInt(valorSe_duf_destino_dejetos)}
          items={itemSe_duf_destino_dejetos}
          setOpen={setOpenSe_duf_destino_dejetos}
          setValue={setValorSe_duf_destino_dejetos}
          setItems={setItemSe_duf_destino_dejetos}
          onChangeValue={() =>
            onPressTitle(
              "se_duf",
              "se_duf_destino_dejetos",
              valorSe_duf_destino_dejetos,
              sync
              )
            }
            listMode="SCROLLVIEW"
            placeholder="Selecione::"
            />

            <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input_style}
          onChangeText={setSe_duf_destino_dejetos_outros}
          value={se_duf_destino_dejetos_outros}
          onBlur={() =>
            onPressTitle(
              "se_duf",
              "se_duf_destino_dejetos_outros",
              se_duf_destino_dejetos_outros,
              sync
            )
          }
          placeholder={"    Outros destino dos dejetos"}
        />
          </View>
        <View style={styles.title_style}>
          <Text>Coleta do Lixo</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_duf_coleta_lixo].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_coleta_lixo(item.id);
                  onPressTitle("se_duf", "se_duf_coleta_lixo", muda_duf_coleta_lixo(), sync);
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>
        <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input_style}
          onChangeText={setSe_duf_coleta_lixo_outros}
          value={se_duf_coleta_lixo_outros}
          onBlur={() =>
            onPressTitle(
              "se_duf",
              "se_duf_coleta_lixo_outros",
              se_duf_coleta_lixo_outros,
              sync
            )
          }
          placeholder={"    Outros coleta lixo"}
        />
      </View>

        <View style={styles.title_style}>
          <Text>Rede de Energia</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_duf_rede_energia].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_rede_energia(item.id);
                  onPressTitle("se_duf", "se_duf_rede_energia", muda_duf_rede_energia(), sync);
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>
        <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input_style}
          onChangeText={setSe_duf_rede_energia_outros}
          value={se_duf_rede_energia_outros}
          onBlur={() =>
            onPressTitle(
              "se_duf",
              "se_duf_rede_energia_outros",
              se_duf_rede_energia_outros,
              sync
            )
          }
          placeholder={"    Outros rede energia"}
        />
</View>
        <View style={styles.title_style}>
          <Text>Rede e/ou Coleta de Água</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_duf_rede_coleta_agua].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_coleta_agua(item.id);
                  onPressTitle("se_duf", "se_duf_rede_coleta_agua", muda_coleta_agua(), sync);
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>
        <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input_style}
          onChangeText={setSe_duf_rede_coleta_agua_outros}
          value={se_duf_rede_coleta_agua_outros}
          onBlur={() =>
            onPressTitle(
              "se_duf",
              "se_duf_rede_coleta_agua_outros",
              se_duf_rede_coleta_agua_outros,
              sync
            )
          }
          placeholder={"    Outros rede agua"}
        />
</View>

        <View style={styles.title_style}>
          <Text>Tratamento da Água</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_duf_tratamento_agua].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_tratamento_agua(item.id);
                  onPressTitle("se_duf", "se_duf_tratamento_agua", muda_tratamento_agua(), sync);
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
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
    width: '95%',
    height: 'auto',
    //marginLeft: 25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  title_style: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 15,
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
  input_style: {
    height: 40,
    width: "85%",
    marginTop: 5,
    //marginLeft: 30,
    borderWidth: 1,
    backgroundColor: "white",
  },
});

export default Step4;
