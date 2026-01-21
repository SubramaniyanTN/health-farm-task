import { queries } from "@/api/queries";
import { supabase } from "@/src";
import { QueryClient } from "@tanstack/react-query";

export const subscribeToDatas = (queryClient: QueryClient) => {
  const channel = supabase
    .channel("leads:realtime")
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
          queryKey: queries.chat.leads._def,
        });
      }
    )
    .subscribe();

  return channel;
};
