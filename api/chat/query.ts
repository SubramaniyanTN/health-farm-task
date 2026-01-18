import { supabase } from "@/src";
import { createQueryKeys } from "@barehera/query-key-factory";

export const chatKeys =createQueryKeys("chat",{
    channels:()=>({
        queryKey:[],
        queryFn:async()=>{
            const { data, error } = await supabase
            .from("channels")
            .select("*")
            .order("created_at", { ascending: true });
            if (error) throw error;
            return data;
        },
    })
})