import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import { DatabaseConnection } from "../../database/database";
import Checkbox from "expo-checkbox";
import { TextInputMask } from "react-native-masked-text";
import DropDownPicker from "react-native-dropdown-picker";
const db = DatabaseConnection.getConnection();

const Step2 = (props) => {
  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");
  const [unmasked, setUnmasked] = useState("");
  const [rq_cpf, setRq_cpf] = useState("");
  const [rq_titulo_eleitor, set_rq_titulo_eleitor] = useState("");
  const [rq_titulo_eleitor_zona, set_rq_titulo_eleitor_zona] = useState("");
  const [rq_titulo_eleitor_sessao, set_rq_titulo_eleitor_sessao] = useState("");
  const [rq_rg_uf, set_rq_rg_uf] = useState("");
  const [rq_data_expedicao, set_rq_data_expedicao] = useState("");
  const [rq_cpts_numero, set_rq_cpts_numero] = useState("");
  const [rq_Agencia, set_rq_Agencia] = useState("");
  const [rq_conta, set_rq_conta] = useState("");
  const [rq_profissao_local, set_rq_profissao_local] = useState("");
  const [rq_profissao_endereco, set_rq_profissao_endereco] = useState("");
  const [rq_profissao_cargo, set_rq_profissao_cargo] = useState("");
  const [rq_renda_comprovada, set_rq_renda_comprovada] = useState("");
  const [rq_profissao_fone, set_rq_profissao_fone] = useState("");
  const [rq_profissao_email, set_rq_profissao_email] = useState("");

  const [aberto_rq_profissao_local, setAberto_rq_profissao_local] = useState(false);
  const [valor_rq_profissao_local, setValor_rq_profissao_local] = useState(null);
  const [item_rq_profissao_local, setItem_rq_profissao_local] = useState([]);

  const [se_rrf_tipo_atividades, setItem_se_rrf_tipo_atividades] = useState([]);


  const [aberto_rq_profissao, setAberto_rq_profissao] = useState(false);
  const [valor_rq_profissao, setValor_rq_profissao] = useState(null);
  const [item_rq_profissao, setItem_rq_profissao] = useState([]);

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

    loadStep2();

    // AsyncStorage.getItem("nome_tabela").then((tabela) => {
    //   //console.log(cod_processo);
    //   if (tabela) {
    //     db.transaction((tx) => {
    //       tx.executeSql(
    //         "select * from " +
    //           tabela +
    //           " where se_duf_cod_processo = '" +
    //           cod_processo +
    //           "'",
    //         [],
    //         (tx, results) => {
    //           var row = [];

    //           for (let i = 0; i < results.rows.length; ++i) {
    //             console.log(results.rows.item(0).se_duf_acesso);

    //             setSe_duf_natureza_atividades_outros(
    //               results.rows.item(0).se_duf_natureza_atividades_outros
    //             );

    //             setSe_duf_situacao_mercadoOutros(
    //               results.rows.item(0).se_duf_situacao_mercado_outros
    //             );

    //             setSe_duf_tipo_beneficio_outros(
    //               results.rows.item(0).se_duf_tipo_beneficio_outros
    //             );

    //             setSe_duf_valor_beneficio(
    //               results.rows.item(0).se_duf_tipo_beneficio_outros
    //             );

    //             setSe_duf_valor_beneficio(
    //               results.rows.item(0).se_duf_valor_beneficio
    //             );

    //             //console.log(typeof (results.rows.item(i).se_duf_municipio));
    //             //valor(row);

    //             var x = results.rows.item(i).se_duf_tipo_atividades;
    //             valor_checked(x.split(","));

    //             var y = results.rows.item(i).se_duf_situacao_mercado;
    //             valor_checked_situacao_mercado(y.split(","));

    //             var w = results.rows.item(i).se_duf_tipo_beneficio;
    //             valor_checked_tipo_beneficio(w.split(","));
    //           }
    //         }
    //       );
    //     });
    //   } //
    // });
  }, []);

  // function mask() {
  //   unmasked.getRawValue()
  // }

  //////////////primeira coisa que faz quando entra na tela:  faz um select das tabelas aux para carregar nos components //////////////
  async function loadStep2() {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from aux_tipo_atividades", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              id: results.rows.item(i).codigo,
              isChecked:false
            });
          }
          setItem_se_rrf_tipo_atividades(temp);
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

  //função que aciona quando o estado do componente muda e seta os valores correspondente
  // function onPressTitle(tabela, campo, valor, codigo) {

  //     db.transaction((tx) => {
  //         const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_duf_cod_processo = '${codigo}'`;
  //         console.log(query);
  //         tx.executeSql(query, [], (tx, results) => {
  //             for (let i = 0; i < results.rows.length; ++i) {
  //                 alert("INSERIDO COM SUCESSO");
  //             }
  //         });

  //     }, (tx, err) => {
  //         console.error("error", err.message);
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

  const handleChange = (id) => {
    const newState = se_duf_tipo_atividades.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setSe_duf_tipo_atividades(newState); // atualiza o estado
  };

  const handleChange_situacao_mercado = (id) => {
    const newState = se_duf_situacao_mercado.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setSe_duf_situacao_mercado(newState); // atualiza o estado
  };

  const handleChange_tipo_beneficio = (id) => {
    const newState = se_duf_tipo_beneficio.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setSe_duf_tipo_beneficio(newState); // atualiza o estado
  };

  function muda() {
    //await api
    var str_valores = [];

    se_duf_tipo_atividades
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

    se_duf_situacao_mercado
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

    se_duf_tipo_beneficio
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

        return setSe_duf_tipo_atividades(x);
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

        return setSe_duf_situacao_mercado(x);
      });
    });
  }

  function valor_checked_tipo_beneficio(tipo_beneficio) {
    db.transaction((tx) => {
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

          return setSe_duf_tipo_beneficio(x);
        }
      );
    });
  }

  return (
    <>
      <View style={styles.form3}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>OCUPAÇÃO ATUAL E BENEFÍCIOS SOCIAIS</Text>
        </View>

        <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Tipos de Atividade</Text>
        </View>

        <View style={styles.checkboxlabel}>
            {[...se_rrf_tipo_atividades].map((item, index) => (
              <View style={styles.checkboxGroup} key={item.id}>
                <Checkbox
                  style={styles.checkbox}
                  value={item.isChecked}
                  onValueChange={() => {
                    handleChange(item.id);
                    onPressTitle("se_rrj", "se_rrf_tipo_atividades", muda(), sync);
                  }}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Outro</Text>
        </View>

          <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_rq_profissao_local}
            value={rq_profissao_local}
            onBlur={() =>
              onPressTitle("rq", "rq_profissao_local", rq_profissao_local, sync)
            }
            placeholder={"     "}
          />
        </View>

      </View>

      <View style={styles.form4}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>SITUACAO NO MERCADO DE TRABALHO </Text>
        </View>
        <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Local de Trabalho </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <DropDownPicker
            zIndex={aberto_rq_profissao_local ? 9999 : 0}
            style={styles.dropdown_style}
            open={aberto_rq_profissao_local}
            value={valor_rq_profissao_local}
            items={item_rq_profissao_local}
            setOpen={setAberto_rq_profissao_local}
            setValue={setValor_rq_profissao_local}
            setItems={setItem_rq_profissao_local} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle(
                "rq",
                "rq_profissao_local",
                valor_rq_profissao_local,
                sync
              )
            }
            placeholder={"Estado Civil"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>
      </View>

      <View style={styles.form5}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>DADOS PROFISSIONAIS DO TITULAR </Text>
        </View>
        <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Local de Trabalho </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_rq_profissao_local}
            value={rq_profissao_local}
            onBlur={() =>
              onPressTitle("rq", "rq_profissao_local", rq_profissao_local, sync)
            }
            placeholder={"     "}
          />
        </View>
        <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Profissao </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <DropDownPicker
            zIndex={aberto_rq_profissao ? 9999 : 0}
            style={styles.dropdown_style}
            open={aberto_rq_profissao}
            value={valor_rq_profissao}
            items={item_rq_profissao}
            setOpen={setAberto_rq_profissao}
            setValue={setValor_rq_profissao}
            setItems={setItem_rq_profissao} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle("rq", "rq_profissao", valor_rq_profissao, sync)
            }
            placeholder={"Profissao"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>

        <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Cargo </Text>
        </View>
        <View style={{ alignItems: "center" }}>
        <TextInput
            style={styles.input_style}
            onChangeText={set_rq_profissao_cargo}
            value={rq_profissao_cargo}
            onBlur={() =>
              onPressTitle("rq", "rq_profissao_cargo", rq_profissao_cargo, sync)
            }
            placeholder={"     "}
          />
        </View>
        <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Salario </Text>
        </View>
        <View style={{ alignItems: "center" }}>
        <TextInput
            style={styles.input_style}
            onChangeText={set_rq_renda_comprovada}
            value={rq_renda_comprovada}
            onBlur={() =>
              onPressTitle("rq", "rq_renda_comprovada", rq_renda_comprovada, sync)
            }
            placeholder={"     "}
          />
        </View>

        <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Endereço </Text>
        </View>
        <View style={{ alignItems: "center" }}>
        <TextInput
            style={styles.input_style}
            onChangeText={set_rq_profissao_endereco}
            value={rq_profissao_endereco}
            onBlur={() =>
              onPressTitle("rq", "rq_profissao_endereco", rq_profissao_endereco, sync)
            }
            placeholder={"     "}
          />
        </View>

        <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Fone </Text>
        </View>
        <View style={{ alignItems: "center" }}>
        <TextInput
            style={styles.input_style}
            onChangeText={set_rq_profissao_fone}
            value={rq_profissao_fone}
            onBlur={() =>
              onPressTitle("rq", "rq_profissao_fone", rq_profissao_fone, sync)
            }
            placeholder={"     "}
          />
        </View>
        <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Email </Text>
        </View>
        <View style={{ alignItems: "center" }}>
        <TextInput
            style={styles.input_style}
            onChangeText={set_rq_profissao_email}
            value={rq_profissao_email}
            onBlur={() =>
              onPressTitle("rq", "rq_profissao_email", rq_profissao_email, sync)
            }
            placeholder={"     "}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dropdown_style: {
    height: 40,
    width: "85%",
    marginLeft: 30,
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
  input_style: {
    height: 40,
    width: "85%",
    marginTop: 10,
    marginLeft: 10,
    borderWidth: 1,
    backgroundColor: "white",
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
  eleitorStyle: {
    flexDirection: "row",
    //alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    height: 'auto',
    width:'85%',
    flexWrap:'wrap'
  },
  form4: {
    width: "95%",
    height: 150,
    //marginLeft: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  form5: {
    width: "95%",
    height: 620,
    //marginLeft: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  form3: {
    width: "95%",
    height: 'auto',
    paddingBottom:10,
    //marginLeft: 20,
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
  title_style: {
    color: "#121212",
    //marginLeft: 30,
    marginTop: 10,
    alignItems: "center",
  },
});

export default Step2;
