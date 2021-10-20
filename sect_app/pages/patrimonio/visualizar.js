import React, {useEffect, useState} from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    Modal,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import {Paragraph, Title} from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';

function Visualizar({navigation, route}) {

    const [patrimonio, setPatrimonio] = useState([]);
    const [openModalImagem, setOpenModalImagem] = useState(false);
    const [image, setImage] = useState("");

    const {codigo} = route.params;

    useEffect(() => {
        loadPatrimonio();
    }, []);

    async function loadPatrimonio() {
        const response = await axios.get("http://192.168.0.151:8082/_apps/app_teste/patrimonio/consultar_patrimonio.php", {
            params: {codigo, acao: "visualizar"}
        });

        setPatrimonio(response.data);
    }

    const modalImagem = async (imagemUrl) => {
        await setImage(imagemUrl);
        await setOpenModalImagem(true);
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <View>
                    <Title style={styles.title}>Título</Title>
                    <Paragraph>{patrimonio.titulo}</Paragraph>
                </View>

                <View>
                    <Title style={styles.title}>Estado de Conservação</Title>
                    <Paragraph>{patrimonio.est_descricao}</Paragraph>
                </View>

                <View>
                    <Title style={styles.title}>Descrição</Title>
                    <Paragraph>{patrimonio.descricao ? patrimonio.descricao : "Não informado"}</Paragraph>
                </View>

                <View>
                    <Title style={styles.title}>Departamento</Title>
                    <Paragraph>{patrimonio.ad_descricao}</Paragraph>
                </View>

                <View>
                    <Title style={styles.title}>Categoria</Title>
                    <Paragraph>{patrimonio.c_descricao}</Paragraph>
                </View>
            </View>

            <View style={[styles.card, {marginTop: 15, minHeight: 210}]}>
                <Title>Imagens</Title>

                {(() => {
                    if (patrimonio.imagens) {
                        return (
                            <FlatList
                                data={patrimonio.imagens}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item}) => (
                                    <TouchableOpacity onPress={() => {
                                        modalImagem(item.url);
                                    }}>
                                        <Image
                                            style={styles.image}
                                            source={{uri: item.url}}
                                        />
                                    </TouchableOpacity>
                                )}
                            >

                            </FlatList>
                        )
                    } else {
                        return <Text>Nenhuma imagem registrada</Text>
                    }
                })()}


                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={openModalImagem}
                    onRequestClose={() => {
                        setOpenModalImagem(!openModalImagem);
                    }}
                >
                    <TouchableOpacity
                        style={{position: "absolute", top: 20, right: 20, zIndex: 999}}
                        onPress={() => {
                            setOpenModalImagem(!openModalImagem);
                            setImage("");
                        }}
                    >
                        <Icon style={{fontSize: 28, fontWeight: "bold", color: "#FFFFFF"}} name="close-outline"/>
                    </TouchableOpacity>
                    <Image
                        accessible={true}
                        source={{uri: image}}
                        style={{width: '100%', height: '100%'}}
                    />
                </Modal>
            </View>
        </ScrollView>
    );
}

export default Visualizar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    card: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 8,
    },

    title: {
        fontWeight: "700",
        fontSize: 16
    },

    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 5,
        marginHorizontal: 5
    }
});