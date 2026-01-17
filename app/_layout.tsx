import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme, View } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  useEffect(()=>{
    UnistylesRuntime.setTheme(isDark ? "dark" : "light");
  },[isDark])
  return (
    <KeyboardProvider>
      <ThemeProvider
        value={{
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: "transparent",
          },
        }}
      >
        <View style={styles.container} >
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
        </View>
      </ThemeProvider>
    </KeyboardProvider>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.white,
    flex:1
  },
}));
