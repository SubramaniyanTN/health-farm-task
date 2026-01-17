import { supabase } from "@/src";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

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
        },
        onError: (error) => {
            console.log("On Failure",error)
        }
    })
}