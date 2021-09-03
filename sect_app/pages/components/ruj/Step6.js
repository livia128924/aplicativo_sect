import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";
import { DatabaseConnection } from "../../database/database";
const db = DatabaseConnection.getConnection();

const Step6 = (props) => {
  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");

  const [
    openSe_ruj_investimento_financeiro,
    setOpenSe_ruj_investimento_financeiro,
  ] = useState(false);
  const [
    valorSe_ruj_investimento_financeiro,
    setValorSe_ruj_investimento_financeiro,
  ] = useState(null);
  const [
    itemSe_ruj_investimento_financeiro,
    setItemSe_ruj_investimento_financeiro,
  ] = useState([
    { label: "Menos de 100 mil reais", value: "Menos de 100 mil reais" },
  ]);
  const [openSe_ruj_formacao_atuacao, setOpenSe_ruj_formacao_atuacao] =
    useState(false);
  const [valorSe_ruj_formacao_atuacao, setValorSe_ruj_formacao_atuacao] =
    useState(null);
  const [itemSe_ruj_formacao_atuacao, setItemSe_ruj_formacao_atuacao] =
    useState([
      {
        label: "Diretamente da Comunidade",
        value: "Diretamente da Comunidade",
      },
      {
        label: "Indiretamente por meio dos colaboradores",
        value: "Indiretamente por meio dos colaboradores",
      },
    ]);
  const [
    openSe_ruj_responsabilidade_social,
    setOpenSe_ruj_responsabilidade_social,
  ] = useState(false);
  const [
    valorSe_ruj_responsabilidade_social,
    setValorSe_ruj_responsabilidade_social,
  ] = useState(null);
  const [
    itemSe_ruj_responsabilidade_social,
    setItemSe_ruj_responsabilidade_social,
  ] = useState([
    { label: "Sim", value: "s" },
    { label: "Nao", value: "n" },
  ]);
  const [se_ruj_bens_moveis, setSe_ruj_bens_moveis] = useState([]);

  const [se_ruj_bens_imoveis, setSe_ruj_bens_imoveis] = React.useState([]);

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

    loadStep6();

    AsyncStorage.getItem("nome_tabela").then((tabela) => {
      //console.log(cod_processo);
      if (tabela) {
        db.transaction((tx) => {
          tx.executeSql(
            "select * from " +
              tabela +
              " where se_ruj_cod_processo = '" +
              cod_processo +
              "'",
            [],
            (tx, results) => {
              var row = [];
              for (let i = 0; i < results.rows.length; ++i) {
                //console.log(results.rows.item(0).se_ruj_acesso);

                setValorSe_ruj_responsabilidade_social(
                  results.rows.item(i).se_ruj_responsabilidade_social
                );
                setValorSe_ruj_formacao_atuacao(
                  results.rows.item(i).se_ruj_formacao_atuacao
                );
                setValorSe_ruj_investimento_financeiro(
                  results.rows.item(i).se_ruj_investimento_financeiro
                );

                var x = results.rows.item(i).se_ruj_bens_moveis;
                valor_checked(x.split(","));

                var bens_imoveis = results.rows.item(i).se_ruj_bens_imoveis;
                valor_checked_bens_imoveis(bens_imoveis.split(","));
              }
            }
          );
        });
      }
    });
  }, []);

  async function loadStep6() {
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
          setSe_ruj_bens_moveis(temp);
        });
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
            //console.log( results.rows.item(i).nome);
          }
          setSe_ruj_bens_imoveis(temp);
        });
        // tx.executeSql(
        //   "select * from se_ruj_responsabilidade_social", [], (tx, results) => {
        //     //var len = results.rows.length, i;
        //     var temp = [];
        //     //console.log(len);
        //     for (let i = 0; i < results.rows.length; ++i) {
        //       temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
        //       //console.log( results.rows.item(i).nome);
        //     }
        //     setItemSe_ruj_responsabilidade_social(temp);
        //   }
        // );
        tx.executeSql(
          "select * from aux_formacao_atuacao",
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
            setItemSe_ruj_formacao_atuacao(temp);
          }
        );
        tx.executeSql(
          "select * from aux_investimento_financeiro",
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
            setItemSe_ruj_investimento_financeiro(temp);
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

  //   //função que aciona quando o estado do componente muda e seta os valores correspondente
  function onPressTitle(tabela, campo, valor, codigo) {
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
        console.error("error em alguma coisa", err);
        return true;
      },
      (tx, success) => {
        console.log("tudo certo por aqui", success);
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
    const newState = se_ruj_bens_moveis.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setSe_ruj_bens_moveis(newState); // atualiza o estado
  };

  const handleChange_bens_imoveis = (id) => {
    const newState = se_ruj_bens_imoveis.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setSe_ruj_bens_imoveis(newState); // atualiza o estado
  };

  function muda() {
    //await api
    var str_valores = [];

    se_ruj_bens_moveis
      .filter((value) => value.isChecked === true)
      .map((item) => {
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function muda_bens_imoveis() {
    //await api
    var str_valores = [];

    se_ruj_bens_imoveis
      .filter((value) => value.isChecked === true)
      .map((item) => {
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function valor_checked(ruj_bens_moveis) {
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
        ruj_bens_moveis.forEach((item) => {
          //console.log(ruj_sanitario);
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_ruj_bens_moveis(x);
      });
    });
  }

  function valor_checked_bens_imoveis(ruj_bens_imoveis) {
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
        ruj_bens_imoveis.forEach((item) => {
          //console.log(ruj_sanitario);
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_ruj_bens_imoveis(x);
      });
    });
  }

  return (
    <>
      <View style={styles.form9}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>Patrimonio</Text>
        </View>
        <View style={styles.titleStyle}>
          <Text>Bens Móveis</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_ruj_bens_moveis].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange(item.id);
                  onPressTitle("se_ruj", "se_ruj_bens_moveis", muda(), sync);
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.titleStyle}>
          <Text>Bens Imóveis</Text>
        </View>

        <View style={styles.checkboxlabel}>
          {[...se_ruj_bens_imoveis].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange_bens_imoveis(item.id);
                  onPressTitle(
                    "se_ruj",
                    "se_ruj_bens_imoveis",
                    muda_bens_imoveis(),
                    sync
                  );
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.form10}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>
            RESPONSABILIDADE SOCIAL NA ORGANIZAÇÃO
          </Text>
        </View>
        <Text style={styles.titleStyle}>
          Possui programa de responsabilidade social
        </Text>

        <DropDownPicker
          style={styles.selectResponsabilidade}
          dropDownDirection="TOP"
          open={openSe_ruj_responsabilidade_social}
          value={parseInt(valorSe_ruj_responsabilidade_social)}
          items={itemSe_ruj_responsabilidade_social}
          setOpen={setOpenSe_ruj_responsabilidade_social}
          setValue={setValorSe_ruj_responsabilidade_social}
          setItems={setItemSe_ruj_responsabilidade_social}
          onChangeValue={() =>
            onPressTitle(
              "se_ruj",
              "se_ruj_responsabilidade_social",
              valorSe_ruj_responsabilidade_social,
              sync
            )
          }
          listMode="SCROLLVIEW"
          placeholder="Selecione"
        />

        <View style={styles.titleStyle}>
          <Text>Formação de Atuação</Text>
        </View>

        <DropDownPicker
          style={styles.select}
          open={openSe_ruj_formacao_atuacao}
          value={parseInt(valorSe_ruj_formacao_atuacao)}
          items={itemSe_ruj_formacao_atuacao}
          setOpen={setOpenSe_ruj_formacao_atuacao}
          setValue={setValorSe_ruj_formacao_atuacao}
          setItems={setItemSe_ruj_formacao_atuacao}
          onChangeValue={() =>
            onPressTitle(
              "se_ruj",
              "se_ruj_formacao_atuacao",
              valorSe_ruj_formacao_atuacao,
              sync
            )
          }
          listMode="SCROLLVIEW"
          placeholder="Selecione"
        />

        <View style={styles.titleStyle}>
          <Text>Investimento Financeiro destinado</Text>
        </View>

        <DropDownPicker
          style={styles.select}
          open={openSe_ruj_investimento_financeiro}
          value={parseInt(valorSe_ruj_investimento_financeiro)}
          items={itemSe_ruj_investimento_financeiro}
          setOpen={setOpenSe_ruj_investimento_financeiro}
          setValue={setValorSe_ruj_investimento_financeiro}
          setItems={setItemSe_ruj_investimento_financeiro}
          onChangeValue={() =>
            onPressTitle(
              "se_ruj",
              "se_ruj_investimento_financeiro",
              valorSe_ruj_investimento_financeiro,
              sync
            )
          }
          listMode="SCROLLVIEW"
          placeholder="Selecione"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  select: {
    height: 40,
    width: "85%",
    marginLeft: 30,
    height: 40,
    borderRadius: 0,
    borderWidth: 1,
  },
  selectResponsabilidade: {
    height: 40,
    width: "85%",
    marginLeft: 30,
    height: 40,
    borderRadius: 0,
    borderWidth: 1,
    //zIndex:9999
  },

  checkboxlabel: {
    marginTop: 5,
    marginLeft: 30,
  },
  checkboxGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  form9: {
    width: 340,
    height: 920,
    marginLeft: 25,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  form10: {
    width: 340,
    height: 310,
    marginLeft: 25,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  titleStyle: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 15,
  },

  rect2: {
    width: 340,
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

export default Step6;
