import {
  CustomCountrySelect,
  CustomInput,
  PasswordInput,
  Radio,
  ScalableButton,
  ThemedText,
} from "@/components";
import { formValidation, FormValidationType } from "@/src";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { UnistylesRuntime } from "react-native-unistyles";
import { gender, SignUpForm } from "./utils";

export default function SignUp() {
  const methods = useForm<FormValidationType>({
    resolver: zodResolver(formValidation),
  });
  const handleSubmit: SubmitHandler<FormValidationType> = (data) => {
    console.log({ data });
    UnistylesRuntime.setTheme;
  };
  return (
    <SafeAreaView style={styles.container}>
      <FormProvider {...methods}>
        <KeyboardAwareScrollView
          bottomOffset={62}
          bounces
          contentContainerStyle={styles.scrollView}
        >
          <ThemedText label="signup.sign-up" />
          {SignUpForm.map((singleProps) =>
            singleProps.name.includes("password") ? (
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
        </KeyboardAwareScrollView>
      </FormProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
});
