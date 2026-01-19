import { Header } from "@/components";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="[id]" 
            options={({ route }) => ({ 
                header: () => (<SafeAreaView edges={["top"]} ><Header variant="title" label={route.params?.title ?? "Messages"} /></SafeAreaView>), 
                headerShown: true })} />
        </Stack>
    )
}

