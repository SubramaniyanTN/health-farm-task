import { supabase } from "@/src";
import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export const useSignUp = () => {
    return useMutation({
        mutationFn:async (data: SignUpWithPasswordCredentials) => {
            const response= await supabase.auth.signUp(data)
            if(response.error){
                throw new Error(response.error.message)
            }
            return response.data
        },
        onSuccess: () => {
            router.push("/auth/signin")
        },
    })
}

export const useSignIn = () => {
    return useMutation({
        mutationFn:async (data: SignInWithPasswordCredentials) => {
            const response= await supabase.auth.signInWithPassword(data)
            if(response.error){
                throw new Error(response.error.message)
            }
            return response.data
        },
        onSuccess: (data) => {
            console.log("On Success",data)
        },
        onError: (error) => {
            console.log("On Failure",error)
        }
    })
}