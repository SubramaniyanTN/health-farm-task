import { TranslationKeys, useCustomTranslation } from "@/locale";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

export type ThemedTextVariants = "base" | "title";
export type ThemedTextTone = "normal" | "danger";

type ThemedTextProps = TextProps & {
  label: TranslationKeys;
  variant?: ThemedTextVariants;
  tone?: ThemedTextTone;
  style?: StyleProp<TextStyle>;
};

export default function ThemedText({
  label,
  children,
  variant = "base",
  tone = "normal",
  style,
  ...rest
}: ThemedTextProps) {
  const translation = useCustomTranslation();
  const labelText = translation(label);

  // ✅ DOC-CORRECT USAGE
  styles.useVariants({
    variant,
    tone,
  });

  return (
    <Text
      {...rest}
      testID={`${label}-text`}
      style={[styles.text, style]}
    >
      {children ?? labelText}
    </Text>
  );
}

import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.colors.textPrimary,

    variants: {
      variant: {
        base: {
          fontSize: 14,
          fontWeight: "400",
        },
        title: {
          fontSize: 24,
          fontWeight: "700",
        },
      },

      tone: {
        normal: {
          color: theme.colors.textPrimary,
        },
        danger: {
          color: theme.colors.danger,
        },
      },
    },
  },
}));
