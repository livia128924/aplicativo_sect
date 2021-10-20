import React from 'react';
import {DataTable} from "react-native-paper";
import {TouchableOpacity, Text} from 'react-native'
import {useNavigation} from "@react-navigation/native";

function PatrimonioList(props) {
    const {patrimonio} = props;
    const navigation = useNavigation();

    const visualizarPatrimonio = (codigo) => {
        navigation.navigate("Patrimonio - visualizar", {codigo});
    }

    return (
        <>
            <TouchableOpacity>
                <DataTable.Row onPress={() => visualizarPatrimonio(patrimonio.codigo)}>
                    <DataTable.Title>{patrimonio.titulo ? patrimonio.titulo : ""}</DataTable.Title>
                    <DataTable.Title>{patrimonio.categoria ? patrimonio.categoria : ""}</DataTable.Title>
                    <DataTable.Title>{patrimonio.estado ? patrimonio.estado : ""}</DataTable.Title>
                </DataTable.Row>
            </TouchableOpacity>
        </>
    );
}

export default PatrimonioList;