import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    Modal,
    LogBox,
    Image,
    Alert,
    Button, Dimensions
} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import Gallery from 'react-native-image-gallery';
import {Camera} from 'expo-camera';

export default function cadastro({navigation}) {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannedPat, setScannedPat] = useState(false);
    const [openCameraDep, setOpenCameraDep] = useState(false);
    const [openCameraPat, setOpenCameraPat] = useState(false);
    const [sala, setSala] = useState("");
    const [codPatrimonio, setCodPatrimonio] = useState(0);
    const [qr_code, setQr_code] = useState("");
    const [estado_conservacao, setEstado_conservacao] = useState([]);
    const [EstDropdownOpen, setEstDropdownOpen] = useState(false);
    const [cod_estado_conservacao, setCod_estado_conservacao] = useState("");

    const [categorias, setCategorias] = useState([]);
    const [CatDropdownOpen, setCatDropdownOpen] = useState(false);
    const [cod_categoria, setCod_categoria] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [departamentoDesc, setDepartamentoDesc] = useState();
    const [patrimonio, setPatrimonio] = useState({
        codigo: 0,
        categoria: "",
        titulo: "",
        descricao: "",
        cod_qrcode: "",
        departamento: "",
        local: "",
        estado_conservacao: "",
        acao: "Cadastrar",
        fotos: [],
    });

    const [local, setLocal] = useState("");
    const [departamento, setDepartamento] = useState("");

    const [modalFotoVisible, setModalFotoVisible] = useState(false);
    const [cameraFotoOpen, setCameraFotoOpen] = useState(false);
    const [capturePhoto, setCapturePhoto] = useState('');
    const camRef = useRef(null);
    const [imagemList, setImagemList] = useState([]);
    const [previsualizacao, setPrevisualizacao] = useState(false);
    const [imageSelected, setImageSelected] = useState("");

    useEffect(() => {

        LogBox.ignoreLogs(['Animated: `useNativeDriver`', "Warning: Failed child context type: Invalid child context"]);

        onHandlePermission(); //Pede permissão da camera.

        AsyncStorage.getItem("departamento").then(function (data) {

            if (data) {
                let dados = JSON.parse(data);
                setDepartamento(dados.pat_departamento.codigo);
                setLocal(dados.pat_departamento.local)
                setSala(dados.pat_local.nome_local);
                setDepartamentoDesc(dados.aux_departamento.descricao);
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

                if (status) {

                    setDepartamento(dados.pat_departamento.codigo);
                    setLocal(dados.pat_departamento.local);

                    setDepartamentoDesc(dados.aux_departamento.descricao);
                    setSala(dados.pat_local.nome_local);

                    AsyncStorage.setItem("departamento", JSON.stringify(dados));

                    limparCampos();

                    setPatrimonio(prev => ({...prev, cod_qrcode: ""}));
                    setQr_code("");
                    setCodPatrimonio(0);


                } else {
                    alert(msg);
                }

                setTimeout(() => {
                    setOpenCameraDep(!openCameraDep);
                }, 1000);
            });
    }

    const handleOpenCameraDep = () => {
        setOpenCameraDep(true);
    }

    const handleOpenCameraPat = () => {
        setCodPatrimonio(0);
        setModalVisible(!modalVisible);
        setScannedPat(false);

    }

    const handleScannedPatrimonio = async ({type, data}) => {
        setScannedPat(true);
        setModalVisible(!modalVisible);

        await axios.post("http://192.168.0.151:8082/_apps/app_teste/patrimonio/patrimonio.php",
            {qr_code: data, local, departamento, acao: "ler_patrimonio"}).then(function (response) {
            const {status, msg, dados, acao} = response.data;


            if (status) {
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

                if (acao === "alterar") {// ALTERAR

                    setPatrimonio({
                        ...patrimonio,
                        ["codigo"]: dados.pat_patrimonio.codigo,
                        ["titulo"]: dados.pat_patrimonio.titulo,
                        ["descricao"]: dados.pat_patrimonio.descricao,
                        ["estado_conservacao"]: dados.pat_patrimonio.estado_conservacao,
                        ["categoria"]: dados.pat_patrimonio.categoria,
                        ["acao"]: "alterar"
                    });

                    setCod_categoria(dados.pat_patrimonio.categoria);
                    setCod_estado_conservacao(dados.pat_patrimonio.estado_conservacao);
                    setCodPatrimonio(dados.pat_patrimonio.codigo);

                    if (dados.pat_patrimonio.imagens) {
                        setImagemList([]);
                        dados.pat_patrimonio.imagens.map((image, index) => {
                            setImagemList(prev => [...prev, {
                                nome: image.nome,
                                source: {uri: image.url},
                                dimensions: {width: 150, height: 150}
                            }]);
                        });
                    }

                } else { // CADASTRAR
                    setPatrimonio(prev => ({...prev, acao: "Cadastrar"}));
                    limparCampos();
                }

                setPatrimonio(prev => ({...prev, local: local}));
                setPatrimonio(prev => ({...prev, departamento: departamento}));
                setPatrimonio(prev => ({...prev, cod_qrcode: dados.pat_qr_code.codigo}));

                setCodPatrimonio(dados.pat_qr_code.codigo);

                setQr_code(data);
            } else {
                alert(msg);
            }

            setOpenCameraPat(false);
        });
    };

    const handleSubmitPatrimonio = async () => {

        var novas_imagens = imagemList.filter(image => image.novo == true);

        novas_imagens.map((item, index) => {
            patrimonio.fotos.push(item.source.uri);
        });

        await axios.post("http://192.168.0.151:8082/_apps/app_teste/patrimonio/inserir_patrimonio.php", patrimonio)
            .then(function (response) {
                const {status, msg, novo, dados} = response.data;

                if (status) {
                    alert(msg);
                    if (novo === true) {
                        setPatrimonio(prev => ({...prev, acao: "alterar"}));
                        setPatrimonio(prev => ({...prev, codigo: dados.codigo}));
                    }

                    setPatrimonio(prev => ({...prev, fotos: []}))

                    if (dados.imagens) {
                        setImagemList([]);

                        dados.imagens.map((image, index) => {
                            setImagemList(prev => [...prev, {
                                nome: image.nome,
                                source: {uri: image.url},
                                dimensions: {width: 150, height: 150}
                            }]);
                        });
                    }
                } else {
                    alert(msg);
                }
            });
    }

    const limparCampos = () => {
        setPatrimonio(prev => ({
            ...prev,
            titulo: "",
            descricao: "",
            estado_conservacao: "",
            categoria: ""
        }));

        setCod_categoria("");
        setCod_estado_conservacao("");
    }

    const capturaFoto = async () => {
        if (camRef) {

            try {
                const data = await camRef.current.takePictureAsync({base64: true, skipProcessing: true});//enabled base64 - insert into ({base64: true})
                setCapturePhoto(data.base64);
                setPrevisualizacao(true);

            } catch (error) {
                console.log("Error: " + error);
            }
        }
    }

    const salvarFoto = async () => {
        setPrevisualizacao(!previsualizacao);
        alert("Foto salva com sucesso");

        await setImagemList(prev => [...prev, {
            source: {uri: `data:image/png;base64, ${capturePhoto}`},
            novo: true,
        }
        ]);
        //await setImagemDataList(prev => [...prev, capturePhoto]);
        //patrimonio.fotos.push(capturePhoto);
    }

    const removeFoto = async () => {
        var nome = imagemList[imageSelected].nome;
        var codigo = patrimonio.codigo;

        Alert.alert(
            "Aviso!",
            "Deseja remover está foto?", [
                {
                    text: "Sim",
                    onPress: async () => {

                        if (!imagemList[imageSelected].novo) {
                            await axios.post("http://192.168.0.151:8082/_apps/app_teste/patrimonio/patrimonio.php", {
                                acao: "remover_foto",
                                nome: nome,
                                codigo: codigo,
                            }).then((response) => {
                                const {status, msg} = response.data;

                                if (status) {
                                    alert(msg);
                                } else {
                                    alert(msg);
                                }
                            });
                        }

                        imagemList.splice(imageSelected, 1);
                    },
                },
                {
                    text: "Não",
                },
            ]);
    }

    const galleryCount = () => {
        const images = imagemList;

        return (
            <View style={{
                position: 'absolute',
                left: (Dimensions.get('window').width / 2) - 50,
                right: 0,
                bottom: 80,
                height: 50,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: "center",
                width: '20%',
                backgroundColor: 'rgba(0, 0, 0, .5)',
                zIndex: 999,
            }}>
                <Text
                    style={{
                        textAlign: 'right',
                        color: 'white',
                        fontSize: 15,
                        fontStyle: 'italic',
                        paddingRight: '10%'
                    }}>
                    {imageSelected + 1} / {images.length}
                </Text>
            </View>
        );
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <ScrollView style={styles.container}>

            {/* Modal da Camera de selecionar departamento */}
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

            {/* Modal da Camera de selecionar patrimônio */}
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

            {/* Modal da Camera de tirar foto do patrimonio */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={cameraFotoOpen}
                onRequestClose={() => {
                    setCameraFotoOpen(!cameraFotoOpen);
                }}>
                <Camera
                    style={{flex: 1}}
                    type={Camera.Constants.Type.back}
                    ref={camRef}
                >
                    <View style={{position: "absolute", bottom: 20, margin: 0, flex: 1, width: '100%'}}>
                        <View
                            style={{alignItems: "center", justifyContent: "center", flexDirection: "column", flex: 1}}>

                            <TouchableOpacity
                                style={{
                                    paddingHorizontal: '20%',
                                    paddingVertical: 15,
                                    borderWidth: 1,
                                    borderColor: "#FFFFFF",
                                    borderRadius: 8
                                }}
                                onPress={capturaFoto}
                            >
                                <Text style={[styles.textWhite, styles.textCenter]}>
                                    <Icon style={{fontSize: 18}} name="camera-outline"/>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Camera>

            </Modal>

            {/* Modal de previsualização do patrimonio */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={previsualizacao}
                onRequestClose={() => {
                    setPrevisualizacao(!previsualizacao);
                }}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
                    <Image
                        style={{width: '100%', height: 450}}
                        source={{uri: `data:image/png;base64, ${capturePhoto}`}}
                    />

                    <View style={{margin: 10, flexDirection: 'row'}}>
                        <TouchableOpacity style={{margin: 10}} onPress={() => setPrevisualizacao(!previsualizacao)}>
                            <Icon style={{fontSize: 36, color: "red"}} name="close-outline"/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{margin: 10}} onPress={salvarFoto}>
                            <Icon style={{fontSize: 36, color: "green"}} name="save-outline"/>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <View style={{flex: 1}}>
                <TouchableOpacity style={styles.buttonSelecionaDep} onPress={handleOpenCameraDep}>
                    <Text style={styles.textSelecionaDep}>
                        <Icon style={{fontSize: 18}} name="camera-outline"/> Selecionar departamento
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
                                            <Text>{departamentoDesc}</Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        style={[styles.buttonSelecionaDep, {marginTop: 15}]}
                                        onPress={handleOpenCameraPat}
                                    >
                                        <Text style={styles.textSelecionaDep}>
                                            <Icon style={{fontSize: 18}} name="camera-outline"/> Escanear
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
                        if (codPatrimonio) {
                            return (
                                <View style={{flex: 1, padding: 10, marginBottom: 10}}>
                                    <View style={{flex: 1, marginTop: 20}}>

                                        <View style={styles.inputContainer}>
                                            <Text>Ação</Text>
                                            <Text style={styles.textBold}>{patrimonio.acao}</Text>
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
                                                zIndex={1000}
                                                itemKey="value"
                                                listMode="SCROLLVIEW"
                                                onChangeValue={(value) => {
                                                    setPatrimonio({
                                                        ...patrimonio,
                                                        ["categoria"]: value,
                                                    });
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
                                                zIndex={1002}
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

                                        <View style={[styles.inputContainer, {
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setCameraFotoOpen(!cameraFotoOpen);
                                                }}
                                                style={[styles.buttonSelecionaDep, {width: "48%"}]}>
                                                <Text style={{color: "#FFFFFF", textAlign: "center"}}>
                                                    <Icon style={{fontSize: 18}} name="camera-outline"/> Adicionar foto
                                                </Text>
                                            </TouchableOpacity>

                                            {imagemList.length > 0 &&
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setModalFotoVisible(!modalFotoVisible);
                                                }}
                                                style={[styles.buttonSelecionaDep, {
                                                    width: "48%",
                                                    backgroundColor: "#007bff"
                                                }]}>
                                                <Text style={{color: "#FFFFFF", textAlign: "center"}}>
                                                    <Icon style={{fontSize: 18}} name="images-outline"/> Visualizar
                                                    fotos
                                                </Text>

                                            </TouchableOpacity>
                                            }

                                            <Modal
                                                animationType="slide"
                                                transparent={false}
                                                visible={modalFotoVisible}
                                                onRequestClose={() => {
                                                    setModalFotoVisible(!modalFotoVisible);
                                                }}
                                            >
                                                <View style={{flex: 1, position: "relative"}}>
                                                    {galleryCount()}
                                                    <TouchableOpacity
                                                        onPress={() => setModalFotoVisible(!modalFotoVisible)}
                                                        style={{
                                                            position: "absolute",
                                                            top: 10,
                                                            right: 10,
                                                            color: "#FFFFFF",
                                                            zIndex: 999
                                                        }}>
                                                        <Text style={{color: "#FFFFFF"}}>
                                                            <Icon style={{fontSize: 36}} name="close-outline"/>
                                                        </Text>
                                                    </TouchableOpacity>

                                                    <Gallery
                                                        style={{flex: 1, backgroundColor: 'black'}}
                                                        images={imagemList}
                                                        initialPage={0}
                                                        onPageSelected={(pos) => {
                                                            setImageSelected(pos);
                                                        }}
                                                    />

                                                    <View style={styles.modalFotosRemoverContent}>
                                                        <TouchableOpacity onPress={removeFoto}>
                                                            <Text>
                                                                <Icon style={{fontSize: 18}}
                                                                      name="trash-outline"/> Remover
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </Modal>
                                        </View>

                                        {
                                            (() => {
                                                var qtdFotosNovas = imagemList.filter(image => image.novo == true).length;
                                                if (qtdFotosNovas) {
                                                    return (<View
                                                        style={{
                                                            padding: 4,
                                                            flexDirection: 'column',
                                                            alignItems: "flex-end"
                                                        }}
                                                    >
                                                        <Text style={{color: "#721c24"}}>
                                                            {qtdFotosNovas} foto(s) Pendente
                                                        </Text>
                                                    </View>);
                                                }
                                                return null;
                                            })()
                                        }

                                        <TouchableOpacity
                                            style={[styles.buttonSelecionaDep, {marginTop: 15}]}
                                            onPress={handleSubmitPatrimonio}
                                        >
                                            <Text style={styles.textSelecionaDep}>
                                                <Icon style={{fontSize: 18}} name="save-outline"/> Salvar
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
        marginTop: 10,
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

    textWhite: {
        color: "#FFFFFF",
    },

    textCenter: {
        textAlign: "center",
    },

    dropdown_style: {
        width: '100%',
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#ccc",
    },

    modalFotosRemoverContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
    }
});