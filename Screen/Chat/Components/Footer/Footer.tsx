import { useSendMessage } from "@/api";
import { CustomInput, ScalableButton } from "@/components";
import { useAppSelector } from "@/redux";
import { messageValidation, MessageValidationType } from "@/Schema";
import { alertService } from "@/src";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalSearchParams } from "expo-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import { DropdownAlertType } from "react-native-dropdownalert";
import { StyleSheet } from "react-native-unistyles";

export default function Footer() {
    const sendMessage=useSendMessage()
    const  methods = useForm<MessageValidationType>({
        resolver:zodResolver(messageValidation),
    })
    const { id } = useGlobalSearchParams<{id:string}>();
    const {user}=useAppSelector((state)=>state.auth)
    const onSubmit:SubmitHandler<MessageValidationType> = (data)=>{
        if(!user?.id) {
            alertService.alert?.({
                type:DropdownAlertType.Error,
                title:"Error",
                message:"User not found",
                interval:1000
              });
            return;
        }
        sendMessage.mutate({
            channelId:id as string,
            senderId:user.id,
            content:data.message
        },{
            onSuccess:()=>{
                methods.reset({message:""})
            }
        })
    }   
    return (
        <FormProvider {...methods} >
            <View style={styles.footer} >
            <CustomInput wrapperStyle={styles.input} name="message" placeholder="chat.message" />
            <ScalableButton style={styles.button} label="chat.send" onPress={methods.handleSubmit(onSubmit)} disabled={sendMessage.isPending} isPending={sendMessage.isPending} />
            </View>
        </FormProvider>
    )
}

const styles =StyleSheet.create((theme)=>({
    button:{
        width:"30%",
    },
    footer:{
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-between",
        gap:10
    },
    input:{
        flexGrow:1,
        maxWidth:"70%"
    }
}))