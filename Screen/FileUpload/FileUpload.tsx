import { useUploadLeads } from "@/api";
import { AnimatedView, ScalableButton } from "@/components";
import { alertService, pickExcelFile, prepareLeads, readExcelFile } from "@/src";
import { useState } from "react";
import { DropdownAlertType } from "react-native-dropdownalert";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export default function FileUpload() {

    const uploadLeads = useUploadLeads();
    const [isLoading, setIsLoading] = useState(false);
    const handleUpload = async () => {
        setIsLoading(true);
        try {
        const file = await pickExcelFile();
        console.log({file});
        if (file) {
            const leads = await readExcelFile(file.uri);
            const preparedLeads = prepareLeads(leads);
            await uploadLeads.mutateAsync(preparedLeads);
        }
        } catch (error) {
            console.log("Error here",{error});
            alertService.alert?.({
                type:DropdownAlertType.Error,
                title:"Error",
                message:"Failed to upload leads",
                interval:1000
            });
        }finally{
            setIsLoading(false);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
        <AnimatedView style={styles.content}>
            <ScalableButton
                label="file-upload"
                onPress={handleUpload}
                isPending={isLoading}
                disabled={isLoading}
            />
            </AnimatedView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create((theme)=>({
    container:{
        flex:1,
        backgroundColor:theme.colors.white,
    },
    content:{
        flex:1,
        justifyContent:"center",
    }
}))