import { setAuthData, useAppDispatch } from "@/redux";
import { alertService, supabase } from "@/src";
import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials, VerifyOtpParams } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { DropdownAlertType } from "react-native-dropdownalert";

export const useSignUp = () => {
    return useMutation({
        mutationFn:async (data: SignUpWithPasswordCredentials) => {
            const response= await supabase.auth.signUp(data)
            if(response.error){
                throw new Error(response.error.message)
            }
            return response.data
        },
        onSuccess: (data) => {
            console.log("On Success",data)
            alertService.alert?.({
                type:DropdownAlertType.Success,
                title:"Success",
                message:"Check your email for verification",
                interval:1000
              });
            router.push(`/otpverify?email=${data.user?.email}`)
        },
    })
}

export const useSignIn = () => {
    const dispatch = useAppDispatch();
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
            dispatch(setAuthData({
                accessToken: data.session.access_token,
                refreshToken: data.session.refresh_token,
                isAuthenticated: true,
                user: data.user,
            }))
        },
        onError: (error) => {
            console.log("On Failure",error)
        }
    })
}

export const useOtpVerify = () => {
    return useMutation({
        mutationFn:async (data: VerifyOtpParams) => {
            const response= await supabase.auth.verifyOtp(data)
            if(response.error){
                throw new Error(response.error.message)
            }
            return response.data
        },
        onSuccess: (data) => {
            alertService.alert?.({
                type:DropdownAlertType.Success,
                title:"Success",
                message:"Check your email for verification",
                interval:1000
              });
              router.push(`/auth/signin?email=${data.user?.email}`)
        },
        onError: (error) => {
            console.log("On Failure",error)
        }
    })
}