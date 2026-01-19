import { EmptyStateImage } from "@/assets/images";
import { useCustomTranslation } from "@/locale";
import { TextStyle, View, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import ScalableButton from "../ScalableButton/ScalableButton";
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
  const translation = useCustomTranslation();
  return (
    <View style={[styles.container, containerStyle]}>
      {Icon ? <Icon /> : <EmptyStateImage />}

      <ThemedText variant="title" style={[styles.title, titleStyle]}>
        {errorMessage ?? "Server Error"}
      </ThemedText>

      <ThemedText style={[styles.description, descriptionStyle]}>
        {description ??
          "If you need further assistance, don’t hesitate to contact our support team!"}
      </ThemedText>

      {RetryButtonComponent ? (
        <RetryButtonComponent />
      ) : (
        <ScalableButton
          label={"try-again"}
          onPress={onRetry}
          style={styles.button}
          textStyle={{textAlign:"center"}}
          leftIcon={null}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
    container: {
    width:"100%",
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
    color: theme.colors.textPrimary,
  },
  button:{
    width:"50%",
    justifyContent:"center",
    alignItems:"center",
  }
}));
