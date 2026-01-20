import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";
import { LanguageSwitch, ThemeSwitch } from "./components";


export default function Theme() {
    return (
        <SafeAreaView style={styles.container} >
            <ThemeSwitch />
            <LanguageSwitch />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create((theme)=>({
    container:{
        flex:1,
        paddingVertical:20,
        paddingHorizontal:10,
        backgroundColor:theme.colors.white,
    },
}))
