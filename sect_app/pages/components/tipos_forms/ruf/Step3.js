import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, AsyncStorage } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Checkbox from 'expo-checkbox';
import { DatabaseConnection } from '../../../database/database';
const db = DatabaseConnection.getConnection();

const Step3 = (props) => {

  const [sync, setSync] = useState('');
  const [dados_valor, setDados_valor] = useState('');

  const [se_ruf_situacao_imovel_outros, setSe_ruf_situacao_imovel_outros] = useState('');
  const [se_ruf_tipo_documento_outros, setSe_ruf_tipo_documento_outros] = useState('');
  const [se_ruf_onde_reside_outros, setSe_ruf_onde_reside_outros] = useState('');
  const [se_ruf_tipo_construcao_outros, setSe_ruf_tipo_construcao_outros] = useState('');
  const [se_ruf_situacao_imovel, setSe_ruf_situacao_imovel] = useState([]);
  const [se_ruf_tipo_documento, setSe_ruf_tipo_documento] = useState([]);
  const [se_ruf_material_cobertura, setse_ruf_material_cobertura] = useState([]);

  const [openSe_ruf_tipo_ocupacao, setOpenSe_ruf_tipo_ocupacao] = useState(false);
  const [valorSe_ruf_tipo_ocupacao, setValorSe_ruf_tipo_ocupacao] = useState(null);
  const [itemSe_ruf_tipo_ocupacao, setItemSe_ruf_tipo_ocupacao] = useState([]);

  const [openSe_ruf_tempo_ocupacao, setOpenSe_ruf_tempo_ocupacao] = useState(false);
  const [valorSe_ruf_tempo_ocupacao, setValorSe_ruf_tempo_ocupacao] = useState(null);
  const [itemSe_ruf_tempo_ocupacao, setItemSe_ruf_tempo_ocupacao] = useState([]);

  const [openSe_ruf_onde_reside, setOpenSe_ruf_onde_reside] = useState(false);
  const [valorSe_ruf_onde_reside, setValorSe_ruf_onde_reside] = useState(null);
  const [itemSe_ruf_onde_reside, setItemSe_ruf_onde_reside] = useState([]);

  const [openSe_ruf_tipo_construcao, setOpenSe_ruf_tipo_construcao] = useState(false);
  const [valorSe_ruf_tipo_construcao, setValorSe_ruf_tipo_construcao] = useState(null);
  const [itemSe_ruf_tipo_construcao, setItemSe_ruf_tipo_construcao] = useState([]);

  const [openSe_ruf_numero_comodos, setOpenSe_ruf_numero_comodos] = useState(false);
  const [valorSe_ruf_numero_comodos, setValorSe_ruf_numero_comodos] = useState(null);
  const [itemSe_ruf_numero_comodos, setItemSe_ruf_numero_comodos] = useState([]);

  const [openSe_ruf_numero_pisos, setOpenSe_ruf_numero_pisos] = useState(false);
  const [valorSe_ruf_numero_pisos, setValorSe_ruf_numero_pisos] = useState(null);
  const [itemSe_ruf_numero_pisos, setItemSe_ruf_numero_pisos] = useState([]);

  const [openSe_ruf_estado_conservacao, setOpenSe_ruf_estado_conservacao] = useState(false);
  const [valorSe_ruf_estado_conservacao, setValorSe_ruf_estado_conservacao] = useState(null);
  const [itemSe_ruf_estado_conservacao, setItemSe_ruf_estado_conservacao] = useState([]);

  useEffect(() => {
        var cod_processo = '';
        //carrega o valor do select na tela index.js
        AsyncStorage.getItem('pr_codigo').then(value => {
            //console.log(value);
            setSync(value);
            cod_processo = value;

        });

        AsyncStorage.getItem('codigo').then(codigo => {
            setDados_valor(codigo);
        })

        loadStep3();

        AsyncStorage.getItem('nome_tabela').then(tabela => {
          //console.log(cod_processo);
          if (tabela) {

              db.transaction((tx) => {

                  tx.executeSql(
                      "select * from " + tabela + " where se_ruf_cod_processo = '" + cod_processo + "'", [], (tx, results) => {

                          var row = [];
                          for (let i = 0; i < results.rows.length; ++i) {
                              console.log(results.rows.item(0).se_ruf_acesso);

                              //setValorMao_de_obra(results.rows.item(i).se_ruf_mao_de_obra);

                              setSe_ruf_situacao_imovel_outros(results.rows.item(i).se_ruf_situacao_imovel_outros);

                              setSe_ruf_tipo_documento_outros(results.rows.item(0).se_ruf_tipo_documento_outros);

                              setValorSe_ruf_tipo_ocupacao(results.rows.item(i).se_ruf_tipo_ocupacao);

                              setValorSe_ruf_tempo_ocupacao(results.rows.item(i).se_ruf_tempo_ocupacao);

                              setValorSe_ruf_onde_reside(results.rows.item(i).se_ruf_onde_reside);

                              setSe_ruf_onde_reside_outros(results.rows.item(0).se_ruf_onde_reside_outros);

                              var x = results.rows.item(i).se_ruf_situacao_imovel;
                              valor_checked(x.split(","));

                              var y = results.rows.item(i).se_ruf_tipo_documento;
                              valor_checked_tipo_documento(y.split(","));

                              var w = results.rows.item(i).se_ruf_material_cobertura;
                              valor_checked_material_cobertura(w.split(","));

                              //console.log(typeof (results.rows.item(i).se_ruf_title_style));
                              //valor(row);
                          }

                      });
              })
          }
      });


}, []);

//////////////primeira coisa que faz quando entra na tela:  faz um select das tabelas aux para carregar nos components //////////////
async function loadStep3(){
  db.transaction((tx) => {
    tx.executeSql(
        "select * from aux_situacao_imovel", [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push({ label: results.rows.item(i).descricao, id: results.rows.item(i).codigo, isChecked:false });  }
            setSe_ruf_situacao_imovel(temp);  }
    );
    tx.executeSql(
        "select * from aux_tipo_documento", [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push({ label: results.rows.item(i).descricao, id: results.rows.item(i).codigo, isChecked:false });  }
            setSe_ruf_tipo_documento(temp);
        }
    );
    tx.executeSql(
        "select * from aux_tipo_ocupacao", [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });  }
            setItemSe_ruf_tipo_ocupacao(temp); }
    );
    tx.executeSql(
        "select * from aux_tempo_ocupacao", [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });  }
            setItemSe_ruf_tempo_ocupacao(temp); }
    );
    tx.executeSql(
        "select * from aux_onde_reside", [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });  }
            setItemSe_ruf_onde_reside(temp); }
    );
    tx.executeSql(
        "select * from aux_tipo_construcao", [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo }); }
            setItemSe_ruf_tipo_construcao(temp); }
    );
    tx.executeSql(
        "select * from aux_comodos", [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo }); }
            setItemSe_ruf_numero_comodos(temp); }
    );
    tx.executeSql(
        "select * from aux_pisos", [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo }); }
                setItemSe_ruf_numero_pisos(temp); }
    );
    tx.executeSql(
        "select * from aux_cobertura", [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push({ label: results.rows.item(i).descricao, id: results.rows.item(i).codigo, isChecked:false }); }
                setse_ruf_material_cobertura(temp); }
    );
    tx.executeSql(
        "select * from aux_estado_conservacao", [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo}); }
                setItemSe_ruf_estado_conservacao(temp); }
    );

}, (tx, err) => {
    console.error("There was a problem with the tx", err);
    return true;
}, (tx, success) => {
    console.log("all done", success);
});
};

  //   //função que aciona quando o estado do componente muda e seta os valores correspondente
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
          console.error("error", err);
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
    const newState = se_ruf_situacao_imovel.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setSe_ruf_situacao_imovel(newState); // atualiza o estado
  };

  const handleChange_tipo_documento = (id) => {
    const newState = se_ruf_tipo_documento.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setSe_ruf_tipo_documento(newState); // atualiza o estado
  };

  const handleChange_material_cobertura = (id) => {
    const newState = se_ruf_material_cobertura.map((el) => {
      const label = el;

      if (el.id === id) {
        // verificamos se o nome do label foi passado na função
        label.isChecked = !el.isChecked; // se sim, vamos alterar o estado do "checked"
      }

      return label;
    });

    setse_ruf_material_cobertura(newState); // atualiza o estado
  };

  function muda() {
    //await api
    var str_valores = [];

    se_ruf_situacao_imovel
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function muda_tipo_documento() {
    //await api
    var str_valores = [];

    se_ruf_tipo_documento
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function muda_material_cobertura() {
    //await api
    var str_valores = [];

    se_ruf_material_cobertura
      .filter((value) => value.isChecked === true)
      .map((item) => {
        // console.log(item);
        str_valores.push(item.id);
      });
    //console.log(ischecado);
    return str_valores.join(",");
  }

  function valor_checked(situacao_imovel) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_situacao_imovel", [], (tx, results) => {
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
        situacao_imovel.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_ruf_situacao_imovel(x);
      });
    });
  }

  function valor_checked_tipo_documento(tipo_documento) {
    db.transaction((tx) => {
      tx.executeSql("select * from aux_tipo_documento", [], (tx, results) => {
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
        tipo_documento.forEach((item) => {
          //console.log(x);
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setSe_ruf_tipo_documento(x);
      });
    });
  }

  function valor_checked_material_cobertura(material_cobertura) {
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
        material_cobertura.forEach((item) => {
          x.forEach((val) => {
            if (val.id == item) {
              val.isChecked = true;
            }
          });
        });

        return setse_ruf_material_cobertura(x);
      });
    });
  }


    return (
        <>
    <View style={styles.form5}>
            <View>
              <View style={styles.rect2}>
                <Text style={styles.titulo} >DADOS DO OCUPANTE EM RELAÇÃO AO IMÓVEL</Text>
              </View>
              <View style={styles.title_style}>
                <Text >Situação do Imóvel</Text>
              </View>

              <View style={styles.checkboxlabel}>
                    {[...se_ruf_situacao_imovel].map((item, index) => (
                        <View style={styles.checkboxGroup}
                            key={item.id}
                        >
                            <Checkbox
                                style={styles.checkbox}
                                value={item.isChecked}
                                onValueChange={() => {
                                    handleChange(item.id); onPressTitle("se_ruf", "se_ruf_situacao_imovel", muda(), sync)
                                }}
                            />
                            <Text >{item.label}</Text>
                        </View>
                    ))}
                </View>


              <TextInput
              style={styles.input_style}
              onChangeText={setSe_ruf_situacao_imovel_outros}
              value={se_ruf_situacao_imovel_outros}
              onBlur={() => onPressTitle("se_ruf", "se_ruf_situacao_imovel_outros", se_ruf_situacao_imovel_outros, sync)}
              placeholder={"    Outros"}
              />

              <View style={styles.title_style}>
                <Text >Tipo de Documento</Text>
              </View>

              <View style={styles.checkboxlabel}>
                    {[...se_ruf_tipo_documento].map((item, index) => (
                      <View style={styles.checkboxGroup}
                            key={item.id}
                            >
                            <Checkbox
                                style={styles.checkbox}
                                value={item.isChecked}
                                onValueChange={() => {
                                  handleChange_tipo_documento(item.id); onPressTitle("se_ruf", "se_ruf_tipo_documento", muda_tipo_documento(), sync)
                                }}
                            />
                            <Text >{item.label}</Text>
                        </View>
                    ))}
                </View>

                    <TextInput
                    style={styles.input_style}
                    onChangeText={setSe_ruf_tipo_documento_outros}
                    value={se_ruf_tipo_documento_outros}
                    onBlur={() => onPressTitle("se_ruf", "se_ruf_tipo_documento_outros", se_ruf_tipo_documento_outros, sync)}
                    placeholder={"    Outros"}
                    />

                <View style={styles.title_style}>
                <Text >Ocupações</Text>
              </View>

              <DropDownPicker
              style={styles.dropdown_style}
              open={openSe_ruf_tipo_ocupacao}
              value={parseInt(valorSe_ruf_tipo_ocupacao)}
              items={itemSe_ruf_tipo_ocupacao}
              setOpen={setOpenSe_ruf_tipo_ocupacao}
              setValue={setValorSe_ruf_tipo_ocupacao}
              setItems={setItemSe_ruf_tipo_ocupacao}
              onChangeValue={() => onPressTitle("se_ruf", "se_ruf_tipo_ocupacao", valorSe_ruf_tipo_ocupacao, sync)}
              dropDownDirection="TOP"
              listMode="SCROLLVIEW"
              placeholder="Selecione::"
            />

              <View style={styles.title_style}>
                <Text >Tempo de Ocupação</Text>
              </View>

              <DropDownPicker
              style={styles.dropdown_style}
              open={openSe_ruf_tempo_ocupacao}
              value={parseInt(valorSe_ruf_tempo_ocupacao)}
              items={itemSe_ruf_tempo_ocupacao}
              setOpen={setOpenSe_ruf_tempo_ocupacao}
              setValue={setValorSe_ruf_tempo_ocupacao}
              setItems={setItemSe_ruf_tempo_ocupacao}
              onChangeValue={() => onPressTitle("se_ruf", "se_ruf_tempo_ocupacao", valorSe_ruf_tempo_ocupacao, sync)}
              dropDownDirection="TOP"
              listMode="SCROLLVIEW"
              placeholder="Selecione::"
            />

              <View style={styles.title_style}>
                <Text >Onde Reside</Text>
              </View>

              <DropDownPicker
              style={styles.dropdown_style}
              open={openSe_ruf_onde_reside}
              value={parseInt(valorSe_ruf_onde_reside)}
              items={itemSe_ruf_onde_reside}
              setOpen={setOpenSe_ruf_onde_reside}
              setValue={setValorSe_ruf_onde_reside}
              setItems={setItemSe_ruf_onde_reside}
              onChangeValue={() => onPressTitle("se_ruf", "se_ruf_onde_reside", valorSe_ruf_onde_reside, sync)}
              //dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
              placeholder="Selecione::"
            />

              <TextInput
              style={styles.input_style}
              onChangeText={setSe_ruf_onde_reside_outros}
              value={se_ruf_onde_reside_outros}
              onBlur={() => onPressTitle("se_ruf", "se_ruf_onde_reside_outros", se_ruf_onde_reside_outros, sync)}
              placeholder={"    Outros"}
              />

            </View>

          </View>

          <View style={styles.form6}>
            <View style={styles.rect2}>
              <Text style={styles.titulo} >INFRAESTRUTURA DO IMÓVEL</Text>
            </View>
            <View style={styles.title_style}>
              <Text >Tipos de Benefícios Concedidos</Text>
            </View>
            <DropDownPicker
              style={styles.dropdown_style}
              zIndex={openSe_ruf_tipo_construcao ? 9999 : 0}
              open={openSe_ruf_tipo_construcao}
              value={parseInt(valorSe_ruf_tipo_construcao)}
              items={itemSe_ruf_tipo_construcao}
              setOpen={setOpenSe_ruf_tipo_construcao}
              setValue={setValorSe_ruf_tipo_construcao}
              setItems={setItemSe_ruf_tipo_construcao}
              onChangeValue={() => onPressTitle("se_ruf", "se_ruf_tipo_construcao", valorSe_ruf_tipo_construcao, sync)}
              dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
              placeholder="Selecione::"
            />
            <TextInput
              style={styles.input_style}
              onChangeText={setSe_ruf_tipo_construcao_outros}
              value={se_ruf_tipo_construcao_outros}
              onBlur={() => onPressTitle("se_ruf", "se_ruf_tipo_construcao_outros",  se_ruf_tipo_construcao_outros, sync)}
              placeholder={"    Outros"}
            />

            <View style={styles.title_style}>
              <Text >Nº de Cômodos</Text>
            </View>

            <DropDownPicker
              style={styles.dropdown_style}
              open={openSe_ruf_numero_comodos}
              value={parseInt(valorSe_ruf_numero_comodos)}
              items={itemSe_ruf_numero_comodos}
              setOpen={setOpenSe_ruf_numero_comodos}
              setValue={setValorSe_ruf_numero_comodos}
              setItems={setItemSe_ruf_numero_comodos}
              onChangeValue={() => onPressTitle("se_ruf", "se_ruf_numero_comodos", valorSe_ruf_numero_comodos, sync)}
              dropDownDirection="TOP"
              listMode="SCROLLVIEW"
              placeholder="Selecione::"
            />

            <View style={styles.title_style}>
              <Text >Nº de Piso</Text>
            </View>

            <DropDownPicker
              style={styles.dropdown_style}
              open={openSe_ruf_numero_pisos}
              value={parseInt(valorSe_ruf_numero_pisos)}
              items={itemSe_ruf_numero_pisos}
              setOpen={setOpenSe_ruf_numero_pisos}
              setValue={setValorSe_ruf_numero_pisos}
              setItems={setItemSe_ruf_numero_pisos}
              onChangeValue={() => onPressTitle("se_ruf", "se_ruf_numero_pisos", valorSe_ruf_numero_pisos, sync)}
              //dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
              placeholder="Selecione::"
            />

            <View style={styles.title_style}>
              <Text >Material da Cobertura</Text>
            </View>

            <View style={styles.checkboxlabel}>
                    {[...se_ruf_material_cobertura].map((item, index) => (
                      <View style={styles.checkboxGroup}
                            key={item.id}
                            >
                            <Checkbox
                                style={styles.checkbox}
                                value={item.isChecked}
                                onValueChange={() => {
                                  handleChange_material_cobertura(item.id); onPressTitle("se_ruf", "se_ruf_material_cobertura", muda_material_cobertura(), sync)
                                }}
                            />
                            <Text >{item.label}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.title_style}>
              <Text >Estado de Conservação do Imóvel</Text>
            </View>

            <DropDownPicker
              style={styles.dropdown_style}
              open={openSe_ruf_estado_conservacao}
              value={parseInt(valorSe_ruf_estado_conservacao)}
              items={itemSe_ruf_estado_conservacao}
              setOpen={setOpenSe_ruf_estado_conservacao}
              setValue={setValorSe_ruf_estado_conservacao}
              setItems={setItemSe_ruf_estado_conservacao}
              onChangeValue={() => onPressTitle("se_ruf", "se_ruf_estado_conservacao", valorSe_ruf_estado_conservacao, sync)}
              dropDownDirection="AUTO"
              listMode="SCROLLVIEW"
              placeholder="Selecione::"
            />

          </View>
        </>
    )
};

const styles = StyleSheet.create({
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center'
},
checkboxlabel: {
    marginTop: 5,
    marginLeft: 30,
},
form6: {
    width: '92%',
    height: 650,
    marginLeft: 25,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
  },
  form5: {
    width: '92%',
    height: 840,
    marginLeft: 25,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,

  },
  title_style: {
    color: "#121212",
    marginLeft: 30,
    marginTop: 15,
  },
  dropdown_style: {
    marginTop: 5,
    height: 40,
    width: '85%',
    marginLeft: 30,
    borderRadius: 0,
    borderWidth: 1,

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
    marginTop: 1
  },
  input_style: {
    height: 40,
    width: '85%',
    marginTop: 5,
    marginLeft: 30,
    borderWidth: 1,
    backgroundColor: 'white'
  },
});

export default Step3;