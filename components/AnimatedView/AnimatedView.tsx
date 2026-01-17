import { ComponentProps } from "react";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

type AnimatedViewProps =ComponentProps<typeof Animated.View>;
export default function AnimatedView(props:AnimatedViewProps) {
    return (
        <Animated.View 
        entering={FadeInDown.duration(1000)}
        exiting={FadeOutDown.duration(1000)}
        {...props}
        />
    )
}