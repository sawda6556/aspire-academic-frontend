export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  attachment_url?: string;
  created_at: string;
}

export interface Conversation {
  otherUser: {
    id: string;
    full_name: string;
    avatar_url: string;
    online?: boolean;
  };
  lastMessage: Message;
  unreadCount: number;
}
