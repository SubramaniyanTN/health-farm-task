import { ScalableButton, ThemedText } from "@/components"
import { ThemedSVG } from "@/ThemeSvg"
import { View } from "react-native"
import { StyleSheet } from "react-native-unistyles"

const ChannelHeader = () => {
    return (
        <View style={styles.headerContainer}>
        <ThemedText variant="title">Channels</ThemedText>
        <ScalableButton  label={null} style={styles.addButton} leftIcon={<ThemedSVG variants="add" fill={"white"} />} />
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
    }
}))