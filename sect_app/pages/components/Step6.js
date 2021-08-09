import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Checkbox } from 'react-native-paper';
import api from '../../services/api';

const Step6 = (props) => {
    useEffect(() => {
        api.post('socio/formacao_atuacao.php', {})
        .then(function (response) {

          const { label } = response.data;
          //console.log(response.data);
          setItemSe_ruj_formacao_atuacao(response.data);
        });

    api.post('socio/investimento_financeiro.php', {})
    .then(function (response) {

      const { label } = response.data;
      //console.log(response.data);
      setItemSe_ruj_investimento_financeiro(response.data);
    });

    }, []);
    const [openSe_ruj_investimento_financeiro, setOpenSe_ruj_investimento_financeiro] = useState(false);
    const [valorSe_ruj_investimento_financeiro, setValorSe_ruj_investimento_financeiro] = useState(null);
    const [itemSe_ruj_investimento_financeiro, setItemSe_ruj_investimento_financeiro] = useState([
      { label: 'Menos de 100 mil reais', value: 'Menos de 100 mil reais' },


    ]);
    const [openSe_ruj_formacao_atuacao, setOpenSe_ruj_formacao_atuacao] = useState(false);
    const [valorSe_ruj_formacao_atuacao, setValorSe_ruj_formacao_atuacao] = useState(null);
    const [itemSe_ruj_formacao_atuacao, setItemSe_ruj_formacao_atuacao] = useState([
      { label: 'Diretamente da Comunidade', value: 'Diretamente da Comunidade' },
      { label: 'Indiretamente por meio dos colaboradores', value: 'Indiretamente por meio dos colaboradores' }
    ]);
    const [openSe_ruj_responsabilidade_social, setOpenSe_ruj_responsabilidade_social] = useState(false);
    const [valorSe_ruj_responsabilidade_social, setValorSe_ruj_responsabilidade_social] = useState(null);
    const [itemSe_ruj_responsabilidade_social, setItemSe_ruj_responsabilidade_social] = useState([
      { label: 'Sim', value: 'Sim' },
      { label: 'Nao', value: 'Nao' }
    ]);
    const [se_ruj_bens_moveis_geladeira, setSe_ruj_bens_moveis_geladeira] = React.useState(false);
    const [se_ruj_bens_moveis_maquinas, setSe_ruj_bens_moveis_maquinas] = React.useState(false);
    const [se_ruj_bens_moveis_equipamento, setSe_ruj_bens_moveis_equipamento] = React.useState(false);
    const [se_ruj_bens_moveis_balcao, setSe_ruj_bens_moveis_balcao] = React.useState(false);
    const [se_ruj_bens_moveis_prateleiras, setSe_ruj_bens_moveis_prateleiras] = React.useState(false);
    const [se_ruj_bens_moveis_fax, setSe_ruj_bens_moveis_fax] = React.useState(false);
    const [se_ruj_bens_moveis_telefone, setSe_ruj_bens_moveis_telefone] = React.useState(false);
    const [se_ruj_bens_moveis_computador, setSe_ruj_bens_moveis_computador] = React.useState(false);
    const [se_ruj_bens_moveis_gerador, setSe_ruj_bens_moveis_gerador] = React.useState(false);
    const [se_ruj_bens_moveis_escritorio, setSe_ruj_bens_moveis_escritorio] = React.useState(false);
    const [se_ruj_bens_moveis_exaustor, setSe_ruj_bens_moveis_exaustor] = React.useState(false);
    const [se_ruj_bens_moveis_empilhadeira, setSe_ruj_bens_moveis_empilhadeira] = React.useState(false);
    const [se_ruj_bens_moveis_freezer, setSe_ruj_bens_moveis_freezer] = React.useState(false);
    const [se_ruj_bens_moveis_fogao, setSe_ruj_bens_moveis_fogao] = React.useState(false);
    const [se_ruj_bens_moveis_forno, setSe_ruj_bens_moveis_forno] = React.useState(false);
    const [se_ruj_bens_moveis_caixa, setSe_ruj_bens_moveis_caixa] = React.useState(false);
    const [se_ruj_bens_moveis_balanca, setSe_ruj_bens_moveis_balanca] = React.useState(false);
    const [se_ruj_bens_moveis_transporte, setSe_ruj_bens_moveis_transporte] = React.useState(false);
    const [se_ruj_bens_moveis_ar, setSe_ruj_bens_moveis_ar] = React.useState(false);
    const [se_ruj_bens_moveis_guindaste, setSe_ruj_bens_moveis_guindaste] = React.useState(false);
    const [se_ruj_bens_moveis_equipamento_elev, setSe_ruj_bens_moveis_equipamento_elev] = React.useState(false);

    const [se_ruj_bens_imoveis_lote, setSe_ruj_bens_imoveis_lote] = React.useState(false);
    const [se_ruj_bens_imoveis_casa, setSe_ruj_bens_imoveis_casa] = React.useState(false);
    const [se_ruj_bens_imoveis_predio, setSe_ruj_bens_imoveis_predio] = React.useState(false);
    const [se_ruj_bens_imoveis_apart, setSe_ruj_bens_imoveis_apart] = React.useState(false);



    return (
        <>
     <View style={styles.form9}>
            <View style={styles.rect2}>
              <Text style={styles.titulo}>Patrimonio</Text>
            </View>
            <View style={styles.municipio}>
              <Text>Bens Móveis</Text>
            </View>

            <View style={styles.checkboxlabel}>
              <Checkbox
                status={se_ruj_bens_moveis_geladeira ? 'checked' : 'unchecked'}
                color={"blue"}
                testID={"1"}
                onPress={() => {
                  setSe_ruj_bens_moveis_geladeira(!se_ruj_bens_moveis_geladeira);
                }}
              />
              <Text style={styles.checkboxText}>Geladeira comercial</Text>
            </View>

            <View style={styles.municipio}>
              <Text>Bens Imóveis</Text>
            </View>

            <View style={styles.checkboxlabel}>
              <Checkbox
                status={se_ruj_bens_imoveis_lote ? 'checked' : 'unchecked'}
                color={"blue"}
                testID={"1"}
                onPress={() => {
                  setSe_ruj_bens_imoveis_lote(!se_ruj_bens_imoveis_lote);
                }}
              />
              <Text style={styles.checkboxText}>Lote</Text>
            </View>


          </View>

          <View style={styles.form10}>
            <View style={styles.rect2}>
              <Text style={styles.titulo}>RESPONSABILIDADE SOCIAL NA ORGANIZAÇÃO</Text>
            </View>
              <Text style={styles.municipio}>Possui programa de responsabilidade social</Text>
              <DropDownPicker
                style={styles.select}
                open={openSe_ruj_responsabilidade_social}
                value={valorSe_ruj_responsabilidade_social}
                items={itemSe_ruj_responsabilidade_social}
                setOpen={setOpenSe_ruj_responsabilidade_social}
                setValue={setValorSe_ruj_responsabilidade_social}
                setItems={setItemSe_ruj_responsabilidade_social}
                listMode="SCROLLVIEW"
                placeholder="Selecione"
              />
            <View style={styles.municipio}>
              <Text>Formação de Atuação</Text>
            </View>

              <DropDownPicker
                style={styles.select}
                open={openSe_ruj_formacao_atuacao}
                value={valorSe_ruj_formacao_atuacao}
                items={itemSe_ruj_formacao_atuacao}
                setOpen={setOpenSe_ruj_formacao_atuacao}
                setValue={setValorSe_ruj_formacao_atuacao}
                setItems={setItemSe_ruj_formacao_atuacao}
                listMode="SCROLLVIEW"
                placeholder="Selecione"
              />

            <View style={styles.municipio}>
              <Text>Investimento Financeiro destinado</Text>
            </View>

              <DropDownPicker
                style={styles.select}
                open={openSe_ruj_investimento_financeiro}
                value={valorSe_ruj_investimento_financeiro}
                items={itemSe_ruj_investimento_financeiro}
                setOpen={setOpenSe_ruj_investimento_financeiro}
                setValue={setValorSe_ruj_investimento_financeiro}
                setItems={setItemSe_ruj_investimento_financeiro}
                listMode="SCROLLVIEW"
                placeholder="Selecione"
              />

          </View>

        </>

    )
};

const styles = StyleSheet.create({
    select: {
        height: 40,
        width: '85%',
        marginLeft: 30,
        height: 40,
        borderRadius: 0,
        borderWidth: 1,
    },
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
    form9: {
        width: 340,
        height: 890,
        marginLeft: 25,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "rgba(74,144,226,1)",
        borderRadius: 3
      },
      form10: {
        width: 340,
        height: 310,
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

export default Step6;