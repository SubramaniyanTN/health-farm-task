import { View } from "react-native";
import { Shimmer, ShimmerProvider } from "react-native-fast-shimmer";
import { StyleSheet } from "react-native-unistyles";

const ChannelSkeleton = () => {
  return (
    <View style={styles.container} >
    <ShimmerProvider duration={1000}>
      <Shimmer style={styles.avatar} speed={1} />
      <Shimmer style={styles.text} speed={1} />
    </ShimmerProvider>
    </View>
  );
};
export default ChannelSkeleton;
const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width:"100%",
    gap:10
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor:theme.colors.skeletonBackground,
  },
  text: {
    height: 14,
    width: "60%",
    backgroundColor:theme.colors.skeletonBackground,
    borderRadius: 6,
  },
}));
