import React from 'react';
import {View} from "react-native";
import {DataTable, Paragraph} from "react-native-paper";
import PatrimonioList from "./PatrimonioList";

function SalaList({dados, styles}) {

    if (dados.departamentos) {
        return dados.departamentos.map((departamento, index) => {
            return (
                <View key={departamento.codigo}>
                    <View style={styles.card}>
                        <Paragraph
                            style={styles.paragraph}>
                            {dados.sala}{" > "}{departamento.nome}
                        </Paragraph>

                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Titulo</DataTable.Title>
                                <DataTable.Title>Categoria</DataTable.Title>
                                <DataTable.Title>Estado</DataTable.Title>
                            </DataTable.Header>

                            {

                                departamento.patrimonios && (
                                    departamento.patrimonios.map((patrimonio) => {
                                        return <PatrimonioList
                                            key={patrimonio.codigo}
                                            patrimonio={patrimonio}
                                        />
                                    })
                                )
                            }

                        </DataTable>
                    </View>
                </View>
            );
        })
    }
}

export default SalaList;