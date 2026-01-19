import { CustomInput, ScalableButton } from "@/components";
import { messageValidation, MessageValidationType } from "@/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalSearchParams } from "expo-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
export default function Chat() {
    const { id } = useGlobalSearchParams();
    const  methods = useForm<MessageValidationType>({
        resolver:zodResolver(messageValidation),
    })
    const onSubmit:SubmitHandler<MessageValidationType> = (data)=>{
        console.log(data)
    }
    return (
        <View style={styles.container}>
            <Text>{id}</Text>
            <FormProvider {...methods} >
            <View style={styles.footer} >
            <CustomInput wrapperStyle={styles.input} name="message" placeholder="chat.message" />
            <ScalableButton style={styles.button} label="chat.send" onPress={methods.handleSubmit(onSubmit)} />
            </View>
            </FormProvider>
        </View>
    )
}
const styles = StyleSheet.create((theme)=>({
    container:{
        flex:1,
        paddingHorizontal:10,
    },
    button:{
        width:"30%",
    },
    footer:{
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-between",
    },
    input:{
        flexGrow:1,
    }
}))