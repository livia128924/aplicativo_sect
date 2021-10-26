import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Card, Button, Title } from "react-native-paper";
import { DatabaseConnection } from "../../../database/database";
const db = DatabaseConnection.getConnection();

const Step7 = ({ navigation }) => {
  const [sync, setSync] = useState("");
  const [nome, setNome] = useState("");
  const [dados_valor, setDados_valor] = useState([]);

  let [dados, setDados] = useState([]);

  const [text, setText] = useState("");

  var cod_processo = "";
  AsyncStorage.getItem("pr_codigo").then((value) => {
    setSync(value);
    cod_processo = value;
  });

  AsyncStorage.getItem("codigo").then((codigo) => {
    setDados_valor(codigo);
  });

  useEffect(() => {
    // var cod_processo = "";
    // //carrega o valor do select na tela index.js
    // AsyncStorage.getItem("pr_codigo").then((value) => {
    //   //console.log(value);
    //   setSync(value);
    //   cod_processo = value;
    // });

    AsyncStorage.getItem("valor").then((res) => {
      setDados_valor(res);
    });

    //console.log(cod_processo);
    AsyncStorage.getItem('codigo_nome').then(res => {
        var codigo_nome = res;

      console.log("Codigo nome", codigo_nome);
    if (dados_valor) {
      //console.log("cheguei");
      db.transaction((tx) => {
        tx.executeSql(
          "select nome from log where cod_processo = '" + cod_processo +"' and codigo = '"+ codigo_nome+"'",
          [],
          (tx, results) => {
            var row = [];
            for (let i = 0; i < results.rows.length; ++i) {
             // setDados(results.rows);

            }
          },  function (tx, error) {
            console.log("SELECT Log error: " + error.message);
          }
        );
        console.log("select * from log where se_ruj_cod_processo = '" + cod_processo +"' and codigo = '"+ codigo_nome+"'");
      });
    }
  });

  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFotos();
    }, [])
  );

  function loadFotos() {
    db.transaction((tx) => {
      // tx.executeSql(
      //   "DELETE from log'",[]
      // );
      tx.executeSql(
        "SELECT * FROM log where tipo = 'i' and cod_processo = '" + cod_processo + "' ",
        [],
        (tx, results) => {
         // console.log(results.rows);
          var temp = [];
          //console.log("ok");
          for (var i = 0; i < results.rows.length; ++i)
          //console.log("ok", results.rows.item(i).nome);
            temp.push({
              key: results.rows.item(i).codigo,
              tabela: results.rows.item(i).tabela,
              image: results.rows.item(i).valor,
              nome: results.rows.item(i).nome,

            });
           // console.log(temp)
          setDados(temp);
        },
        function (tx, error) {
          console.log("SELECT Log error: " + error.message);
        }
      );
    });
  }

  function camera(codigo_tab_camera, campo_relatorio_img, tabela) {
    //  db.transaction((tx) => {
    //  //// tx.executeSql("delete from log", []);
    //   //tx.executeSql("drop table log", []);

    //   tx.executeSql("CREATE TABLE IF NOT EXISTS log ( chave TEXT UNIQUE , codigo INTEGER, tabela TEXT, campo TEXT, valor BLOB, cod_tabela TEXT, cod_processo TEXT, data TEXT DEFAULT CURRENT_TIMESTAMP, situacao TEXT, tipo TEXT, nome TEXT, PRIMARY KEY(codigo))", []);
    // }, (err) => {
    //   console.error("There was a problem with the log ", err);
    //   return true;
    // }, (success) => {
    //   console.log("criou a tabela log", success);
    // })
   // alert(codigo_tab_camera);
    //"DROP TABLE foto_relatorio",[], (tx, results) => {}
    //console.log(codigo_tab_camera);

    //var items = [['codigo_tab_camera', 'campo_relatorio_img', 'tabela'], [codigo_tab_camera, campo_relatorio_img, tabela]]
    var item = [
      ["codigo_tab_camera", codigo_tab_camera],
      ["campo_relatorio_img", campo_relatorio_img],
      ["tabela", tabela],
    ];

    AsyncStorage.multiSet(item);
   // console.log(item);
    navigation.navigate("Relatorio_camera");
  }

  // function salvar(codigo_tab, image, codigo) {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       `UPDATE log set valor = '${image}' where tipo = 'i' and codigo = '${codigo}'`,
  //       [],
  //       (tx, results) => {
  //         alert("salvo com successo!");
  //         loadFotos();
  //       },
  //       function (tx, error) {
  //         console.log("SELECT error: " + error.message);
  //       }
  //     );
  //   });
  // }

  function deletar(codigo) {
    db.transaction((tx) => {
      tx.executeSql(
        `delete from log where tipo = 'i' and codigo = '${codigo}'`,
        [],
        (tx, results) => {
          // console.log(
          //   `delete from log where tipo = 'i' and codigo = '${codigo}'`
          // );
          alert("Deletado com successo!");
          loadFotos();
        },
        function (tx, error) {
          console.log("SELECT error: " + error.message);
        }
      );
    });
  }

  //função que aciona quando o estado do componente muda e seta os valores correspondente
  function onPressTitle(valor, codigo, codigo_tab) {
console.log(valor);

    db.transaction((tx) => {
      const log_delete = "UPDATE log set nome = '" + valor + "', situacao= '1'  where tipo = 'i' and codigo =  '" + codigo + "'";
      tx.executeSql(log_delete, []);
      console.log(log_delete);
      //tx.executeSql(log_delete, []);
    },
    function (tx, error) {
      console.log("SELECT error: " + error.message);
    });

    AsyncStorage.setItem("codigo_nome", codigo.toString());

    AsyncStorage.setItem("valor", valor);
  }

  return (
    <>
      <View style={styles.form9}>
        <View style={styles.rect2}>
          <Text style={styles.titulo}>RELATÓRIO FOTOGRÁFICO</Text>
        </View>

        <TouchableOpacity
          style={{
            height: "auto",
            paddingTop: 5,
            //paddingLeft: 80,
          }}
          onPress={() => camera(sync, "se_ruj_relatorio_imagens", "se_ruj")} //passar por paramentro os campos que irao para o registro das foto
        >
          <Button
            icon="camera"
            mode="outlined"
            color="black"

            style={{ width: "70%", borderRadius: 3, alignContent:'center', alignSelf:'center', alignItems:'center'  }}
          ></Button>
        </TouchableOpacity>

        <View>
          {dados.map((item, index) => (
            <View key={item.key}>
              <Card style={{ backgroundColor: "white" }}>
                <Title>{item.key}</Title>
                <Image
                  style={{
                    width: "100%",
                    height: 300,
                    resizeMode: "stretch",
                    borderRadius: 20,
                  }}
                  source={{ uri: item.image }}
                />
                {/* <Card.Cover source={{  uri:  }} /> */}
                <TextInput
                  style={styles.inputNome}
                  onChangeText={(text) => {
                    dados[index].nome = text;
                    setDados([...dados], dados);
                    //console.log(item.key);
                  }}
                  value={item.nome}
                  placeholder="   Digite aqui"
                  onBlur={() => onPressTitle(item.nome, item.key, sync)}
                ></TextInput>

                <Card.Actions>
                  <Button color={"red"} onPress={() => deletar(item.key)}>
                    Deletar
                  </Button>
                  {/* <Button color={"#4a90e2"} onPress={() => salvar(sync, item.valor, item.key)}>Salvar</Button> */}
                </Card.Actions>
              </Card>
              <View>
                <Text></Text>
              </View>
              {/* <Button
          icon="camera"
          mode="outlined"
          color="black"
          onPress={() => camera()}
          style={{width:'70%', borderRadius: 3}}
          >
        </Button> */}
              {/*<Mybutton title='Deletar' customClick={() => deletar_foto(item.id)}/> */}
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputNome: {
    height: 40,
    width: "100%",
    marginTop: 10,
    marginLeft: 0,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "white",
  },
  input: {
    width: 278,
    height: 30,
    marginRight: 5,
    borderWidth: 1,
  },
  form9: {
    width: "95%",
    height: "auto",
    paddingBottom: 10,
    marginTop:10,
    //marginLeft: 20,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,1)",
    borderRadius: 3,
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

export default Step7;
