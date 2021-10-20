import React from 'react';
import {View} from "react-native";
import {DataTable, Paragraph} from "react-native-paper";
import PatrimonioList from "./PatrimonioList";

function DepartamentoList({dados, styles}) {

    return (
        <View>
            <View style={styles.card}>
                <Paragraph
                    style={styles.paragraph}>
                    {dados.departamento.nome}
                </Paragraph>

                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Titulo</DataTable.Title>
                        <DataTable.Title>Categoria</DataTable.Title>
                        <DataTable.Title>Estado</DataTable.Title>
                    </DataTable.Header>

                    {
                        dados.patrimonios && (
                            dados.patrimonios.map((patrimonio, index) => {
                                return <PatrimonioList key={index} patrimonio={patrimonio}/>
                            })
                        )
                    }

                </DataTable>
            </View>
        </View>
    )
}

export default DepartamentoList;