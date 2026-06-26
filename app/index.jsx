import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {

  const roteador = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Clique nos items abaixo</Text>

      <Button
        title="Consultar CEP"
        onPress={() => roteador.push("./cep")}
      />

      <Button
        title="Abrir banco"
        onPress={() => roteador.push("./banco")}
      />


    </View>
  );
}
