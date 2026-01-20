import { AnimatedView, ProfileAvatar, ScalableButton, ThemedText } from "@/components";
import { useAppSelector } from "@/redux";
import { logout } from "@/src";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function Profile() {
    const { user } = useAppSelector((state) => state.auth);
    const [isDisabled, setIsDisabled] = useState(false);
    const handleLogout = async () => {
      setIsDisabled(true);
        await logout();
        setIsDisabled(false);
    }
    const handleNavigate = () => {
      router.replace("/dashboard/data");
    }
    return (
        <AnimatedView style={styles.container}>
            <View style={styles.header} >
            <ProfileAvatar />
            <View style={styles.nameContainer} >
            <ThemedText variant="title">{user?.user_metadata?.name}</ThemedText>
            <ThemedText>{user?.email}</ThemedText>
            </View>
            </View>
            <ScalableButton
              onPress={handleNavigate}
              label={"file-upload"}
            />
            <ScalableButton
              disabled={isDisabled}
              isPending={isDisabled}
              onPress={handleLogout}
              label={"logout"}
            />
      </AnimatedView>
    )
}


const styles = StyleSheet.create((theme)=>( {
    container: {
      flex: 1,
      padding: 10,
      paddingTop:20,
      backgroundColor:theme.colors.white,
      justifyContent:"flex-start",
      gap:10
    },
    nameContainer:{
        display:"flex",
        flexDirection:"column",
    },
    header:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:10,
    }
  }));
  