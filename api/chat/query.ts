import { supabase } from "@/src";
import { createQueryKeys } from "@barehera/query-key-factory";
import { Message } from "./types";

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
    }),
    messages: (channelId: string) => ({
        queryKey: ["messages", channelId],
        queryFn: async (): Promise<Message[]> => {
          const { data, error } = await supabase
            .from("messages")
            .select("*")
            .eq("channel_id", channelId)
            .order("created_at", { ascending: true });
    
          if (error) throw error;
          return data ?? [];
        },
      }),
      leads:()=>({
        queryKey:[],
        queryFn:async()=>{
          const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("inserted_at", { ascending: false });
  
        if (error) throw error;
        return data;
        },
      })
})