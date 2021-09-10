import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import { DatabaseConnection } from "../../database/database";
import Checkbox from "expo-checkbox";
import { TextInputMask } from "react-native-masked-text";
const db = DatabaseConnection.getConnection();

const Step2 = (props) => {

  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");
  const [unmasked, setUnmasked] = useState("");
  const [se_ruf_tipo_atividades, setSe_ruf_tipo_atividades] = useState([]);
  const [se_ruf_situacao_mercado, setSe_ruf_situacao_mercado] = useState([]);
  const [se_ruf_tipo_beneficio, setSe_ruf_tipo_beneficio] = useState([]);
  const [outrosSe_ruf_situacao_mercado, setSe_ruf_situacao_mercadoOutros] = useState("");
  const [outrosSe_ruf_natureza_atividades_outros, setSe_ruf_natureza_atividades_outros] = useState("");
  const [outrosSe_ruf_tipo_beneficio, setSe_ruf_tipo_beneficio_outros] = useState("");
  const [se_ruf_valor_beneficio, setSe_ruf_valor_beneficio] = useState(null);

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
              " where se_ruf_cod_processo = '" +
              cod_processo +
              "'",
            [],
            (tx, results) => {
              var row = [];

              for (let i = 0; i < results.rows.length; ++i) {
                console.log(results.rows.item(0).se_ruf_acesso);

                setSe_ruf_natureza_atividades_outros(
                  results.rows.item(0).se_ruf_natureza_atividades_outros
                );

                setSe_ruf_situacao_mercadoOutros(
                  results.rows.item(0).se_ruf_situacao_mercado_outros
                );

                setSe_ruf_tipo_beneficio_outros(
                  results.rows.item(0).se_ruf_tipo_beneficio_outros
                );

                setSe_ruf_valor_beneficio(
                  results.rows.item(0).se_ruf_tipo_beneficio_outros
                );

                setSe_ruf_valor_beneficio(
                  results.rows.item(0).se_ruf_valor_beneficio
                );

                //console.log(typeof (results.rows.item(i).se_ruf_municipio));
                //valor(row);

                var x = results.rows.item(i).se_ruf_tipo_atividades;
                valor_checked(x.split(","));

                var y = results.rows.item(i).se_ruf_situacao_mercado;
                valor_checked_situacao_mercado(y.split(","));

                var w = results.rows.item(i).se_ruf_tipo_beneficio;
                valor_checked_tipo_beneficio(w.split(","));
              }
            }
          );
        });
      } //
    });
  }, []);

  // function mask() {
  //   unmasked.getRawValue()
  // }

  //////////////primeira coisa que faz quando entra na tela:  faz um select das tabelas aux para carregar nos components //////////////
  async function loadStep2() {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select * from aux_tipo_atividades",
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
            }
            setSe_ruf_tipo_atividades(temp);
          }
        );
        tx.executeSql(
          "select * from aux_situacao_mercado",
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
            setSe_ruf_situacao_mercado(temp);
          }
        );
        tx.executeSql(
          "select * from aux_tipo_beneficios_sociais",
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
            setSe_ruf_tipo_beneficio(temp);
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

  //função que aciona quando o estado do componente muda e seta os valores correspondente
  function onPressTitle(tabela, campo, valor, codigo) {

      db.transaction((tx) => {
          const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_ruf_cod_processo = '${codigo}'`;
          console.log(query);
          tx.executeSql(query, [], (tx, results) => {
              for (let i = 0; i < results.rows.length; ++i) {
                  alert("INSERIDO COM SUCESSO");
              }
          });

      }, (tx, err) => {
          console.error("error", err.message);
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

  const handleChange = (id) => {
    const newState = se_ruf_tipo_atividades.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setSe_ruf_tipo_atividades(newState); // atualiza o estado
  };

  const handleChange_situacao_mercado = (id) => {
    const newState = se_ruf_situacao_mercado.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setSe_ruf_situacao_mercado(newState); // atualiza o estado
  };

  const handleChange_tipo_beneficio = (id) => {
    const newState = se_ruf_tipo_beneficio.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setSe_ruf_tipo_beneficio(newState); // atualiza o estado
  };

  function muda() {
    //await api
    var str_valores = [];

    se_ruf_tipo_atividades
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function muda_situacao_mercado() {
    //await api
    var str_valores = [];

    se_ruf_situacao_mercado
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function muda_tipo_beneficio() {
    //await api
    var str_valores = [];

    se_ruf_tipo_beneficio
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function valor_checked(tipo_atividades) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_tipo_atividades", [], (tx, results) => {
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
        tipo_atividades.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_ruf_tipo_atividades(x);
      });
    });
  }

  function valor_checked_situacao_mercado(situacao_mercado) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_situacao_mercado", [], (tx, results) => {
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
        situacao_mercado.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_ruf_situacao_mercado(x);
      });
    });
  }

  function valor_checked_tipo_beneficio(tipo_beneficio) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_tipo_beneficios_sociais", [], (tx, results) => {
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
        tipo_beneficio.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_ruf_tipo_beneficio(x);
      });
    });
  }

  return (
    <>
      <View style={styles.form3}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>OCUPAÇÃO ATUAL E BENEFÍCIOS SOCIAIS</Text>
        </View>

        <View style={styles.title_style}>
          <Text>Tipo de Atividade</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_ruf_tipo_atividades].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange(item.id);
                  onPressTitle(
                    "se_ruf",
                    "se_ruf_tipo_atividades",
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
            style={styles.input_style}
            onChangeText={setSe_ruf_natureza_atividades_outros}
            value={outrosSe_ruf_natureza_atividades_outros}
            onBlur={() =>
              onPressTitle(
                "se_ruf",
                "se_ruf_natureza_atividades_outros",
                outrosSe_ruf_natureza_atividades_outros,
                sync
              )
            }
            placeholder={" Outros"}
          />
        </View>

        <View>
          <Text style={styles.title_style}>Situação do Mercado</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_ruf_situacao_mercado].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                    handleChange_situacao_mercado(item.id);
                  onPressTitle(
                    "se_ruf",
                    "se_ruf_situacao_mercado",
                    muda_situacao_mercado(),
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
            style={styles.input_style}
            onChangeText={setSe_ruf_situacao_mercadoOutros}
            value={outrosSe_ruf_situacao_mercado}
            onBlur={() =>
              onPressTitle(
                "se_ruf",
                "se_ruf_situacao_mercado_outros",
                outrosSe_ruf_situacao_mercado,
                sync
              )
            }
            placeholder={" Outros"}
          />
        </View>

        <View>
          <Text style={styles.title_style}>
            Tipos de Benefícios Sociais
          </Text>
        </View>
        <View style={styles.checkboxlabel}>
          {[...se_ruf_tipo_beneficio].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_tipo_beneficio(item.id);
                  onPressTitle("se_ruf", "se_ruf_tipo_beneficio", muda_tipo_beneficio(), sync);
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={setSe_ruf_tipo_beneficio_outros}
            value={outrosSe_ruf_tipo_beneficio}
            onBlur={() =>
              onPressTitle(
                "se_ruf",
                "se_ruf_tipo_beneficio_outros",
                outrosSe_ruf_tipo_beneficio,
                sync
              )
            }
            placeholder={" Outros"}
          />
        </View>

        <View>
          <Text style={styles.title_style}>Valor do benefício</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          {/* <TextInput
                        style={styles.input_style}
                        onChangeText={setSe_ruf_valor_beneficio}
                        value={se_ruf_valor_beneficio}
                        onBlur={() => onPressTitle("se_ruf", "se_ruf_situacao_mercado_outros", se_ruf_valor_beneficio, sync)}
                        keyboardType="numeric"
                        placeholder={" R$"}
                    /> */}
          <TextInputMask
            style={styles.input_style}
            type={"money"}
            options={{
              precision: 2,
              delimiter: ".",
            }}
            value={se_ruf_valor_beneficio}
            onChangeText={setSe_ruf_valor_beneficio}
            ref={(ref) => setUnmasked(ref)}
            onBlur={() => {
              // console.log(se_ruf_valor_beneficio);
              // mask();
               onPressTitle(
                "se_ruf",
                "se_ruf_valor_beneficio",
                unmasked.getRawValue(),//retira o R$
                sync
              )
            }}
          />
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
  input_style: {
    height: 40,
    width: "85%",
    marginTop: 10,
    marginLeft: 10,
    borderWidth: 1,
    backgroundColor: "white",
  },
  form4: {
    width: 340,
    height: 450,
    marginLeft: 25,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  form3: {
    width: '92%',
    height: 1350,
    marginLeft: 25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
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
  titulo: {
    color: "white",
    marginLeft: 9,
    marginTop: 1,
  },
  title_style: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 10,
  },
});

export default Step2;
