import { ThemedSVG } from "@/ThemeSvg";
import { Image, ImageProps } from "expo-image";
import { useState } from "react";
import { Pressable, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import ThemedText from "../ThemedText/ThemedText";
import { getAvatarColor } from "./getAvatarColor";

type AvatarProps = Partial<ImageProps> & {
  name: string;
  isTwoLetter?: boolean;
  onPress?: () => void;
  size?: number;
  showAvatar?: boolean;
  userName?: string;
  testName?:string
};

export default function Avatar({
  name,
  onPress,
  userName,
  size = 36,
  showAvatar = false,
  isTwoLetter = false,
  testName,
  ...props
}: AvatarProps) {
  const testId=`avatar-${testName}`
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const colorName = userName ?? name;
  const avatarColor = getAvatarColor(colorName);

  const avatarSizeStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const nameInitial = name
    ? isTwoLetter
      ? name.slice(0, 2)
      : name.slice(0, 1)
    : "X";

  /* ---------- Fallback icon ---------- */
  if (error && showAvatar) {
    return (
      <Pressable testID={testId} onPress={onPress} style={[styles.center, styles.fallbackBg, avatarSizeStyle]}>
        <ThemedSVG
          width={27}
          height={27}
          stroke="none"
          variants="user-rounded"
        />
      </Pressable>
    );
  }

  const showText = error || !props.source?.uri;

  return (
    <Pressable
      onPress={onPress}
      testID={testId}
      style={[
        styles.center,
        avatarSizeStyle,
        showText && { backgroundColor: avatarColor },
      ]}
    >
      {showText ? (
        <ThemedText
          style={styles.initialText}
        >
          {nameInitial.toUpperCase()}
        </ThemedText>
      ) : (
        <Image
          {...props}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => setError(true)}
          style={[styles.image, props.style]}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create(theme => ({
  /* ---------- Common ---------- */

  center: {
    alignItems: "center",
    justifyContent: "center",
  },

  /* ---------- Image ---------- */

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
  },

  /* ---------- Text ---------- */

  initialText: {
    fontSize: 14,
    color: theme.colors.textPrimary,
  },

  /* ---------- Fallback ---------- */

  fallbackBg: {
    backgroundColor: theme.colors.inputBackground,
  },
}));
