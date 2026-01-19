import { useGlobalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
export default function Chat() {
    const { id } = useGlobalSearchParams();
    return (
        <View style={styles.container}>
            <Text>{id}</Text>
        </View>
    )
}
const styles = StyleSheet.create((theme)=>({
    container:{
        flex:1,
        paddingHorizontal:10,
    },
}))