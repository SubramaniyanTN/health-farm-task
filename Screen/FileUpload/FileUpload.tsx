import { useUploadLeads } from "@/api";
import { AnimatedView, ScalableButton } from "@/components";
import { alertService, pickExcelFile, uploadExcelToStorage } from "@/src";
import { router } from "expo-router";
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
        // 1️⃣ Pick file
        const file = await pickExcelFile();
        if (!file) return;
    
        console.log("📤 Uploading file:", file.name);
    
        // 2️⃣ Upload file to Storage (SIGNED URL)
        console.log("Uploading...")
        const filePath = await uploadExcelToStorage({
          uri: file.uri,
          name: file.name,
          mimeType: file.mimeType,
        });
    
        console.log("✅ File uploaded to:", filePath);
    
        // 3️⃣ Trigger backend import
       await uploadLeads.mutateAsync(filePath);
        console.log("Uploaded leads")
    
        alertService.alert?.({
          type: DropdownAlertType.Success,
          title: "Success",
          message: "Leads uploaded successfully",
          interval: 1200,
        });
    
      } catch (error) {
        console.error("❌ Upload failed", error);
    
        alertService.alert?.({
          type: DropdownAlertType.Error,
          title: "Error",
          message: "Failed to upload leads",
          interval: 1500,
        });
      } finally {
        router.push("/dashboard/data");
        setIsLoading(false);
      }
    };
    
      

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
const styles = StyleSheet.create((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    content: {
        flex: 1,
        justifyContent: "center",
    }
}))