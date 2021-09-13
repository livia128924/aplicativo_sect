import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

export default function cadastro({navigation}) {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [hasDepartamento, setHasDepartamento] = useState(null);
    const [openCameraDep, setOpenCameraDep] = useState(false);
    const [departamento, setDepartamento] = useState("");

    useEffect(() => {
        onHandlePermission(); //Pede permissão da camera.
    }, []);

    const onHandlePermission = async () => {
        const {status} = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);

        searchQRcode(data);
    };

    async function searchQRcode(data) {
        await axios.post("http://192.168.0.151:8082/_apps/app_teste/patrimonio/consultar.php", {qr_code: data}).then(function (response) {
            const {msg} = response.data;
            alert(msg);
        });
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handleOpenCameraDep = () => {
        setOpenCameraDep(true);
    }

    const handleScannedDep = async ({type, data}) => {
        await axios.post("http://192.168.0.151:8082/_apps/app_teste/patrimonio/consultar_departamento.php", {qr_code: data}).then(function (response) {

            const {dados} = response.data;
            //alert(JSON.stringify(response.data));
            setDepartamento(dados.departamento);

            setTimeout(() => {
                setOpenCameraDep(false);
            }, 2000);
        });
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.buttonSelecionaDep} onPress={handleOpenCameraDep}>
                    <Text style={styles.textSelecionaDep}>
                        <Icon style={{fontSize: 18}} name="camera-outline"></Icon> Selecionar departamento
                    </Text>
                </TouchableOpacity>

                {
                    (() => {
                        if (openCameraDep) {
                            return (
                                <View style={[StyleSheet.absoluteFillObject, {backgroundColor: "#FFFFFF"}]}>
                                    <BarCodeScanner
                                        onBarCodeScanned={scanned ? undefined : handleScannedDep}
                                        style={StyleSheet.absoluteFillObject}
                                    />
                                </View>
                            )
                        } else {

                            if (departamento) {
                                return (
                                    <View style={styles.containerDepartamento}>
                                        <Text>{departamento}</Text>
                                    </View>
                                )
                            } else {

                            }
                            /*<View>
                                <View style={styles.inputContainer}>
                                    <Text>Categoria</Text>
                                    <TextInput style={styles.input} value={""}/>
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text>Título</Text>
                                    <TextInput style={styles.input} value={""}/>
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text>Descrição</Text>
                                    <TextInput style={styles.input} value={""}/>
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text>Estado de Conservação</Text>
                                    <TextInput style={styles.input} value={""}/>
                                </View>
                            </View>*/

                        }
                    })()
                }

            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },

    inputContainer: {
        justifyContent: "center",
        width: "100%",
    },

    input: {
        backgroundColor: "#FFFFFF",
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#ccc",
    },

    selecionaDep: {
        backgroundColor: "#28a745",
    },

    buttonSelecionaDep: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#28a745",
        borderRadius: 8,
    },

    textSelecionaDep: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center"
    },

    containerDepartamento: {
        backgroundColor: "#FFFFFF",
        marginTop: 15,
        borderRadius: 10,
        padding: 10,
    }
});