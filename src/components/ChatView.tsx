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
    <div className="flex flex-col h-full w-full bg-transparent font-sans">
      {/* Model Name Banner */}
      {!isNewChat && (
        <div className="flex items-center justify-center gap-2 py-3 md:py-4 border-b border-zinc-200 dark:border-std-border bg-white/80 dark:bg-std-surface/80 backdrop-blur-md text-[11px] font-bold tracking-[2px] uppercase text-zinc-500 dark:text-zinc-400 z-10 w-full shrink-0 font-display">
           <Zap className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
           {selectedModel === 'gpt-3.5' ? 'Default (GPT-3.5)' : 'GPT-4'}
        </div>
      )}

      {/* Main scrollable area */}
      <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
        {isNewChat ? (
          <div className="flex flex-col h-full w-full max-w-2xl mx-auto px-4 relative z-10">
             <div className="pt-8 w-full flex justify-center">
                <ModelSelector selectedModel={selectedModel} onSelect={onModelSelect} />
             </div>
             
             <div className="flex-1 flex flex-col items-center justify-center pt-8 pb-32">
               <div className="flex flex-col items-center gap-6 px-4">
                 <div className="group relative w-32 h-32 cursor-pointer isolate flex justify-center items-center">
                   {/* Logo Outer Glow on Hover */}
                   <div className="absolute inset-[-18px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18)_0%,transparent_70%)] opacity-0 scale-80 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400 pointer-events-none -z-10 dark:bg-[radial-gradient(circle,rgba(255,255,255,0.18)_0%,transparent_70%)]"></div>
                   
                   <img src="https://standardsc.pages.dev/assets/logo.png" alt="Logo" className="w-full h-full object-contain invert dark:invert-0 drop-shadow-[0_0_35px_rgba(0,0,0,0.25)] dark:logo-filter transform transition-all duration-300 relative z-10 dark:group-hover:logo-filter-hover group-hover:scale-[1.04]" />
                   
                   {/* Scan Overlay */}
                   <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-250 z-20 logo-overlay-scan hidden dark:block"></div>
                 </div>
                 
                 <div className="text-center">
                   <h1 className="font-display text-[42px] md:text-[52px] font-bold tracking-[-2px] md:tracking-[-3px] leading-none text-zinc-900 dark:text-white transition-colors duration-300 select-none">
                     STANDARD
                   </h1>
                   <p className="text-zinc-500 dark:text-zinc-400 text-[11px] md:text-[12px] font-bold uppercase tracking-[2px] md:tracking-[3px] mt-3 select-none font-display">
                     HOW CAN I HELP YOU TODAY?
                   </p>
                 </div>
               </div>
             </div>
          </div>
        ) : (
          <div className="pb-8 max-w-4xl mx-auto w-full relative z-10">
            {conversation.messages.map(msg => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="shrink-0 w-full bg-gradient-to-t from-zinc-50 via-zinc-50 dark:from-std-bg dark:via-std-bg to-transparent pt-6 border-t border-transparent z-20">
        <MessageInput 
          value={inputValue} 
          onChange={onInputChange} 
          onSend={onSendMessage} 
        />
      </div>
    </div>
  )
}
