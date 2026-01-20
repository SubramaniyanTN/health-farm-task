import { useGetLeads } from "@/api";
import { AnimatedFlatlist, CustomInput, ThemedText } from "@/components";
import { useCustomTranslation } from "@/locale";
import { searchValidation, SearchValidationType } from "@/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export default function Data() {
    const methods = useForm<SearchValidationType>({
        resolver: zodResolver(searchValidation),
        defaultValues: {
            search: "",
        },
        mode: "onChange",
    });
    const search = methods.watch("search");
    const {data, isError, error, isLoading, refetch}=useGetLeads({searchTerm:search})
    const translation = useCustomTranslation();
    return (
        <FormProvider {...methods}>
        <SafeAreaView style={styles.container}>
            <CustomInput name="search" placeholder="enter-search-term" />
            <AnimatedFlatlist
                data={data}
                isError={isError}
                errorMessage={error?.message}
                style={styles.list}
                isLoading={isLoading}
                renderItem={({item})=>(
                    <View style={styles.itemContainer}>
                        <ThemedText>{translation("name")}: {item.name}</ThemedText>
                        <ThemedText>{translation("campaign")}: {item.campaign}</ThemedText>
                        <ThemedText>{translation("ad_name")}: {item.ad_name}</ThemedText>   
                    </View>
                )}
                keyExtractor={(item) => item.id}
                onRetry={refetch}
                ItemSeparatorComponent={()=> <View style={styles.separator} />}
                entering={undefined}
            />
        </SafeAreaView>
        </FormProvider>
    )
}


const styles = StyleSheet.create((theme) => ({
    container: {
        flex: 1,
        padding: 10,
    },
    itemContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        ...theme.shadows.card,
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