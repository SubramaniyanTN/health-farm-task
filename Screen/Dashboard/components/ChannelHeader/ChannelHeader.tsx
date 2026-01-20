import { ProfileAvatar, ScalableButton, ThemedText } from "@/components"
import { useAppSelector } from "@/redux/hooks/hooks"
import { ThemedSVG } from "@/ThemeSvg"
import { router } from "expo-router"
import { Pressable, View } from "react-native"
import { StyleSheet } from "react-native-unistyles"

const ChannelHeader = () => {
    const handleThemeNavigation = () => {
        router.push("/dashboard/theme")
    }
    const handleNavigation = () => {
        router.push("/dashboard/createchannel")
    }
    const {theme} = useAppSelector((state)=>state.theme);
    return (
        <View style={styles.headerContainer}>
        <ThemedText variant="title">Channels</ThemedText>
       <View style={styles.rightContainer} >
        <Pressable onPress={handleThemeNavigation} style={styles.svgContainer} >
        <ThemedSVG width={30} height={30} variants={theme === "dark" ? "dark-mode" : "light-mode"} fill={"white"} />
        </Pressable>
       <ScalableButton onPress={handleNavigation} label={null} style={styles.addButton} leftIcon={<ThemedSVG variants="add" fill={"white"} />} />
       <ProfileAvatar />
       </View>
        </View>
    )
}
export default ChannelHeader

const styles = StyleSheet.create((theme)=>({
    headerContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    addButton:{
        width:40,
        height:40,
        borderRadius:50,
    },
    rightContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:10,
    },
    svgContainer:{
        width:40,
        height:40,
        borderRadius:50,
        backgroundColor:theme.colors.primary,
        justifyContent:"center",
        alignItems:"center",
    }
}))