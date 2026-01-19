import { supabase } from "@/src"
import { useMutation, useQuery } from "@tanstack/react-query"
import { queries } from "../queries"
import { Channel, Message, SendMessageInput } from "./types"

export const useGetChannels =()=>{
    return useQuery<Channel[]>({
        ...queries.chat.channels()
    })
}

export const useGetMessages = (channelId:string) => {
    return useQuery<Message[]>({
        ...queries.chat.messages(channelId),
        enabled: !!channelId, 
    })
}

export const useSendMessage = () => {
  return useMutation<Message, Error, SendMessageInput>({
    mutationFn: async ({ channelId, senderId, content }) => {
      if (!content.trim()) {
        throw new Error("Message content cannot be empty");
      }

      const { data, error } = await supabase
        .from("messages")
        .insert({
          channel_id: channelId,
          sender_id: senderId,
          content,
        })
        .select()
        .single();

      if (error) throw error;

      return data as Message;
    },
    onSuccess: (data) => {
      console.log({data})
    },
    onError: (error) => {
      console.log({error})
    }
  });
};


