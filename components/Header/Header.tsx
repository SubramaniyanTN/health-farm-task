import { ThemedText } from "@/components"
import { TranslationKeys } from "@/locale"
import { ThemedSVG } from "@/ThemeSvg"
import { router } from "expo-router"
import { StyleProp, View, ViewStyle } from "react-native"
import { StyleSheet } from "react-native-unistyles"
import { ThemedTextVariants } from "../ThemedText/ThemedText"

type HeaderProps = { variant?: ThemedTextVariants; wrapperStyle?: StyleProp<ViewStyle>; closeIconRequired?: boolean } & (
  { title: string }
  | { label: TranslationKeys }
)

const Header = ({closeIconRequired,...props}: HeaderProps) => (
  <View style={[styles.headerStyle, props.wrapperStyle]}>
    { closeIconRequired && <ThemedSVG variants="chevron-left" width={20} height={20} hitSlop={10} themedFill="textPrimary" onPress={()=>router.back()}/> }
    {'title' in props ? (
      <ThemedText variant={props.variant || "base"} tone="normal">
        {props.title}
      </ThemedText>
    ) : (
      <ThemedText
        label={props.label}
        variant={props.variant || "base"}
        tone="normal"
      />
    )}
  </View>
)

export default Header

const styles = StyleSheet.create((theme) => ({
  headerStyle: {
    width: '100%',
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
  },
}))
