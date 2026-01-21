import { ChannelValidationType } from "@/Schema"
import { alertService, supabase, triggerLeadsImport } from "@/src"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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

export const useUploadLeads = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: triggerLeadsImport,

    onSuccess: () => {
      alertService.alert?.({
        type: DropdownAlertType.Success,
        title: "Success",
        message: "Leads uploaded successfully",
      });

      queryClient.invalidateQueries();
    },
  });
};


export const useGetLeads =({searchTerm}:{searchTerm?:string})=>{
  return useInfiniteQuery<Lead[],any,Lead[]>({
    ...queries.chat.leads({searchTerm}),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length < 10 ?  undefined : pages.length + 1;
    },
    initialPageParam: 1,
    select: (data) => {
      return data.pages.flatMap((page) => page);
    },
  })
}