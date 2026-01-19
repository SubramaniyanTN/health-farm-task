
import { Message, useGetMessages } from "@/api";
import { useGlobalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";
import { ChatContainer, Footer, useMessageRealtime } from "./Components";
export default function Chat() {
    const { id } = useGlobalSearchParams<{ id: string }>();
    const { bottom } = useSafeAreaInsets()
    const { data, isLoading } = useGetMessages(id as string)
    console.log({ data })
    useMessageRealtime(id);
    const RenderItem = ({ item }: { item: Message }) => {
        return <Text>{item.content}</Text>
    }
    return (
        <View style={[styles.container, { paddingBottom: bottom }]}>
            <FlatList data={data} renderItem={RenderItem} style={styles.list} contentContainerStyle={{ flexGrow: 1 }} />
            <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.id.toString()}
        inverted
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ChatContainer {...item} />}
      />
            <Footer />
        </View>
    )
}
const styles = StyleSheet.create((theme) => ({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    list: {
        flex: 1,
    },
}))