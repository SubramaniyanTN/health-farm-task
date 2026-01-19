import { TranslationKeys, useCustomTranslation } from "@/locale";
import { ComponentProps } from "react";
import { StyleProp, TextStyle } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

type AnimatedTextProps =ComponentProps<typeof Animated.Text>;

export type ThemedTextVariants = "base" | "title";
export type ThemedTextTone = "normal" | "danger";

type ThemedTextProps = AnimatedTextProps & {
  label?: TranslationKeys;
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
  const labelText =label ? translation(label) : undefined;

  // ✅ DOC-CORRECT USAGE
  styles.useVariants({
    variant,
    tone,
  });

  return (
    <Animated.Text
      testID={`${label}-text`}
      entering={FadeInDown.duration(1000)}
      exiting={FadeOutDown.duration(1000)}
      {...rest}
      style={[styles.text, style]}

    >
      {children ?? labelText}
    </Animated.Text>
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
