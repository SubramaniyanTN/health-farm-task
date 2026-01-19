import { EmptyStateImage } from "@/assets/images";
import { Pressable, TextStyle, View, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import ThemedText from "../ThemedText/ThemedText";

export type RetryComponentProps = {
  errorMessage?: string;
  description?: string;
  onRetry?: () => void;

  RetryButtonComponent?: () => React.JSX.Element;
  Icon?: () => React.JSX.Element;

  buttonText?: string;

  /** Style overrides (Unistyles-friendly) */
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  buttonStyle?: ViewStyle;
};

export default function RetryComponent({
  errorMessage,
  description,
  onRetry,
  RetryButtonComponent,
  Icon,
  buttonText = "Try again",
  containerStyle,
  titleStyle,
  descriptionStyle,
  buttonStyle,
}: RetryComponentProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {Icon ? <Icon /> : <EmptyStateImage />}

      <ThemedText style={[styles.title, titleStyle]}>
        {errorMessage ?? "Server Error"}
      </ThemedText>

      <ThemedText style={[styles.description, descriptionStyle]}>
        {description ??
          "If you need further assistance, don’t hesitate to contact our support team!"}
      </ThemedText>

      {RetryButtonComponent ? (
        <RetryButtonComponent />
      ) : (
        <Pressable
          style={[styles.touchable, buttonStyle]}
          onPress={onRetry}
        >
          <ThemedText>{buttonText}</ThemedText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: "center",
    alignSelf: "center",
    gap: 16,
    padding: 16,
  },
  title: {
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    color: theme.colors.textSecondary,
  },
  touchable: {
    minWidth: 120,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },
}));
