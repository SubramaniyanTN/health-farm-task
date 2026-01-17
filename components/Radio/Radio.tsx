import { TranslationKeys, useCustomTranslation } from "@/locale";
import { useController } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type RadioOption = {
  id: string;
  label: string;
};

type CustomRadioProps = {
  data: RadioOption[];
  name: string;
  label?: TranslationKeys;
};

export default function CustomRadio({ data, name, label }: CustomRadioProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name });

  const isError = !!error?.message;
  const translation = useCustomTranslation();
  const labelText = label ? translation(label) : "";

  return (
    <View style={styles.wrapper}>
      {/* LABEL */}
      {label && (
        <Text style={[styles.label,]}>
          {labelText}
        </Text>
      )}

      {/* OPTIONS */}
      <View style={styles.container}>
        {data.map(option => {
          const selected = value === option.id;

          return (
            <Pressable
              key={option.id}
              onPress={() => onChange(option.id)}
              style={styles.radioRow}
              testID={`${name}-radio-${option.id}`}
            >
              {/* CIRCLE */}
              <View
                style={[
                  styles.outerCircle,
                  selected && styles.outerCircleSelected,
                  isError && styles.outerCircleError,
                ]}
              >
                {selected && <View style={styles.innerCircle} />}
              </View>

              {/* LABEL */}
              <Text
                style={[
                  styles.radioLabel,
                  isError && styles.errorText,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
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

const styles = StyleSheet.create(theme => ({
  wrapper: {
    gap: 6,
  },

  label: {
    color: theme.colors.textPrimary,
    fontWeight: "500",
  },

  container: {
    flexDirection: "row",
    gap: 20,
  },

  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  outerCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: theme.colors.textSecondary,
    alignItems: "center",
    justifyContent: "center",
  },

  outerCircleSelected: {
    borderColor: theme.colors.textPrimary,
  },

  outerCircleError: {
    borderColor: theme.colors.danger,
  },

  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.textPrimary,
  },

  radioLabel: {
    color: theme.colors.textPrimary,
  },

  errorText: {
    color: theme.colors.danger,
  },
}));
