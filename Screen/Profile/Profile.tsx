import { AnimatedView, ProfileAvatar, ScalableButton, ThemedText } from "@/components";
import { useAppSelector } from "@/redux";
import { logout } from "@/src";
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
      backgroundColor:theme.colors.white,
      justifyContent:"space-between",
      gap:20

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
        flex:1
    }
  }));
  