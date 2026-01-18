import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export default function Dashboard() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Dashboard</Text>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create((theme)=>({
    container:{
        flex:1,
    }
}))