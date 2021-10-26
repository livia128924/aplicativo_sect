import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { LinearProgress } from "react-native-elements";

function Operaçoes(props) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.containerAzul}>
          <TouchableOpacity
            onPress={() => alert("voce clicou nos processos modificados")}
          >
            <View style={styles.text2Row}>
              <Text style={styles.text2}>32</Text>
              <Text style={styles.azul2}>/</Text>
              <Text style={styles.text}>100</Text>
            </View>
            <View style={styles.group1}>
              <LinearProgress
              color="primary"
             //s number="1"
              variant="determinate"
              value={0.3}
              />
            </View>
            <Text style={styles.loremIpsum2}>Processos modificados</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerRosa}>
          <TouchableOpacity
            onPress={() => alert("voce clicou nos processos Enviados")}
          >
            <View style={styles.rect13}>
              <View style={styles.azul6Row}>
                <Text style={styles.azul6}>57</Text>
                <Text style={styles.azul5}>/</Text>
                <Text style={styles.azul4}>223</Text>
              </View>
              <View style={styles.group1}>
              <LinearProgress color="primary" />
              </View>
              <Text style={styles.processosEnviados}>Processos enviados</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.containerAmarelo}>
          <TouchableOpacity
            onPress={() => alert("voce clicou nas Metas Finalizadas")}
          >
            <View style={styles.rect17}>
              <View style={styles.azul7Row}>
                <Text style={styles.azul7}>13</Text>
                <Text style={styles.azul8}>/</Text>
                <Text style={styles.azul9}>150</Text>
              </View>
              <View style={styles.group1}>
              <LinearProgress color="primary" />
              </View>
              <Text style={styles.metasFinalizados}>Metas finalizados</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    padding: 10,
    alignContent:"center",
    alignItems:"center"
  },
  containerAzul: {
    width: 144,
    height: 122,
    backgroundColor: "rgba(74,192,226,1)",
    borderRadius: 22,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    //elevation: 75,
    shadowOpacity: 0.3,
    shadowRadius: 25,
  },
  text2: {
    //fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 30,
  },
  azul2: {
    //fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    marginLeft: 2,
    marginTop: 12,
  },
  text: {
    //fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 18,
  },
  text2Row: {
    height: 36,
    flexDirection: "row",
    marginTop: 18,
    marginLeft: 17,
    marginRight: 61,
  },
  group: {
    width: 123,
    height: 4,
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 11,
  },
  rect18: {
    width: 46,
    height: 4,
    backgroundColor: "rgba(80,227,194,1)",
  },
  rect19: {
    width: 80,
    height: 4,
    backgroundColor: "#E6E6E6",
  },
  rect18Row: {
    height: 4,
    flexDirection: "row",
    flex: 1,
    marginRight: -1,
    marginLeft: -2,
  },
  loremIpsum2: {
    // fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 11,
    marginTop: 10,
    marginLeft: 11,
  },
  containerRosa: {
    width: 142,
    height: 120,
    marginLeft: 16,
  },
  rect13: {
    width: 142,
    height: 120,
    backgroundColor: "rgba(246,97,173,1)",
    borderRadius: 22,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    // elevation: 75,
    shadowOpacity: 0.3,
    shadowRadius: 25,
  },
  azul6: {
    //fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 25,
  },
  azul5: {
    // fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    marginLeft: 1,
    marginTop: 8,
  },
  azul4: {
    // fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 15,
  },
  azul6Row: {
    height: 32,
    flexDirection: "row",
    marginTop: 19,
    marginLeft: 20,
    marginRight: 62,
  },
  group1: {
    width: 127,
    height: 3,
    flexDirection: "row",
    marginTop: 18,
    marginLeft: 11,
  },
  rect20: {
    width: 36,
    height: 4,
    backgroundColor: "rgba(80,227,194,1)",
  },
  rect21: {
    width: 88,
    height: 4,
    backgroundColor: "#E6E6E6",
  },
  rect20Row: {
    height: 4,
    flexDirection: "row",
    flex: 1,
    marginRight: 5,
    marginLeft: -2,
  },
  processosEnviados: {
    //fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 11,
    marginTop: 11,
    marginLeft: 12,
  },
  containerAmarelo: {
    width: 142,
    height: 120,
    marginLeft: 16,
  },
  rect17: {
    width: 142,
    height: 120,
    backgroundColor: "#F3E545",
    borderRadius: 22,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    //elevation: 75,
    shadowOpacity: 0.3,
    shadowRadius: 25,
  },
  azul7: {
    // fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 25,
  },
  azul8: {
    // fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    marginLeft: 1,
    marginTop: 9,
  },
  azul9: {
    // fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 15,
  },
  azul7Row: {
    height: 33,
    flexDirection: "row",
    marginTop: 22,
    marginLeft: 24,
    marginRight: 57,
  },
  metasFinalizados: {
    //ontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 11,
    marginTop: 16,
    marginLeft: 12,
  },
  group2: {
    width: 103,
    height: 4,
    flexDirection: "row",
    marginTop: 11,
    marginLeft: 19,
  },
  rect22: {
    width: 25,
    height: 4,
    backgroundColor: "rgba(80,227,194,1)",
  },
  rect23: {
    width: 79,
    height: 4,
    backgroundColor: "#E6E6E6",
  },
  rect22Row: {
    height: 4,
    flexDirection: "row",
    flex: 1,
    marginRight: 1,
    marginLeft: -2,
  },
  containerAzulRow: {
    height: 122,
    flexDirection: "row",
    flex: 1,
    marginRight: -1,
  },
});

export default Operaçoes;
