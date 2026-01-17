// themeColors.ts

export const lightThemeColors = {
//used
    white: '#FFFFFF',
    textPrimary: '#33384B',
    textSecondary: '#7D8A95', 
    inputBackground:'#FAFAFC',
    inputBorder:"#F4F4F6",
    inputPlaceholder:"#B2BCC9",
    svgGray:"#B2BCC9",
    danger: '#ED5E5E',
    primary:"#2E6FF3"
    // // Brand
    // primary: '#2E6FF3',
  
    // // Text
    // textPrimary: '#33384B',      // Black
    // textSecondary: '#7D8A95',    // Gray 1
    // textMuted: '#AAB6C3',        // Gray 2
    // textShadow: '#C0D4FB',       // Shadow text
  
    // // Backgrounds
    // background: '#F0F4FC',       // BG 0
    // backgroundSecondary: '#F4F4F6', // BG 1
    // surface: '#FAFAFB',          // BG 2
    // surfaceAlt: '#FAFAFC',       // Gray 4
  
    // // UI
    // buttonBackground: '#E9F0FF',
  
    // // Status
    // danger: '#ED5E5E',
  
    // Fixed
  };
  
  export const darkThemeColors = {
//used
    white: '#232528',
    textPrimary: '#F1F4F6', 
    textSecondary: '#7D8A95', 
    inputBackground:'#2B3037',
    inputBorder:"transparent",
    inputPlaceholder:"#7D8A95",
    svgGray:"#7D8A95",
    danger: '#ED5E5E',
    primary:"#2E6FF3"
    // Brand
    // primary: '#2E6FF3',
  
    // // Text
    // textPrimary: '#F1F4F6',      // Dark white
    // textSecondary: '#AAB6C3',    // Gray 2
    // textMuted: '#7D8A95',        // Gray 1
  
    // // Backgrounds
    // background: '#232528',       // Dark BG
    // surface: '#2B3037',          // Dark FG
    // surfaceAlt: '#333D4D',       // Dark FG 2
  
    // // UI
    // border: '#333333',           // Stroke
  
    // // Status
    // danger: '#E86666',
  };
export type ColorName = keyof typeof lightThemeColors;
  