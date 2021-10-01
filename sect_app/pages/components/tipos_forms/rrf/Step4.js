import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";

import { DatabaseConnection } from "../../../database/database";
const db = DatabaseConnection.getConnection();

const Step4 = (props) => {
  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");

  const [se_rrf_sanitario, setSe_rrf_sanitario] = useState([]);

  const [se_rrf_coleta_lixo, setSe_rrf_coleta_lixo] = useState([]);
  const [isVisible_coleta_lixo, setVisible_coleta_lixo] = useState(false);

  const [se_rrf_rede_energia, setSe_rrf_rede_energia] = useState([]);
  const [isVisible_rede_energia, setVisible_rede_energia] = useState(false);

  const [se_rrf_rede_coleta_agua, setSe_rrf_rede_coleta_agua] = useState([]);

  const [isVisible_coleta_agua, setVisible_coleta_agua] = useState(false);

  const [se_rrf_tratamento_agua, setSe_rrf_tratamento_agua] = useState([]);

  const [openSe_rrf_destino_dejetos, setOpenSe_rrf_destino_dejetos] = useState(false);
  const [valorSe_rrf_destino_dejetos, setValorSe_rrf_destino_dejetos] = useState(null);
  const [itemSe_rrf_destino_dejetos, setItemSe_rrf_destino_dejetos] = useState([]);

  const [isVisible_destino_dejetos, setVisible_destino_dejetos] = useState(false);

  const [se_rrf_destino_dejetos_outros, setSe_rrf_destino_dejetos_outros] = useState("");

  const [se_rrf_coleta_lixo_outros, setSe_rrf_coleta_lixo_outros] = useState("");

  const [se_rrf_rede_energia_outros, setSe_rrf_rede_energia_outros] = useState("");

  const [se_rrf_rede_coleta_agua_outros, setSe_rrf_rede_coleta_agua_outros] = useState("");

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
    //                 "select * from " + tabela + " where se_rrf_cod_processo = '" + cod_processo + "'", [], (tx, results) => {
    //                    var x = "";
    //                    var y = "";
    //                    var w = "";
    //                    var z = "";
    //                    var t = "";
    //                     var row = [];
    //                     for (let i = 0; i < results.rows.length; ++i) {
    //                         console.log(results.rows.item(0).se_rrf_acesso);

    //                         setSe_rrf_destino_dejetos_outros(results.rows.item(0).se_rrf_destino_dejetos_outros);

    //                         setSe_rrf_coleta_lixo_outros(results.rows.item(0).se_rrf_coleta_lixo_outros);

    //                         setSe_rrf_rede_energia_outros(results.rows.item(0).se_rrf_rede_energia_outros);

    //                         setSe_rrf_rede_coleta_agua_outros(results.rows.item(0).se_rrf_rede_coleta_agua_outros);

    //                         setValorSe_rrf_destino_dejetos(results.rows.item(i).se_rrf_destino_dejetos);

    //                         x = results.rows.item(i).se_rrf_sanitario;
    //                         valor_checked_rrf_sanitario(x.split(','));

    //                          y= results.rows.item(i).se_rrf_coleta_lixo;
    //                          valor_checked_rrf_coleta_lixo(y.split(','));

    //                          w= results.rows.item(i).se_rrf_rede_energia;
    //                          valor_checked_rrf_rede_energia(w.split(','));

    //                          z= results.rows.item(i).se_rrf_rede_coleta_agua;
    //                          valor_checked_rrf_rede_coleta_agua(z.split(','));

    //                          t= results.rows.item(i).se_rrf_tratamento_agua;
    //                          valor_checked_rrf_tratamento_agua(t.split(','));
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
          setSe_rrf_sanitario(temp);
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
            setItemSe_rrf_destino_dejetos(temp);
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
          setSe_rrf_coleta_lixo(temp);
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
            setSe_rrf_rede_energia(temp);
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
            setSe_rrf_rede_coleta_agua(temp);
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
            setSe_rrf_tratamento_agua(temp);
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

//           const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_rrf_cod_processo = '${codigo}'`;
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
    const newState = se_rrf_sanitario.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }
      return label;
    });

    setSe_rrf_sanitario(newState); // atualiza o estado
  };

  const handleChange_coleta_lixo = (id) => {
    const newState = se_rrf_coleta_lixo.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }
      return label;
    });

    setSe_rrf_coleta_lixo(newState); // atualiza o estado
  };
  const handleChange_coleta_agua = (id) => {
    const newState = se_rrf_rede_coleta_agua.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }
      return label;
    });

    setSe_rrf_rede_coleta_agua(newState); // atualiza o estado
  };

  const handleChange_rede_energia = (id) => {
    const newState = se_rrf_rede_energia.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }
      return label;
    });

    setSe_rrf_rede_energia(newState); // atualiza o estado
  };

  const handleChange_tratamento_agua = (id) => {
    const newState = se_rrf_tratamento_agua.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }
      return label;
    });

    setSe_rrf_tratamento_agua(newState); // atualiza o estado
  };


  function muda_rrf_sanitario() {
    //await api
    var str_valores = [];

    se_rrf_sanitario
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function muda_rrf_coleta_lixo() {
    //await api
    var str_valores = [];

    se_rrf_coleta_lixo
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
        {item.id === 5  ?  setVisible_coleta_lixo(true) :  setVisible_coleta_lixo(false)}
      });
    //console.log(str_valores);
    return str_valores.join(",");
  }

  function muda_rrf_rede_energia() {
    //await api
    var str_valores = [];

    se_rrf_rede_energia
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
        {item.id === 4  ?  setVisible_rede_energia(true) :  setVisible_rede_energia(false)}
      });
   // console.log(str_valores);
    return str_valores.join(",");
  }

  function muda_coleta_agua() {
    //await api
    var str_valores = [];

    se_rrf_rede_coleta_agua
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
        {item.id === 4  ?  setVisible_coleta_agua(true) :  setVisible_coleta_agua(false)}
      });
    //console.log(str_valores);
    return str_valores.join(",");
  }

  function muda_tratamento_agua() {
    //await api
    var str_valores = [];

    se_rrf_tratamento_agua
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);

      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function valor_checked_rrf_sanitario(rrf_sanitario) {
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
        rrf_sanitario.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_rrf_sanitario(x);
      });
    });
  }

  function valor_checked_rrf_coleta_lixo(coleta_lixo) {
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

        return setSe_rrf_coleta_lixo(x);
      });
    });
  }

  function valor_checked_rrf_rede_energia(rede_energia) {
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

        return setSe_rrf_rede_energia(x);
      });
    });
  }

  function valor_checked_rrf_rede_coleta_agua(coleta_agua) {
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

        return setSe_rrf_rede_coleta_agua(x);
      });
    });
  }

  function valor_checked_rrf_tratamento_agua(tratamento_agua) {
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
        return setSe_rrf_tratamento_agua(x);
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
          {[...se_rrf_sanitario].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange(item.id);
                  onPressTitle("se_rrf", "se_rrf_sanitario", muda_rrf_sanitario(), sync);
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
          open={openSe_rrf_destino_dejetos}
          value={parseInt(valorSe_rrf_destino_dejetos)}
          items={itemSe_rrf_destino_dejetos}
          setOpen={setOpenSe_rrf_destino_dejetos}
          setValue={setValorSe_rrf_destino_dejetos}
          setItems={setItemSe_rrf_destino_dejetos}
          onChangeValue={() =>{
            console.log(valorSe_rrf_destino_dejetos);
            valorSe_rrf_destino_dejetos === 5 ? setVisible_destino_dejetos(true) : setVisible_destino_dejetos(false);
           // onPressTitle( "se_rrf", "se_rrf_destino_dejetos", valorSe_rrf_destino_dejetos,sync)
            }}
            listMode="SCROLLVIEW"
            placeholder="Selecione::"
            />


        {isVisible_destino_dejetos ?
        <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input_style}
          onChangeText={setSe_rrf_destino_dejetos_outros}
          value={se_rrf_destino_dejetos_outros}
          onBlur={() =>
            onPressTitle(
              "se_rrf",
              "se_rrf_destino_dejetos_outros",
              se_rrf_destino_dejetos_outros,
              sync
            )
          }
          placeholder={"    Outros destino dos dejetos"}
        />
          </View>
          : null}
        <View style={styles.title_style}>
          <Text>Coleta do Lixo</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_rrf_coleta_lixo].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_coleta_lixo(item.id);
                  muda_rrf_coleta_lixo();
                  //onPressTitle("se_rrf", "se_rrf_coleta_lixo", muda_rrf_coleta_lixo(), sync);
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>

        {isVisible_coleta_lixo ?
        <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input_style}
          onChangeText={setSe_rrf_coleta_lixo_outros}
          value={se_rrf_coleta_lixo_outros}
          onBlur={() =>
            onPressTitle(
              "se_rrf",
              "se_rrf_coleta_lixo_outros",
              se_rrf_coleta_lixo_outros,
              sync
            )
          }
          placeholder={"    Outros coleta lixo"}
        />
      </View>
        :null }
        <View style={styles.title_style}>
          <Text>Rede de Energia</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_rrf_rede_energia].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_rede_energia(item.id);
                  muda_rrf_rede_energia()
                  //onPressTitle("se_rrf", "se_rrf_rede_energia", muda_rrf_rede_energia(), sync);
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>

        {isVisible_rede_energia ?
        <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input_style}
          onChangeText={setSe_rrf_rede_energia_outros}
          value={se_rrf_rede_energia_outros}
          onBlur={() =>
            onPressTitle(
              "se_rrf",
              "se_rrf_rede_energia_outros",
              se_rrf_rede_energia_outros,
              sync
            )
          }
          placeholder={"    Outros rede energia"}
        />
        </View>
        :null}

        <View style={styles.title_style}>
          <Text>Rede e/ou Coleta de Água</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_rrf_rede_coleta_agua].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_coleta_agua(item.id);
                  muda_coleta_agua();
                  //onPressTitle("se_rrf", "se_rrf_rede_coleta_agua", muda_coleta_agua(), sync);
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>

        {isVisible_coleta_agua ?
        <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input_style}
          onChangeText={setSe_rrf_rede_coleta_agua_outros}
          value={se_rrf_rede_coleta_agua_outros}
          onBlur={() =>
            onPressTitle(
              "se_rrf",
              "se_rrf_rede_coleta_agua_outros",
              se_rrf_rede_coleta_agua_outros,
              sync
            )
          }
          placeholder={"    Outros rede agua"}
        />
        </View>
        :null }

        <View style={styles.title_style}>
          <Text>Tratamento da Água</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_rrf_tratamento_agua].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_tratamento_agua(item.id);
                  onPressTitle("se_rrf", "se_rrf_tratamento_agua", muda_tratamento_agua(), sync);
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
