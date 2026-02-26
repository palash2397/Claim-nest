export interface ConversationListItem {
  _id: string;
  participants: any[];
  lastMessage?: any;
  unreadCount?: number;
  updatedAt?: Date;
  createdAt?: Date;
}