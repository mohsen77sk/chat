export interface Conversation {
  id: string;
  name?: string;
  avatar?: string;
  unreadCount?: number;
  muted?: boolean;
  lastMessage?: string;
  lastMessageAt?: Date;
  messages?: ConversationMessage[];
}

export interface ConversationMessage {
  id: string;
  contactId?: string;
  isMine?: boolean;
  value?: string;
  createdAt?: Date;
  editedAt?: Date;
}
