import { Platform } from "react-native";

export const shadows = {
  card: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    },
    android: {
      elevation: 3,
    },
    default: {},
  })!,
};
export const darkShadows = {
  card: Platform.select({
    ios: {
      shadowColor: "#fff",
      shadowOffset: { width: 0, height: 0.4 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    },
    android: {
      elevation: 3,
    },
    default: {},
  })!,
};
