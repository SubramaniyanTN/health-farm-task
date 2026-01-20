import { Header } from "@/components";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export default function DashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="data" />
      <Stack.Screen name="createchannel"
        options={{
          headerShown: false,
          presentation: 'formSheet',
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.25],
          contentStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen name="profile"
        options={{
          headerShown: false,
          presentation: 'formSheet',
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.35],
          contentStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen name="[id]"
        options={({ route }) => ({
          header: () => {
            const title = route.params?.title ??"Messages"
            return (<SafeAreaView edges={["top"]} >
              <Header variant="title" closeIconRequired label={title} />
              </SafeAreaView>)
          },
          headerShown: true
        })} />
    </Stack>
  )
}

const styles = StyleSheet.create((theme) => ({
  headerStyle: {
    backgroundColor: theme.colors.white,
    width: "100%",
    padding: 10,
  }
}))

