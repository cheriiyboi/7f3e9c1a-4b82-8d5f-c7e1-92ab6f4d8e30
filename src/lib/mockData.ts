import { Conversation } from '../types';

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    title: 'Hello World Discussion',
    group: 'Today',
    messages: [
      { id: 'm1', role: 'user', content: 'Hello, how are you?', timestamp: 1 },
      { id: 'm2', role: 'assistant', content: 'I\'m doing well, thank you!', timestamp: 2 },
      { id: 'm3', role: 'user', content: 'Hello, how are you?', timestamp: 3 },
      { id: 'm4', role: 'assistant', content: 'I\'m doing well, thank you!', timestamp: 4 }
    ]
  },
  {
    id: '2',
    title: 'This is a conversation title',
    group: 'Today',
    messages: []
  },
  {
    id: '3',
    title: 'This is a conversation title',
    group: 'Yesterday',
    messages: []
  },
  {
    id: '4',
    title: 'This is a very super long conversation title that doesn\'t fit',
    group: 'Yesterday',
    messages: []
  },
  {
    id: '5',
    title: 'This is a conversation title',
    group: 'Previous 7 days',
    messages: []
  },
  {
    id: '6',
    title: 'This is a conversation title',
    group: 'Previous 7 days',
    messages: []
  }
];
