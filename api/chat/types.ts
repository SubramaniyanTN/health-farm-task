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

  export type Lead = {
    id: string;
    name: string;
    time_utc: string | null;
    date_char: string | null;
    campaign: string | null;
    ad_id: string | null;
    campaign_id: string | null;
    lead_id: string;
    form_id: string | null;
    page_id: string | null;
    created_time: string | null;
    ad_name: string | null;
    inserted_at: string;
  };
  