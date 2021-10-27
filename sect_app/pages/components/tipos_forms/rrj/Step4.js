import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";

import { DatabaseConnection } from "../../../database/database";
const db = DatabaseConnection.getConnection();

const Step4 = (props) => {
  const [sync, setSync] = useState("");
  const [se_rrj_bens_moveis, set_se_rrj_bens_moveis] = useState([]);
  const [se_rrj_bens_imoveis, set_se_rrj_bens_imoveis] = useState([]);

  useEffect(() => {
    var cod_processo = "";
    //carrega o valor do select na tela index.js
    AsyncStorage.getItem("pr_codigo").then((value) => {
      //console.log(value);
      setSync(value);
      cod_processo = value;
    });
    loadStep4();

    AsyncStorage.getItem('nome_tabela').then(tabela => {
        //console.log(cod_processo);
        if (tabela) {

            db.transaction((tx) => {
                tx.executeSql(
                    "select * from " + tabela + " where se_rrj_cod_processo = '" + cod_processo + "'", [], (tx, results) => {
                       var x = "";
                       var y = "";
                        var row = [];
                        for (let i = 0; i < results.rows.length; ++i) {

                            x = results.rows.item(i).se_rrj_bens_imoveis;
                            valor_checked_bens_imoveis(x.split(','));
                            y = results.rows.item(i).se_rrj_bens_moveis;
                            valor_checked_bens_moveis(y.split(','));


                        }

                    });
            })
        }//
    });
  }, []);

  async function loadStep4() {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from aux_bens_moveis", [], (tx, results) => {
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
          set_se_rrj_bens_moveis(temp);
        });
        tx.executeSql(
          "select * from aux_bens_imoveis", [],(tx, results) => {
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
            set_se_rrj_bens_imoveis(temp);
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
  function onPressTitle(tabela, campo, valor, codigo) {

      db.transaction((tx) => {

          const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_rrj_cod_processo = '${codigo}'`;
          //console.log(query);
          tx.executeSql(query, [], (tx, results) => {
              for (let i = 0; i < results.rows.length; ++i) {
                  alert("INSERIDO COM SUCESSO");
    }
  });
      }, (tx, err) => {
          console.error("error em alguma coisa", err);
          return true;
      }, (tx, success) => {
          console.log("tudo certo por aqui", success);
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

  const handleChange_bens_moveis = (id) => {
    const newState = se_rrj_bens_moveis.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }
      return label;
    });

    set_se_rrj_bens_moveis(newState); // atualiza o estado
  };
  const handleChange_bens_imoveis = (id) => {
    const newState = se_rrj_bens_imoveis.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }
      return label;
    });

    set_se_rrj_bens_imoveis(newState); // atualiza o estado
  };

  function muda_bens_moveis() {
    //await api
    var str_valores = [];

    se_rrj_bens_moveis
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }


  function muda_bens_imoveis() {
    //await api
    var str_valores = [];

    se_rrj_bens_imoveis
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function valor_checked_bens_moveis(bens_moveis) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_bens_moveis", [], (tx, results) => {
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
        bens_moveis.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return set_se_rrj_bens_moveis(x);
      });
    });
  }

  function valor_checked_bens_imoveis(bens_imoveis) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_bens_imoveis", [], (tx, results) => {
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
        bens_imoveis.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return set_se_rrj_bens_imoveis(x);
      });
    });
  }

  return (
    <>
      <View style={styles.form7}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>
          PATRIMÔNIO
          </Text>
        </View>
        <View style={styles.title_style}>
          <Text>Bens Móveis</Text>
        </View>
        <View style={styles.checkboxlabel}>
          {[...se_rrj_bens_moveis].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_bens_moveis(item.id);
                  onPressTitle("se_rrj", "se_rrj_bens_moveis", muda_bens_moveis(), sync);
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.title_style}>
          <Text>Bens Imóveis</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_rrj_bens_imoveis].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_bens_imoveis(item.id);
                  onPressTitle("se_rrj", "se_rrj_bens_imoveis", muda_bens_imoveis(), sync);
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
    width: "95%",
    height: "auto",
    paddingBottom: 10,
    marginTop: 10,
    //marginLeft: 20,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  title_style: {
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

export default Step4;
