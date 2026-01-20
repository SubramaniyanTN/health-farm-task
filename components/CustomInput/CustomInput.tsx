import { TranslationKeys, useCustomTranslation } from "@/locale";
import React, { ComponentProps, useState } from "react";
import { useController } from "react-hook-form";
import {
  StyleProp,
  Text,
  TextInput,
  View,
  ViewStyle
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
interface CustomInputProps extends ComponentProps<typeof TextInput> {
  name: string;
  label?: TranslationKeys;
  placeholder: TranslationKeys;
  wrapperStyle?: StyleProp<ViewStyle>;  
}

/* -----------------------------------------------------
 * Component
 * ---------------------------------------------------*/

export default function CustomInput({
  name,
  label,
  placeholder,
  style,
  wrapperStyle,
  ...rest
}: CustomInputProps) {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({ name });
  const translation = useCustomTranslation();
  const labelText = label ? translation(label) : "";
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
    <View style={[styles.wrapper, wrapperStyle]}>
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
    backgroundColor:theme.colors.inputBackground,
    borderRadius:9,
    borderColor:theme.colors.inputBorder,
    alignItems:"center",
    boxShadow:"",
    padding:5,
    ...theme.shadows.card,
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
  width:"100%",
  minHeight:40,
  textAlignVertical:"center",
  color:theme.colors.textPrimary,

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