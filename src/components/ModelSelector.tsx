import { Zap, Sparkles } from 'lucide-react';
import { ModelType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface Props {
  selectedModel: ModelType;
  onSelect: (model: ModelType) => void;
}

export default function ModelSelector({ selectedModel, onSelect }: Props) {
  const [hoveredInfo, setHoveredInfo] = useState<ModelType | null>(null);

  const models = [
    {
      id: 'gpt-3.5' as ModelType,
      icon: Zap,
      label: 'GPT-3.5',
      color: 'dark:text-[#5fc319] text-emerald-500',
      description: 'Our fastest model, great for most every day tasks.',
      availability: 'Available to Free and Plus users',
    },
    {
      id: 'gpt-4' as ModelType,
      icon: Sparkles,
      label: 'GPT-4',
      color: 'dark:text-[#f22626] text-purple-500',
      description: 'Our most capable model, great for creative stuff.',
      availability: 'Available for Plus users.',
    }
  ];

  return (
    <div className="flex bg-zinc-100/80 dark:bg-std-surface p-1.5 w-fit mx-auto border border-zinc-200 dark:border-std-border relative z-10 shadow-sm" style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
      {models.map((model) => (
        <div key={model.id} className="relative" 
             onMouseEnter={() => setHoveredInfo(model.id)}
             onMouseLeave={() => setHoveredInfo(null)}>
          <button
            onClick={() => onSelect(model.id)}
            className={`flex items-center gap-2.5 px-6 py-2.5 text-[12px] uppercase font-bold tracking-[1.5px] transition-all w-[140px] md:w-[150px] justify-center font-display border ${
              selectedModel === model.id 
                ? 'bg-white dark:bg-std-surface2 text-zinc-900 dark:text-white shadow-sm border-zinc-200/50 dark:border-std-border-hi' 
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent hover:border-zinc-200 dark:hover:border-std-border'
            }`}
            style={{ clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))' }}
          >
            <model.icon className={`w-3.5 h-3.5 ${selectedModel === model.id ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'} transition-colors`} />
            {model.label}
          </button>
          
          <AnimatePresence>
            {hoveredInfo === model.id && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[260px] bg-zinc-900 dark:bg-std-surface border border-zinc-800 dark:border-std-border text-white p-4 shadow-xl pointer-events-none"
                style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
              >
                <p className="text-[13px] mb-2 relative z-10 font-bold tracking-wide font-display">{model.description}</p>
                <p className="text-[11px] text-zinc-400 relative z-10">{model.availability}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
