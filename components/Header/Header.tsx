import { ThemedText } from "@/components"
import { TranslationKeys } from "@/locale"
import { StyleProp, View, ViewStyle } from "react-native"
import { StyleSheet } from "react-native-unistyles"
import { ThemedTextVariants } from "../ThemedText/ThemedText"

type HeaderProps ={variant?:ThemedTextVariants;wrapperStyle?:StyleProp<ViewStyle>}&(
  { title: string }
  | { label: TranslationKeys }
)

const Header = (props: HeaderProps) => (
  <View style={[styles.headerStyle,props.wrapperStyle]}>
    {'title' in props ? (
      <ThemedText variant={props.variant||"base"} tone="normal">
        {props.title}
      </ThemedText>
    ) : (
      <ThemedText
        label={props.label}
        variant={props.variant||"base"}
        tone="normal"
      />
    )}
  </View>
)

export default Header

const styles = StyleSheet.create((theme) => ({
    headerStyle: {
      width: '100%',
      padding: 10,
    },
  }))
  