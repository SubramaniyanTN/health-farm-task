import { TranslationKeys, useCustomTranslation } from "@/locale";
import { useController } from "react-hook-form";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-radio-buttons-group";
import { StyleSheet } from "react-native-unistyles";

type RadioOption = {
  id: string;
  label: string;
  value: string;
};

type CustomRadioProps = {
  data: RadioOption[];
  name: string;
  label?: TranslationKeys;
};

export default function Radio({ data, name, label }: CustomRadioProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name });

  const isError = !!error?.message;
  const translation = useCustomTranslation();
  const labelText = label ? translation(label) : "";
  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={[styles.label, isError && styles.errorText]}>
          {labelText}
        </Text>
      )}

      <View style={styles.container}>
        {data.map(option => (
          <RadioButton
            key={option.id}
            id={option.id}
            label={option.label}
            value={option.value}
            selected={value === option.id}
            borderColor={isError ? styles.errorText.color : styles.bordercolor.borderColor}
            onPress={() => onChange(option.id)}
            labelStyle={[
              styles.radioLabel,
              isError && styles.errorText,
            ]}
            containerStyle={styles.radioItem}
            testID={`${name}-radio-${option.id}`}
          />
        ))}
      </View>

      {isError && (
        <Text
          testID={`${name}-input-error-message`}
          style={styles.errorText}
        >
          {error.message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  wrapper: {
    gap: 6,
  },
  bordercolor:{
    borderColor: theme.colors.textPrimary
  },
  label: {
    color: theme.colors.textPrimary,

  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  radioItem: {
    alignItems: "center",
  },
  radioLabel: {
    color: theme.colors.textPrimary,
  },
  errorText: {
    color: theme.colors.danger,
  },
}));
