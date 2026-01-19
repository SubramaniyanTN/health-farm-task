import { ThemedText } from "@/components"
import { TranslationKeys } from "@/locale"
import { View } from "react-native"
import { StyleSheet } from "react-native-unistyles"
import { ThemedTextVariants } from "../ThemedText/ThemedText"
type HeaderProps ={variant?:ThemedTextVariants}&(
  { title: string }
  | { label: TranslationKeys }
)

const Header = (props: HeaderProps) => (
  <View style={styles.headerStyle}>
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
  