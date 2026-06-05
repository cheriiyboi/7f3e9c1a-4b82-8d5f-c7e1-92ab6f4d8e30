export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  group: string;
  messages: Message[];
}

export type ModelType = 'gpt-3.5' | 'gpt-4';
