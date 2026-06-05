import React from 'react';
import { Message } from '../types';
import { User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`w-full ${isUser ? 'dark:bg-transparent bg-white' : 'dark:bg-std-surface bg-zinc-50/50'} border-b border-zinc-200 dark:border-std-border transition-colors`}>
      <div className="w-full max-w-3xl mx-auto px-4 py-6 md:py-8 flex gap-4 md:gap-6 text-[15px] md:text-base">
        <div className="shrink-0 flex flex-col items-center">
          {isUser ? (
             <div className="w-8 h-8 bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 shrink-0 font-bold text-xs" style={{ clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))' }}>
               U
             </div>
          ) : (
             <div className="w-8 h-8 bg-zinc-100 dark:bg-std-surface2 flex items-center justify-center text-white shrink-0 shadow-[0_0_8px_rgba(0,0,0,0.05)] border border-zinc-200 dark:border-std-border-hi" style={{ clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))' }}>
               <img src="https://standardsc.pages.dev/assets/logo.png" alt="AI" className="w-[20px] h-[20px] invert dark:invert-0 object-contain drop-shadow-sm opacity-80" />
             </div>
          )}
        </div>
        <div className="flex-1 space-y-4 pt-1 max-w-full overflow-hidden">
          <div className="max-w-full leading-relaxed whitespace-pre-wrap dark:text-zinc-200 text-zinc-800 font-sans tracking-wide">
             {message.content}
          </div>
          
          {!isUser && (
            <div className="flex items-center gap-1.5 mt-2 -ml-2 text-zinc-400 dark:text-zinc-600">
               <button className="p-1.5 hover:bg-zinc-200/50 dark:hover:bg-std-surface2 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors" title="Copy"><Copy className="w-4 h-4" /></button>
               <button className="p-1.5 hover:bg-zinc-200/50 dark:hover:bg-std-surface2 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors" title="Good response"><ThumbsUp className="w-4 h-4" /></button>
               <button className="p-1.5 hover:bg-zinc-200/50 dark:hover:bg-std-surface2 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors" title="Bad response"><ThumbsDown className="w-4 h-4" /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
