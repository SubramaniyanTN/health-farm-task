import { useSignIn } from "@/api";
import { CustomInput, PasswordInput, ScalableButton } from "@/components";
import { signInValidation, SignInValidationType } from "@/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { StyleSheet } from "react-native-unistyles";

export default function SignIn(){
    const signIn = useSignIn();
    const {email}=useGlobalSearchParams<{email:string}>()
    useEffect(() => {
        if(email){
            methods.setValue("email", email)
        }
    }, [email])
    const methods = useForm<SignInValidationType>({
      resolver: zodResolver(signInValidation)
    });
    const handleSubmit: SubmitHandler<any> = (data) => {
        signIn.mutate({
            email: data.email,
            password: data.password,
        });
      };
    return(
        <View style={styles.container}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
          <FormProvider {...methods}>
            <CustomInput name="email" label="sign-in.email.label" placeholder="sign-in.email.placeholder" />
            <PasswordInput name="password" label="sign-in.password.label" placeholder="sign-in.password.placeholder" />
            <ScalableButton
            onPress={methods.handleSubmit(handleSubmit)}
            label={"Submit"}
            disabled={signIn.isPending}
          />
          </FormProvider>
        </KeyboardAwareScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    scrollView: {
      flexGrow: 1, // ✅ THIS enables scrolling
      gap: 20,
      paddingBottom: 40, // optional but recommended
    },
    title: {
      textAlign: "center",
    },
  });
  