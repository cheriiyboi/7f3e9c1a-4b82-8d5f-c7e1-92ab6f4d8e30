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
    <div className="flex flex-col h-full w-full bg-white dark:bg-[#2c2d30]">
      {/* Model Name Banner */}
      {!isNewChat && (
        <div className="flex items-center justify-center gap-2 py-4 md:py-5 border-b border-black/5 dark:border-[#292d32] bg-white dark:bg-[#2c2d30] text-[13px] font-semibold text-zinc-500 dark:text-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-none z-10 w-full shrink-0">
           <Zap className="w-3.5 h-3.5" />
           {selectedModel === 'gpt-3.5' ? 'Default (GPT-3.5)' : 'GPT-4'}
        </div>
      )}

      {/* Main scrollable area */}
      <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
        {isNewChat ? (
          <div className="flex flex-col h-full">
             <div className="pt-6 md:pt-8 w-full px-4">
                <ModelSelector selectedModel={selectedModel} onSelect={onModelSelect} />
             </div>
             
             <div className="flex-1 flex flex-col items-center justify-center pt-8 pb-32">
               <div className="flex flex-col items-center gap-4 md:gap-6 opacity-80 pointer-events-none select-none px-4">
                 <div className="bg-zinc-100 dark:bg-black/20 p-6 md:p-8 rounded-full">
                   <img src="https://standardsc.pages.dev/assets/logo.png" alt="Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain dark:invert-0 invert opacity-40 drop-shadow-md" />
                 </div>
                 <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-800 dark:text-[#848484] drop-shadow-sm text-center">ChatWTF</h1>
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
      <div className="shrink-0 w-full bg-gradient-to-t from-white via-white dark:from-[#2c2d30] dark:via-[#2c2d30] to-transparent pt-6 md:pt-10 z-20">
        <MessageInput 
          value={inputValue} 
          onChange={onInputChange} 
          onSend={onSendMessage} 
        />
      </div>
    </div>
  )
}
