import { ThemedText } from "@/components";
import { TranslationKeys } from "@/locale";
import { setLanguage, useAppSelector } from "@/redux";
import { Pressable, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useDispatch } from "react-redux";

export default function LanguageSwitch() {
    const languages:Array<{name:TranslationKeys, value:string}> = [
        {
            name: "english",
            value: "en",
        },
        {
            name:"tamil",
            value: "tn",
        }
    ]
    const {language} = useAppSelector((state) => state.theme);
    const dispatch = useDispatch();
    const handleLanguageChange = (language:string) => {
        dispatch(setLanguage(language));
    }
    return (
        <View style={styles.container} >
            <ThemedText style={styles.title} variant="title" label="select-your-language" />
            <View style={styles.languageContainer} >
            {languages.map((singleLanguage)=>{
                const isSelected = language === singleLanguage.value;
                console.log({isSelected,language});
                return (
                    <Pressable style={styles.languageItem} key={singleLanguage.value} onPress={()=>handleLanguageChange(singleLanguage.value)}>
                        <View style={[styles.indicator]} >
                            <View style={styles.selectedIndicator(isSelected)} />
                        </View>
                        <ThemedText style={styles.languageText} label={singleLanguage.name} />
                    </Pressable>
                )
            })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create((theme)=>({
    container:{
        width:"100%",
        flexDirection:"column",
    },
    languageContainer:{
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-evenly",
        marginTop:10
    },
    languageText:{
        fontSize:16,
    },
    selectedIndicator:(isSelected:boolean)=>{
        return {
            width:15,
            height:15,
            borderRadius:10,
            backgroundColor:isSelected ? theme.colors.primary : "transparent",
        }
    },
    indicator:{
        width:25,
        height:25,
        borderRadius:50,
        borderWidth:2,
        padding:4,
        alignItems:"center",
        justifyContent:"center",
        borderColor:theme.colors.textPrimary,
    },
    languageItem:{
        flexDirection:"row",
        alignItems:"center",
        gap:10,
    },
    title:{
        width:"100%",
    }
}))