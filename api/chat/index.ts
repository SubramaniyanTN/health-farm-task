import { useQuery } from "@tanstack/react-query"
import { queries } from "../queries"
import { Channel } from "./types"

export const useGetChannels =()=>{
    return useQuery<Channel[]>({
        ...queries.chat.channels()
    })
}