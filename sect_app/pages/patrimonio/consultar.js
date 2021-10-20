import React, {useEffect, useState} from 'react';
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {BarCodeScanner} from "expo-barcode-scanner";
import axios from 'axios';
import PisoList from "./components/PisoList";
import SalaList from "./components/SalaList";
import DepartamentoList from "./components/DepartamentoList";
import {Title} from "react-native-paper";

function Consultar({navigation}) {
    const [hasPermission, setHasPermission] = useState('');
    const [openModalCamera, setOpenModalCamera] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [dados, setDados] = useState(false);

    useEffect(() => {
        onHandlePermission();
    });

    const onHandlePermission = async () => {
        const {status} = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    const openCamera = () => {
        setOpenModalCamera(true);
    }

    const handleScanned = async ({type, data}) => {
        setOpenModalCamera(!openModalCamera);

        await axios.get("http://192.168.0.151:8082/_apps/app_teste/patrimonio/consultar_patrimonio.php",
            {
                params: {
                    qrcode: data,
                    acao: "consultar"
                }
            }
        ).then(function (response) {
            setDados(response.data);
        })
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={[styles.card, {flexDirection: "column", justifyContent: "center", alignItems: "center"}]}>
                <Text style={{paddingVertical: 20}}>Consulte pelo (Piso, Sala, Departamento ou Patrimônio) ultilizando a
                    Camera.
                </Text>
                <TouchableOpacity
                    onPress={openCamera}
                    style={styles.button}
                >
                    <Text style={styles.textButton}>
                        <Icon
                            style={{fontSize: 18}}
                            name="camera-outline"
                        /> Escanear
                    </Text>
                </TouchableOpacity>
            </View>

            <View>
                {dados && (
                    <View style={{marginTop: 10}}>
                        {
                            (() => {
                                switch (dados.tipo) {
                                    case "piso":
                                        return <PisoList dados={dados} styles={styles}/>
                                        break;
                                    case "sala":
                                        return <SalaList dados={dados} styles={styles}/>
                                        break;
                                    case  "departamento":
                                        return <DepartamentoList dados={dados} styles={styles}/>
                                        break;
                                    case "patrimonio":
                                        setTimeout(() => {
                                            const {codigo} = dados.patrimonio;
                                            navigation.navigate("Patrimonio - visualizar", {codigo});
                                            setDados(false);
                                        }, 500);
                                        break;
                                    default :
                                        alert("Busca não encontrada");
                                        setDados(false);
                                        break;
                                }

                            })()
                        }
                    </View>
                )
                }
            </View>


            <Modal
                animationType="slide"
                transparent={true}
                visible={openModalCamera}
                onRequestClose={() => {
                    setOpenModalCamera(!openModalCamera);
                }}
            >
                <View style={[StyleSheet.absoluteFillObject, {backgroundColor: "#FFFFFF"}]}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                </View>
            </Modal>

        </ScrollView>
    );
}

export default Consultar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 20
    },

    headerTitle: {
        fontWeight: "bold",
    },

    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#28a745",
        borderRadius: 8,
        width: 200
    },

    textButton: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center"
    },

    card: {
        borderBottomWidth: 0,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 8,
    },

    paragraph: {
        fontWeight: "700",
        fontSize: 15,
        marginBottom: 10
    }
});