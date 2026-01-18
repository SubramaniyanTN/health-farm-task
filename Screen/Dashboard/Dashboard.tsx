import { useGetChannels } from "@/api";
import { Channel } from "@/api/chat/types";
import { ThemedText } from "@/components";
import { router } from "expo-router";
import { FlatList, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export default function Dashboard() {
    const {data,isLoading}=useGetChannels()
    const RenderItem=({item}:{item:Channel})=>{
        const handleNavigation=()=>{
            router.push(`/dashboard/${item.id}`)
        }
        return (<Pressable onPress={handleNavigation} style={styles.itemContainer} >
            <View style={styles.avatar} />
            <ThemedText variant="base" >{item.name}</ThemedText>
        </Pressable>)
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={RenderItem}
                ListHeaderComponent={<ThemedText variant="title" >Channels</ThemedText>}
            />
        </SafeAreaView>
    )
}

const styles=StyleSheet.create((theme)=>({
    container:{
        flex:1,
    },
    avatar:{
        width:40,
        height:40,
        borderRadius:50,
        backgroundColor:theme.colors.primary,
    },
    itemContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:10,
        padding:10,
        borderBottomWidth:1,
    }
}))