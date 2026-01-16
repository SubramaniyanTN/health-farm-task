import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./styles";

type ButtonVariants = "outlined" | "yellow" | "black";

type ScalableButtonProps = PressableProps & {
  isPending?: boolean;
  value?: number;
  isError?: boolean;
  variants?: ButtonVariants;
  label: string|null;
  leftIcon?: React.ReactNode; // <-- NEW
  rightIcon?: React.ReactNode; // <-- NEW (optional)
  textStyle?: StyleProp<TextStyle>;
  leftIconStyle?:ViewStyle;
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);


function ScalableButton({
  isError = false,
  variants="outlined",
  label,
  leftIcon,
  rightIcon,
  textStyle,
  isPending = false,
  leftIconStyle,
  ...props
}: ScalableButtonProps) {
  const scale = useSharedValue(1);
  const shake = useSharedValue(0);
  const [disabled, setDisabled] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const shakeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  const handlePress: PressableProps["onPress"] = (event) => {
    scale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 120 })
    );
    props?.onPress?.(event);
  };

  const triggerShake = () => {
    setDisabled(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

    shake.value = withSequence(
      withTiming(-10, { duration: 40, easing: Easing.linear }),
      withRepeat(
        withTiming(10, { duration: 80, easing: Easing.linear }),
        6,
        true
      ),
      withTiming(0, { duration: 40 }, (finished) => {
        if (finished) runOnJS(setDisabled)(false);
      })
    );
  };

  useEffect(() => {
    if (isError) triggerShake();
  }, [isError]);
  return (
    <AnimatedPressable
      {...props}
      disabled={props.disabled || disabled}
      testID={`${label}-button`}
      style={[styles.base,animatedStyle, shakeAnimatedStyle, props.style]}
      onPress={handlePress}
    >
      {/* LEFT ICON */}
      {leftIcon && <View style={[leftIconStyle]}>{leftIcon}</View>}

      {/* LABEL */}
      {typeof label === "string" ? (
        <Text
          testID={`${label}-text`}
          style={[styles.textBase,textStyle]}
        >{label}</Text>
      ) : (
        label
      )}
      {isPending && <ActivityIndicator size="small" color={variants === "black" ? "white" : "black"} />}
      {/* RIGHT ICON */}
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </AnimatedPressable>
  );
}

export default (ScalableButton);
