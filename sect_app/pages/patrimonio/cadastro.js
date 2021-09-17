import React, {useEffect, useRef, useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    Modal,
    Alert,
    YellowBox
} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';

export default function cadastro({navigation}) {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannedPat, setScannedPat] = useState(false);
    const [hasDepartamento, setHasDepartamento] = useState(null);
    const [openCameraDep, setOpenCameraDep] = useState(false);
    const [openCameraPat, setOpenCameraPat] = useState(false);
    const [departamento, setDepartamento] = useState("");
    const [sala, setSala] = useState("");
    const [codPatrimonio, setCodPatrimonio] = useState(0);
    const [qr_code, setQr_code] = useState("");
    const [estado_conservacao, setEstado_conservacao] = useState([]);
    const [EstDropdownOpen, setEstDropdownOpen] = useState(false);
    const [cod_estado_conservacao, setCod_estado_conservacao] = useState(false);

    const [categorias, setCategorias] = useState([]);
    const [CatDropdownOpen, setCatDropdownOpen] = useState(false);
    const [cod_categoria, setCod_categoria] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const [patrimonio, setPatrimonio] = useState({
        codigo: 0,
        categoria: "",
        titulo: "",
        descricao: "",
        cod_qrcode: "",
        departamento: "",
        local: "",
        estado_conservacao: "",
    });

    const [acao, setAcao] = useState("");

    useEffect(() => {
        onHandlePermission(); //Pede permissão da camera.

        AsyncStorage.getItem("departamento").then(function (data) {

            if (data) {

                let dados = JSON.parse(data);
                setDepartamento(dados.aux_departamento.descricao);
                setSala(dados.pat_local.nome_local);
            }
        });

    }, []);

    const onHandlePermission = async () => {
        const {status} = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    const handleScannedDep = async ({type, data}) => {
        await axios.post("http://192.168.0.151:8082/_apps/app_teste/patrimonio/consultar_departamento.php", {qr_code: data})
            .then(function (response) {

                const {status, msg, dados} = response.data;

                console.log(response.data);
                if (status) {
                    setDepartamento(dados.aux_departamento.descricao);
                    setSala(dados.pat_local.nome_local);
                    setPatrimonio({...patrimonio, ["local"]: dados.pat_departamento.local});
                    setPatrimonio({...patrimonio, ["departamento"]: dados.pat_departamento.departamento});

                    AsyncStorage.setItem("departamento", JSON.stringify(dados));
                } else {
                    alert(msg);
                }


                setTimeout(() => {
                    setOpenCameraDep(!openCameraDep);
                }, 1000);
            });
    }

    const handleScannedPatrimonio = async ({type, data}) => {
        setScannedPat(true);
        setModalVisible(!modalVisible);

        await axios.post("http://192.168.0.151:8082/_apps/app_teste/patrimonio/patrimonio.php", {qr_code: data})
            .then(function (response) {
                const {status, msg, dados, acao} = response.data;

                if (status) {
                    setCodPatrimonio(dados.cod_patrimonio);

                    console.log(dados.pat_patrimonio);

                    setPatrimonio({...patrimonio, ["codigo"]: dados.codigo});
                    setPatrimonio({...patrimonio, ["cod_qrcode"]: dados.pat_qr_code.codigo});
                    setAcao(acao);

                    var categorias_temp = [];

                    dados.auxiliares.categorias.map((item, index) => {
                        categorias_temp.push(item);
                    });

                    setCategorias(categorias_temp);

                    var estado_conservacao_temp = [];

                    dados.auxiliares.estado_conservacao.map((item, index) => {
                        estado_conservacao_temp.push(item);
                    });

                    setEstado_conservacao(estado_conservacao_temp);

                    setQr_code(data);
                } else {
                    alert(msg);
                }

                setOpenCameraPat(false);

            });
    };

    const handleOpenCameraPat = () => {
        setCodPatrimonio(0);
        setModalVisible(!modalVisible);
        setScannedPat(false);

        console.log(scanned);
    }

    const handleOpenCameraDep = () => {
        setOpenCameraDep(true);
    }

    const handleSubmitPatrimonio = async () => {
        axios.post("http://192.168.0.151:8082/_apps/app_teste/patrimonio/inserir_patrimonio.php", patrimonio)
            .then(function (response) {
                const {status, msg} = response.data;

                if (status) {
                    Alert.alert(msg);
                } else {
                    Alert.alert(msg);
                }
            });
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <ScrollView style={styles.container}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={openCameraDep}
                onRequestClose={() => {
                    setOpenCameraDep(!openCameraDep);
                }}
            >
                <View style={[StyleSheet.absoluteFillObject, {backgroundColor: "#FFFFFF"}]}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleScannedDep}
                        style={StyleSheet.absoluteFillObject}
                    />
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={[StyleSheet.absoluteFillObject, {backgroundColor: "#FFFFFF"}]}>
                    <BarCodeScanner
                        onBarCodeScanned={scannedPat ? undefined : handleScannedPatrimonio}
                        style={StyleSheet.absoluteFillObject}
                    />
                </View>
            </Modal>

            <View style={{flex: 1}}>
                <TouchableOpacity style={styles.buttonSelecionaDep} onPress={handleOpenCameraDep}>
                    <Text style={styles.textSelecionaDep}>
                        <Icon style={{fontSize: 18}} name="camera-outline"></Icon> Selecionar departamento
                    </Text>
                </TouchableOpacity>

                {
                    (() => {

                        if (departamento) {
                            return (
                                <>
                                    <View style={styles.containerDepartamento}>
                                        <View>
                                            <Text style={styles.textBold}>Sala</Text>
                                            <Text>{sala}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.textBold}>Departamento</Text>
                                            <Text>{departamento}</Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        style={[styles.buttonSelecionaDep, {marginTop: 15}]}
                                        onPress={handleOpenCameraPat}
                                    >
                                        <Text style={styles.textSelecionaDep}>
                                            <Icon style={{fontSize: 18}} name="camera-outline"></Icon> Escanear
                                            patrimônio
                                        </Text>
                                    </TouchableOpacity>

                                </>
                            )
                        }

                    })()
                }


                {
                    (() => {
                        if (patrimonio.cod_qrcode) {
                            return (
                                <View style={{flex: 1, padding: 10, marginBottom: 10}}>
                                    <View style={{flex: 1, marginTop: 20}}>
                                        <View style={styles.inputContainer}>
                                            <Text>Ação</Text>
                                            <Text style={styles.textBold}>{acao}</Text>
                                        </View>

                                        <View style={styles.inputContainer}>
                                            <Text>Identificador do qr code</Text>
                                            <Text style={styles.textBold}>{qr_code}</Text>
                                        </View>


                                        <View style={styles.inputContainer}>
                                            <Text>Título</Text>
                                            <TextInput
                                                style={styles.input}
                                                value={patrimonio.titulo}
                                                onChangeText={value => {
                                                    setPatrimonio({
                                                        ...patrimonio,
                                                        ["titulo"]: value,
                                                    })
                                                }}/>
                                        </View>

                                        <View style={styles.inputContainer}>
                                            <Text>Descrição</Text>
                                            <TextInput
                                                style={styles.input}
                                                value={patrimonio.descricao}
                                                onChangeText={value => {
                                                    setPatrimonio({
                                                        ...patrimonio,
                                                        ["descricao"]: value,
                                                    })
                                                }}
                                            />
                                        </View>

                                        <View style={styles.inputContainer}>
                                            <Text>Categoria</Text>

                                            <DropDownPicker
                                                style={styles.dropdown_style}
                                                open={CatDropdownOpen}
                                                value={cod_categoria}
                                                setValue={setCod_categoria}
                                                items={categorias}
                                                setOpen={setCatDropdownOpen}
                                                setItems={setCategorias}
                                                zIndex={9999}
                                                itemKey="value"
                                                listMode="SCROLLVIEW"
                                                onChangeValue={(value) => {

                                                    setPatrimonio({
                                                        ...patrimonio,
                                                        ["categoria"]: value,
                                                    });

                                                    console.log(patrimonio);
                                                }}
                                                placeholder={""}
                                            />
                                        </View>

                                        <View style={styles.inputContainer}>
                                            <Text>Estado de Conservação </Text>
                                            <DropDownPicker
                                                style={styles.dropdown_style}
                                                open={EstDropdownOpen}
                                                value={cod_estado_conservacao}
                                                setValue={setCod_estado_conservacao}
                                                items={estado_conservacao}
                                                setOpen={setEstDropdownOpen}
                                                setItems={setEstado_conservacao}
                                                zIndex={9999}
                                                itemKey="value"
                                                listMode="SCROLLVIEW"
                                                onChangeValue={(value) => {
                                                    setPatrimonio({
                                                        ...patrimonio,
                                                        ["estado_conservacao"]: value,
                                                    });
                                                }}
                                                placeholder={""}
                                            />
                                        </View>

                                        <TouchableOpacity
                                            style={[styles.buttonSelecionaDep, {marginTop: 15}]}
                                            onPress={handleSubmitPatrimonio}
                                        >
                                            <Text style={styles.textSelecionaDep}>
                                                <Icon style={{fontSize: 18}} name="save-outline"></Icon> Salvar
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                    })()
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        position: "relative",
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
        padding: 20,
    },

    textBold: {
        fontWeight: "bold",
    },

    dropdown_style: {
        width: '100%',
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#ccc",
    },
});