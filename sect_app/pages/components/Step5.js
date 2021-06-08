import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Checkbox } from 'react-native-paper';
import api from '../../services/api';

const Step5 = (props) => {
    useEffect(() => {
        api.post('socio/destino_dejetos.php', {})
        .then(function (response) {

          const { label } = response.data;
          //console.log(response.data);
          setItemSe_ruj_destino_dejetos(response.data);
        });

    }, []);
    const [se_ruj_tratamento_agua_clorada, setSe_ruj_tratamento_agua_clorada] = React.useState(false);
    const [se_ruj_tratamento_agua_filtrada, setSe_ruj_tratamento_agua_filtrada] = React.useState(false);
    const [se_ruj_tratamento_agua_coada, setSe_ruj_tratamento_agua_coada] = React.useState(false);
    const [se_ruj_tratamento_agua_fervida, setSe_ruj_tratamento_agua_fervida] = React.useState(false);
    const [se_ruj_tratamento_agua_nenhum, setSe_ruj_tratamento_agua_nenhum] = React.useState(false);

    const [se_ruj_rede_agua_publica, setSe_ruj_rede_agua_publica] = React.useState(false);
    const [se_ruj_rede_agua_manual, setSe_ruj_rede_agua_manual] = React.useState(false);
    const [se_ruj_rede_agua_poco, setSe_ruj_rede_agua_poco] = React.useState(false);
    const [se_ruj_rede_agua_outros, setSe_ruj_rede_agua_outros] = React.useState(false);

    const [se_ruj_rede_energia_publica, setSe_ruj_rede_energia_publica] = React.useState(false);
    const [se_ruj_rede_energia_solar, setSe_ruj_rede_energia_solar] = React.useState(false);
    const [se_ruj_rede_energia_outros, setSe_ruj_rede_energia_outros] = React.useState(false);
    const [se_ruj_rede_energia_gerador_part, setSe_ruj_rede_energia_gerador_part] = React.useState(false);

    const [se_ruj_coleta_lixo_outros, setOutrosSe_ruj_coleta_lixo_outros] = useState('');
    const [outrosSe_ruj_destino_dejetos, setOutrosSe_ruj_destino_dejetos] = useState('');
    const [se_ruj_sanitario_Interno, setSe_ruj_sanitario_Interno] = React.useState(false);
    const [se_ruj_sanitario_externo, setSe_ruj_sanitario_externo] = React.useState(false);
    const [se_ruj_sanitario_ceu_aberto, setSe_ruj_sanitario_ceu_aberto] = React.useState(false);
    const [se_ruj_sanitario_nao_possui, setSe_ruj_sanitario_nao_possui] = React.useState(false);

    const [se_ruj_coleta_lixo_publica, setSe_ruj_coleta_lixo_publica] = React.useState(false);
    const [se_ruj_coleta_lixo_queima, setSe_ruj_coleta_lixo_queima] = React.useState(false);
    const [se_ruj_coleta_lixo_enterra, setSe_ruj_coleta_lixo_enterra] = React.useState(false);
    const [se_ruj_coleta_lixo_reaproveita, setSe_ruj_coleta_lixo_reaproveita] = React.useState(false);
    const [se_ruj_coleta_lixo_outros_, setSe_ruj_coleta_lixo_outros] = React.useState(false);

    const [openSe_ruj_destino_dejetos, setOpenSe_ruj_destino_dejetos] = useState(false);
  const [valorSe_ruj_destino_dejetos, setValorSe_ruj_destino_dejetos] = useState(null);
  const [itemSe_ruj_destino_dejetos, setItemSe_ruj_destino_dejetos] = useState([
    { label: '123', value: '123' },
    { label: '456', value: '456' }
  ]);

    return (
        <>
            <View style={styles.form8}>
                <View style={styles.rect2}>
                    <Text style={styles.titulo} >SANEAMENTO BÁSICO E INSTALAÇÕES SANITÁRIAS</Text>
                </View>
                <View style={styles.municipio}>
                    <Text >Sanitário</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_sanitario_Interno ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"1"}
                        onPress={() => {
                            setSe_ruj_sanitario_Interno(!se_ruj_sanitario_Interno);
                        }}
                    />
                    <Text style={styles.checkboxText}>Interno</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_sanitario_externo ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"1"}
                        onPress={() => {
                            setSe_ruj_sanitario_externo(!se_ruj_sanitario_externo);
                        }}
                    />
                    <Text style={styles.checkboxText}>Externo</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_sanitario_ceu_aberto ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"1"}
                        onPress={() => {
                            setSe_ruj_sanitario_ceu_aberto(!se_ruj_sanitario_ceu_aberto);
                        }}
                    />
                    <Text style={styles.checkboxText}>Ceu aberto</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_sanitario_nao_possui ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"1"}
                        onPress={() => {
                            setSe_ruj_sanitario_nao_possui(!se_ruj_sanitario_nao_possui);
                        }}
                    />
                    <Text style={styles.checkboxText}>Nao possui</Text>
                </View>
                <View style={styles.municipio}>
                    <Text>Destino dos Dejetos</Text>
                </View>

                <DropDownPicker
                    style={styles.Dejetos}
                    open={openSe_ruj_destino_dejetos}
                    value={valorSe_ruj_destino_dejetos}
                    items={itemSe_ruj_destino_dejetos}
                    setOpen={setOpenSe_ruj_destino_dejetos}
                    setValue={setValorSe_ruj_destino_dejetos}
                    setItems={setItemSe_ruj_destino_dejetos}
                    listMode="SCROLLVIEW"
                    placeholder="Selecione::"
                />


                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        style={styles.inputOutrosDejetos}
                        onChangeText={setOutrosSe_ruj_destino_dejetos}
                        value={outrosSe_ruj_destino_dejetos}
                        placeholder={" Outros"}
                    />
                </View>
                <View style={styles.municipio}>
                    <Text>Lixo</Text>
                </View>

                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_coleta_lixo_publica ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"1"}
                        onPress={() => {
                            setSe_ruj_coleta_lixo_publica(!se_ruj_coleta_lixo_publica);
                        }}
                    />
                    <Text style={styles.checkboxText}>Pública</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_coleta_lixo_queima ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"2"}
                        onPress={() => {
                            setSe_ruj_coleta_lixo_queima(!se_ruj_coleta_lixo_queima);
                        }}
                    />
                    <Text style={styles.checkboxText}>Queima</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_coleta_lixo_enterra ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"3"}
                        onPress={() => {
                            setSe_ruj_coleta_lixo_enterra(!se_ruj_coleta_lixo_enterra);
                        }}
                    />
                    <Text style={styles.checkboxText}>Enterra</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_coleta_lixo_reaproveita ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"4"}
                        onPress={() => {
                            setSe_ruj_coleta_lixo_reaproveita(!se_ruj_coleta_lixo_reaproveita);
                        }}
                    />
                    <Text style={styles.checkboxText}>Reaproveita</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_coleta_lixo_outros_ ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"5"}
                        onPress={() => {
                            setSe_ruj_coleta_lixo_outros(!se_ruj_coleta_lixo_outros_);
                        }}
                    />
                    <Text style={styles.checkboxText}>Outros</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        style={styles.inputOutrosDejetos}
                        onChangeText={setOutrosSe_ruj_coleta_lixo_outros}
                        value={se_ruj_coleta_lixo_outros}
                        placeholder={" Outros"}
                    />
                </View>
                <View style={styles.municipio}>
                    <Text>Rede de Energia</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_rede_energia_publica ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"1"}
                        onPress={() => {
                            setSe_ruj_rede_energia_publica(!se_ruj_rede_energia_publica);
                        }}
                    />
                    <Text style={styles.checkboxText}>Pública</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_rede_energia_gerador_part ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"2"}
                        onPress={() => {
                            setSe_ruj_rede_energia_gerador_part(!se_ruj_rede_energia_gerador_part);
                        }}
                    />
                    <Text style={styles.checkboxText}>Gerador Particular</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_rede_energia_solar ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"3"}
                        onPress={() => {
                            setSe_ruj_rede_energia_solar(!se_ruj_rede_energia_solar);
                        }}
                    />
                    <Text style={styles.checkboxText}>Solar</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_rede_energia_outros ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"4"}
                        onPress={() => {
                            setSe_ruj_rede_energia_outros(!se_ruj_rede_energia_outros);
                        }}
                    />
                    <Text style={styles.checkboxText}>Outros</Text>
                </View>
                <View style={styles.municipio}>
                    <Text>Rede de Agua</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_rede_agua_publica ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"1"}
                        onPress={() => {
                            setSe_ruj_rede_agua_publica(!se_ruj_rede_agua_publica);
                        }}
                    />
                    <Text style={styles.checkboxText}>Rede pública de abastecimento</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_rede_agua_manual ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"2"}
                        onPress={() => {
                            setSe_ruj_rede_agua_manual(!se_ruj_rede_agua_manual);
                        }}
                    />
                    <Text style={styles.checkboxText}>Manual</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_rede_agua_poco ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"3"}
                        onPress={() => {
                            setSe_ruj_rede_agua_poco(!se_ruj_rede_agua_poco);
                        }}
                    />
                    <Text style={styles.checkboxText}>Poço artesiano</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_rede_agua_outros ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"4"}
                        onPress={() => {
                            setSe_ruj_rede_agua_outros(!se_ruj_rede_agua_outros);
                        }}
                    />
                    <Text style={styles.checkboxText}>Outros</Text>
                </View>
                <View style={styles.municipio}>
                    <Text>Tratamento da agua</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_tratamento_agua_clorada ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"1"}
                        onPress={() => {
                            setSe_ruj_tratamento_agua_clorada(!se_ruj_tratamento_agua_clorada);
                        }}
                    />
                    <Text style={styles.checkboxText}>Clorada</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_tratamento_agua_filtrada ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"2"}
                        onPress={() => {
                            setSe_ruj_tratamento_agua_filtrada(!se_ruj_tratamento_agua_filtrada);
                        }}
                    />
                    <Text style={styles.checkboxText}>Filtrada</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_tratamento_agua_coada ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"3"}
                        onPress={() => {
                            setSe_ruj_tratamento_agua_coada(!se_ruj_tratamento_agua_coada);
                        }}
                    />
                    <Text style={styles.checkboxText}>Coada</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_tratamento_agua_fervida ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"4"}
                        onPress={() => {
                            setSe_ruj_tratamento_agua_fervida(!se_ruj_tratamento_agua_fervida);
                        }}
                    />
                    <Text style={styles.checkboxText}>Fervida</Text>
                </View>
                <View style={styles.checkboxlabel}>
                    <Checkbox
                        status={se_ruj_tratamento_agua_nenhum ? 'checked' : 'unchecked'}
                        color={"blue"}
                        testID={"5"}
                        onPress={() => {
                            setSe_ruj_tratamento_agua_nenhum(!se_ruj_tratamento_agua_nenhum);
                        }}
                    />
                    <Text style={styles.checkboxText}>Não realiza nenhum tratamento</Text>
                </View>
            </View>

        </>


    )
};

const styles = StyleSheet.create({
    inputOutrosDejetos: {
        height: 40,
        width: '85%',
        marginTop: 10,
        marginLeft: 10,
        borderWidth: 1,
        backgroundColor: 'white'
      },
    Dejetos: {
        marginTop: 5,
        height: 40,
        width: '85%',
        marginLeft: 30,
        borderRadius: 0,
        borderWidth: 1,
      },

    checkboxText: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignSelf: 'stretch',
        position: 'absolute',
        marginTop: 9,
        marginLeft: 40,
    },
    checkboxlabel: {
        marginTop: 5,
        height: 25,
        width: '85%',
        marginLeft: 30,

    },
    form8: {
        width: 340,
        height: 1070,
        marginLeft: 25,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "rgba(74,144,226,1)",
        borderRadius: 3
      },
    municipio: {
        color: "#121212",
        marginLeft: 30,
        marginTop: 15,
    },
    Mao_de_obra: {
        marginTop: 5,
        height: 40,
        width: '85%',
        marginLeft: 30,
        borderRadius: 0,
        borderWidth: 1,

    },
    input2: {
        height: 40,
        width: '85%',
        marginTop: 2,
        borderWidth: 1,
        backgroundColor: 'white'
    },

    rect2: {
        width: 340,
        height: 36,
        backgroundColor: "rgba(74,144,226,1)",
        borderRadius: 3,
    },

    titulo: {
        color: "white",
        marginLeft: 9,
        marginTop: 1
    },
    dropAtividades: {
        zIndex: 9999,
    },

    inputOutrosBeneficios: {
        height: 40,
        width: '85%',
        marginTop: 5,
        marginLeft: 30,
        borderWidth: 1,
        backgroundColor: 'white'
    },
});

export default Step5;