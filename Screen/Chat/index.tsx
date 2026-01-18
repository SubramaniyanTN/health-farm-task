import { useGlobalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Chat() {
    const { id } = useGlobalSearchParams();
    return (
        <SafeAreaView>
            <Text>{id}</Text>
        </SafeAreaView>
    )
}