// themeColors.ts

export const lightThemeColors = {
  //used
  white: "#FFFFFF",
  textPrimary: "#33384B",
  textSecondary: "#7D8A95",
  inputBackground: "#FAFAFC",
  inputBorder: "#F4F4F6",
  inputPlaceholder: "#B2BCC9",
  svgGray: "#B2BCC9",
  danger: "#ED5E5E",
  primary: "#2E6FF3",
  skeletonBackground: "#9CA3AF",
  themeActiveStrokeColor: "#F1F4F6",
};

export const darkThemeColors = {
  //used
  white: "#232528",
  textPrimary: "#F1F4F6",
  textSecondary: "#7D8A95",
  inputBackground: "#2B3037",
  inputBorder: "transparent",
  inputPlaceholder: "#7D8A95",
  svgGray: "#7D8A95",
  danger: "#ED5E5E",
  primary: "#2E6FF3",
  skeletonBackground: "#9CA3AF",
  themeActiveStrokeColor: "#F1F4F6",
};

export type ColorName = keyof typeof lightThemeColors;
