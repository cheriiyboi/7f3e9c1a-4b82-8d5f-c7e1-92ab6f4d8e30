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
      <div className="relative flex items-center bg-white dark:bg-[#2f353d]/50 border border-black/10 dark:border-[#484a4e]/50 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-none overflow-hidden transition-colors">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message"
          className="w-full min-h-[52px] max-h-[200px] bg-transparent text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-500 border-none focus:ring-0 resize-none py-[15px] pl-4 pr-12 text-base leading-relaxed overflow-y-auto outline-none"
          rows={1}
        />
        <button 
          onClick={onSend}
          disabled={!value.trim()}
          className="absolute right-2 bottom-1.5 p-1.5 rounded-lg bg-[#19c37d] hover:bg-[#1a9a63] disabled:bg-indigo-50/50 dark:disabled:bg-white/10 disabled:text-zinc-400 dark:disabled:text-white/30 text-white transition-colors flex items-center justify-center cursor-pointer disabled:cursor-auto"
        >
          <Send className="w-4 h-4 ml-[-1px] mb-[-1px]" />
        </button>
      </div>
      <div className="text-center text-xs text-zinc-500 dark:text-[#c9ccd1] mt-3 font-medium opacity-80">
        This is a ChatGPT UI Clone based on the user's original HTML/CSS, improved for production with React & Tailwind.
      </div>
    </div>
  );
}
