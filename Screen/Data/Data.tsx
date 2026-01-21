import { useGetLeads } from "@/api";
import { AnimatedFlatlist, CustomInput, ThemedText } from "@/components";
import { useCustomTranslation } from "@/locale";
import { searchValidation, SearchValidationType } from "@/Schema";
import { supabase } from "@/src";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";
import { subscribeToDatas } from "../Chat/Components";

export default function Data() {
    const methods = useForm<SearchValidationType>({
        resolver: zodResolver(searchValidation),
        defaultValues: {
            search: "",
        },
        mode: "onChange",
    });
    const queryClient = useQueryClient();
    useEffect(() => {
        const channel = subscribeToDatas(queryClient);
    
        return () => {
          supabase.removeChannel(channel);
        };
      }, []);
    const search = methods.watch("search");
    const {data, isError, error, isLoading, refetch,fetchNextPage,hasNextPage}=useGetLeads({searchTerm:search})
    const translation = useCustomTranslation();
    console.log("Data Length....", JSON.stringify(data?.length))
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
                renderItem={({item,index})=>(
                    <View style={styles.itemContainer}>
                        <ThemedText>{index+1}. {translation("name")}: {item.name}</ThemedText>
                        <ThemedText>{translation("campaign")}: {item.campaign}</ThemedText>
                        <ThemedText>{translation("ad_name")}: {item.ad_name}</ThemedText>   
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                onRetry={refetch}
                onEndReachedThreshold={0.5}
                onEndReached={()=>{
                    if(hasNextPage && !isLoading && !isError && data && data.length && data.length > 0){
                        console.log("Fetching next page....")
                        fetchNextPage()
                    }
                }}
                ListFooterComponent={hasNextPage ? <ActivityIndicator size="small" /> : null}
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