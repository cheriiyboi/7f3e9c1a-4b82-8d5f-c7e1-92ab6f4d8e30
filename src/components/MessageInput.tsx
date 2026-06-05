import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

export default function MessageInput({ value, onChange, onSend }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSend();
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pt-2 pb-6 group">
      <div 
        className="relative flex items-center bg-zinc-50 dark:bg-std-surface border border-zinc-200 dark:border-std-border shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] focus-within:border-black dark:focus-within:border-white transition-all overflow-hidden" 
        style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="SEND A MESSAGE..."
          className="w-full min-h-[58px] max-h-[200px] bg-transparent text-zinc-900 dark:text-white placeholder:text-zinc-500 border-none focus:ring-0 resize-none py-[18px] pl-5 pr-[64px] text-[13px] font-bold tracking-[1.5px] uppercase font-display flex flex-col justify-center overflow-y-auto outline-none transition-colors"
          rows={1}
        />
        <button 
          onClick={onSend}
          disabled={!value.trim()}
          className="absolute right-2 bottom-1/2 translate-y-1/2 w-10 h-10 bg-black dark:bg-white hover:opacity-80 disabled:opacity-30 text-white dark:text-black transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed group/btn"
          style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] opacity-0 group-hover/btn:opacity-10 transition-opacity bg-[size:6px_6px] pointer-events-none"></div>
          <Send className="w-4 h-4 ml-[-2px] relative z-10" />
        </button>
      </div>
      <div className="text-center text-[10px] text-zinc-400 dark:text-zinc-600 mt-4 font-bold tracking-[2px] uppercase font-display mx-4 flex items-center gap-2 justify-center">
        <div className="w-2 h-[1px] bg-zinc-300 dark:bg-zinc-700"></div>
        ChatGPT clones are for educational purposes
        <div className="w-2 h-[1px] bg-zinc-300 dark:bg-zinc-700"></div>
      </div>
    </div>
  );
}
