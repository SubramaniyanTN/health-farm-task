import { Logo } from "@/assets/svg";
import { AnimatedView, ScalableButton, ThemedText } from "@/components";
import { router } from "expo-router";
import { useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";
let PADDING = 10;
export default function Welcome() {
  const handleWelcome = () => {
    router.push("/auth/signin");
  }
  const {width,height}=useWindowDimensions()
  return (
    <SafeAreaView style={{flex:1}}>
    <AnimatedView style={styles.container}>
        <ThemedText style={styles.label} label="welcome.welcome" variant="title" />
        <Logo width={ width - (2*PADDING)} />
        <ThemedText label="welcome.description" style={[styles.label,styles.description]} variant="base" />
        <ScalableButton
            onPress={handleWelcome}
            label={"welcome.submit"}
          />
    </AnimatedView>
    </SafeAreaView>
  )
}

const styles=StyleSheet.create((theme)=>({
    container:{
    flex:1,
    padding: PADDING,
    justifyContent:"space-between",

    },
    label:{
      textAlign:"center",
    },
    description:{
      fontSize:20,
      fontWeight:"400",
      fontStyle:"italic"
    }
}))