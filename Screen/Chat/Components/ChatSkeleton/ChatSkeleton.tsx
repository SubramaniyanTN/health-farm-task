import { useRef } from "react";
import { DimensionValue, ListRenderItemInfo, View } from "react-native";
import { Shimmer, ShimmerProvider } from "react-native-fast-shimmer";
import { StyleSheet } from "react-native-unistyles";

const getRandomWidth = ():DimensionValue =>
    `${Math.floor(Math.random() * (50 - 30 + 1) + 30)}%`;
  
  

export default function MessageBubbleSkeleton({index}: ListRenderItemInfo<any>) {
    const isRight = index % 2 === 0;
    const bubbleWidth = useRef(getRandomWidth()).current;
  return (
    <ShimmerProvider duration={1000}>
    <View
      style={[
        styles.row,
        isRight ? styles.rowRight : styles.rowLeft,
      ]}
    >
        {!isRight && <Shimmer style={styles.avatar} />}
      <View
        style={[
          styles.bubble,
          isRight ? styles.bubbleRight : styles.bubbleLeft,
          {width:bubbleWidth},
        ]}

      >
        <Shimmer style={styles.lineLarge} />
        <Shimmer style={styles.lineSmall} />
      </View>
      {isRight && <Shimmer style={styles.avatar} />}

    </View>
    
    </ShimmerProvider>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: "row",
    width:"100%",
    alignSelf:"flex-end",
    justifyContent:"flex-end",
    alignItems:"flex-end",
    marginVertical:6,
    gap:12,
  },
  avatar:{
    width:40,
    height:40,
    borderRadius:50,
    backgroundColor:theme.colors.skeletonBackground,
  },

  rowRight: {
    justifyContent: "flex-end",
  },

  rowLeft: {
    justifyContent: "flex-start",
  },

  bubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: "75%",
  },

  bubbleRight: {
    width:"100%",
    backgroundColor: theme.colors.skeletonBackground, // same green as UI
    borderTopRightRadius: 4,
  },

  bubbleLeft: {
    width:"100%",
    backgroundColor: theme.colors.skeletonBackground, // same green as UI
    borderTopRightRadius: 4,
  },

  lineLarge: {
    height: 14,
    width: "100%",
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor:theme.colors.skeletonBackground
  },

  lineSmall: {
    height: 12,
    width: "40%",
    borderRadius: 6,
    backgroundColor:theme.colors.skeletonBackground,
    alignSelf: "flex-end",
  },
}));
