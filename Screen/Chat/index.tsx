
import { useGetMessages } from "@/api";
import { AnimatedFlatlist } from "@/components";
import { useGlobalSearchParams } from "expo-router";
import { View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";
import { ChatContainer, ChatSkeleton, Footer, useMessageRealtime } from "./Components";
export default function Chat() {
    const { id } = useGlobalSearchParams<{ id: string }>();
    const { bottom } = useSafeAreaInsets()
    const { data, isLoading ,isError,error,refetch} = useGetMessages(id as string)
    useMessageRealtime(id);
    return (
        <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={0}
        style={styles.content}
      >
        <View style={[styles.container, { paddingBottom: bottom }]}>
            <View style={styles.listContainer} >
            <AnimatedFlatlist
                data={data}
                isLoading={isLoading}
                isError={isError}
                errorMessage={error?.message}
                onRetry={refetch}
                SkeletonLoader={(props)=><ChatSkeleton {...props} />}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
                contentContainerStyle={{ flexGrow: 1 }}
                inverted
                entering={undefined}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <ChatContainer {...item} />}
            />
            </View>
            <Footer />
        </View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create((theme) => ({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    content: {
        flex: 1, // ✅ THIS enables scrolling
      },
    list: {
        flex: 1,
    },
    listContainer:{
        flex:1,
    }
}))