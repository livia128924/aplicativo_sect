import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, AsyncStorage } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { DatabaseConnection } from "../../database/database";
import { TextInputMask } from "react-native-masked-text";
import Checkbox from "expo-checkbox";

const db = DatabaseConnection.getConnection();

const Step1 = () => {
  const [sync, setSync] = useState("");
  const [dados_valor, setDados_valor] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [rq_nome, setRq_nome] = useState("");
  const [rq_cpf, setRq_cpf] = useState("");

  const [rq_logradouro, set_rq_logradouro] = useState("");

  const [rq_bairro, set_rq_bairro] = useState("");
  const [rq_numero, set_rq_numero] = useState("");
  const [rq_complemento, set_rq_complemento] = useState("");
  const [rq_telefone, set_rq_telefone] = useState("");
  const [rq_telefone_celular, set_rq_telefone_celular] = useState("");
  const [rq_email, set_rq_email] = useState("");

  const [rq_filiacao, setRq_filiacao] = useState([
    {  label:"Mae", id:"1", isChecked: false, },
    {  label:"Pai", id:"2", isChecked: false, },
  ]);

  const [se_duf_data_nascimento, setSe_duf_data_nascimento] = useState("");
  const [unmasked, setUnmasked] = useState("");

  const [aberto, setAberto] = useState(false);
  const [valor, setValor] = useState("");
  const [item, setItem_cidades] = useState([]);

  const [abertoAcesso, setAbertoAcesso] = useState(false);
  const [valorAcesso, setValorAcesso] = useState(null);
  const [itemAcesso, setItem_aux_acesso] = useState([]);

  const [aberto_se_duf_sexo, setAberto_se_duf] = useState(false);
  const [valor_se_duf_sexo, setValor_se_duf] = useState(null);
  const [item_se_duf_sexo, setItem_se_duf_sexo] = useState([
    { label: "Femenino", value: "f" },
    { label: "Masculino", value: "m" },
  ]);

  const [aberto_rq_estado_civil, setAberto_rq_estado_civil] = useState(false);
  const [valor_rq_estado_civil, setValor_rq_estado_civil] = useState(null);
  const [item_rq_estado_civil, setItem_rq_estado_civil] = useState([
    { label: "Solteiro(a)", value: "1" },
    { label: "Casado(a)", value: "2" },
    { label: "Divorciado(a)", value: "4" },
    { label: "Viúvo(a)", value: "5" },
    { label: "União estável", value: "6" },
  ]);

  const [aberto_rq_regime_bens, setAberto_rq_regime_bens] = useState(false);
  const [valor_rq_regime_bens, setValor_rq_regime_bens] = useState(null);
  const [item_rq_regime_bens, setItem_rq_regime_bens] = useState([
    { label: "REGIME: SEPARAÇÃO TOTAL DE BENS", value: "1" },
    { label: "REGIME: COMUNHÃO PARCIAL DE BENS", value: "2" },
    { label: "SEM REGIME DE BENS", value: "4" },
    { label: "REGIME: COMUNHÃO UNIVERSAL DE BENS", value: "5" },
    { label: "REGIME: SEPARAÇÃO OBRIGATÓRIA DE BENS", value: "7" },
  ]);

  useEffect(() => {
    var cod_processo = "";
    //carrega o valor do select na tela index.js
    AsyncStorage.getItem("pr_codigo").then((value) => {
      setSync(value);
      cod_processo = value;
      console.log("cod altoIncremento", cod_processo);
    });
    // AsyncStorage.getItem('codigo').then(codigo => {
    //   setDados_valor(codigo);
    // })
    loadDados();

    AsyncStorage.getItem('nome_tabela').then(tabela => {
      if (tabela) {

        db.transaction((tx) => {

          tx.executeSql(
            "select * from " + tabela + " where se_duf_cod_processo = '" + cod_processo + "'", [], (tx, results) => {
              var x = "";
              var row = [];
              for (let i = 0; i < results.rows.length; ++i) {
                console.log(results.rows);
                setSe_duf_nome(results.rows.item(0).se_duf_nome);

                setValor(results.rows.item(i).se_duf_municipio);

                setValorAcesso(results.rows.item(i).se_duf_acesso);



   var x = results.rows.item(i).se_ruf_tipo_atividades;
    valor_checked(x.split(","));
              }

            },
            function(tx, error) {
              alert('SELECT error: ' + error.message);
          }
          );
        })

      }//
    });
  }, []);

  async function loadDados() {
    //////////////primeira coisa que faz quando entra na tela:  faz um select das tabelas aux para carregar nos components //////////////
    db.transaction(
      (tx) => {
        tx.executeSql("select * from aux_acesso ", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).descricao,
              value: results.rows.item(i).codigo,
            });
          }
          setItem_aux_acesso(temp);
        });
        tx.executeSql("select * from cidades ", [], (tx, results) => {
          //var len = results.rows.length, i;
          var temp = [];
          //console.log(len);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({
              label: results.rows.item(i).nome,
              value: results.rows.item(i).codigo,
            });
            //console.log( results.rows.item(i).nome);
          }
          setItem_cidades(temp);
        });
      },
      (err) => {
        console.error("There was a problem with the tx", err);
        return true;
      },
      (success) => {}
    );
  }

  //função que aciona quando o estado do componente muda e seta os valores correspondente
  function onPressTitle(tabela, campo, valor, codigo) {
      // db.transaction((tx) => {
      //   const query = `UPDATE ${tabela} SET ${campo} = '${valor}' WHERE se_duf_cod_processo = '${codigo}'`;
      //   //console.log(query);
      //   tx.executeSql(query, [], (tx, results) => {
      //     for (let i = 0; i < results.rows.length; ++i) {
      //       alert("INSERIDO COM SUCESSO");
      //     }
      //   });
      // }, (tx, err) => {
      //   console.error("error em alguma coisa", err);
      //   return true;
      // }, (tx, success) => {
      //   console.log("tudo certo por aqui", success);
      //   //get_values(tabela, campo, sync);  ///esse aqui foi a tentativa
      // });

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
      tx.executeSql(log_update, []);
    })
    AsyncStorage.setItem('nome_tabela', tabela);
    AsyncStorage.setItem('codigo', valor.toString());
  }



  const handleChange = (id) => {
    const newState = rq_filiacao.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setRq_filiacao(newState); // atualiza o estado
  };

  function muda() {
    //await api
    var str_valores = [];

    rq_filiacao.filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function valor_checked(rq_filiacao) {
    db.transaction((tx) => {
        //console.log(temp);
        let x = temp;
        //console.log(x);
        rq_filiacao.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_ruf_tipo_atividades(x);
    });
  }

  return (
    <>
      <View style={styles.form_}>
        <View style={styles.rect2}>
          <Text style={{ color: "white", marginLeft: 15, marginTop: 5 }}>
            ÁREA DE ABRANGÊNCIA
          </Text>
        </View>

        <View style={styles.title_style}>
          <Text>MUNICIPIOS </Text>
        </View>

        <DropDownPicker
          style={styles.dropdown_style}
          open={aberto}
          value={parseInt(valor)}
          items={item}
          setOpen={setAberto}
          setValue={setValor}
          setItems={setItem_cidades} //cidades
          zIndex={9999}
          listMode="SCROLLVIEW"
          onChangeValue={() =>
            onPressTitle("se_duf", "se_duf_municipio", valor, sync)
          }
          placeholder={"Municipios"} //aqui eu tentei colocar o retorno da funcao do select
        />

        <View style={styles.title_style}>
          <Text>ACESSO</Text>
        </View>
        <DropDownPicker
          style={styles.dropdown_style}
          open={abertoAcesso}
          value={parseInt(valorAcesso)}
          items={itemAcesso}
          setOpen={setAbertoAcesso}
          setValue={setValorAcesso}
          setItems={setItem_aux_acesso} //aux_acesso
          onChangeValue={() =>
            onPressTitle("se_duf", "se_duf_acesso", valorAcesso, sync)
          }
          listMode="SCROLLVIEW"
          placeholder="acesso"
        />

        <View>
          <Text style={styles.title_style}>LOCALIZAÇÃO</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={setLocalizacao}
            value={localizacao}
            onBlur={() =>
              onPressTitle("se_duf", "se_duf_localizacao", localizacao, sync)
            }
            placeholder={"    Localização"}
          />
        </View>
      </View>
{/* //////////////////////////////////////////////////// */}
      <View style={styles.form_titular}>
        <View style={styles.rect2}>
          <Text style={{ color: "white", marginLeft: 15, marginTop: 5 }}>
            DADOS DO TITULAR
          </Text>
        </View>

        <View style={styles.title_style}>
          <Text>Nome </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={setRq_nome}
            value={rq_nome}
            onBlur={() =>
              onPressTitle("rq_nome", "rq_nome", rq_nome, sync)
            }
            placeholder={"    Localização"}
          />
        </View>


        <View style={styles.title_style}>
          <Text>CPF </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInputMask
            style={styles.input_style}
            type={"cpf"}
            options={{
              format: "999.999.999-99",
            }}
            value={rq_cpf}
            onChangeText={setRq_cpf}
            ref={(ref) => setUnmasked(ref)}
            placeholder={"   999.999.999-99"}
            onBlur={() => {
              // console.log(se_ruf_valor_beneficio);
              // mask();
              onPressTitle(
                "rq",
                "rq_cpf",
                unmasked.getRawValue(), //retira o R$
                sync
              );
            }}
          />
        </View>

        <View style={styles.title_style}>
          <Text>Sexo </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <DropDownPicker
            style={styles.dropdown_style}
            open={aberto_se_duf_sexo}
            value={valor_se_duf_sexo}
            items={item_se_duf_sexo}
            setOpen={setAberto_se_duf}
            setValue={setValor_se_duf}
            setItems={setItem_se_duf_sexo} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle("rq", "rq_sexo", valor_se_duf_sexo, sync)
            }
            placeholder={"Sexo"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>

        <View style={styles.title_style}>
          <Text>Data de Nascimento </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInputMask
            style={styles.input_style}
            type={"datetime"}
            options={{
              format: "DD-MM-YYYY",
            }}
            value={se_duf_data_nascimento}
            onChangeText={setSe_duf_data_nascimento}
            ref={(ref) => setUnmasked(ref)}
            placeholder={"   00-00-0000"}
            onBlur={() => {
              // console.log(se_ruf_valor_beneficio);
              // mask();
              onPressTitle(
                "rq",
                "rq_data_nascimento",
                unmasked.getRawValue(), //retira o R$
                sync
              );
            }}
          />
        </View>

        <View style={styles.title_style}>
            <Text>Filiacao </Text>
          </View>
          <View style={styles.checkboxlabel}>
          {[...rq_filiacao].map((item, index) => (
            <View style={styles.checkboxGroup} key={item.id}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange(item.id);
                  onPressTitle("rq", "rq_filiacao", muda(), sync);
                }}
              />
              <Text>{item.label}</Text>
            </View>
          ))}

          </View>


          <View style={styles.title_style}>
            <Text>Estado Civil </Text>
          </View>
          <View style={{ alignItems: "center" }}>
          <DropDownPicker
          zIndex={aberto_rq_estado_civil ? 9999 : 0}
            style={styles.dropdown_style}
            open={aberto_rq_estado_civil}
            value={valor_rq_estado_civil}
            items={item_rq_estado_civil}
            setOpen={setAberto_rq_estado_civil}
            setValue={setValor_rq_estado_civil}
            setItems={setItem_rq_estado_civil} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle("rq", "rq_estado_civil", valor_rq_estado_civil, sync)
            }
            placeholder={"Estado Civil"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>

          <View style={styles.title_style}>
            <Text>Regime de União </Text>
          </View>
          <View style={{ alignItems: "center" }}>
          <DropDownPicker
           zIndex={aberto_rq_regime_bens ? 9999 : 0}
            style={styles.dropdown_style}
            open={aberto_rq_regime_bens}
            value={valor_rq_regime_bens}
            items={item_rq_regime_bens}
            setOpen={setAberto_rq_regime_bens}
            setValue={setValor_rq_regime_bens}
            setItems={setItem_rq_regime_bens} //cidades
            zIndex={9999}
            listMode="SCROLLVIEW"
            onChangeValue={() =>
              onPressTitle("rq", "rq_regime_bens", valor_rq_regime_bens, sync)
            }
            placeholder={"Estado Civil"} //aqui eu tentei colocar o retorno da funcao do select
          />
        </View>

      </View>
{/* ////////////////////////////////// */}
<View style={styles.form_titular}>
        <View style={styles.rect2}>
          <Text style={{ color: "white", marginLeft: 15, marginTop: 5 }}>
            ENDEREÇO RESIDENCIAL DO TITULAR
          </Text>
        </View>

        <View style={styles.title_style}>
          <Text>Logradouro </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_rq_logradouro}
            value={rq_logradouro}
            onBlur={() =>
              onPressTitle("rq", "rq_logradouro", rq_logradouro, sync)
            }
            placeholder={"    Logradouro"}
          />
        </View>


        <View style={styles.title_style}>
          <Text>Bairro </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_rq_bairro}
            value={rq_bairro}
            onBlur={() =>
              onPressTitle("rq", "rq_bairro", rq_bairro, sync)
            }
            placeholder={"    Bairro"}
          />
        </View>

        <View style={styles.title_style}>
          <Text>Nº</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_rq_numero}
            value={rq_numero}
            onBlur={() =>
              onPressTitle("rq", "rq_numero", rq_numero, sync)
            }
            placeholder={"    "}
          />
        </View>

        <View style={styles.title_style}>
          <Text>Complemento </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_rq_complemento}
            value={rq_complemento}
            onBlur={() =>
              onPressTitle("rq", "rq_complemento", rq_complemento, sync)
            }
            placeholder={"    "}
          />
        </View>

        <View style={styles.title_style}>
            <Text>Telefone Residencial </Text>
          </View>
          <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_rq_telefone}
            value={rq_telefone}
            onBlur={() =>
              onPressTitle("rq", "rq_telefone", rq_telefone, sync)
            }
            placeholder={"  (92) 9999-9999"}
          />
        </View>


          <View style={styles.title_style}>
            <Text>Telefone Celular  </Text>
          </View>
          <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_rq_telefone_celular}
            value={rq_telefone_celular}
            onBlur={() =>
              onPressTitle("rq", "rq_telefone_celular", rq_telefone_celular, sync)
            }
            placeholder={"  (92) 9999-9999"}
          />
        </View>

          <View style={styles.title_style}>
            <Text>Email </Text>
          </View>
          <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input_style}
            onChangeText={set_rq_email}
            value={rq_email}
            onBlur={() =>
              onPressTitle("rq", "rq_email", rq_email, sync)
            }
            placeholder={"  (92) 9999-9999"}
          />
        </View>

      </View>

    </>
  );
};

const styles = StyleSheet.create({
  checkbox:{

    //alignContent:'space-around',
  },
  checkboxGroup: {
   // backgroundColor:'red',
    //height:20,
    alignItems: 'center',
  },
  checkboxlabel: {
    width: '100%',
   //textAlign:'center',
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    display:'flex',
    justifyContent:'space-evenly',

  },
  form_: {
    width: "95%",
    height: 'auto',
    paddingBottom:10,
    //marginLeft: 20,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  form_titular: {
    width: "95%",
    //left: 11,
    height: 590,
    marginTop: 15,
 //   marginRight: 25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  input_style: {
    height: 40,
    width: "85%",
    //marginRight:25,
    marginTop: 2,
    borderWidth: 1,

    backgroundColor: "white",
  },
  form: {
    width: 340,
    height: 370,
    //marginLeft: 25,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  rect2: {
    width: "100%",
    height: 36,
    backgroundColor: "rgba(74,144,226,1)",
    borderRadius: 3,
    //color:  'white',
  },
  title_style: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 15,
  },
  dropdown_style: {
    height: 40,
    width: "85%",
    marginLeft: 30,
    height: 40,
    marginTop: 5,
    borderRadius: 0,
    borderWidth: 1,
  },
});

export default Step1;
