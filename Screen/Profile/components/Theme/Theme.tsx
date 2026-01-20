import { setTheme, useAppSelector } from "@/redux";
import { ThemedSVG } from "@/ThemeSvg";
import { ThemedSVGProps } from "@/ThemeSvg/ThemedSvg";
import { ColorSchemeName, Pressable, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useDispatch } from "react-redux";

type ThemeDataType = {
    name:NonNullable<ColorSchemeName>;
    icon:ThemedSVGProps["variants"];
}
const themeData:ThemeDataType[]= [
    {
        name:"light",
        icon:"light-mode",
    },{
        name:"dark",
        icon:"dark-mode",
    },
]

export default function Theme() {
    const dispatch = useDispatch();
    const {theme} = useAppSelector((state)=>state.theme);
    const handleThemeChange = (theme:NonNullable<ColorSchemeName>) => {
        dispatch(setTheme(theme));
    }
    return (
        <View style={styles.container} >
            {themeData.map((singleTheme)=>{
                const isActive = theme === singleTheme.name;
                const fillColor = isActive ? "themeActiveStrokeColor" : "textPrimary";
                const strokeColor = isActive ? "themeActiveStrokeColor" : "textPrimary";
                return (
                    <Pressable onPress={()=>handleThemeChange(singleTheme.name)} key={singleTheme.name} style={[styles.modeContainer(isActive)]} >
                        <ThemedSVG themedFill={fillColor} themedStroke={strokeColor} variants={singleTheme.icon} />
                    </Pressable>)
            })}
        </View>
    )
}

const styles = StyleSheet.create((theme)=>({
    container:{
        width:"100%",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
    },
    modeContainer:(isActive:boolean)=>({
        width:"47%",
        minHeight:50,
        borderRadius:40,
        justifyContent:'center',
        ...theme.shadows.card,
        backgroundColor:isActive ?theme.colors.primary :"transparent",
        alignItems:'center',
        borderWidth:1,
        borderColor:theme.colors.textPrimary,
    })
}))