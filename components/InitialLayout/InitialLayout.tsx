import { persistor, store, useAppSelector } from "@/redux";
import { alertService, queryClient } from "@/src";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useColorScheme, View } from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemedText from "../ThemedText/ThemedText";
import InitialRoute from "./InitialRoute";

function InitialLayout() {
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
  const {hasSeenWelcome}=useAppSelector((state)=>state.hasSeenWelcome)
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
            <InitialRoute />
          </View>
        </ThemeProvider>
        <DropdownAlert alert={(func) => (alertService.alert = func)} />
      </KeyboardProvider>
    </QueryClientProvider>
  );
}

export default function RootLayout(){
  return(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <InitialLayout />
    </PersistGate>
    </Provider>
  )
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
