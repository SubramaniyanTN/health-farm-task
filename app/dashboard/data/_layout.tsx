import { useCustomTranslation } from "@/locale";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";
export default function DataLayout() {
    const {bottom}=useSafeAreaInsets()
    const translation = useCustomTranslation();
    return (
        <Tabs  screenOptions={{ headerShown: false ,tabBarStyle:[styles.tabBarContainer,{paddingBottom:bottom+10}],tabBarLabelStyle:styles.tabBarLabel}} >
            <Tabs.Screen name="index" options={{ title: translation("data") }} />
            <Tabs.Screen name="fileupload" options={{ title:translation("file-upload") }} />
        </Tabs>
    )
}

const styles = StyleSheet.create((theme)=>({
    tabBarContainer:{
        backgroundColor:theme.colors.inputBackground,
        minHeight:80
    },
    tabBarLabel:{
        fontSize:16,
        fontWeight:"600",
        color:theme.colors.textPrimary,
    }
}))