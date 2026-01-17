import {
  CustomCountrySelect,
  CustomInput,
  PasswordInput,
  Radio,
  ScalableButton,
  ThemedText,
} from "@/components";
import { alertService, formValidation, FormValidationType } from "@/src";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { DropdownAlertType } from "react-native-dropdownalert";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { gender, SignUpForm } from "./utils";

export default function SignUp() {
  const methods = useForm<FormValidationType>({
    resolver: zodResolver(formValidation),
  });
  const handleSubmit: SubmitHandler<FormValidationType> = (data) => {
    console.log({ data });
    alertService.alert?.({
      type:DropdownAlertType.Error,
      title:"Error",
      message:"Something went wrong",
      interval:1000
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ThemedText
            label="signup.sign-up"
            variants="title"
            style={styles.title}
          />
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
          />
        </FormProvider>
      </KeyboardAwareScrollView>
    </SafeAreaView>
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
