import {
  DarkTheme,
  ThemeProvider
} from "@react-navigation/native";
import { Stack } from 'expo-router';
import { useColorScheme } from "react-native";
import 'react-native-reanimated';
import { StyleSheet } from "react-native-unistyles";
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <ThemeProvider value={{
      ...DarkTheme,
      colors:{
        ...DarkTheme.colors,
        background:isDark ?"#0000": "#FFF",
      },
    }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      </ThemeProvider>
  );
}

const styles = StyleSheet.create((theme)=>({
  container: {
    backgroundColor: theme.colors.white,
  },
}));
