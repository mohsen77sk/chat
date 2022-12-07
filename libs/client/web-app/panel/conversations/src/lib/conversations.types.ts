export interface ConversationsPaginate {
  items: Conversations[];
  pagination: Pagination;
}

export interface MessagesPaginate {
  items: Messages[];
  pagination: Pagination;
}

export interface UsersPaginate {
  items: Users[];
  pagination: Pagination;
}

export interface ConversationInfo {
  id: number;
  name?: string;
  username?: string;
  avatar?: string;
  muted?: boolean;
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
  messages?: Messages[];
}

export interface Messages {
  id: number;
  userId?: string;
  isMine?: boolean;
  text?: string;
  createdAt?: Date;
  editedAt?: Date;
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
