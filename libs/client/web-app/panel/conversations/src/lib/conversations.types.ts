export interface ConversationsPaginate {
  items: Conversations[];
  pagination: Pagination;
}

export interface MessagesPaginate {
  items: Message[];
  pagination: Pagination;
}

export interface UsersPaginate {
  items: Users[];
  pagination: Pagination;
}

export type ConversationType = 'PRIVATE' | 'GROUP';

export interface ConversationInfo {
  id: number;
  name?: string;
  username?: string;
  avatar?: string;
  about?: string;
  muted?: boolean;
  type?: ConversationType;
  users?: UsersPaginate[];
}

export interface Conversations {
  id: number;
  name?: string;
  avatar?: string;
  unreadCount?: number;
  muted?: boolean;
  lastMessage?: string;
  lastMessageAt?: Date;
  type?: ConversationType;
  messages?: Message[];
}

export interface Message {
  id: number;
  userId?: string;
  isMine?: boolean;
  text?: string;
  createdAt?: Date;
  editedAt?: Date;
  conversationsId?: string;
}

export interface Users {
  id: string;
  name?: string;
  username?: string;
  avatar?: string;
}

export interface Pagination {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
