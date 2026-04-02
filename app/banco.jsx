import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function Banco() {

    const db = SQLite.openDatabaseSync('banco.db');

    const [valor, setValor] = useState("");
    const [dados, setDados] = useState([]);

    useEffect(() => {
        db.execSync("CREATE TABLE IF NOT EXISTS dados (id INTEGER PRIMARY KEY AUTOINCREMENT, valor TEXT)");
    }, []);

    function atualizarDados() {
        setDados([...dados, valor]);
        setValor("");
    }

    return (
        <View>
            <Text>Banco de dados</Text>
            <TextInput
                placeholder="Digite um valor"
                value={valor}
                onChangeText={setValor}
            />
            <Button
                title="Enviar"
                onPress={atualizarDados}
            />
            <View>
                {/* Flatlist exibe os itens do estado "dados" de forma personalizada. A propriedade "data" contém os dados a serem exibidos, renderItem define como cada item será renderizado e finalmente keyExtrator extrai a chave única de cada item. A chave única serve para identificar cada item de forma  para que o React possa otimizar a renderização. */}
                <FlatList
                    data={dados}
                    renderItem={
                        ({ item }) =>
                            <Text>{item}</Text>
                    }
                    keyExtractor={
                        (item, index) =>
                            index.toString()
                    }
                />
            </View>
        </View>
    );
}