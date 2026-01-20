import { useAppSelector } from "@/redux";
import { router } from "expo-router";
import Avatar from "../Avatar/Avatar";

type ProfileAvatarProps = {
    disabled?: boolean;
    size?: number;
}

export default function ProfileAvatar({disabled=false,size=40}:ProfileAvatarProps) {
    const { user } = useAppSelector((state) => state.auth);
    const name = user?.user_metadata?.name ?? user?.email
    const handleNavigation = () => {
        router.push("/dashboard/profile");
    }
    return (
        <Avatar 
        name={name} 
        onPress={disabled ? undefined : handleNavigation}
        userName={`${name}-${user?.id??"id"}`}
        size={size} 
        source={user?.user_metadata?.avatar_url ?? ""} />
    )
}