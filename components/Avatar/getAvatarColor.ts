
const COLORS = [
    "#FF6B6B",
    "#FF8E53",
    "#FFA41B",
    "#F7B801",
    "#6BCB77",
    "#4D96FF",
    "#845EC2",
    "#D65DB1",
    "#FF9671",
    "#0081CF",
  ];
  

const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };
  
  export const getAvatarColor = (name: string) => {
    if (!name) return COLORS[0];
    const hash = hashString(name.toLowerCase());
    return COLORS[hash % COLORS.length];
  };