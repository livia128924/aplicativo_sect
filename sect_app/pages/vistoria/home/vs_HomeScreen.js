import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  AsyncStorage,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconFont from "react-native-vector-icons/FontAwesome";
import { SearchBar } from "react-native-elements";
import { BorderlessButton } from "react-native-gesture-handler";
const db = DatabaseConnection.getConnection();
import { DatabaseConnection } from "../../database/database";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
//import { ErrorMessage } from "./login/styles";
import { Card } from "react-native-elements/dist/card/Card";

///////////////////////
const Drawer = createDrawerNavigator();

//////////////////////////

const VShome = ({ navigation }) => {
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

    if (pr_tipo_formulario === "1"){
      navigation.navigate("VuPFprogressSteps");

    } else if (pr_tipo_formulario === "2"){
      navigation.navigate("Vr_PF");
    }
  }

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT *, p.codigo AS pr_codigo FROM pr p LEFT JOIN rq r ON r.codigo = p.pr_requerente",
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
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.pr_numero_processo
          ? item.pr_numero_processo.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFlatListItems(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFlatListItems(masterDataSource);
      setSearch(text);
    }
  };

  const listItemView = (item) => {
    return (
      <Card containerStyle={{ padding: 0 }}>
        <TouchableOpacity
          style={styles.item}
          key={item.codigo}
          onPress={() =>
            onPress(
              item.pr_numero_processo,
              item.rq_nome,
              item.pr_codigo,
              item.rq_tipo_pessoa,
              item.pr_tipo_formulario
            )
          }
        >
          <View style={styles.iconText}>
            <View
              style={{
                top: 15,
                padding: 6,
                backgroundColor: "white",
                borderRadius: 17,
                width: 35,
                height: 35,
              }}
            >
              <Icon
                //solid
                size={23}
                color="#4d94ff"
                name="file-document-outline"
              />
            </View>

            <Text style={styles.title}>
              {item.pr_numero_processo.toUpperCase()}
            </Text>
          </View>
          <View style={styles.dadosStyle}>
            <Text style={styles.titleRq}>{item.rq_cpf} |</Text>

            <Text style={styles.titleRq} key={item.rq_tipo_pessoa}>

              {item.rq_tipo_pessoa == "f" ? (
                <Text>

            <Text>{item.pr_tipo_formulario == "1" ?<Text> Vistoria Urbano | PF</Text>: null }</Text>

            <Text>{item.pr_tipo_formulario == "2" ?<Text> Vistoria Rural | PF </Text>: null }</Text>

                </Text>
              ) : (
                <Text>
            <Text>{item.pr_tipo_formulario == "1" ?<Text> Vistoria Urbano | PJ</Text>: null }</Text>

            <Text>{item.pr_tipo_formulario == "2" ?<Text> Vistoria Rural | PJ </Text>: null }</Text>

                </Text>
              )}
            </Text>
            <View style={{ bottom: 9 }}>
              <Button
                type="clear"
                icon={<Icon name="arrow-right" size={15} color="#4d94ff" />}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

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
        <View style={styles.topBar}>
          <BorderlessButton onPress={() => navigation.navigate("Menu")}>
            <Icon name={"arrow-left"} size={25} color="black" />
          </BorderlessButton>
        </View>
        <View>
          <SearchBar
            placeholder="Pesquise aqui..."
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction("")}
            value={search}
            lightTheme={true}
            round={true}
            inputStyle={{ backgroundColor: "white" }}
            containerStyle={{
              backgroundColor: "white",
              top: 5,
              marginLeft: 40,
              marginRight: 40,
              borderRadius: 15,
            }}
            //placeholderTextColor={'#g5g5g5'}
            inputContainerStyle={{ backgroundColor: "white" }}
            //containerStyle={{backgroundColor:'false', }}
          />
          <Text style={{ paddingLeft: 15, top: 25 }}>Processos</Text>

          {/* {error.length !== 0 && <ErrorMessage>{error}</ErrorMessage>} */}

          <FlatList
            style={styles.listView}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
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
              style={styles.btnIcon}
            />
            <Text style={{ color: "white", fontSize: 16 }}>Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button1}
            onPress={() => navigation.navigate("Sincronizacao")}
          >
            <IconFont
              name={"exchange"}
              size={35}
              color="white"
              style={styles.btnIcon}
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
              style={styles.btnIcon}
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
              style={styles.btnIcon}
            />
            <Text style={{ color: "white", fontSize: 16 }}>config</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
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

export default VShome;
