import { Image, ImageProps } from "expo-image";
import { StyleSheet } from "react-native-unistyles";

export function EmptyStateImage(props:ImageProps) {
    return (
        <Image {...props} source={require('./empty-state.png')} style={[styles.image,props.style]} />
    )
}
export function EmptyInboxImage(props:ImageProps) {
    return (
        <Image {...props} source={require('./empty-inbox.png')} style={[styles.image,props.style]} />
    )
}

const styles=StyleSheet.create((theme)=>({
    image:{
        width:100,
        height:100
    }
}))