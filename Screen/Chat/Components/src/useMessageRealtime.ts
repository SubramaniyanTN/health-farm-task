import { supabase } from "@/src";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { subscribeToMessages } from "./subscribeToMessages";

export const useMessageRealtime = (channelId?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!channelId) return;
    const channel = subscribeToMessages(channelId, queryClient);

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelId, queryClient]);
};
