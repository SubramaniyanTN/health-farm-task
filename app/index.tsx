import { CustomCountrySelect, CustomInput, PasswordInput, Radio, ScalableButton } from "@/components";
import { FormValidationType, formValidation } from '@/src';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const data= [ 
  {
    id:"male",
    label:"male",
    value:"male"
  },
  {
    id:"female",
    label:"female",
    value:"female"
  },
]
export default function Index(){
  const methods=useForm<FormValidationType>({
    resolver:zodResolver(formValidation)
  })
  const handleSubmit:SubmitHandler<FormValidationType>=(data)=>{
    console.log({data})
  }
  return(
    <SafeAreaView>
    <FormProvider {...methods} >
    <ScrollView contentContainerStyle={styles.scrollView} >
     <CustomInput name="fullName" label="Full name" />
     <CustomInput name="email" label="Email" />
     <CustomInput name="phoneNumber" label="Phone Number" />
     <PasswordInput name="password" label="Password" />
     <PasswordInput name="confirmPassword" label="Confirm Password" />
     <Radio data={data} name="gender" />
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