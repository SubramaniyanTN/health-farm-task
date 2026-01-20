import { queries } from "@/api/queries";
import { supabase } from "@/src";
import { QueryClient } from "@tanstack/react-query";

export const subscribeToChannels = (queryClient: QueryClient) => {
  const channel = supabase
    .channel("channels:realtime")
    .on(
      "postgres_changes",
      {
        event: "INSERT", // INSERT | UPDATE | DELETE
        schema: "public",
        table: "channels",
      },
      () => {
        // 🔄 Refresh channels list
        queryClient.invalidateQueries({
          queryKey: queries.chat.channels._def,
        });
      }
    )
    .subscribe();

  return channel;
};
