import { StyleSheet } from 'react-native-unistyles'
export const styles = StyleSheet.create((theme)=>({
  base: {
    paddingVertical: 16,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor:theme.colors.primary,
    ...theme.shadows.card,
  },
  black: {
    backgroundColor:"#000",
  },

  textBase: {
    fontSize: 18,
    color:"white"
  },

  rightIcon: {
    marginLeft: 4,
  },
}))
