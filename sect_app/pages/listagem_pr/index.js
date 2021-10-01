import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  AsyncStorage,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconFont from "react-native-vector-icons/FontAwesome";
import { SearchBar } from "react-native-elements";
import { BorderlessButton } from "react-native-gesture-handler";
const db = DatabaseConnection.getConnection();
import { DatabaseConnection } from "../database/database";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

//import vistoriaIcon from "../../assets/management.svg";

//import { ErrorMessage } from "./login/styles";
import { Card } from "react-native-elements/dist/card/Card";
import Mybutton from "../components/Mybutton";

///////////////////////
const Drawer = createDrawerNavigator();

const Listagem = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [flatListItems, setFlatListItems] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const [search, setSearch] = useState("");
  const [sync, setSync] = useState("");
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);

  function onPress(
    cod_prss,
    rq_nome,
    pr_codigo,
    rq_tipo_pessoa,
    pr_tipo_formulario
  ) {
    //alert(pr_tipo_formulario);
    AsyncStorage.setItem("pr_codigo", pr_codigo.toString());
    AsyncStorage.setItem("cod_prss", cod_prss);
    AsyncStorage.setItem("rq_nome", rq_nome);

    if (rq_tipo_pessoa === "j") {
      switch (pr_tipo_formulario) {
        case "1":
          navigation.navigate("Stepper_PJ");
          break;
        case "2":
          navigation.navigate("Stepper_rrj");
          break;
        case "4":
          navigation.navigate("Stepper_PF_D");
          break;
        default:
          console.log("nao encontrado!");
          break;
      }
    } else if (rq_tipo_pessoa === "f") {
      switch (pr_tipo_formulario) {
        case "1":
          navigation.navigate("Stepper_PF");
          break;
        case "2":
          navigation.navigate("Stepper_rrf");
          break;
        case "4":
          navigation.navigate("Stepper_PF_D");
          break;
        default:
          console.log("nao encontrado!");
          break;
      }
    }
  }
  //   if(pr_tipo_formulario = "1"){
  //     navigation.navigate("Stepper_PF");
  //     }
  //     else if(pr_tipo_formulario === "2" ){
  //         navigation.navigate("Stepper_rrf");
  //     }
  //     if(pr_tipo_formulario === "4" ){
  //         navigation.navigate("Stepper_PF_D");
  //     }
  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT *, p.codigo AS pr_codigo FROM pr p LEFT JOIN rq r ON r.codigo = p.pr_requerente ",
          [],
          (tx, results) => {
            //var len = results.rows.length, i;
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              //console.log( results.rows.item(i));
              if (results.rows.length <= 0) {
                setError(
                  "Nada foi encontrado! Porfavor reinicie as configurações"
                );
              } else {
                temp.push(results.rows.item(i));
                setFlatListItems(temp);

                setMasterDataSource(temp);
              }
          }
        );
      },
      (err) => {
        console.error("There was a problem with the tx log", err);
        return true;
      },
      (success) => {
        console.log("log select", success);
      }
    );
  }, []);
  ///////////////////////////////////////////////////

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Principal" component={Inicio} />
        <Drawer.Screen name="Processo" component={Inicio} />
        <Drawer.Screen name="Socioecônomico" component={Inicio} />
        <Drawer.Screen name="Configurações" component={Inicio} />
      </Drawer.Navigator>
    </SafeAreaView>
  );

  function Inicio() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>


          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Image
              style={styles.tinyLogo}
              source={require("../../assets/management1.png")}
            />

            <Text style={styles.text}>SOCIOECONÔMICO</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("vs_HomeScreen")}
          >
            <IconAntDesign
              name={"linechart"}
              size={25}
              color="#000000"
              style={styles.btnIcon}
            />
            <Text style={styles.text}>VISTORIA</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => navigation.navigate("Câmera")}
          >
            <Icon
              name={"camera"}
              size={35}
              color="white"
              //   style={styles.btnIcon}
            />
            <Text style={{ color: "white", fontSize: 16 }}>Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button1}
            //onPress={() => navigation.navigate("Sincronizacao")}
          >
            <IconFont
              name={"exchange"}
              size={35}
              color="white"
              // style={styles.btnIcon}
            />
            <Text style={{ color: "white", fontSize: 16 }}>sincronização</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button1}
            onPress={() => alert("nao definido")}
          >
            <IconFont
              name={"edit"}
              size={35}
              color="white"
              //style={styles.btnIcon}
            />
            <Text style={{ color: "white", fontSize: 16 }}>produção</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button1}
            onPress={() => navigation.navigate("Config")}
          >
            <IconFont
              name={"wrench"}
              size={35}
              color="white"
              // style={styles.btnIcon}
            />
            <Text style={{ color: "white", fontSize: 16 }}>config</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 40,
    height: 40,
  },
  text: {
    marginTop: 5,
    color: "black",
    fontWeight: "bold",
    fontSize: 10,
  },
  btnIcon: {
    height: 25,
    width: 30,

    alignItems: "center",
    textAlign: "center",
  },
  button: {
    height: 100,
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    padding: 10,
    margin: 20,
    borderRadius: 5,
  },
  topBar: {
    left: 3,
    top: 60,
    //backgroundColor:'false',
    width: 30,
    height: 35,
  },
  button1: {
    height: 50,
    // width: 70,
    alignItems: "center",
    top: 3,
    margin: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  button2: {
    height: 50,
    width: 70,
    alignItems: "center",
    top: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  button3: {
    height: 50,
    width: 70,
    alignItems: "center",
    top: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  button4: {
    height: 50,
    width: 70,
    alignItems: "center",
    top: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  footer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    height: 68,
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#4d94ff",
  },
  container: {
    flex: 1,
    padding: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  listView: {
    //flex:1,
    //width: '100%',
    //height: 400,
    top: 25,
    //marginLeft: 12,
    //marginRight: 12,
  },
  item: {
    flex: 1,
    //flexDirection: 'column',
    padding: 10,
    //justifyContent: 'space-between'
  },
  iconText: {
    flexDirection: "row",
    //justifyContent:''
  },
  title: {
    top: 5,
    fontSize: 15,
    marginLeft: 15,
  },
  dadosStyle: {
    flexDirection: "row",
    marginLeft: 51,
  },
  titleRq: {
    fontSize: 11,
  },
});

export default Listagem;
