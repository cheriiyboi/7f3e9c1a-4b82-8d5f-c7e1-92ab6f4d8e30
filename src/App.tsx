/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import { Conversation, ModelType, Message } from './types';
import { MOCK_CONVERSATIONS } from './lib/mockData';
import { Menu, Plus } from 'lucide-react';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('1');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState<ModelType>('gpt-3.5');

  const activeConversation = conversations.find(c => c.id === activeConversationId) || null;

  // Setup Dark mode integration
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: Date.now(),
    };

    if (!activeConversation) {
      // Create new chat
      const newConv: Conversation = {
        id: Date.now().toString(),
        title: inputValue.slice(0, 30) + (inputValue.length > 30 ? '...' : ''),
        group: 'Today',
        messages: [newMessage],
      };
      setConversations([newConv, ...conversations]);
      setActiveConversationId(newConv.id);
    } else {
      const updated = conversations.map(c => 
        c.id === activeConversationId ? { ...c, messages: [...c.messages, newMessage] } : c
      );
      setConversations(updated);
    }
    setInputValue('');
  };

  const handleNewChat = () => {
    setActiveConversationId(null);
    setInputValue('');
    if (isMobile) setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-zinc-50 dark:bg-std-bg text-zinc-900 dark:text-zinc-50 overflow-hidden font-sans relative">
      <div className="absolute inset-0 bg-dots pointer-events-none z-0 transition-opacity duration-300"></div>
      <div className="absolute inset-0 bg-vignette pointer-events-none z-0"></div>

    <div className="flex w-full h-full relative z-10 pointer-events-none">
      {/* Mobile Overlay */}
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/60 dark:bg-black/80 z-40 transition-opacity backdrop-blur-md pointer-events-auto"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="pointer-events-auto h-full z-50 flex shrink-0">
          <Sidebar 
            isOpen={isSidebarOpen} 
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            conversations={conversations}
            activeId={activeConversationId}
            onSelect={(id) => {
              setActiveConversationId(id);
              if (isMobile) setIsSidebarOpen(false);
            }}
            onNewChat={handleNewChat}
            isMobile={isMobile}
            isDarkMode={isDarkMode}
            toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />
        </div>
        
        <main className="flex-1 flex flex-col relative h-full w-full overflow-hidden bg-transparent pointer-events-auto">
          {/* Mobile Header */}
          {!isSidebarOpen && isMobile && (
            <div className="md:hidden flex items-center justify-between px-3 py-3 border-b border-zinc-200 dark:border-std-border bg-white/80 dark:bg-std-bg2/80 backdrop-blur-md shrink-0 w-full relative z-30 shadow-sm">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-std-surface2 text-zinc-600 dark:text-zinc-300 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm absolute left-1/2 -translate-x-1/2 truncate max-w-[50%]">
                {activeConversation ? activeConversation.title : 'New chat'}
              </div>
              <button 
                onClick={handleNewChat}
                className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-std-surface2 text-zinc-600 dark:text-zinc-300 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          )}
          
          <ChatView 
            conversation={activeConversation}
            selectedModel={selectedModel}
            onModelSelect={setSelectedModel}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSendMessage={handleSendMessage}
          />
        </main>
      </div>
    </div>
  )
}

