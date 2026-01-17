import { TranslationKeys, useCustomTranslation } from "@/locale";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import { textStyles } from "./styles";

type ThemedTextProps = TextProps & {
  label: TranslationKeys;
  style?: StyleProp<TextStyle>;
};

const ThemedText = ({ label,children, style, ...rest }: ThemedTextProps) => {
  const translation = useCustomTranslation();
  const labelText = label ? translation(label) : "";
  return (
    <Text testID={`${label}-text`} {...rest} style={[textStyles.base, style]}>
        {children ? children : labelText}
    </Text>
  );
};

export default ThemedText;
