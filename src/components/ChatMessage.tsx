import { Message } from '../types';
import { User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`w-full ${isUser ? 'dark:bg-transparent bg-white' : 'dark:bg-zinc-900 bg-zinc-50/50'} border-b border-zinc-100 dark:border-zinc-800/50 transition-colors`}>
      <div className="w-full max-w-3xl mx-auto px-4 py-6 md:py-8 flex gap-4 md:gap-6 text-[15px] md:text-base">
        <div className="shrink-0 flex flex-col items-center">
          {isUser ? (
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-indigo-500 shadow-sm flex items-center justify-center text-white shrink-0 font-bold text-xs">
               U
             </div>
          ) : (
             <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white shrink-0 shadow-sm shadow-black/10">
               <img src="https://standardsc.pages.dev/assets/logo.png" alt="AI" className="w-[18px] h-[18px] invert dark:invert-0 object-contain" />
             </div>
          )}
        </div>
        <div className="flex-1 space-y-4 pt-1 max-w-full overflow-hidden">
          <div className="max-w-full leading-relaxed whitespace-pre-wrap dark:text-zinc-200 text-zinc-800">
             {message.content}
          </div>
          
          {!isUser && (
            <div className="flex items-center gap-1.5 mt-2 -ml-2 text-zinc-400 dark:text-zinc-500">
               <button className="p-1.5 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors rounded-md" title="Copy"><Copy className="w-4 h-4" /></button>
               <button className="p-1.5 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors rounded-md" title="Good response"><ThumbsUp className="w-4 h-4" /></button>
               <button className="p-1.5 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors rounded-md" title="Bad response"><ThumbsDown className="w-4 h-4" /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
