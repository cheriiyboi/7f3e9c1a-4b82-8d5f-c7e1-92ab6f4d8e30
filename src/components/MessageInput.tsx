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
    <div className="w-full max-w-3xl mx-auto px-4 pt-2 pb-6">
      <div className="relative flex items-center bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-3xl shadow-sm focus-within:ring-2 focus-within:ring-black/5 dark:focus-within:ring-white/10 dark:focus-within:border-zinc-600 transition-all">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message"
          className="w-full min-h-[56px] max-h-[200px] bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 border-none focus:ring-0 resize-none py-[16px] pl-5 pr-14 text-[15px] leading-relaxed overflow-y-auto outline-none rounded-3xl"
          rows={1}
        />
        <button 
          onClick={onSend}
          disabled={!value.trim()}
          className="absolute right-2 bottom-2 p-2 rounded-full bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:bg-zinc-200 dark:disabled:bg-zinc-700 disabled:text-zinc-400 dark:disabled:text-zinc-500 text-white dark:text-black transition-colors flex items-center justify-center cursor-pointer disabled:cursor-auto"
        >
          <Send className="w-4 h-4 ml-[-1px]" />
        </button>
      </div>
      <div className="text-center text-[11px] text-zinc-400 dark:text-zinc-500 mt-4 font-medium px-4">
        ChatGPT clones are for educational purposes. This applet was enhanced in AI Studio.
      </div>
    </div>
  );
}
