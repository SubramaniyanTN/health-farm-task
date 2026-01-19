import { Message } from "@/api";
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
        const newMessage = payload.new as Message;

        // 🔥 Merge into React Query cache
        queryClient.setQueryData<Message[]>(
          ["chat", "messages", channelId],
          (old) => {
            if (!old) return [newMessage];

            // ✅ de-duplicate (important!)
            const exists = old.some((m) => m.id === newMessage.id);
            if (exists) return old;

            return [...old, newMessage];
          }
        );
      }
    )
    .subscribe();

  return channel;
};
