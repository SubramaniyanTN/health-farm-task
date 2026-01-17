import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
    useEffect(() => {
        setTimeout(() => {  
            router.push("/auth");
        }, 1000);
    }, []);
    return (
       <View>
        <Text style={{ color: "white" }}>Index</Text>
       </View>
    )
}