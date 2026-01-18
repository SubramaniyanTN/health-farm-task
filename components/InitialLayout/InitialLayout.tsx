import { alertService, queryClient } from "@/src";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme, View } from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import ThemedText from "../ThemedText/ThemedText";

export default function InitialLayout() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  useEffect(() => {
    UnistylesRuntime.setTheme(isDark ? "dark" : "light");
  }, [isDark]);
  const Header = () => {
    return (
      <View style={styles.headerStyle}>
      <ThemedText label="otpverify.header" variant="base" tone="normal" />
      </View>
    )
  }
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
          <View style={styles.container}>
            <Stack
              screenOptions={{ headerShown: false }}
              initialRouteName="auth"
            >
              <Stack.Screen name="auth" options={{ headerShown: false }} />
              <Stack.Screen name="dashboard" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="otpverify"
                options={{ headerShown: false, presentation: "formSheet",sheetGrabberVisible:true,sheetAllowedDetents:[0.45],header:()=><Header />, contentStyle:styles.headerStyle }}
              />
            </Stack>
          </View>
        </ThemeProvider>
        <DropdownAlert alert={(func) => (alertService.alert = func)} />
      </KeyboardProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  headerStyle:{
    backgroundColor:theme.colors.white,
    width:"100%",
    padding:10,
  }
}));
