import { TranslationKeys } from "@/locale";

type SignUpFormProps = {
  name: string;
  label: TranslationKeys;
  placeholder: TranslationKeys;
};

export const SignUpForm :SignUpFormProps[] =[
    {
      name: "fullName",
      label: "signup.fullName.label",
      placeholder: "signup.fullName.placeholder",
    },
    {
      name: "email",
      label: "signup.email.label",
      placeholder: "signup.email.placeholder",
    },
    {
      name: "phoneNumber",
      label: "signup.phoneNumber.label",
      placeholder: "signup.phoneNumber.placeholder",
    },
    {
      name: "password",
      label: "signup.password.label",
      placeholder: "signup.password.placeholder",
    },
    {
      name: "confirmPassword",
      label: "signup.confirmPassword.label",
      placeholder: "signup.confirmPassword.placeholder",
    },
  ];
  