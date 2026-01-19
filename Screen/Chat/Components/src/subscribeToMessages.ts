import { queries } from "@/api/queries";
import { supabase } from "@/src";
import { QueryClient } from "@tanstack/react-query";

export const subscribeToMessages = (
  channelId: string,
  queryClient: QueryClient
) => {
  const channel = supabase
    .channel(`messages:${channelId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `channel_id=eq.${channelId}`,
      },
      (payload) => {
        queryClient.invalidateQueries({ queryKey: queries.chat._def });
      }
    )
    .subscribe();

  return channel;
};
