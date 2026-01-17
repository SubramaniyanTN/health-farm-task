import { alertService, queryClient } from "@/src";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme, View } from "react-native";
import DropdownAlert from "react-native-dropdownalert";
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
    <QueryClientProvider client={queryClient}>
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
      <DropdownAlert
      alert={func => (alertService.alert = func)}
      />
    </KeyboardProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.white,
    flex:1
  },
}));
