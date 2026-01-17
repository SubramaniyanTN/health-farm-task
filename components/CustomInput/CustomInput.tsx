import { TranslationKeys, useCustomTranslation } from "@/locale";
import React, { ComponentProps, useState } from "react";
import { useController } from "react-hook-form";
import {
  Text,
  TextInput,
  View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
interface CustomInputProps extends ComponentProps<typeof TextInput> {
  name: string;
  label: TranslationKeys;
  placeholder: TranslationKeys;
}

/* -----------------------------------------------------
 * Component
 * ---------------------------------------------------*/

export default function CustomInput({
  name,
  label,
  placeholder,
  style,
  ...rest
}: CustomInputProps) {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({ name });
  const translation = useCustomTranslation();
  const labelText = translation(label);
  const placeholderText = translation(placeholder);
  const isError = error && error.message;
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
    onBlur();
  };
  return (
    <View style={[styles.wrapper]}>
      {/* LABEL */}
      {label && (
        <Text testID={`${name}-label`} style={[styles.label,]}>
          {labelText}
        </Text>
      )}

      {/* INPUT WRAPPER */}
      <View style={[styles.inputContainer, 
          isFocused && styles.inputFocused,
        error && styles.inputErrorBorder]}>
        <TextInput
          {...rest}
          value={value}
          testID={`${name}-input`}
          onChangeText={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholderText}
          placeholderTextColor={isError ? styles.errorText.color : styles.placeholderColor.color}
          style={[styles.input,isError && styles.errorText, style]}
        />
      </View>

      {/* ERROR MESSAGE */}
      {error?.message && (
        <Text testID={`${name}-input-error-message`} style={styles.errorText}>
          {error.message}
        </Text>
      )}
    </View>
  );
}

export const styles=StyleSheet.create((theme)=>({
  inputContainer:{
    width:"100%",
    minHeight:40,
    color:theme.colors.textPrimary,
    backgroundColor:theme.colors.inputBackground,
    borderRadius:16,
    borderColor:theme.colors.inputBorder,
    alignItems:"center",
    padding:5
  },
  inputErrorBorder:{
    borderColor:theme.colors.danger,
    borderWidth:1
  },
  placeholderColor:{
    color:theme.colors.inputPlaceholder
  },
  inputFocused:{
    borderColor:theme.colors.primary,
    borderWidth:1,
  },
  input:{
  flex:1,
  height:"100%",
  width:"100%"
  },
  wrapper:{
    gap:5
  },
  label:{
    color:theme.colors.textPrimary
  },
  errorInput:{
    borderColor:theme.colors.danger
  },
  errorText:{
    color:theme.colors.danger
  }
}))