import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";
import { DatabaseConnection } from "../../database/database";
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


  const [aberto_rq_conjuge_sexo, setAberto_rq_conjuge_sexo] = useState(false);
  const [valor_rq_conjuge_sexo, setValor_rq_conjuge_sexo] = useState(null);
  const [item_rq_conjuge_sexo, setItem_rq_conjuge_sexo] = useState([
    { label: "Femenino", value: "f" },
    { label: "Masculino", value: "m" },
  ]);

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

  const [rq_conjuge_filiacao, set_rq_conjuge_filiacao] = useState([
    { label: "Mae", id: "1", isChecked: false },
    { label: "Pai", id: "2", isChecked: false },
  ]);

  const [se_duf_situacao_imovel_outros, setSe_duf_situacao_imovel_outros] =
    useState("");
  const [se_duf_tipo_documento_outros, setSe_duf_tipo_documento_outros] =
    useState("");
  const [se_duf_onde_reside_outros, setSe_duf_onde_reside_outros] =
    useState("");
  const [se_duf_tipo_construcao_outros, setSe_duf_tipo_construcao_outros] =
    useState("");
  const [se_duf_situacao_imovel, setSe_duf_situacao_imovel] = useState([]);
  const [se_duf_tipo_documento, setSe_duf_tipo_documento] = useState([]);
  const [se_duf_material_cobertura, setse_duf_material_cobertura] = useState(
    []
  );

  const [openSe_duf_tipo_ocupacao, setOpenSe_duf_tipo_ocupacao] =
    useState(false);
  const [valorSe_duf_tipo_ocupacao, setValorSe_duf_tipo_ocupacao] =
    useState(null);
  const [itemSe_duf_tipo_ocupacao, setItemSe_duf_tipo_ocupacao] = useState([]);

  const [openSe_duf_tempo_ocupacao, setOpenSe_duf_tempo_ocupacao] =
    useState(false);
  const [valorSe_duf_tempo_ocupacao, setValorSe_duf_tempo_ocupacao] =
    useState(null);
  const [itemSe_duf_tempo_ocupacao, setItemSe_duf_tempo_ocupacao] = useState(
    []
  );

  const [openSe_duf_onde_reside, setOpenSe_duf_onde_reside] = useState(false);
  const [valorSe_duf_onde_reside, setValorSe_duf_onde_reside] = useState(null);
  const [itemSe_duf_onde_reside, setItemSe_duf_onde_reside] = useState([]);

  const [openSe_duf_tipo_construcao, setOpenSe_duf_tipo_construcao] =
    useState(false);
  const [valorSe_duf_tipo_construcao, setValorSe_duf_tipo_construcao] =
    useState(null);
  const [itemSe_duf_tipo_construcao, setItemSe_duf_tipo_construcao] = useState(
    []
  );

  const [openSe_duf_numero_comodos, setOpenSe_duf_numero_comodos] =
    useState(false);
  const [valorSe_duf_numero_comodos, setValorSe_duf_numero_comodos] =
    useState(null);
  const [itemSe_duf_numero_comodos, setItemSe_duf_numero_comodos] = useState(
    []
  );

  const [openSe_duf_numero_pisos, setOpenSe_duf_numero_pisos] = useState(false);
  const [valorSe_duf_numero_pisos, setValorSe_duf_numero_pisos] =
    useState(null);
  const [itemSe_duf_numero_pisos, setItemSe_duf_numero_pisos] = useState([]);

  const [openSe_duf_estado_conservacao, setOpenSe_duf_estado_conservacao] =
    useState(false);
  const [valorSe_duf_estado_conservacao, setValorSe_duf_estado_conservacao] =
    useState(null);
  const [itemSe_duf_estado_conservacao, setItemSe_duf_estado_conservacao] =
    useState([]);

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
          "select * from aux_situacao_imovel",
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
            setSe_duf_situacao_imovel(temp);
          }
        );
        tx.executeSql("select * from aux_tipo_documento", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              id: results.rows.item(i).codigo,
              isChecked: false,
            });
          }
          setSe_duf_tipo_documento(temp);
        });
        tx.executeSql("select * from aux_tipo_ocupacao", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItemSe_duf_tipo_ocupacao(temp);
        });
        tx.executeSql("select * from aux_tempo_ocupacao", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItemSe_duf_tempo_ocupacao(temp);
        });
        tx.executeSql("select * from aux_onde_reside", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItemSe_duf_onde_reside(temp);
        });
        tx.executeSql(
          "select * from aux_tipo_construcao",
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push({
                label: results.rows.item(i).descricao,
                value: results.rows.item(i).codigo,
              });
            }
            setItemSe_duf_tipo_construcao(temp);
          }
        );
        tx.executeSql("select * from aux_comodos", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItemSe_duf_numero_comodos(temp);
        });
        tx.executeSql("select * from aux_pisos", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItemSe_duf_numero_pisos(temp);
        });
        tx.executeSql("select * from aux_cobertura", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              id: results.rows.item(i).codigo,
              isChecked: false,
            });
          }
          setse_duf_material_cobertura(temp);
        });
        tx.executeSql(
          "select * from aux_estado_conservacao",
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push({
                label: results.rows.item(i).descricao,
                value: results.rows.item(i).codigo,
              });
            }
            setItemSe_duf_estado_conservacao(temp);
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
    const newState = rq_conjuge_filiacao.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    set_rq_conjuge_filiacao(newState); // atualiza o estado
  };

  function muda() {
    //await api
    var str_valores = [];

    rq_conjuge_filiacao
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function valor_checked(rq_conjuge_filiacao) {
    db.transaction((tx) => {
      //console.log(temp);
      let x = temp;
      //console.log(x);
      rq_conjuge_filiacao.forEach((item) => {
        x.forEach((val) => {
          if (val.id == item) {
            val.isChecked = true;
          }
        });
      });

      return set_rq_conjuge_filiacao(x);
    });
  }

  return (
    <>
      <View style={styles.form5}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>DADOS DO CONJUGE</Text>
        </View>
        <View style={styles.titulo_style}>
          <Text>Nome</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_rq_conjuge_nome}
            value={rq_conjuge_nome}
            onBlur={() =>
              onPressTitle("rq", "rq_conjuge_nome", rq_conjuge_nome, sync)
            }
            placeholder={"    "}
          />
        </View>
        <View style={styles.titulo_style}>
          <Text>Sexo</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <DropDownPicker
            style={styles.dropdown_style}
            open={aberto_rq_conjuge_sexo}
            value={valor_rq_conjuge_sexo}
            items={item_rq_conjuge_sexo}
            setOpen={setAberto_rq_conjuge_sexo}
            setValue={setValor_rq_conjuge_sexo}
            setItems={setItem_rq_conjuge_sexo} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle("rq", "rq_conjuge_sexo", valor_rq_conjuge_sexo, sync)
            }
            placeholder={"Sexo"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>

        <View style={styles.titulo_style}>
          <Text>Data de nascimento</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInputMask
            style={styles.input_style}
            type={"datetime"}
            options={{
              format: "DD-MM-YYYY",
            }}
            value={rq_conjuge_data_nascimento}
            onChangeText={set_rq_conjuge_data_nascimento}
            ref={(ref) => setUnmasked(ref)}
            placeholder={"   00-00-0000"}
            onBlur={() => {
              // console.log(se_ruf_valor_beneficio);
              // mask();
              onPressTitle(
                "rq",
                "rq_conjuge_data_nascimento",
                unmasked.getRawValue(), //retira o R$
                sync
              );
            }}
          />
        </View>

        <View style={styles.titulo_style}>
          <Text>Filiaçao</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.checkboxlabel}>
            {[...rq_conjuge_filiacao].map((item, index) => (
              <View style={styles.checkboxGroup} key={item.id}>
                <Checkbox
                  style={styles.checkbox}
                  value={item.isChecked}
                  onValueChange={() => {
                    handleChange(item.id);
                    onPressTitle("rq", "rq_conjuge_filiacao", muda(), sync);
                  }}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.titulo_style}>
          <Text>Grau de Instruçao</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <DropDownPicker
            style={styles.dropdown_style}
            open={aberto_rq_grau_instrucao}
            value={valor_rq_grau_instrucao}
            items={item_rq_grau_instrucao}
            setOpen={setAberto_rq_grau_instrucao}
            setValue={setValor_rq_grau_instrucao}
            setItems={setItem_rq_grau_instrucao} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle(
                "rq",
                "rq_grau_instrucao",
                valor_rq_grau_instrucao,
                sync
              )
            }
            placeholder={"Selecione"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>
      </View>

      <View style={styles.form6}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>DOCUMENTACAO DO CONJUGE</Text>
        </View>
        <View style={styles.titulo_style}>
          <Text>CPF</Text>
        </View>
        <View style={{ alignItems: "center" }}>

          <TextInputMask
            style={styles.input_style}
            type={"cpf"}
            options={{
              format: "999.999.999-99",
            }}
            value={rq_conjuge_cpf}
            onChangeText={set_rq_conjuge_cpf}
            ref={(ref) => setUnmasked(ref)}
            placeholder={"   999.999.999-99"}
            onBlur={() => {
              // console.log(se_ruf_valor_beneficio);
              // mask();
              onPressTitle(
                "rq",
                "rq_conjuge_cpf",
                unmasked.getRawValue(), //retira o R$
                sync
              );
            }}
          />
        </View>

        <View style={styles.titulo_style}>
          <Text>RG</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_rq_conjuge_rg}
            value={rq_conjuge_rg}
            onBlur={() =>
              onPressTitle("rq", "rq_conjuge_rg", rq_conjuge_rg, sync)
            }
            placeholder={"   99.999.999-0"}
          />
        </View>
        <View style={{alignContent: "center",   alignItems: "center",}}>

        <View style={styles.eleitorStyle}>
          <View style={styles.collumStyle}>
            <View style={styles.title_style}>
              <Text>Titulo do Eleitor</Text>
            </View>
            <TextInputMask
              style={styles.input_style_titulo}
              type={"custom"}
              options={{
                format: "9999.9999.9999",
              }}
              value={rq_conjuge_titulo_eleitor}
              onChangeText={set_rq_conjuge_titulo_eleitor}
              ref={(ref) => setUnmasked(ref)}
              placeholder={"   9999.9999.9999  "}
              onBlur={() => {
                // console.log(se_ruf_valor_beneficio);
                // mask();
                onPressTitle(
                  "rq",
                  "rq_conjuge_titulo_eleitor",
                  unmasked.getRawValue(), //retira o R$
                  sync
                );
              }}
            />
          </View>
          <View
            style={styles.collumStyle}
          >
            <View>
              <Text style={styles.title_style}>Zona</Text>
            </View>
            <TextInput
              style={styles.input_style_zona}
              onChangeText={set_rq_conjuge_titulo_eleitor_zona}
              value={rq_conjuge_titulo_eleitor_zona}
              onBlur={() =>
                onPressTitle(
                  "rq",
                  "rq_conjuge_titulo_eleitor_zona",
                  rq_conjuge_titulo_eleitor_zona,
                  sync
                )
              }
              placeholder={"   001  "}
            />
          </View>

          <View
            style={styles.collumStyle}
          >
            <View>
              <Text style={styles.title_style}>Seção</Text>
            </View>
            <TextInput
              style={styles.input_style_zona}
              onChangeText={set_rq_conjuge_titulo_eleitor_sessao}
              value={rq_conjuge_titulo_eleitor_sessao}
              onBlur={() =>
                onPressTitle(
                  "rq",
                  "rq_conjuge_titulo_eleitor_sessao",
                  rq_conjuge_titulo_eleitor_sessao,
                  sync
                )
              }
              placeholder={"   0011   "}
            />
          </View>

          <View
            style={styles.collumStyle}
          >
            <View>
              <Text style={styles.title_style}>UF</Text>
            </View>
            <TextInput
              style={styles.input_style_zona}
              onChangeText={set_rq_conjuge_rg_uf}
              value={rq_conjuge_rg_uf}
              onBlur={() => onPressTitle("rq", "rq_conjuge_rg_uf", rq_conjuge_rg_uf, sync)}
              placeholder={"   AM   "}
            />
          </View>

          <View
            style={styles.collumStyle}
          >
            <View>
              <Text style={styles.title_style}>Data</Text>
            </View>
            <TextInput
              style={styles.input_style_zona}
              onChangeText={set_rq_conjuge_rg_uf}
              value={rq_conjuge_rg_uf}
              onBlur={() => onPressTitle("rq", "rq_conjuge_rg_uf", rq_conjuge_rg_uf, sync)}
              placeholder={"   99/99/9999   "}
            />
          </View>
        </View>

        <View style={styles.eleitorStyle}>
          <View  style={styles.collumStyle}>
            <View style={styles.title_style}>
              <Text>CTPS</Text>
            </View>
            <TextInput
                style={styles.input_style}
                onChangeText={set_rq_conjuge_cpts_numero}
                value={rq_conjuge_cpts_numero}
                onBlur={() =>
                  onPressTitle("rq", "rq_conjuge_cpts_numero", rq_conjuge_cpts_numero, sync)
                }
                placeholder={" 12345678 "}
              />
          </View>
          <View
            style={styles.collumStyle}
          >
            <View style={styles.title_style}>
            <Text>Serie</Text>
            </View>
              <TextInput
                style={styles.input_style}
                onChangeText={set_rq_conjuge_cpts_serie}
                value={rq_conjuge_cpts_serie}
                onBlur={() =>
                onPressTitle("rq", "rq_conjuge_cpts_serie", rq_conjuge_cpts_serie, sync)
                }
                placeholder={" 12345678  "}
              />
          </View>

          <View
            style={styles.collumStyle}
          >
            <View>
              <Text style={styles.title_style}>UF</Text>
            </View>
            <TextInput
              style={styles.input_style_zona}
              onChangeText={set_rq_conjuge_rg_uf}
              value={rq_conjuge_rg_uf}
              onBlur={() => onPressTitle("rq", "rq_conjuge_rg_uf", rq_conjuge_rg_uf, sync)}
              placeholder={"   AM   "}
            />
          </View>

          <View
            style={styles.collumStyle}
          >
            <View>
              <Text style={styles.title_style}>Data</Text>
            </View>
            <TextInput
              style={styles.input_style_zona}
              onChangeText={set_rq_conjuge_rg_uf}
              value={rq_conjuge_rg_uf}
              onBlur={() => onPressTitle("rq", "rq_conjuge_rg_uf", rq_conjuge_rg_uf, sync)}
              placeholder={"   99/99/9999   "}
            />
          </View>
        </View>

        </View>
      </View>
      <View style={styles.form7}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>DADOS PROFISSIONAIS DO CONJUGE</Text>
        </View>
        <View style={styles.titulo_style}>
          <Text>Local de trabalho</Text>
        </View>
        <View style={{ alignItems: "center" }}>
        <TextInput
            style={styles.input_style}
            onChangeText={set_rq_conjuge_profissao_local}
            value={rq_conjuge_profissao_local}
            onBlur={() =>
              onPressTitle("rq", "rq_conjuge_profissao_local", rq_conjuge_profissao_local, sync)
            }
            placeholder={"   "}
          />

        </View>

        <View style={styles.titulo_style}>
          <Text>Profissao</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_rq_conjuge_profissao}
            value={rq_conjuge_profissao}
            onBlur={() =>
              onPressTitle("rq", "rq_conjuge_profissao", rq_conjuge_profissao, sync)
            }
            placeholder={"   "}
          />
        </View>

        <View style={styles.titulo_style}>
          <Text>Cargo</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_rq_conjuge_profissao_cargo}
            value={rq_conjuge_profissao_cargo}
            onBlur={() =>
              onPressTitle("rq", "rq_conjuge_profissao_cargo", rq_conjuge_profissao_cargo, sync)
            }
            placeholder={"   "}
          />
        </View>

        <View style={styles.titulo_style}>
          <Text>Salario</Text>
        </View>
        <View style={{ alignItems: "center" }}>{/*rq_conjuge_renda_comprovada*/}
        <TextInputMask
            style={styles.input_style}
            type={"money"}
            options={{
              precision: 2,
              delimiter: ".",
            }}
            value={rq_conjuge_renda_comprovada}
            onChangeText={set_rq_conjuge_renda_comprovada}
            ref={(ref) => setUnmasked(ref)}
            onBlur={() => {
              // console.log(se_ruf_valor_beneficio);
              // mask();
               onPressTitle(
                "se_ruf",
                "rq_conjuge_renda_comprovada",
                unmasked.getRawValue(),//retira o R$
                sync
              )
            }}
          />
        </View>

        <View style={styles.titulo_style}>
          <Text>Endereço</Text>
        </View>
        <View style={{ alignItems: "center" }}>{/*rq_conjuge_renda_comprovada*/}
        <TextInput
            style={styles.input_style}
            onChangeText={set_rq_conjuge_profissao_endereco}
            value={rq_conjuge_profissao_endereco}
            onBlur={() =>
              onPressTitle("rq", "rq_conjuge_profissao_endereco", rq_conjuge_profissao_endereco, sync)
            }
            placeholder={"   "}
          />
        </View>


        <View style={styles.titulo_style}>
          <Text>Fone</Text>
        </View>
        <View style={{ alignItems: "center" }}>{/*rq_conjuge_renda_comprovada*/}
        <TextInput
            style={styles.input_style}
            onChangeText={set_rq_conjuge_profissao_fone}
            value={rq_conjuge_profissao_fone}
            onBlur={() =>
              onPressTitle("rq", "rq_conjuge_profissao_fone", rq_conjuge_profissao_fone, sync)
            }
            placeholder={"   "}
          />
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
  },
  checkboxlabel: {
    width: "100%",
    //textAlign:'center',
    flexDirection: "row",
    height: 45,
    alignItems: "center",
    display: "flex",
    justifyContent: "space-evenly",
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
