import { ThemedText } from "@/components";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { Navigator } = createMaterialTopTabNavigator();

export const AuthTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function AuthLayout() {
    return (
      <SafeAreaView style={{flex:1}}>
        <AuthTopTabs 
        screenOptions={{
          tabBarStyle:{
            backgroundColor:"transparent"
          },
          tabBarLabel:({children})=>{  
            const label = children == "Sign Up" ? "signup.sign-up" : "sign-in.sign-in";
            return (
              <ThemedText
              label={label}
              variants="base"
              style={{textAlign:"center"}}
            />
            )
          }
        }}
        >
        <AuthTopTabs.Screen
          name="index"
          options={{
            title:"Sign Up",
          }}
        />
        <AuthTopTabs.Screen
          name="signin"
          options={{
            title:"Sign In"
          }}
        />
      </AuthTopTabs>
      </SafeAreaView>
    )
}