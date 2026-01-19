export type Channel = {
    id: string;
    name: string;
    created_at: string;
}


/** Message row type (matches DB) */
export type Message = {
    id: string;
    channel_id: string;
    sender_id: string;
    content: string;
    created_at: string;
  };
  
  /** Input type for sending message */
  export type SendMessageInput = {
    channelId: string;
    senderId: string;
    content: string;
  };