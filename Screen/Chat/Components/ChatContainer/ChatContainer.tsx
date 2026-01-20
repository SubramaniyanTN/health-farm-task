import { Message } from "@/api";
import { Avatar, ThemedText } from "@/components";
import { useAppSelector } from "@/redux";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import Animated, {
  StretchOutY
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";
import { formatChatTime } from "../src/formatChatTime";

function ChatContainer(props: Message) {
    const {user}=useAppSelector((state)=>state.auth)
    const isSender = props.sender_id === user?.id;
  return (
        <Animated.View
          exiting={StretchOutY.duration(250)}
          style={[styles.row, isSender ? styles.rowRight : styles.rowLeft]}
        >
          {!isSender && (
            <Avatar
             name={props.sender_id ?? ""}
             userName={`${props.sender_id}-${props.sender_id.toString()}`}
             source={""}
             size={32}
           />
          )}

          <LinearGradient
            colors={isSender ? ["#D8EDC2", "#FFFFFF"] : ["#FFF6C3", "#FFFFFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.bubble, isSender && styles.customerBubble]}
          >
            <ThemedText style={styles.contentText} entering={undefined} >{props.content}</ThemedText>

            <View style={styles.dateTextContainer}>
              <ThemedText entering={undefined} style={styles.dateText}>
                {formatChatTime(props.created_at?.toString())}
              </ThemedText>
            </View>
          </LinearGradient>

          {isSender && (
            <Avatar
              name={props.sender_id ?? ""}
              userName={`${props.sender_id}-${props.sender_id.toString()}`}
              source={""}
              size={32}
            />
          )}
        </Animated.View>
  );
}

export default ChatContainer;

/* -------------------------------- Styles -------------------------------- */

const styles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    width: "100%",
    marginVertical: 10,
  },
  contentText: {
    color: "#33384B",
  },
  rowLeft: {
    justifyContent: "flex-start",
  },

  rowRight: {
    justifyContent: "flex-end",
  },

  bubble: {
    maxWidth: "75%",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    gap: 9,
  },

  customerBubble: {
    borderTopRightRadius: 4,
  },

  dateTextContainer: {
    alignSelf: "flex-end",
  },

  dateText: {
    fontSize: 10,
    color: "#33384B",
  },

  replyActionContainer: {
    width: 80,
    height: "100%", // ✅ KEY FIX
    justifyContent: "center",
    alignItems: "center",
  },

  replyAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E5F0FF", // optional (Telegram-like)
    justifyContent: "center",
    alignItems: "center",
  },
}));
