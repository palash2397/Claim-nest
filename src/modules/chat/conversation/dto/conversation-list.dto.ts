export interface ConversationListItem {
  _id: string;
  type: string;
  title: string;
  participants: string[];
  lastMessage: any | null;
  unreadCount: number;

}