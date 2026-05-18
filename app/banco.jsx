import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function Banco() {

    const db = SQLite.openDatabaseSync('banco.db');

    const [valor, setValor] = useState("");
    const [dados, setDados] = useState([]);
    const [idDoValorEditado, setIdDoValorEditado] = useState(0);
    const [editando, setEditando] = useState(false);

    useEffect(() => {

        db.execSync("CREATE TABLE IF NOT EXISTS dados (id INTEGER PRIMARY KEY AUTOINCREMENT, valor TEXT)");

        // Perceba que a linha acima é uma chamada SINCRONA, ou seja
        // ela trava a execução até que tenha terminado sua atribuição.
        // Nesse caso é importante que seja assim, pois não seria 
        // possivel carregar dados de uma tabela inexistente.
        carregarItems();
    }, []);

    function inserirItem() {
        // Verifica se há alguma coisa escrita dentro do estado
        // A função "trim" remove todos os expaços em excesso de
        // string, se houverem apenas espaços, tudo é removido
        if (!valor.trim()) {
            // Entrada inválida não salve coisa alguma!
            return;
        }

        // "?" é o que chamamos de "placeholder" do sql, tal "placeholder"
        // reserva espaço para o valor que será informado depois, no nosso
        // caso o valor vem do estado "valor" declarado anteriormente.
        db.runAsync("insert into dados (valor) values (?)", [valor]).then(
            () => {
                setValor("")
            }
        )
    }





    function atualizaItem() {
        // Verifica se há alguma coisa escrita dentro do estado
        // A função "trim" remove todos os expaços em excesso de
        // string, se houverem apenas espaços, tudo é removido
        if (!valor.trim()) {
            // Entrada inválida não salve coisa alguma!
            return;
        }

        // "?" é o que chamamos de "placeholder" do sql, tal "placeholder"
        // reserva espaço para o valor que será informado depois, no nosso
        // caso o valor vem do estado "valor" declarado anteriormente.
        db.runAsync(
            "update dados set valor = ? where id = ?",
            [valor, idDoValorEditado]
        ).then(
            () => {
                setValor("")
            }
        )
    }









    function carregarItems() {
        db.getAllAsync("select * from dados;").then(

            // Tanto faz o nome da variável: Ela é
            // apenas um receptáculo para os dados
            // que vem do banco de dados.
            (listaDoValoresRecuperados) => {
                setDados(listaDoValoresRecuperados);
            }
        )
    }


    function atualizarDados() {
        // setDados([...dados, valor]);
        inserirItem();
        carregarItems();
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
                        ({ item }) => (
                            <>
                                <Text>{item.valor}</Text>
                                <Button
                                    onPress={
                                        () => {
                                            setIdDoValorEditado(item.id);
                                            setEditando(true);
                                        }
                                    }
                                    title={editando ? "Editando..." : "Editar"}
                                />
                            </>
                        )
                    }
                    keyExtractor={
                        (item) =>
                            item.id.toString()
                    }
                />
            </View>
        </View>
    );
}
