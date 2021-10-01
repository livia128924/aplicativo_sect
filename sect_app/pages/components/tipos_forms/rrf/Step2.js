import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import { DatabaseConnection } from "../../../database/database";
import Checkbox from "expo-checkbox";
import { TextInputMask } from "react-native-masked-text";
import DropDownPicker from "react-native-dropdown-picker";
const db = DatabaseConnection.getConnection();

const Step2 = (props) => {
  const [sync, setSync] = useState("");

  const [se_rrf_tipo_atividades_outros, set_se_rrf_tipo_atividades_outros] = useState("");
  const [se_rrf_tipo_beneficio_outros, set_se_rrf_tipo_beneficio_outros] = useState("");
  const [se_rrf_valor_beneficio, set_se_rrf_valor_beneficio] = useState("");
  const [unmasked_valor, setUnmasked_valor] = useState("");
  const [se_rrf_situacao_mercado, set_se_rrf_situacao_mercado] = useState([]);
  const [visible, setVisible] = useState(false);

  const [se_rrf_tipo_beneficio, set_se_rrf_tipo_beneficio] = useState([]);
  const [isvisible_atividades, setIsvisible_atividades] = useState(false);

  const [se_rrf_finalidade_producao, set_se_rrf_finalidade_producao] = useState([]);
  const [isvisible_finalidade_prd, setIsvisible_finalidade_prd] = useState([]);

  const [se_rrf_tipo_cultivo, set_se_rrf_tipo_cultivo] = useState([]);

  const [aberto_se_rrf_valor_agregrado, setAberto_se_rrf_valor_agregrado] = useState(false);
  const [valor_se_rrf_valor_agregrado, setValor_se_rrf_valor_agregrado] = useState(null);
  const [item_se_rrf_valor_agregrado, setItem_se_rrf_valor_agregrado] = useState([]);

  const [aberto_se_rrf_periodicidade, setAberto_se_rrf_periodicidade] = useState(false);
  const [valor_se_rrf_periodicidade, setValor_se_rrf_periodicidade] = useState(null);
  const [item_se_rrf_periodicidade, setItem_se_rrf_periodicidade] = useState([]);

  const [se_rrf_tipo_atividades, setItem_se_rrf_tipo_atividades] = useState([]);


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
        tx.executeSql("select * from aux_situacao_mercado", [], (tx, results) => {
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
          set_se_rrf_situacao_mercado(temp);
        });
        tx.executeSql("select * from aux_tipo_beneficios_sociais", [], (tx, results) => {
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
          set_se_rrf_tipo_beneficio(temp);
        });
        tx.executeSql("select * from aux_finalidade_producao", [], (tx, results) => {
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
          set_se_rrf_finalidade_producao(temp);
        });
        tx.executeSql("select * from aux_tipo_cultivo", [], (tx, results) => {
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
          set_se_rrf_tipo_cultivo(temp);
        });
        tx.executeSql("select * from aux_valor_agregado", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
              //isChecked:false
            });
          }
          setItem_se_rrf_valor_agregrado(temp);
        });
        tx.executeSql("select * from aux_periodicidade", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
              //isChecked:false
            });
          }
          setItem_se_rrf_periodicidade(temp);
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

  const handleChange_tipo_atividade = (id) => {
    const newState = se_rrf_tipo_atividades.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setItem_se_rrf_tipo_atividades(newState); // atualiza o estado
  };

  const handleChange_situacao_mercado = (id) => {
    const newState = se_rrf_situacao_mercado.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_se_rrf_situacao_mercado(newState); // atualiza o estado
  };

  const handleChange_tipo_beneficio = (id) => {
    const newState = se_rrf_tipo_beneficio.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_se_rrf_tipo_beneficio(newState); // atualiza o estado
  };

  const handleChange_finalidade_prd = (id) => {
    const newState = se_rrf_finalidade_producao.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_se_rrf_finalidade_producao(newState); // atualiza o estado
  };

  const handleChange_tipo_cultivo = (id) => {
    const newState = se_rrf_tipo_cultivo.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_se_rrf_tipo_cultivo(newState); // atualiza o estado
  };

  function muda_tipo_atividade() {
    //await api
    var str_valores = [];

    se_rrf_tipo_atividades
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

    se_rrf_situacao_mercado
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);

       {item.id === 8  ?  setVisible(true) :  setVisible(false)}
       //console.log(item.id === 8 ? "TRUE":"FALSE" );
      });

    return str_valores.join(",");
  }

  function muda_tipo_beneficio() {
    //await api
    var str_valores = [];

    se_rrf_tipo_beneficio
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
        {item.id === 7  ?  setIsvisible_atividades(true) :  setIsvisible_atividades(false)}
      });
    //console.log(str_valores);
    return str_valores.join(",");
  }
  function muda_finalidade_prd() {
    //await api
    var str_valores = [];

    se_rrf_finalidade_producao
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
        {item.id ?  setIsvisible_finalidade_prd(true) :  setIsvisible_finalidade_prd(false)}
      });
    //console.log(str_valores);
    return str_valores.join(",");
  }
  function muda_finalidade_prd() {
    //await api
    var str_valores = [];

    se_rrf_tipo_cultivo
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
        // {item.id ?  setIsvisible_finalidade_prd(true) :  setIsvisible_finalidade_prd(false)}
      });
    //console.log(str_valores);
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
                    handleChange_tipo_atividade(item.id);
                    onPressTitle("se_rrj", "se_rrf_tipo_atividades", muda_tipo_atividade(), sync);
                  }}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Outros</Text>
        </View>

          <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_se_rrf_tipo_atividades_outros}
            value={se_rrf_tipo_atividades_outros}
            onBlur={() =>
              onPressTitle("se_rrf", "se_rrf_tipo_atividades_outros", se_rrf_tipo_atividades_outros, sync)
            }
            placeholder={"     "}
          />
        </View>

        <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Situação no mercado de trabalho</Text>
        </View>

        <View style={styles.checkboxlabel}>
            {[...se_rrf_situacao_mercado].map((item, index) => (
              <View style={styles.checkboxGroup} key={item.id}>
                <Checkbox
                  style={styles.checkbox}
                  value={item.isChecked}
                  onValueChange={() => {
                    handleChange_situacao_mercado(item.id);
                    muda_situacao_mercado();
                    //onPressTitle("se_rrj", "se_rrf_situacao_mercado", muda_situacao_mercado(), sync);
                  }}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>
          {visible ?
             <View style={{ alignItems: "center" }}>
             <TextInput
               style={styles.input_style}
               onChangeText={set_se_rrf_tipo_atividades_outros}
               value={se_rrf_tipo_atividades_outros}
               onBlur={() =>
                 onPressTitle("se_rrf", "se_rrf_tipo_atividades_outros", se_rrf_tipo_atividades_outros, sync)
               }
               placeholder={"   outros  "}
             />
           </View>
           : null}

        <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Tipos de Benefícios Sociais</Text>
        </View>

        <View style={styles.checkboxlabel}>
            {[...se_rrf_tipo_beneficio].map((item, index) => (
              <View style={styles.checkboxGroup} key={item.id}>
                <Checkbox
                  style={styles.checkbox}
                  value={item.isChecked}
                  onValueChange={() => {
                    handleChange_tipo_beneficio(item.id);
                    muda_tipo_beneficio();
                    //onPressTitle("se_rrj", "se_rrf_tipo_beneficio", muda_tipo_beneficio(), sync);
                  }}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>
          {isvisible_atividades ?
             <View style={{ alignItems: "center" }}>
             <TextInput
               style={styles.input_style}
               onChangeText={set_se_rrf_tipo_beneficio_outros}
               value={se_rrf_tipo_beneficio_outros}
               onBlur={() =>
                 onPressTitle("se_rrf", "se_rrf_tipo_beneficio_outros", se_rrf_tipo_beneficio_outros, sync)
               }
               placeholder={"   outros Beneficios Sociais "}
             />
           </View>
           : null}
          <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Valor do benefício</Text>
        </View>

        <View style={{ alignItems: "center" }}>
        <TextInputMask
                style={styles.input_style}
                type={"money"}
                options={{
                  precision: 2,
                  delimiter: ".",
                  unit: "R$",
                }}
                value={se_rrf_valor_beneficio}
                onChangeText={set_se_rrf_valor_beneficio}
                ref={(ref) => setUnmasked_valor(ref)}
                placeholder="   R$00.00"
                onBlur={() => {
                  alert(unmasked_valor.getRawValue());
                }}
              />
           </View>


      </View>

      <View style={styles.form4}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>BASE ECONÔMICA - UNIDADE PRODUTIVA </Text>
        </View>
        <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Finalidade da Produção </Text>
        </View>

        <View style={styles.checkboxlabel}>
            {[...se_rrf_finalidade_producao].map((item, index) => (
              <View style={styles.checkboxGroup} key={item.id}>
                <Checkbox
                  style={styles.checkbox}
                  value={item.isChecked}
                  onValueChange={() => {
                    handleChange_finalidade_prd(item.id);
                    muda_finalidade_prd();
                    //onPressTitle("se_rrj", "se_rrf_tipo_beneficio", muda_tipo_beneficio(), sync);
                  }}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>

        <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Tipo de cultivo </Text>
        </View>
        <View style={styles.checkboxlabel}>
            {[...se_rrf_tipo_cultivo].map((item, index) => (
              <View style={styles.checkboxGroup} key={item.id}>
                <Checkbox
                  style={styles.checkbox}
                  value={item.isChecked}
                  onValueChange={() => {
                    handleChange_tipo_cultivo(item.id);
                    muda_tipo_cultivo();
                    //onPressTitle("se_rrj", "se_rrf_tipo_beneficio", muda_tipo_beneficio(), sync);
                  }}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>

        <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Valor agregrado ao produto (R$) </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <DropDownPicker
            zIndex={aberto_se_rrf_valor_agregrado ? 9999 : 0}
            style={styles.dropdown_style}
            open={aberto_se_rrf_valor_agregrado}
            value={valor_se_rrf_valor_agregrado}
            items={item_se_rrf_valor_agregrado}
            setOpen={setAberto_se_rrf_valor_agregrado}
            setValue={setValor_se_rrf_valor_agregrado}
            setItems={setItem_se_rrf_valor_agregrado} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle("se_rrf", "se_rrf_valor_agregrado", valor_se_rrf_valor_agregrado, sync)
            }
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>

        <View style={{ marginTop: 10, marginLeft: 30 }}>
          <Text>Periodicidade</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <DropDownPicker
            zIndex={aberto_se_rrf_periodicidade ? 9999 : 0}
            style={styles.dropdown_style}
            open={aberto_se_rrf_periodicidade}
            value={valor_se_rrf_periodicidade}
            items={item_se_rrf_periodicidade}
            setOpen={setAberto_se_rrf_periodicidade}
            setValue={setValor_se_rrf_periodicidade}
            setItems={setItem_se_rrf_periodicidade} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle("se_rrf", "se_rrf_periodicidade", valor_se_rrf_periodicidade, sync)
            }
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
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
    height: 'auto',
    paddingBottom:10,
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
