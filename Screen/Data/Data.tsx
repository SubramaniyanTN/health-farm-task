import { useGetLeads } from "@/api";
import { AnimatedFlatlist, ThemedText } from "@/components";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export default function Data() {
    const {data, isError, error, isLoading, refetch}=useGetLeads()
    return (
        <SafeAreaView style={styles.container}>
            <AnimatedFlatlist
                data={data}
                isError={isError}
                errorMessage={error?.message}
                style={styles.list}
                isLoading={isLoading}
                renderItem={({item})=>(
                    <View style={styles.itemContainer}>
                        <ThemedText>{item.name}</ThemedText>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                onRetry={refetch}
                ItemSeparatorComponent={()=> <View style={styles.separator} />}
                entering={undefined}
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