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
      <View style={styles.linkContainer} >
        <ThemedText label="do-you-have-file-to-upload" style={styles.linkPreText} />
        <ThemedText onPress={handleNavigate} style={styles.link} variant="title" label="click-here" />
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


const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    backgroundColor: theme.colors.white,
    justifyContent: "flex-start",
    gap: 10
  },
  nameContainer: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  link: {
    textDecorationLine: "underline",
    textAlignVertical: "bottom",
    fontSize: 19
  },
  linkPreText: {
    fontSize: 15
  },
  linkContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    textAlignVertical: "bottom",
    gap: 10,
    paddingVertical: 10
  }
}));
