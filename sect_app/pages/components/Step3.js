import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import api from '../../services/api';

const Step3 = (props) => {

  const [outrosBeneficios, setOutrosBeneficios] = useState('');
    const [openMao_de_obra, setOpenMao_de_obra] = useState(false);
    const [valorMao_de_obra, setValorMao_de_obra] = useState(null);
    const [itemMao_de_obra, setItemMao_de_obra] = useState([
      { label: '500', value: '500' },
      { label: '600', value: '600' }
    ]);

    const [openSe_ruj_associados, setOpenSe_ruj_associados] = useState(false);
    const [valorSe_ruj_associados, setValorSe_ruj_associados] = useState(null);
    const [itemSe_ruj_associados, setItemSe_ruj_associados] = useState([
      { label: '50', value: '50' },
      { label: '60', value: '60' }
    ]);

    const [openSe_ruj_cooperados, setOpenSe_ruj_cooperados] = useState(false);
    const [valorSe_ruj_cooperados, setValorSe_ruj_cooperados] = useState(null);
    const [itemSe_ruj_cooperados, setItemSe_ruj_cooperados] = useState([
      { label: '70', value: '70' },
      { label: '80', value: '80' }
    ]);

    const [openSe_ruj_beneficios_concedidos, setOpenSe_ruj_beneficios_concedidos] = useState(false);
    const [valorSe_ruj_beneficios_concedidos, setValorSe_ruj_beneficios_concedidos] = useState(null);
    const [itemSe_ruj_beneficios_concedidos, setItemSe_ruj_beneficios_concedidos] = useState([
      { label: '800', value: '800' },
      { label: '900', value: '900' }
    ]);

  useEffect(() => {


        var cod_processo = '';
        //carrega o valor do select na tela index.js
        AsyncStorage.getItem('codigo_pr').then(value => {
            //console.log(value);
            setSync(value);
            cod_processo = value;

        });

        AsyncStorage.getItem('codigo').then(codigo => {
            setDados_valor(codigo);
        })

        loadStep3();


}, []);

async function loadStep3(){
  await db.transaction((tx) => {
    tx.executeSql(
        "select * from aux_cooperados", [], (tx, results) => {
            //var len = results.rows.length, i;
            var temp = [];
            //console.log(len);
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
            }
            setItemSe_ruj_cooperados(temp);
        }
    );
    tx.executeSql(
        "select * from aux_associados", [], (tx, results) => {
            //var len = results.rows.length, i;
            var temp = [];
            //console.log(len);
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
                //console.log( results.rows.item(i).nome);
            }
            setItemSe_ruj_associados(temp);
        }
    );
    tx.executeSql(
        "select * from aux_mao_de_obra", [], (tx, results) => {
            //var len = results.rows.length, i;
            var temp = [];
            //console.log(len);
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
                //console.log( results.rows.item(i).nome);
            }
            setItemMao_de_obra(temp);
        }
    );
    tx.executeSql(
        "select * from aux_tipo_beneficios_sociais", [], (tx, results) => {
            //var len = results.rows.length, i;
            var temp = [];
            //console.log(len);
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push({ label: results.rows.item(i).descricao, value: results.rows.item(i).codigo });
                //console.log( results.rows.item(i).nome);
            }
            setItemSe_ruj_beneficios_concedidos(temp);
        }
    );

}, (err) => {
    console.error("There was a problem with the tx", err);
    return true;
}, (success) => {
    console.log("all done", success);
});
}




    return (
        <>
    <View style={styles.form5}>
            <View style={{ zIndex: 9999 }}>
              <View style={styles.rect2}>
                <Text style={styles.titulo} >NÚMERO DE EMPREGADOS E/OU ASSOCIADOS, COOPERADOS</Text>
              </View>
              <View style={styles.municipio}>
                <Text >Mão de Obra Empregada</Text>
              </View>
              <DropDownPicker
                style={styles.Mao_de_obra}
                open={openMao_de_obra}
                value={parseInt(valorMao_de_obra)}
                items={itemMao_de_obra}
                setOpen={setOpenMao_de_obra}
                setValue={setValorMao_de_obra}
                setItems={setItemMao_de_obra}
                onChangeValue={() => onPressTitle("se_ruj", "se_ruj_mao_de_obra", valorAtividade, sync)}
                listMode="SCROLLVIEW"
                placeholder="Selecione::"
              />

              <View style={styles.municipio}>
                <Text >Número de Associados</Text>
              </View>
              <DropDownPicker
                style={styles.Mao_de_obra}
                open={openSe_ruj_associados}
                value={valorSe_ruj_associados}
                items={itemSe_ruj_associados}
                setOpen={setOpenSe_ruj_associados}
                setValue={setValorSe_ruj_associados}
                setItems={setItemSe_ruj_associados}
                listMode="SCROLLVIEW"
                placeholder="Selecione::"
              />
              <View style={styles.municipio}>
                <Text >Número de Cooperados</Text>
              </View>
              <DropDownPicker
                style={styles.Mao_de_obra}
                open={openSe_ruj_cooperados}
                value={valorSe_ruj_cooperados}
                items={itemSe_ruj_cooperados}
                setOpen={setOpenSe_ruj_cooperados}
                setValue={setValorSe_ruj_cooperados}
                setItems={setItemSe_ruj_cooperados}
                listMode="SCROLLVIEW"
                placeholder="Selecione::"
              />
            </View>

          </View>

          <View style={styles.form6}>
            <View style={styles.rect2}>
              <Text style={styles.titulo} >POLÍTICA DE BENFÍCIOS</Text>
            </View>
            <View style={styles.municipio}>
              <Text >Tipos de Benefícios Concedidos</Text>
            </View>
            <DropDownPicker
              style={styles.Mao_de_obra}
              open={openSe_ruj_beneficios_concedidos}
              value={valorSe_ruj_beneficios_concedidos}
              items={itemSe_ruj_beneficios_concedidos}
              setOpen={setOpenSe_ruj_beneficios_concedidos}
              setValue={setValorSe_ruj_beneficios_concedidos}
              setItems={setItemSe_ruj_beneficios_concedidos}
              listMode="SCROLLVIEW"
              placeholder="Selecione::"
            />
            <TextInput
              style={styles.inputOutrosBeneficios}
              onChangeText={setOutrosBeneficios}
              value={outrosBeneficios}
              placeholder={"    Outros"}
            />
          </View>
        </>


    )
};

const styles = StyleSheet.create({
    form6: {
        width: 340,
        height: 215,
        marginLeft: 25,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "rgba(74,144,226,1)",
        borderRadius: 3,

      },
    form5: {
        width: 340,
        height: 340,
        marginLeft: 25,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "rgba(74,144,226,1)",
        borderRadius: 3,

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
    acessoText: {
        color: "#121212",
        marginTop: 20,
        marginLeft: 30,
        marginBottom: 9
    },
    titulo: {
        color: "white",
        marginLeft: 9,
        marginTop: 1
    },
    dropAtividades: {
        zIndex: 9999,
    },
    abrangencia: {
        height: 40,
        width: '85%',
        marginLeft: 30,
        height: 40,
        marginTop: 20,
        borderRadius: 0,
        borderWidth: 1,
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

export default Step3;