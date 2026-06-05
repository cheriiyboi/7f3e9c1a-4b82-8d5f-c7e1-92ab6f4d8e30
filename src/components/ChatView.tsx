import { Zap } from 'lucide-react';
import { Conversation, ModelType } from '../types';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import ModelSelector from './ModelSelector';
import { useEffect, useRef } from 'react';

interface Props {
  conversation: Conversation | null;
  selectedModel: ModelType;
  onModelSelect: (m: ModelType) => void;
  inputValue: string;
  onInputChange: (val: string) => void;
  onSendMessage: () => void;
}

export default function ChatView({ 
  conversation, 
  selectedModel, 
  onModelSelect,
  inputValue,
  onInputChange,
  onSendMessage
}: Props) {
  
  const isNewChat = !conversation || conversation.messages.length === 0;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages.length]);

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-950 font-sans">
      {/* Model Name Banner */}
      {!isNewChat && (
        <div className="flex items-center justify-center gap-2 py-3 md:py-4 border-b border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 text-[13px] font-medium text-zinc-500 dark:text-zinc-400 z-10 w-full shrink-0">
           <Zap className="w-3.5 h-3.5" />
           {selectedModel === 'gpt-3.5' ? 'Default (GPT-3.5)' : 'GPT-4'}
        </div>
      )}

      {/* Main scrollable area */}
      <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
        {isNewChat ? (
          <div className="flex flex-col h-full max-w-4xl mx-auto px-4">
             <div className="pt-8 w-full flex justify-center">
                <ModelSelector selectedModel={selectedModel} onSelect={onModelSelect} />
             </div>
             
             <div className="flex-1 flex flex-col items-center justify-center pt-8 pb-32">
               <div className="flex flex-col items-center gap-6 opacity-80 pointer-events-none select-none px-4">
                 <div className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-[2rem] shadow-sm transform transition-all duration-500">
                   <img src="https://standardsc.pages.dev/assets/logo.png" alt="Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain dark:invert-0 invert opacity-60 drop-shadow-md" />
                 </div>
                 <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 drop-shadow-sm text-center">ChatWTF</h1>
                 <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg text-center max-w-md">How can I help you today?</p>
               </div>
             </div>
          </div>
        ) : (
          <div className="pb-8">
            {conversation.messages.map(msg => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="shrink-0 w-full bg-gradient-to-t from-white via-white dark:from-zinc-950 dark:via-zinc-950 to-transparent pt-6 border-t border-transparent z-20">
        <MessageInput 
          value={inputValue} 
          onChange={onInputChange} 
          onSend={onSendMessage} 
        />
      </div>
    </div>
  )
}
