import { StyleSheet } from "react-native-unistyles";
import { ThemedTextVariants } from "./ThemedText";

export const textStyles = StyleSheet.create((theme, rt) => ({
  text: (variant: ThemedTextVariants) => {
    switch (variant) {
      case "title":
        return {
          fontSize: 24 * rt.fontScale,
          fontWeight: "bold",
          color: theme.colors.textPrimary,
        };

      case "base":
      default:
        return {
          fontSize: 16 * rt.fontScale,
          fontWeight: "400",
          color: theme.colors.textPrimary,
        };
    }
  },
}));
