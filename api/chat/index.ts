import { ChannelValidationType } from "@/Schema"
import { alertService, LeadRow, supabase, uploadLeads } from "@/src"
import { FunctionsHttpError } from "@supabase/supabase-js"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"
import { DropdownAlertType } from "react-native-dropdownalert"
import { queries } from "../queries"
import { Channel, Lead, Message, SendMessageInput } from "./types"

export const useGetChannels =()=>{
    return useQuery<Channel[]>({
        ...queries.chat.channels()
    })
}

export const useGetMessages = (channelId:string) => {
    return useQuery<Message[]>({
        ...queries.chat.messages(channelId),
        enabled: !!channelId, 
        select: (data) => data.reverse(),
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
  });
};

export const useCreateChannel=()=>{
  const queryClient = useQueryClient();
  return useMutation<Channel, Error, ChannelValidationType>({
    mutationFn: async ({ name }) => {
      const { data, error } = await supabase
        .from("channels")
        .insert({ name })
        .select()
        .single();

      if (error) throw error;

      return data as Channel;
    },
    onSuccess: (data) => {
      alertService.alert?.({
        type:DropdownAlertType.Success,
        title:"Success",
        message:"Channel created successfully",
        interval:1000
      });
      queryClient.invalidateQueries({ queryKey: queries.chat._def });
      router.back()
    },
  })
}

export const useUploadLeads =()=>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (leads:LeadRow[]) => {
      return await uploadLeads(leads);
    },
    onSuccess: (data,variables) => {
      alertService.alert?.({
        type:DropdownAlertType.Success,
        title:"Success",
        message:"Leads uploaded successfully",
        interval:1000
      });
      console.log("Success data",{data,});
      queryClient.invalidateQueries({ queryKey: queries.chat.leads._def});
      router.navigate("/dashboard/data");
    },
    onError: async(error,variables) => {
      if (error && error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json()
        console.log('Function returned an error', errorMessage)
      }
      alertService.alert?.({
        type:DropdownAlertType.Error,
        title:"Error",
        message:"Failed to upload leads",
        interval:1000
      });
      console.log("Error data",{error});
    }
  })
}

export const useGetLeads =()=>{
  return useQuery<Lead[]>({
    ...queries.chat.leads()
  })
}


