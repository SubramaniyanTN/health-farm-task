
import { ColorName } from "@/colors/unistylesColor";
import { SvgProps } from "react-native-svg";
import { StyleSheet } from "react-native-unistyles";
import { icons } from "./icons";

export type ThemedSVGProps = SvgProps &
  Partial<{
    themedStroke: ColorName;
    themedFill: ColorName;
  }> & {
    variants: keyof typeof icons;
  };

export const ThemedSVG = ({
  variants,
  themedFill,
  themedStroke = "svgGray",
  ...restProps
}: ThemedSVGProps) => {
  const Icon = icons[variants];
  if (!Icon) {
    console.error(`ThemedSVG: No icon found for variant "${variants}"`);
    return null; // avoid rendering undefined
  }
  const strokeColor =  svgStyles.strokeColor(themedStroke).color;
  const fillColor =  themedFill ? svgStyles.fillColor(themedFill).color : undefined;
  return (
    <Icon
      hitSlop={5}
      {...restProps}
      stroke={restProps.stroke ?? strokeColor}
      fill={restProps.fill ?? fillColor ?? "none"}
      style={[svgStyles.icons,restProps.style]}
    />
  );
};

const svgStyles=StyleSheet.create((theme)=>({
  icons:{
    width:16,
    height:16
  },
  strokeColor:(color:ColorName)=>({
    color:theme.colors[color],
  }),
  fillColor:(color:ColorName)=>({
    color:theme.colors[color],
  }),
}))
