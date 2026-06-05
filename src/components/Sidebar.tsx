import { Conversation } from '../types';
import { Plus, PanelLeftClose, MessageSquare, Edit2, Trash2, MoreHorizontal, Sun, Moon, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  isMobile: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Sidebar({ isOpen, onToggle, conversations, activeId, onSelect, onNewChat, isMobile, isDarkMode, toggleDarkMode }: Props) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Group conversations
  const grouped = conversations.reduce((acc, conv) => {
    if (!acc[conv.group]) acc[conv.group] = [];
    acc[conv.group].push(conv);
    return acc;
  }, {} as Record<string, Conversation[]>);

  const groupOrder = ['Today', 'Yesterday', 'Previous 7 days', 'Older'];

  return (
    <>
      <div 
        className={`fixed md:relative flex flex-col h-full bg-zinc-50 dark:bg-[#171717] w-[260px] shrink-0 z-50 transition-[transform,width,opacity] duration-200 ease-in-out border-r border-black/5 dark:border-transparent ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:opacity-0 md:overflow-hidden'
        }`}
      >
        <div className="flex items-center gap-2 p-2 shrink-0">
          <button 
            onClick={onNewChat}
            className="flex-1 flex items-center gap-2.5 px-3 py-3 rounded-md hover:bg-zinc-200/50 dark:hover:bg-[#242629] text-zinc-800 dark:text-white text-[14px] font-medium border border-zinc-200 dark:border-[#484a4e] transition-colors overflow-hidden"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span className="truncate">New chat</span>
          </button>
          <button 
            onClick={onToggle}
            className="hidden md:flex p-3 rounded-md hover:bg-zinc-200/50 dark:hover:bg-[#242629] text-zinc-500 dark:text-white border border-zinc-200 dark:border-[#484a4e] transition-colors shrink-0"
            title="Close sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-2 custom-scrollbar fade-edge">
          {groupOrder.map(group => {
            if (!grouped[group] || grouped[group].length === 0) return null;
            return (
              <div key={group} className="mt-5 first:mt-2">
                <h3 className="text-xs font-semibold text-zinc-400 dark:text-[#9ca6b5] mb-2 px-3">{group}</h3>
                <ul className="space-y-1">
                  {grouped[group].map(conv => (
                    <li key={conv.id} className="relative group">
                      <button
                        onClick={() => onSelect(conv.id)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-[14px] text-left transition-colors truncate ${
                          activeId === conv.id ? 'bg-zinc-200/80 dark:bg-[#2c2d30] text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-[#f5f9ff] hover:bg-zinc-200/50 dark:hover:bg-[#242629]'
                        }`}
                      >
                        <MessageSquare className="w-4 h-4 shrink-0 opacity-70" />
                        <span className="truncate flex-1 relative pr-6">
                           {conv.title}
                           {/* Overflow Fader */}
                           <div className={`absolute right-0 top-0 bottom-0 w-8 pointer-events-none transition-colors ${
                             activeId === conv.id 
                               ? 'bg-gradient-to-l from-zinc-200/80 dark:from-[#2c2d30]' 
                               : 'bg-gradient-to-l from-zinc-50 dark:from-[#171717] group-hover:from-zinc-200/50 dark:group-hover:from-[#242629]'
                           } to-transparent`}></div>
                        </span>
                      </button>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-200/50 dark:bg-[#242629] shadow-[-10px_0_10px_rgba(23,23,23,0)] dark:shadow-[-10px_0_10px_rgba(36,38,41,1)]">
                        <button className="p-1 px-[5px] text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1 px-[5px] text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="p-2 border-t border-black/5 dark:border-[#484a4e] relative z-20 shrink-0">
          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="absolute bottom-[52px] left-2 w-[calc(100%-16px)] bg-white dark:bg-[#1e1e1f] rounded-xl shadow-xl border border-black/10 dark:border-white/10 overflow-hidden mb-2 py-1 z-50 text-zinc-900 dark:text-white"
              >
                <div className="px-3 py-3 border-b border-black/5 dark:border-[#34373a]">
                  <p className="text-[14px] font-medium">Free Plan</p>
                </div>
                <button 
                  onClick={() => {toggleDarkMode(); setUserMenuOpen(false);}}
                  className="w-full flex items-center gap-3 px-3 py-3 text-[14px] hover:bg-zinc-100 dark:hover:bg-[#383b42] text-left transition-colors"
                >
                  {isDarkMode ? <Sun className="w-4 h-4 text-zinc-500" /> : <Moon className="w-4 h-4 text-zinc-500" />}
                  {isDarkMode ? 'Light mode' : 'Dark mode'}
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-3 text-[14px] hover:bg-zinc-100 dark:hover:bg-[#383b42] text-left transition-colors">
                  <Settings className="w-4 h-4 text-zinc-500" />
                  Settings & Beta
                </button>
                <div className="border-t border-black/5 dark:border-[#34373a] my-1"></div>
                <button className="w-full flex items-center gap-3 px-3 py-3 text-[14px] hover:bg-zinc-100 dark:hover:bg-[#383b42] text-left transition-colors">
                  <LogOut className="w-4 h-4 text-zinc-500" />
                  Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-zinc-200/50 dark:hover:bg-[#383b42] text-zinc-900 dark:text-white transition-colors border border-transparent"
          >
            <div className="flex items-center gap-3 text-[14px] font-medium pr-2 overflow-hidden w-full">
              <div className="w-[30px] h-[30px] rounded-[3px] bg-[#8e0000] shrink-0 flex items-center justify-center text-xs text-white pt-[1px]">
                U
              </div>
              <span className="truncate flex-1 text-left">username</span>
            </div>
            <MoreHorizontal className="w-4 h-4 shrink-0 text-zinc-400" />
          </button>
        </div>
      </div>
      
      {/* Absolute toggle button when sidebar is closed on desktop */}
      {!isOpen && !isMobile && (
        <button 
          onClick={onToggle}
          className="absolute top-4 left-4 z-40 p-2.5 rounded-md text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors hidden md:block group"
          title="Open sidebar"
        >
          <PanelLeftClose className="w-5 h-5 group-hover:text-zinc-900 dark:group-hover:text-white rotate-180 transition-transform" />
        </button>
      )}
    </>
  )
}
