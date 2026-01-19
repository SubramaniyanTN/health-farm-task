import {
  MutationCache,
  QueryCache,
  QueryClient
} from "@tanstack/react-query";
import { DropdownAlertType } from "react-native-dropdownalert";
import { alertService } from "../utils/alerts";

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
      },
    },
    mutationCache: new MutationCache({
      onError: (error: any,variables) => {
        alertService.alert?.({
            type:DropdownAlertType.Error,
            title:"Error",
            message:error.message ?? "Something went wrong",
            interval:1000
          });
        return ;
      },
    }),
    queryCache:new QueryCache({
      onError:(error:any,query)=>{
          alertService.alert?.({
              type:DropdownAlertType.Error,
              title:"Error",
              message:error.message ?? "Something went wrong",
              interval:1000
            });
        return ;
  
      },
  })
  });