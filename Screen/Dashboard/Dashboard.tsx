import { useGetChannels } from "@/api";
import { Channel } from "@/api/chat/types";
import { Avatar, ThemedText } from "@/components";
import AnimatedFlatList from "@/components/AnimatedFlatlist/AnimatedFlatlist";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";
import { ChannelHeader, ChannelSkeleton } from "./components";

export default function Dashboard() {
    const { data, isLoading,refetch } = useGetChannels()
    const RenderItem = ({ item }: { item: Channel }) => {
        const handleNavigation = () => {
            router.push(`/dashboard/${item.id}?title=${item.name}`)
        }
        return (<Pressable onPress={handleNavigation} style={styles.itemContainer} >
            <Avatar 
            name={item.name}
            userName={`${item.name}-${item.name.toString()}`}
            source={""}
            size={40}
            />
            <ThemedText style={styles.text} variant="base" >{item.name}</ThemedText>
        </Pressable>)
    }
    return (
        <SafeAreaView style={styles.container}>
            <AnimatedFlatList
                data={data}
                SkeletonLoader={ChannelSkeleton}
                style={styles.list}
                isLoading={isLoading}
                renderItem={RenderItem}
                keyExtractor={(item) => item.id}
                onRetry={refetch}
                ItemSeparatorComponent={()=> <View style={styles.separator} />}
                entering={undefined}
                StaticHeaderComponent={ChannelHeader}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create((theme) => ({
    container: {
        flex: 1,
        padding: 10,
    },
    itemContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    list:{
        paddingTop:10
    },
    text:{
        fontSize:16,
        fontWeight:"600"
    },
    separator:{
        height:1,
        backgroundColor:theme.colors.inputBorder,
        marginVertical:10
    }
}))