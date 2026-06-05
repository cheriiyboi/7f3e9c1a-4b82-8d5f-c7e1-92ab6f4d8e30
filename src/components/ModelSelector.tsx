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
    <div className="flex bg-zinc-100/80 dark:bg-zinc-900 p-1.5 rounded-2xl w-fit mx-auto border border-zinc-200 dark:border-zinc-800 relative z-10 shadow-sm">
      {models.map((model) => (
        <div key={model.id} className="relative" 
             onMouseEnter={() => setHoveredInfo(model.id)}
             onMouseLeave={() => setHoveredInfo(null)}>
          <button
            onClick={() => onSelect(model.id)}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-[14px] font-semibold transition-all w-[140px] md:w-[150px] justify-center ${
              selectedModel === model.id 
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-200/50 dark:border-zinc-700' 
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 border border-transparent'
            }`}
          >
            <model.icon className={`w-4 h-4 ${selectedModel === model.id ? model.color : 'text-zinc-400'} transition-colors`} />
            {model.label}
          </button>
          
          <AnimatePresence>
            {hoveredInfo === model.id && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[260px] bg-zinc-900 dark:bg-zinc-800 text-white rounded-2xl p-4 shadow-xl pointer-events-none border border-zinc-800 dark:border-zinc-700"
              >
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-900 dark:bg-zinc-800 rotate-45 border-l border-t border-zinc-800 dark:border-zinc-700" />
                <p className="text-sm mb-2 relative z-10 font-medium">{model.description}</p>
                <p className="text-[13px] text-zinc-400 relative z-10">{model.availability}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
