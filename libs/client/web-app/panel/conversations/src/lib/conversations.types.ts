export interface ConversationsPaginate {
  items: Conversations[];
  pagination: Pagination;
}

export interface Conversations {
  id: number;
  name?: string;
  avatar?: string;
  unreadCount?: number;
  muted?: boolean;
  lastMessage?: string;
  lastMessageAt?: Date;
  messages?: ConversationsMessage[];
}

export interface ConversationsMessage {
  id: number;
  contactId?: string;
  isMine?: boolean;
  value?: string;
  createdAt?: Date;
  editedAt?: Date;
}

export interface Pagination {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
