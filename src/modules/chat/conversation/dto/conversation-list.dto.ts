export interface ConversationListItem {
  _id: string;
  participants: string[];
  lastMessage: any | null;
  unreadCount: number;

}