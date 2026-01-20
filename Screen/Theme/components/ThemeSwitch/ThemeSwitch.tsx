import { ThemedText } from "@/components";
import { setTheme } from "@/redux";
import { useAppSelector } from "@/redux/hooks/hooks";
import { ThemedSVG, ThemedSVGProps } from "@/ThemeSvg/ThemedSvg";
import { router } from "expo-router";
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

export default function ThemeSwitch() {
    const dispatch = useDispatch();
    const {theme} = useAppSelector((state)=>state.theme);
    const handleThemeChange = (theme:NonNullable<ColorSchemeName>) => {
        router.back();
        dispatch(setTheme(theme));
    }
    return (
        <View>
        <ThemedText variant="title" label="theme-switch" />
        <View style={styles.themeContainer} >
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
        </View>
    )
}

const styles = StyleSheet.create((theme)=>({
    themeContainer:{
        width:"100%",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        paddingVertical:20
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