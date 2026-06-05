import { Message } from '../types';
import { User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`w-full ${isUser ? 'dark:bg-transparent bg-white' : 'dark:bg-[#3f4042] bg-zinc-50'} border-b border-black/5 dark:border-[#292d32]`}>
      <div className="w-full max-w-3xl mx-auto px-4 py-6 md:py-8 flex gap-4 md:gap-6 text-sm md:text-base">
        <div className="shrink-0 flex flex-col items-center">
          {isUser ? (
             <div className="w-8 h-[30px] rounded-sm bg-[#8e0000] flex items-center justify-center text-white shrink-0 uppercase font-semibold text-sm leading-none pt-0.5">
               U
             </div>
          ) : (
             <div className="w-8 h-[30px] rounded-sm bg-black dark:bg-[#000000] p-1 flex items-center justify-center text-white shrink-0">
               <img src="https://standardsc.pages.dev/assets/logo.png" alt="AI" className="w-5 h-5 invert object-contain" />
             </div>
          )}
        </div>
        <div className="flex-1 space-y-4 pt-1 max-w-full overflow-hidden">
          <div className="max-w-full leading-relaxed whitespace-pre-wrap dark:text-[#e1e6ed] text-zinc-800 mt-[1px]">
             {message.content}
          </div>
          
          {!isUser && (
            <div className="flex items-center gap-1 mt-2 -ml-2 text-zinc-400 dark:text-zinc-400">
               <button className="p-2 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors rounded"><Copy className="w-[15px] h-[15px]" /></button>
               <button className="p-2 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors rounded"><ThumbsUp className="w-[15px] h-[15px]" /></button>
               <button className="p-2 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors rounded"><ThumbsDown className="w-[15px] h-[15px]" /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
