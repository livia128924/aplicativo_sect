import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";
import { DatabaseConnection } from "../../../database/database";
const db = DatabaseConnection.getConnection();
const Step5 = (props) => {
  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");

  const [check_Se_ruj_sanitario, set_Check_Se_ruj_sanitario] = useState([]);

  const [se_ruj_tratamento_agua_clorada, setSe_ruj_tratamento_agua_clorada] =
    React.useState([]);

  const [se_ruj_rede_agua_publica, setSe_ruj_rede_agua_publica] =
    React.useState([]);

  const [se_ruj_rede_energia_publica, setSe_ruj_rede_energia_publica] =
    React.useState([]);

  const [se_ruj_coleta_lixo_outros, setOutrosSe_ruj_coleta_lixo_outros] =
    useState("");
  const [outrosSe_ruj_destino_dejetos, setOutrosSe_ruj_destino_dejetos] =
    useState("");

  const [se_ruj_coleta_lixo_publica, setSe_ruj_coleta_lixo_publica] =
    React.useState([]);

  const [openSe_ruj_destino_dejetos, setOpenSe_ruj_destino_dejetos] =
    useState(false);
  const [valorSe_ruj_destino_dejetos, setValorSe_ruj_destino_dejetos] =
    useState(null);
  const [itemSe_ruj_destino_dejetos, setItemSe_ruj_destino_dejetos] = useState([]);

  useEffect(() => {
    //carrega o valor do select na tela index.jss
    var cod_processo = "";
    AsyncStorage.getItem("pr_codigo").then((value) => {
      //console.log(value);
      setSync(value);
      cod_processo = value;
      //console.log("tste", cod_processo);
    });

    AsyncStorage.getItem("codigo").then((codigo) => {
      setDados_valor(codigo);
    });

    loadStep5();

    AsyncStorage.getItem("nome_tabela").then((tabela) => {
        // console.log("loadDados");
        if (tabela) {
          db.transaction(
            (tx) => {
              tx.executeSql(
                "select * from " +
                  tabela +
                  " where se_ruj_cod_processo = '" +
                  cod_processo +
                  "'",
                [],
                (tx, results) => {
                  //var x = "";
                  // console.log(results.rows.length);
                  var row = [];
                  for (let i = 0; i < results.rows.length; ++i) {
                    setOutrosSe_ruj_coleta_lixo_outros(
                      results.rows.item(i).se_ruj_coleta_lixo_outros
                    );
                    setOutrosSe_ruj_destino_dejetos(
                      results.rows.item(i).se_ruj_destino_dejetos_outros
                    );
                    setValorSe_ruj_destino_dejetos(
                      results.rows.item(i).se_ruj_destino_dejetos
                    );

                    var x = results.rows.item(i).se_ruj_sanitario;
                    //console.log( "conole", results.rows.item(i).se_ruj_sanitario);
                    valor_checked(x.split(","));

                    var y = results.rows.item(i).se_ruj_coleta_lixo;
                    valor_checked_coleta_lixo(y.split(","));

                    var w = results.rows.item(i).se_ruj_rede_energia;
                    valor_checked_rede_energia(w.split(","));

                    var z = results.rows.item(i).se_ruj_rede_agua;
                    valor_checked_rede_agua(z.split(","));

                    var q = results.rows.item(i).se_ruj_tratamento_agua;
                    valor_checked_tratamento_agua(q.split(","));

                    //console.log(results.rows.item(i).se_ruj_sanitario);
                  }
                }
              );
            },
            (tx, err) => {
              console.error("iii deu ruim", err);
              return true;
            },
            (tx, success) => {}
          );
        }
      });

  }, []);

  async function loadStep5() {
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
          //console.log(temp);
          set_Check_Se_ruj_sanitario(temp);
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
            setItemSe_ruj_destino_dejetos(temp);
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
          setSe_ruj_coleta_lixo_publica(temp);
        });
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
            //console.log( results.rows.item(i).nome);
          }
          setSe_ruj_rede_energia_publica(temp);
        });
        tx.executeSql("select * from aux_rede_agua", [], (tx, results) => {
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
          setSe_ruj_rede_agua_publica(temp);
        });
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
                isChecked: false,
              });
              //console.log( results.rows.item(i).nome);
            }
            setSe_ruj_tratamento_agua_clorada(temp);
          }
        );
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

  // //função que aciona quando o estado do componente muda e seta os valores correspondente
  function onPressTitle(tabela, campo, valor, codigo) {
    //     ///console.log(codigo);
    db.transaction(
      (tx) => {
        const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_ruj_cod_processo = '${codigo}'`;
        //console.log(query);
        tx.executeSql(query, [], (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            alert("INSERIDO COM SUCESSO");
          }
        });
      },
      (tx, err) => {
        //console.error("error em alguma coisa", err);
        return true;
      },
      (tx, success) => {
        //console.log("tudo certo por aqui", success);
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

  const handleChange = (id) => {
    const newState = check_Se_ruj_sanitario.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_Check_Se_ruj_sanitario(newState); // atualiza o estado
  };

  const handleChange_coleta_lixo = (id) => {
    const newState = se_ruj_coleta_lixo_publica.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setSe_ruj_coleta_lixo_publica(newState); // atualiza o estado
  };
  const handleChange_rede_energia = (id) => {
    const newState = se_ruj_rede_energia_publica.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });
    setSe_ruj_rede_energia_publica(newState);
  };
  const handleChange_rede_agua = (id) => {
    const newState = se_ruj_rede_agua_publica.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });
    setSe_ruj_rede_agua_publica(newState);
  };
  const handleChange_tratamento_agua = (id) => {
    const newState = se_ruj_tratamento_agua_clorada.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    //console.log(ischecado);
    setSe_ruj_tratamento_agua_clorada(newState);
  };

  function muda() {
    //await api
    var str_valores = [];

    check_Se_ruj_sanitario
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function muda_coleta_lixo() {
    //await api
    var str_valores = [];

    se_ruj_coleta_lixo_publica
      .filter((value) => value.isChecked === true)
      .map((item) => {
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }
  function muda_energia_publica() {
    //await api
    var str_valores = [];

    se_ruj_rede_energia_publica
      .filter((value) => value.isChecked === true)
      .map((item) => {
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }
  function muda_rede_agua() {
    //await api
    var str_valores = [];

    se_ruj_rede_agua_publica
      .filter((value) => value.isChecked === true)
      .map((item) => {
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }
  function muda_tratamento_agua() {
    //await api
    var str_valores = [];

    se_ruj_tratamento_agua_clorada
      .filter((value) => value.isChecked === true)
      .map((item) => {
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function valor_checked(ruj_sanitario) {
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
        ruj_sanitario.forEach((item) => {
          //console.log(ruj_sanitario);
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return set_Check_Se_ruj_sanitario(x);
      });
    });
  }

  function valor_checked_coleta_lixo(ruj_lixo) {
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
        ruj_lixo.forEach((item) => {
          //console.log(ruj_sanitario);
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_ruj_coleta_lixo_publica(x);
      });
    });
  }

  function valor_checked_rede_energia(ruj_energia) {
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

        // console.log(x);
        ruj_energia.forEach((item) => {
          //console.log(ruj_sanitario);
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_ruj_rede_energia_publica(x);
      });
    });
  }
  function valor_checked_rede_agua(ruj_agua) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_rede_agua", [], (tx, results) => {
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

        // console.log(x);
        ruj_agua.forEach((item) => {
          //console.log(ruj_sanitario);
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_ruj_rede_agua_publica(x);
      });
    });
  }
  function valor_checked_tratamento_agua(ruj_tratamento_agua) {
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

        // console.log(x);
        ruj_tratamento_agua.forEach((item) => {
          //console.log(ruj_sanitario);
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_ruj_tratamento_agua_clorada(x);
      });
    });
  }

  return (
    <>
      <View style={styles.form8}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>
            SANEAMENTO BÁSICO E INSTALAÇÕES SANITÁRIAS
          </Text>
        </View>
        <View style={styles.title_style}>
          <Text>Sanitário</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...check_Se_ruj_sanitario].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange(item.id);
                  onPressTitle("se_ruj", "se_ruj_sanitario", muda(), sync);
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.title_style}>
          <Text>Destino dos Dejetos</Text>
        </View>
        <View style={{ alignSelf: "center", width: "85%" }}>
        <DropDownPicker
          style={styles.dropdown_style}
          open={openSe_ruj_destino_dejetos}
          value={parseInt(valorSe_ruj_destino_dejetos)}
          items={itemSe_ruj_destino_dejetos}
          setOpen={setOpenSe_ruj_destino_dejetos}
          setValue={setValorSe_ruj_destino_dejetos}
          setItems={setItemSe_ruj_destino_dejetos}
          onChangeValue={() =>
            onPressTitle(
              "se_ruj",
              "Se_ruj_destino_dejetos",
              valorSe_ruj_destino_dejetos,
              sync
            )
          }
          listMode="SCROLLVIEW"
          placeholder="Selecione::"
        />
        </View>

        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={setOutrosSe_ruj_destino_dejetos}
            value={outrosSe_ruj_destino_dejetos}
            onBlur={() =>
              onPressTitle(
                "se_ruj",
                "Se_ruj_destino_dejetos_outros",
                outrosSe_ruj_destino_dejetos,
                sync
              )
            }
            placeholder={" Outros"}
          />
        </View>
        <View style={styles.title_style}>
          <Text>Lixo</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_ruj_coleta_lixo_publica].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_coleta_lixo(item.id);
                  onPressTitle(
                    "se_ruj",
                    "se_ruj_coleta_lixo",
                    muda_coleta_lixo(),
                    sync
                  );
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={setOutrosSe_ruj_coleta_lixo_outros}
            value={se_ruj_coleta_lixo_outros}
            onBlur={() =>
              onPressTitle(
                "se_ruj",
                "se_ruj_coleta_lixo_outros",
                se_ruj_coleta_lixo_outros,
                sync
              )
            }
            placeholder={" Outros"}
          />
        </View>
        <View style={styles.title_style}>
          <Text>Rede de Energia</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_ruj_rede_energia_publica].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_rede_energia(item.id);
                  onPressTitle(
                    "se_ruj",
                    "se_ruj_rede_energia",
                    muda_energia_publica(),
                    sync
                  );
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.title_style}>
          <Text>Rede de Agua</Text>
        </View>
        <View style={styles.checkboxlabel}>
          {[...se_ruj_rede_agua_publica].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_rede_agua(item.id);
                  onPressTitle(
                    "se_ruj",
                    "se_ruj_rede_agua",
                    muda_rede_agua(),
                    sync
                  );
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.title_style}>
          <Text>Tratamento da agua</Text>
        </View>
        <View style={styles.checkboxlabel}>
          {[...se_ruj_tratamento_agua_clorada].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_tratamento_agua(item.id);
                  onPressTitle(
                    "se_ruj",
                    "se_ruj_tratamento_agua",
                    muda_tratamento_agua(),
                    sync
                  );
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
  inputStyle: {
    height: 40,
    width: "85%",
    marginTop: 10,
    //marginLeft: 10,
    //marginRight:25,
    borderWidth: 1,
    backgroundColor: "white",
  },
  dropdown_style: {
    height: 40,
    marginTop: 5,
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
    width: "95%",
    height: "auto",
    paddingBottom: 10,
    marginTop:10,
    //marginLeft: 20,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  title_style: {
    color: "#121212",
    marginLeft: 40,
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
