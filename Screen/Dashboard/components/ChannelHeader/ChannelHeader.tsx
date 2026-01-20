import { ProfileAvatar, ScalableButton, ThemedText } from "@/components"
import { ThemedSVG } from "@/ThemeSvg"
import { router } from "expo-router"
import { View } from "react-native"
import { StyleSheet } from "react-native-unistyles"

const ChannelHeader = () => {
    const handleNavigation = () => {
        router.push("/dashboard/createchannel")
    }
    return (
        <View style={styles.headerContainer}>
        <ThemedText variant="title">Channels</ThemedText>
       <View style={styles.rightContainer} >
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
    }
}))