import { ThemedSVG } from "@/ThemeSvg";
import { ComponentProps, useState } from "react";
import { useController } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { styles } from "../CustomInput/CustomInput";

interface PasswordInputProps extends ComponentProps<typeof TextInput> {
  name: string;
  label: string;
}

export default function PasswordInput({
  name,
  label,
  style,
  ...rest
}: PasswordInputProps) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({ name });
  const handlePasswordToggle=()=>{
    setIsPasswordShown((prev)=>!prev)
  }
  return (
    <View style={[styles.wrapper]}>
      {/* LABEL */}
      {label && (
        <Text testID={label} style={styles.label}>
          {label}
        </Text>
      )}

      {/* INPUT WRAPPER */}
      <View style={[styles.inputContainer,{flexDirection:"row"}, error && error.message && styles.inputErrorBorder]}>
        <TextInput
          {...rest}
          value={value}
          secureTextEntry={!isPasswordShown}
          testID={`${name}-input`}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholderTextColor={styles.placeholderColor.color}
          style={[styles.input, style]}
        />
        <ThemedSVG onPress={handlePasswordToggle} variants={isPasswordShown ? "eye-opened" : "eye-closed"} />
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
