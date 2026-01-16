import { useState } from 'react';
import { useController } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import CountrySelect, { ICountry } from 'react-native-country-select';

type CustomCountryPickProps={
    name:string
}

export default function CustomCountrySelect({name}:CustomCountryPickProps){
    const [showPicker,setShowPicker]=useState(false)
     const {
        field: { value, onBlur, onChange },
        fieldState: { error },
      } = useController({ name });
    
    const hidePicker=()=>{
        setShowPicker(false)
    }
    const handleCountrySelect=(country: ICountry)=>{
        onChange(country.name.common)
    }
    const handleShowPicker=()=>{
        setShowPicker(true)
    }
    return(
        <View style={{gap:5}} >
        <Text style={styles.label} >Select a country</Text>
        <View style={[styles.container,error && error.message && styles.errorContainer]} >
        <Pressable onPress={handleShowPicker} >
            <Text>{value ? value :"Please select a country"}</Text>
        </Pressable>
        </View>
        <CountrySelect
          visible={showPicker}
          onClose={hidePicker}
          onSelect={handleCountrySelect}
        />
         {error?.message && (
                <Text testID={`${name}-input-error-message`} style={styles.errorText}>
                  {error.message}
                </Text>
              )}
        </View>

    )
}

const styles=StyleSheet.create({
      errorText:{
    color:"red"
  },
    label:{
        color:"#000",
    },
    container:{
    width:"100%",
    minHeight:40,
    color:"#000",
      borderColor:"#000",
    borderWidth:1,
    borderRadius:50,
    justifyContent:'center',
    alignItems:"center",
    padding:5
  },
  errorContainer:{
    borderColor:"red"
  }
})