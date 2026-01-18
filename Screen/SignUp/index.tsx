import { useSignUp } from "@/api";
import {
  AnimatedView,
  CustomCountrySelect,
  CustomInput,
  PasswordInput,
  Radio,
  ScalableButton
} from "@/components";
import { formValidation, FormValidationType, } from "@/Schema/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { gender, SignUpForm } from "./utils";

export default function SignUp() {
  const signUp = useSignUp();
  const methods = useForm<FormValidationType>({
    resolver: zodResolver(formValidation),
  });
  const handleSubmit: SubmitHandler<FormValidationType> = (data) => {
    signUp.mutate({
      email: data.email,
      password: data.password,
      phone: data.phoneNumber,
      options:{
        data:{
          name: data.fullName,
          gender: data.gender,
          country: data.country,
        }
      }
    })
  };
  return (
    <AnimatedView style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <FormProvider {...methods}>
          
          {SignUpForm.map((singleProps) =>
            singleProps.name.toLocaleLowerCase().includes("password") ? (
              <PasswordInput key={singleProps.name} {...singleProps} />
            ) : (
              <CustomInput key={singleProps.name} {...singleProps} />
            )
          )}
          <Radio label="signup.gender.label" data={gender} name="gender" />
          <CustomCountrySelect name="country" />
          <ScalableButton
            onPress={methods.handleSubmit(handleSubmit)}
            label={"Submit"}
            disabled={signUp.isPending}
          />
        </FormProvider>
      </KeyboardAwareScrollView>
    </AnimatedView>
  );
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
