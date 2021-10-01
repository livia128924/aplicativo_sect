import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";
import { DatabaseConnection } from "../../../database/database";
import { TextInputMask } from "react-native-masked-text";
const db = DatabaseConnection.getConnection();

const Step3 = (props) => {
  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");

  const [rq_conjuge_nome, set_rq_conjuge_nome] = useState("");
  const [rq_conjuge_data_nascimento, set_rq_conjuge_data_nascimento] =
    useState("");
  const [unmasked, setUnmasked] = useState("");
  const [unmasked_rq_salario, setUnmasked_rq_salario] = useState("");

  const [se_rrj_sanitario, set_se_rrj_sanitario] = useState([]);
  const [se_rrj_coleta_lixo, set_se_rrj_coleta_lixo] = useState([]);
  const [se_rrj_rede_energia, set_se_rrj_rede_energia] = useState([]);
  const [se_rrj_rede_agua, set_se_rrj_rede_agua] = useState([]);
  const [se_rrj_tratamento_agua, set_se_rrj_tratamento_agua] = useState([]);


  const [rq_conjuge_cpf, set_rq_conjuge_cpf] = useState("");
  const [rq_conjuge_rg, set_rq_conjuge_rg] = useState("");
  const [rq_conjuge_titulo_eleitor, set_rq_conjuge_titulo_eleitor] = useState("");
  const [rq_conjuge_titulo_eleitor_zona, set_rq_conjuge_titulo_eleitor_zona] = useState("");
  const [rq_conjuge_titulo_eleitor_sessao, set_rq_conjuge_titulo_eleitor_sessao] = useState("");
  const [rq_conjuge_rg_uf, set_rq_conjuge_rg_uf] = useState("");
  const [rq_conjuge_cpts_numero, set_rq_conjuge_cpts_numero] = useState("");
  const [rq_conjuge_cpts_serie, set_rq_conjuge_cpts_serie] = useState("");
  const [rq_conjuge_profissao_local, set_rq_conjuge_profissao_local] = useState("");
  const [rq_conjuge_profissao, set_rq_conjuge_profissao] = useState("");
  const [rq_conjuge_profissao_cargo, set_rq_conjuge_profissao_cargo] = useState("");
  const [rq_conjuge_renda_comprovada, set_rq_conjuge_renda_comprovada] = useState("");
  const [rq_conjuge_profissao_endereco, set_rq_conjuge_profissao_endereco] = useState("");
  const [rq_conjuge_profissao_fone, set_rq_conjuge_profissao_fone] = useState("");


  const [aberto_se_rrj_destino_dejetos, setAberto_se_rrj_destino_dejetos] = useState(false);
  const [valor_se_rrj_destino_dejetos, setValor_se_rrj_destino_dejetos] = useState(null);
  const [item_se_rrj_destino_dejetos, setItem_se_rrj_destino_dejetos] = useState([]);

  const [aberto_rq_grau_instrucao, setAberto_rq_grau_instrucao] =
    useState(false);
  const [valor_rq_grau_instrucao, setValor_rq_grau_instrucao] = useState(null);
  const [item_rq_grau_instrucao, setItem_rq_grau_instrucao] = useState([
    { label: "Nao Alfabetizado", value: "1" },
    { label: "Alfabetizado", value: "2" },
    { label: "Ens.Fundamental Incompleto", value: "3" },
    { label: "Ens.Fundamental Completo", value: "4" },
    { label: "Ens.Medio Inconpleto", value: "5" },
    { label: "Ens.Medio Completo", value: "6" },
    { label: "Ens.Superior Completo", value: "7" },
    { label: "Ens.Superior Incompleto", value: "8" },
  ]);


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
          "select * from aux_sanitario",
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
            set_se_rrj_sanitario(temp);
          }
        );
        tx.executeSql(
          "select * from aux_destino_dejetos",
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push({
                label: results.rows.item(i).descricao,
                value: results.rows.item(i).codigo,
                //isChecked: false,
              });
            }
            setItem_se_rrj_destino_dejetos(temp);
          }
        );
        tx.executeSql(
          "select * from aux_coleta_lixo",
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
            set_se_rrj_coleta_lixo(temp);
          }
        );
        tx.executeSql(
          "select * from aux_rede_energia",
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
            set_se_rrj_rede_energia(temp);
          }
        );
        tx.executeSql(
          "select * from aux_rede_agua",
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
            set_se_rrj_rede_agua(temp);
          }
        );
        tx.executeSql(
          "select * from aux_tratamento_agua",
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
            set_se_rrj_tratamento_agua(temp);
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

  const handleChange = (id) => {
    const newState = se_rrj_sanitario.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_se_rrj_sanitario(newState); // atualiza o estado
  };

  const handleChange_colela_lixo = (id) => {
    const newState = se_rrj_coleta_lixo.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_se_rrj_coleta_lixo(newState); // atualiza o estado
  };

  const handleChange_rede_energia = (id) => {
    const newState = se_rrj_rede_energia.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_se_rrj_rede_energia(newState); // atualiza o estado
  };

  const handleChange_rede_agua = (id) => {
    const newState = se_rrj_rede_agua.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_se_rrj_rede_agua(newState); // atualiza o estado
  };


  const handleChange_tratamento_agua = (id) => {
    const newState = se_rrj_tratamento_agua.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_se_rrj_tratamento_agua(newState); // atualiza o estado
  };



  function muda() {
    //await api
    var str_valores = [];

    se_rrj_sanitario
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

    se_rrj_coleta_lixo
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function muda_rede_energia() {
    //await api
    var str_valores = [];

    se_rrj_rede_energia
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function muda_rede_agua() {
    //await api
    var str_valores = [];

    se_rrj_rede_agua
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

    se_rrj_tratamento_agua
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }


  function valor_checked_sanitario(sanitario) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_cobertura", [], (tx, results) => {
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
        sanitario.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return set_se_rrj_sanitario(x);
      });
    });
  }

  function valor_checked_coleta_lixo(coleta_lixo) {
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

        return set_se_rrj_coleta_lixo(x);
      });
    });
  }

  function valor_checked_rede_energia(rede_energia) {
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

        return set_se_rrj_rede_energia(x);
      });
    });
  }

  function valor_checked_rede_agua(rede_agua) {
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

        //console.log(x);
        rede_agua.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return set_se_rrj_rede_agua(x);
      });
    });
  }


  function valor_checked_tratamento_agua(tratamento_agua) {
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

        return set_se_rrj_tratamento_agua(x);
      });
    });
  }


  return (
    <>
      <View style={styles.form5}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>SANEAMENTO BÁSICO E INSTALAÇÕES SANITÁRIAS</Text>
        </View>
        <View style={styles.titulo_style}>
          <Text>Sanitário</Text>
        </View>
        <View style={styles.checkboxlabel}>
            {[...se_rrj_sanitario].map((item, index) => (
              <View style={styles.checkboxGroup} key={item.id}>
                <Checkbox
                  style={styles.checkbox}
                  value={item.isChecked}
                  onValueChange={() => {
                    handleChange(item.id);
                    onPressTitle("se_rrj", "se_rrj_sanitario", muda(), sync);
                  }}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>

        <View style={styles.titulo_style}>
          <Text>Destino dos Dejetos</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <DropDownPicker
            style={styles.dropdown_style}
            open={aberto_se_rrj_destino_dejetos}
            value={valor_se_rrj_destino_dejetos}
            items={item_se_rrj_destino_dejetos}
            setOpen={setAberto_se_rrj_destino_dejetos}
            setValue={setValor_se_rrj_destino_dejetos}
            setItems={setItem_se_rrj_destino_dejetos} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle("se_rrj", "se_rrj_destino_dejetos", valor_se_rrj_destino_dejetos, sync)
            }
            placeholder={"Selecione:"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>

        <View style={styles.titulo_style}>
          <Text>Coleta do Lixo</Text>
        </View>

        <View style={styles.checkboxlabel}>
            {[...se_rrj_coleta_lixo].map((item, index) => (
              <View style={styles.checkboxGroup} key={item.id}>
                <Checkbox
                  style={styles.checkbox}
                  value={item.isChecked}
                  onValueChange={() => {
                    handleChange_colela_lixo(item.id);
                    onPressTitle("se_rrj", "se_rrj_coleta_lixo", muda_coleta_lixo(), sync);
                  }}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>

        <View style={styles.titulo_style}>
          <Text>Rede de Energia</Text>
        </View>
          <View style={styles.checkboxlabel}>
            {[...se_rrj_rede_energia].map((item, index) => (
              <View style={styles.checkboxGroup} key={item.id}>
                <Checkbox
                  style={styles.checkbox}
                  value={item.isChecked}
                  onValueChange={() => {
                    handleChange_rede_energia(item.id);
                    onPressTitle("se_rrj", "se_rrj_rede_energia", muda_rede_energia(), sync);
                  }}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>

        <View style={styles.titulo_style}>
          <Text>Rede e/ou Água</Text>
        </View>
        <View style={styles.checkboxlabel}>
            {[...se_rrj_rede_agua].map((item, index) => (
              <View style={styles.checkboxGroup} key={item.id}>
                <Checkbox
                  style={styles.checkbox}
                  value={item.isChecked}
                  onValueChange={() => {
                    handleChange_rede_agua(item.id);
                    onPressTitle("se_rrj", "se_rrj_rede_agua", muda_rede_agua(), sync);
                  }}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>


        <View style={styles.titulo_style}>
          <Text>Tratamento da água</Text>
        </View>
        <View style={styles.checkboxlabel}>
            {[...se_rrj_tratamento_agua].map((item, index) => (
              <View style={styles.checkboxGroup} key={item.id}>
                <Checkbox
                  style={styles.checkbox}
                  value={item.isChecked}
                  onValueChange={() => {
                    handleChange_tratamento_agua(item.id);
                    onPressTitle("se_rrj", "se_rrj_tratamento_agua", muda_tratamento_agua(), sync);
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
    alignItems: "center",
    flexDirection: "row",

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
