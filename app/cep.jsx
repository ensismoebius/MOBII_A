import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function Cep() {

    // Valor padrão é vazio, pois o usuário irá digitar o CEP
    const [cep, setCep] = useState("");
    // Valor padrão é null, pois armazenaremos um objeto no estado
    const [dados, setDados] = useState(null);

    async function consultarCep() {

        await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(resposta => resposta.json())
            .then(
                dadoEmJson => {
                    if (dadoEmJson.erro) {
                        setCep("CEP não existe");
                    } else {
                        // Deu certo
                        setDados(dadoEmJson);
                    }
                }
            );
    }

    return (
        <View>
            <TextInput
                placeholder="Digite o CEP"
                keyboardType="numeric"
            />
            <Button
                title="Consultar"
                onPress={consultarCep}
            />

            <View>
                <Text>Logradouro: {dados?.logradouro}</Text>
                <Text>Complemento: {dados?.complemento}</Text>
                <Text>Bairro: {dados?.bairro}</Text>
                <Text>Localidade: {dados?.localidade}</Text>
                <Text>UF: {dados?.uf}</Text>
            </View>



        </View>
    );
}