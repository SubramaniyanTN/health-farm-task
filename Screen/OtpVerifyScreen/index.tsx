import { useOtpVerify } from "@/api";
import { AnimatedView, CustomInput, ScalableButton } from "@/components";
import { otpVerifyValidation, OtpVerifyValidationType } from "@/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { StyleSheet } from "react-native-unistyles";

export default function OtpVerifyScreen() {
    const {email}=useGlobalSearchParams<{email:string}>()
    const methods =useForm<OtpVerifyValidationType>({
        resolver:zodResolver(otpVerifyValidation)
    })
    const otpVerify = useOtpVerify()
    const handleSubmit :SubmitHandler<OtpVerifyValidationType> = (data) => {
        otpVerify.mutate({
            email:data.email,
            token:data.otp,
            type:"email"
        })
    }
    useEffect(() => {
        if(email){
            methods.setValue("email", email)
        }
    }, [email])
    return (
        <AnimatedView style={styles.container}>
 <KeyboardAwareScrollView
 style={{flex:1,padding:10}}
        contentContainerStyle={styles.contentContainer}
      >
          <FormProvider {...methods}>
            
            <CustomInput label="signup.email.label" name="email" placeholder="signup.email.placeholder" />
            <CustomInput label="signup.otp.label" name="otp" placeholder="signup.otp.placeholder" />
            <ScalableButton
              onPress={methods.handleSubmit(handleSubmit)}
              label={"Submit"}
              disabled={otpVerify.isPending}
            />
          </FormProvider>
          </KeyboardAwareScrollView>
      </AnimatedView>
    )
}

const styles = StyleSheet.create((theme)=>( {
    container: {
      flex: 1,
      backgroundColor:theme.colors.white,
    },
    contentContainer: {
      flex: 1, // ✅ THIS enables scrolling
      gap: 20,
      paddingBottom: 40, // optional but recommended
    },
    title: {
      textAlign: "center",
    },
  }));
  