export interface Conversations {
  id: string;
  name?: string;
  avatar?: string;
  unreadCount?: number;
  muted?: boolean;
  lastMessage?: string;
  lastMessageAt?: Date;
  messages?: ConversationsMessage[];
}

export interface ConversationsMessage {
  id: string;
  contactId?: string;
  isMine?: boolean;
  value?: string;
  createdAt?: Date;
  editedAt?: Date;
}
