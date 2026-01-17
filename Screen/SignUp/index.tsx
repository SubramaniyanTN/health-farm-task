import { CustomCountrySelect, CustomInput, PasswordInput, Radio, ScalableButton } from "@/components";
import { FormValidationType, formValidation } from '@/src';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UnistylesRuntime } from "react-native-unistyles";

const data= [ 
  {
    id:"male",
    label:"Male",
    value:"male"
  },
  {
    id:"female",
    label:"Female",
    value:"female"
  },
]
export default function SignUp(){
  const methods=useForm<FormValidationType>({
    resolver:zodResolver(formValidation)
  })
  const handleSubmit:SubmitHandler<FormValidationType>=(data)=>{
    console.log({data})
    UnistylesRuntime.setTheme
  }
  return(
    <SafeAreaView>
    <FormProvider {...methods} >
    <ScrollView contentContainerStyle={styles.scrollView} >
     <CustomInput name="fullName" label="signup.fullName.label" placeholder="signup.fullName.placeholder" />
     <CustomInput name="email" label="signup.email.label" placeholder="signup.email.placeholder" />
     <CustomInput name="phoneNumber" label="signup.phoneNumber.label" placeholder="signup.phoneNumber.placeholder"  />
     <PasswordInput name="password" label="signup.password.label" placeholder="signup.password.placeholder" />
     <PasswordInput name="confirmPassword" label="signup.confirmPassword.label" placeholder="signup.confirmPassword.placeholder" />
     <Radio label="signup.gender.label" data={data} name="gender" />
     <CustomCountrySelect name="country" />
     <ScalableButton onPress={methods.handleSubmit(handleSubmit)} label={"Submit"}  />
    </ScrollView>
    </FormProvider>
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  scrollView:{
    gap:10,
    padding:10
  }
})