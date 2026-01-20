import { supabase } from "@/src";
import { createQueryKeys } from "@barehera/query-key-factory";
import { Message } from "./types";

let pageSize = 10;
const SEARCHABLE_COLUMNS = [
  "name",
  "campaign",
  "ad_name",
] as const;

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
      leads:({searchTerm}:{searchTerm?:string})=>({
        queryKey:[ searchTerm],
        queryFn:async({pageParam=1})=>{
          const page = Number(pageParam) || 1;   // page starts from 1
          const limit = Number(pageSize) || 10;
          
          const from = (page - 1) * limit;
          const to = from + limit - 1;
          
          let query = supabase
            .from("leads")
            .select("*", { count: "exact" })
            .order("inserted_at", { ascending: false })
            .range(from, to);
          
            if (searchTerm?.trim()) {
              const filters = SEARCHABLE_COLUMNS
                .map((col) => `${col}.ilike.%${searchTerm}%`)
                .join(",");
            
              query = query.or(filters);
            }
            
          
          const { data, error, } = await query;
        if (error) throw error;
        return data;
        },
      })
})