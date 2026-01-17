import { TranslationKeys, useCustomTranslation } from "@/locale";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import { textStyles } from "./styles";
export type ThemedTextVariants = "title" | "base";

type ThemedTextProps = TextProps  & {
  variants?: ThemedTextVariants;
  label: TranslationKeys;
  style?: StyleProp<TextStyle>;
};

const ThemedText = ({ label,children, variants="base",style, ...rest }: ThemedTextProps) => {
  const translation = useCustomTranslation();
  const labelText = label ? translation(label) : "";
  return (
    <Text testID={`${label}-text`} {...rest} style={[textStyles.text(variants), style]}>
        {children ? children : labelText}
    </Text>
  );
};

export default ThemedText;
