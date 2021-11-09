import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  AsyncStorage,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { Button } from "react-native-elements";
import Mybutton from "../components/Mybutton";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import MybuttonMaterial from "../components/MyButtonMaterial";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { Badge } from "react-native-elements/dist/badge/Badge";
import { Card } from "react-native-elements/dist/card/Card";
import Operaçoes from "../components/OperacoesPeriodo";

const Drawer = createDrawerNavigator();

const Menu = ({ navigation }) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // async function Logout() {
  //   await AsyncStorage.removeItem("codigo");
  //   await navigation.navigate("Login");
  // }

  return (
    <SafeAreaView>
      <View style={styles.rect14}>
        <View style={{ top: 30 }}>
          <View style={styles.IconView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Hello World!</Text>
                  <Pressable
                    style={[styles.buttonModal, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <View style={styles.buttonModalShow}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                {/* <Text style={styles.textStyle}>Showww Modal</Text> */}
                <Avatar
                  rounded
                  source={require("../../assets/403_210527042633.jpg")}
                  size="medium"
                />
                <Badge
                  status="success"
                  containerStyle={{ top: -30, right: -10 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.icon3Row}>
            {/* <Icon name="md-menu" style={styles.icon3}></Icon> */}
            <Text style={styles.liviaSilva}>Livia Silva.</Text>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.status}>Status:</Text>
            <Text style={styles.ativo}>Ativo</Text>
          </View>
          <View style={styles.rect16}>
            <Text style={styles.loremIpsum}>Operaçoes por periodo:</Text>
            <Operaçoes></Operaçoes>

            <View style={styles.container}>
              <Mybutton
                title="Processos"
                customClick={() => navigation.navigate("HomeScreen")}
                icon="group"
              />
              <Mybutton
                title="Patrimônio"
                customClick={() => navigation.navigate("Patrimonio")}
                icon="qrcode"
              />
              <Mybutton
                title=""
                customClick={() => alert("ok")}
                icon="image"
              />
              <Mybutton
                title=""
                customClick={() => alert("ok")}
                icon="image"
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
//};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  IconView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    ///borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  buttonModalShow: {
    width: 80,
    height: 60,

    //padding: 10,
    //elevation: 2,
    left: 150,
    top: 20,
    //backgroundColor: "red",
  },
  buttonOpen: {
    backgroundColor: "red",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  icon3Row: {
    height: 65,
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 9,
  },
  rect14: {
    //position:'absolute',
    //top: 0,
    backgroundColor: "rgba(74,144,226,1)",
    width: "100%",
    //marginTop:20,
    height: 800,
  },
  icon3: {
    color: "rgba(255,255,255,1)",
    fontSize: 35,
    height: 39,
    width: 25,
    marginTop: 4,
  },

  liviaSilva: {
    //fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    marginLeft: 20,
    marginTop: 35,
  },
  button: {
    //position:'relative',
    width: 43,
    height: 43,
    borderRadius: 30,
    //right:20,
    shadowColor: "rgba(25,25,26,1)",
  },
  rect15: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(255,255,255,1)",
    //overflow: "hidden",
    //marginRight:50
  },
  image: {
    width: "100%",
    flex: 1,
    //marginBottom: 7,
    height: 20,
    borderRadius: 15,
    //right:0
  },
  status: {
    //fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
  },
  ativo: {
    //fontFamily: "roboto-regular",
    color: "rgba(22,62,109,1)",
    marginLeft: 5,
  },
  statusRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 55,
    marginRight: 238,
  },
  rect16: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 7,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    shadowColor: "rgba(255,255,255,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 75,
    shadowOpacity: 0.3,
    shadowRadius: 25,
    marginTop: 37,
  },
  loremIpsum: {
    //fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)",
    fontSize: 15,
    marginTop: 23,
    marginLeft: 20,
  },

  container: {
    flex: 1,
    //padding: 45,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  listView: {
    //flex:1,
    //width: '100%',
    height: 400,
    top: 300,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
  },
});

export default Menu;
