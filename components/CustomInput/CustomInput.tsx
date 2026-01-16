import React, { ComponentProps } from "react";
import { useController } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
interface CustomInputProps extends ComponentProps<typeof TextInput> {
  name: string;
  label: string;
}

/* -----------------------------------------------------
 * Component
 * ---------------------------------------------------*/

export default function CustomInput({
  name,
  label,
  style,
  ...rest
}: CustomInputProps) {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({ name });

  return (
    <View style={[styles.wrapper]}>
      {/* LABEL */}
      {label && (
        <Text testID={label} style={styles.label}>
          {label}
        </Text>
      )}

      {/* INPUT WRAPPER */}
      <View style={[styles.inputContainer, error && styles.inputErrorBorder]}>
        <TextInput
          {...rest}
          value={value}
          testID={`${name}-input`}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholderTextColor={styles.placeholderColor.color}
          style={[styles.input, style]}
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

export const styles=StyleSheet.create({
  errorText:{
    color:"red"
  },
  inputContainer:{
    width:"100%",
    minHeight:40,
    color:"#000",
      borderColor:"#000",
    borderWidth:1,
    borderRadius:50,
    alignItems:"center",
    padding:5
  },
  inputErrorBorder:{
    borderColor:"red"
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

  },
  placeholderColor:{
    color: "#CBD0D6"
  }
})