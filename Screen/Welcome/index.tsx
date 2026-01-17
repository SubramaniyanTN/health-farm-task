import { Logo } from "@/assets/svg";
import { AnimatedView, ScalableButton, ThemedText } from "@/components";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export default function Welcome() {
  const handleWelcome = () => {
    router.push("/auth/signin");
  }
  return (
    <SafeAreaView style={{flex:1}}>
    <AnimatedView style={styles.container}>
        <ThemedText label="sign-in.email" variant="title">Welcome</ThemedText>
        <Logo width={100} height={100} />
        <ScalableButton
            onPress={handleWelcome}
            label={"welcome.welcome"}
          />
    </AnimatedView>
    </SafeAreaView>
  )
}

const styles=StyleSheet.create((theme)=>({
    container:{
    flex:1,
    padding: 10,

    }
}))