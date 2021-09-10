import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";
import { DatabaseConnection } from "../../database/database";

const db = DatabaseConnection.getConnection();
const Step5 = (props) => {
  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");

  const [se_ruf_equipamentos_domesticos, setSe_ruf_equipamentos_domesticos] =
    useState([]);

  const [se_ruf_organizacao_informal, setSe_ruf_organizacao_informal] = useState([]);

  const [se_ruf_organizacao_formal, setSe_ruf_organizacao_formal] = useState([]);

  const [
    se_ruf_equipamentos_domesticos_outros,
    setSe_ruf_equipamentos_domesticos_outros,
  ] = useState("");

  const [
    se_ruf_organizacao_informal_outros,
    setSe_ruf_organizacao_informal_outros,
  ] = useState("");

  const [
    se_ruf_organizacao_formal_outros,
    setSe_ruf_organizacao_formal_outros,
  ] = useState("");


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

    loadStep5();

     AsyncStorage.getItem('nome_tabela').then(tabela => {
      //console.log("ok",cod_processo);
       if (tabela ) {

           db.transaction((tx) => {

               tx.executeSql(
                   "select * from " + tabela + " where se_ruf_cod_processo = '" + cod_processo + "'", [], (tx, results) => {
                       //var x = "";
                      // console.log(results.rows.length);
                       var row = [];
                       for (let i = 0; i < results.rows.length; ++i) {

                         setSe_ruf_equipamentos_domesticos_outros(results.rows.item(0).se_ruf_equipamentos_domesticos_outros);

                         setSe_ruf_organizacao_informal_outros(results.rows.item(0).se_ruf_organizacao_informal_outros);

                         setSe_ruf_organizacao_formal_outros(results.rows.item(0).se_ruf_organizacao_formal_outros);


                            var x = results.rows.item(i).se_ruf_equipamentos_domesticos;
                            valor_checked(x.split(','));

                            var y = results.rows.item(i).se_ruf_organizacao_informal;
                           valor_checked_organizacao_informal(y.split(','));

                           var w = results.rows.item(i).se_ruf_organizacao_formal;
                           valor_checked_organizacao_formal(w.split(','));

                           //console.log(results.rows.item(i).se_ruf_sanitario);
                       }

                   }, function(tx, error) {
                    alert('SELECT error: ' + error.message);
                });
           })
       }
   });
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
            setSe_ruf_equipamentos_domesticos(temp);
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
            setSe_ruf_organizacao_informal(temp);
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
          setSe_ruf_organizacao_formal(temp);
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
  function onPressTitle(tabela, campo, valor, codigo) {

      ///console.log(codigo);
      db.transaction((tx) => {

          const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_ruf_cod_processo = '${codigo}'`;
          //console.log(query);
          tx.executeSql(query, [], (tx, results) => {
              for (let i = 0; i < results.rows.length; ++i) {
                  alert("INSERIDO COM SUCESSO");
              }
          });
      }, (tx, err) => {
          //console.error("error em alguma coisa", err);
          return true;
      }, (tx, success) => {
          //console.log("tudo certo por aqui", success);
          //get_values(tabela, campo, sync);  ///esse aqui foi a tentativa
      });

      var chaves = '"' + tabela + ' ' + campo + ' ' + valor + ' ' + codigo + '"';

      db.transaction((tx) => {
          //tx.executeSql("DROP TABLE log", []);
          const log_delete = "INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + " ,'" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')";
          console.log("INSERT INTO log (chave , tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + " ,'" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')");
          tx.executeSql(log_delete, []);
      });

      db.transaction((tx) => {
          const log_update = "REPLACE INTO log (chave, tabela, campo, valor, cod_processo, situacao) VALUES  (" + chaves + ", '" + tabela + "', '" + campo + "', '" + valor + "', '" + codigo + "', '1')";
          console.log(log_update);
          tx.executeSql(log_update, [], (tx, results) => {

          });
      })


        AsyncStorage.setItem('nome_tabela', tabela);


      AsyncStorage.setItem('codigo', valor.toString());
  };


  const handleChange = (id) => {
    const newState = se_ruf_equipamentos_domesticos.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setSe_ruf_equipamentos_domesticos(newState); // atualiza o estado
  };

  const handleChange_organizacao_informal = (id) => {
    const newState = se_ruf_organizacao_informal.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setSe_ruf_organizacao_informal(newState); // atualiza o estado
  };

  const handleChange_organizacao_formal = (id) => {
    const newState = se_ruf_organizacao_formal.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setSe_ruf_organizacao_informal(newState); // atualiza o estado
  };

  function muda() {
    //await api
    var str_valores = [];

    se_ruf_equipamentos_domesticos
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function muda_organizacao_informal() {
    //await api
    var str_valores = [];

    se_ruf_organizacao_informal
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function muda_organizacao_formal() {
    //await api
    var str_valores = [];

    se_ruf_organizacao_formal
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function valor_checked(equipamentos_domesticos) {
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
        equipamentos_domesticos.forEach((item) => {
          //console.log(ruf_sanitario);
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_ruf_equipamentos_domesticos(x);
      });
    });
  }

  function valor_checked_organizacao_informal(organizacao_informal) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_organizacao_informal", [], (tx, results) => {
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
        organizacao_informal.forEach((item) => {
          //console.log(ruf_sanitario);
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_ruf_organizacao_informal(x);
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
          //console.log(ruf_sanitario);
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_ruf_organizacao_formal(x);
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
          {[...se_ruf_equipamentos_domesticos].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange(item.id);
                  onPressTitle(
                    "se_ruf",
                    "se_ruf_equipamentos_domesticos",
                    muda(),
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
            style={styles.inputOutrosDejetos}
            onChangeText={setSe_ruf_equipamentos_domesticos_outros}
            value={se_ruf_equipamentos_domesticos_outros}
            onBlur={() =>
              onPressTitle(
                "se_ruf",
                "se_ruf_equipamentos_domesticos_outros",
                se_ruf_equipamentos_domesticos_outros,
                sync
              )
            }
            placeholder={" Outros"}
          />
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>ORGANIZAÇÃO SOCIAL</Text>
        </View>

        <View style={styles.municipio}>
          <Text>Participação em organização informal</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_ruf_organizacao_informal].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_organizacao_informal(item.id);
                  onPressTitle(
                    "se_ruf",
                    "se_ruf_organizacao_informal",
                    muda_organizacao_informal(),
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
            style={styles.inputOutrosDejetos}
            onChangeText={setSe_ruf_organizacao_informal_outros}
            value={se_ruf_organizacao_informal_outros}
            onBlur={() =>
              onPressTitle(
                "se_ruf",
                "se_ruf_organizacao_informal_outros",
                se_ruf_organizacao_informal_outros,
                sync
              )
            }
            placeholder={" Outros"}
          />
        </View>

        <View style={styles.municipio}>
          <Text>Participação em organização formal</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_ruf_organizacao_formal].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_organizacao_formal(item.id);
                  onPressTitle(
                    "se_ruf",
                    "se_ruf_organizacao_formal",
                    muda_organizacao_formal(),
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
            style={styles.inputOutrosDejetos}
            onChangeText={setSe_ruf_organizacao_formal_outros}
            value={se_ruf_organizacao_formal_outros}
            onBlur={() =>
              onPressTitle(
                "se_ruf",
                "se_ruf_organizacao_formal_outros",
                se_ruf_organizacao_formal_outros,
                sync
              )
            }
            placeholder={" Outros"}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '92%',
    height: 560,
    marginLeft: 25,
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
    width: '92%',
    height: 800,
    marginLeft: 25,
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
