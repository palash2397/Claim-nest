export interface ConversationListItem {
  _id: string;
  type: string;
  participants: string[];
  lastMessage: any | null;
  unreadCount: number;

}