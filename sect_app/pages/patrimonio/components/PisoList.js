import React from 'react';
import {Text, View} from "react-native";
import {DataTable, Paragraph} from "react-native-paper";
import PatrimonioList from "./PatrimonioList";

function PisoList({dados, styles}) {
    return dados.salas.map((sala) => {

        if (sala.departamentos) {
            return (
                sala.departamentos.map((departamento, index) => {
                    return (
                        <View key={departamento.codigo}>
                            <View style={styles.card}>
                                <Paragraph
                                    style={styles.paragraph}>
                                    {dados.piso}{" > "}{sala.nome}{" > "}{departamento.nome}
                                </Paragraph>

                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>Titulo</DataTable.Title>
                                        <DataTable.Title>Categoria</DataTable.Title>
                                        <DataTable.Title>Estado</DataTable.Title>
                                    </DataTable.Header>

                                    {

                                        departamento.patrimonios && (
                                            departamento.patrimonios.map((patrimonio, index2) => {
                                                return <PatrimonioList
                                                    key={index2}
                                                    patrimonio={patrimonio}
                                                />
                                            })
                                        )
                                    }

                                </DataTable>
                            </View>
                        </View>
                    );
                }))
        } else {
            return (
                <View style={styles.card} key={sala.codigo}>
                    <Paragraph
                        style={styles.paragraph}>{dados.piso}{" > "}{sala.nome}</Paragraph>
                    <Text>Sem Departamentos cadastrados</Text>
                </View>

            )
        }
    })
}

export default PisoList;