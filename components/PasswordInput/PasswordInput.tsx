import { TranslationKeys, useCustomTranslation } from "@/locale";
import { ThemedSVG } from "@/ThemeSvg";
import { ComponentProps, useState } from "react";
import { useController } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { styles } from "../CustomInput/CustomInput";

interface PasswordInputProps extends ComponentProps<typeof TextInput> {
  name: string;
  label: TranslationKeys;
  placeholder: TranslationKeys;
}

export default function PasswordInput({
  name,
  label,
  style,
  placeholder,
  ...rest
}: PasswordInputProps) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({ name });

  const translation = useCustomTranslation();
  const labelText = translation(label);
  const placeholderText = translation(placeholder);

  const isError = !!error?.message;

  const handlePasswordToggle = () => {
    setIsPasswordShown(prev => !prev);
  };
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
    onBlur();
  };
  return (  
    <View style={styles.wrapper}>
      {/* LABEL */}
      {label && (
        <Text testID={`${name}-label`} style={styles.label}>
          {labelText}
        </Text>
      )}

      {/* INPUT WRAPPER */}
      <View
        style={[
          styles.inputContainer,
          { flexDirection: "row" },
          isFocused && styles.inputFocused,
          isError && styles.inputErrorBorder,
        ]}
      >
        <TextInput
          {...rest}
          value={value}
          secureTextEntry={!isPasswordShown}
          testID={`${name}-input`}
          onChangeText={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholderText}
          placeholderTextColor={
            isError
              ? styles.errorText.color
              : styles.placeholderColor.color
          }
          style={[
            styles.input,
            isError && styles.errorText,
            style,
          ]}
        />

        <ThemedSVG
          onPress={handlePasswordToggle}
          stroke="none"
          themedFill="svgGray"
          width={20}
          height={20}
          variants={isPasswordShown ? "eye-opened" : "eye-closed"}
        />
      </View>

      {/* ERROR MESSAGE */}
      {isError && (
        <Text
          testID={`${name}-input-error-message`}
          style={styles.errorText}
        >
          {error?.message}
        </Text>
      )}
    </View>
  );
}
