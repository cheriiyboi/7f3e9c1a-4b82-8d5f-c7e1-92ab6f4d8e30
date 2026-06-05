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
        className={`fixed md:relative flex flex-col h-full bg-zinc-50 dark:bg-zinc-900 w-[260px] shrink-0 z-50 transition-[transform,width,opacity] duration-300 ease-in-out border-r border-zinc-200 dark:border-zinc-800 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:opacity-0 md:overflow-hidden'
        }`}
      >
        <div className="flex items-center gap-2 p-3 shrink-0">
          <button 
            onClick={onNewChat}
            className="flex-1 flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-50 text-[14px] font-medium transition-colors overflow-hidden"
          >
            <div className="w-5 h-5 rounded-full bg-zinc-800 dark:bg-zinc-50 flex items-center justify-center shrink-0">
               <Plus className="w-3.5 h-3.5 text-white dark:text-zinc-900 stroke-[3]" />
            </div>
            <span className="truncate">New chat</span>
          </button>
          <button 
            onClick={onToggle}
            className="hidden md:flex p-2.5 rounded-xl hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 dark:hover:text-zinc-50 border border-transparent transition-colors shrink-0"
            title="Close sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-2 custom-scrollbar fade-edge">
          {groupOrder.map(group => {
            if (!grouped[group] || grouped[group].length === 0) return null;
            return (
              <div key={group} className="mt-5 first:mt-2">
                <h3 className="text-[11px] font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 mb-2 px-3">{group}</h3>
                <ul className="space-y-1">
                  {grouped[group].map(conv => (
                    <li key={conv.id} className="relative group">
                      <button
                        onClick={() => onSelect(conv.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] text-left transition-colors truncate ${
                          activeId === conv.id ? 'bg-zinc-200/80 dark:bg-zinc-800 text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
                        }`}
                      >
                        <span className="truncate flex-1 relative pr-6">
                           {conv.title}
                           {/* Overflow Fader */}
                           <div className={`absolute right-0 top-0 bottom-0 w-8 pointer-events-none transition-colors ${
                             activeId === conv.id 
                               ? 'bg-gradient-to-l from-zinc-200/80 dark:from-zinc-800' 
                               : 'bg-gradient-to-l from-zinc-50 dark:from-zinc-900 group-hover:from-zinc-200/50 dark:group-hover:from-zinc-800/50'
                           } to-transparent`}></div>
                        </span>
                      </button>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-200/50 dark:bg-zinc-800 shadow-[-10px_0_10px_rgba(250,250,250,0)] dark:shadow-[-10px_0_10px_rgba(39,39,42,1)] rounded-md">
                        <button className="p-1.5 text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="p-3 relative z-20 shrink-0">
          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="absolute bottom-[66px] left-3 w-[calc(100%-24px)] bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden mb-2 py-1.5 z-50 text-zinc-900 dark:text-zinc-50"
              >
                <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-700/50 mb-1">
                  <p className="text-[14px] font-medium">Free Plan</p>
                </div>
                <button 
                  onClick={() => {toggleDarkMode(); setUserMenuOpen(false);}}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] hover:bg-zinc-100 dark:hover:bg-zinc-700/50 text-left transition-colors"
                >
                  {isDarkMode ? <Sun className="w-4 h-4 text-zinc-500" /> : <Moon className="w-4 h-4 text-zinc-500" />}
                  {isDarkMode ? 'Light mode' : 'Dark mode'}
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] hover:bg-zinc-100 dark:hover:bg-zinc-700/50 text-left transition-colors">
                  <Settings className="w-4 h-4 text-zinc-500" />
                  Settings & Beta
                </button>
                <div className="border-t border-zinc-100 dark:border-zinc-700/50 my-1"></div>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] hover:bg-zinc-100 dark:hover:bg-zinc-700/50 text-left transition-colors text-red-600 dark:text-red-400">
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-zinc-200/50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50 transition-colors"
          >
            <div className="flex items-center gap-3 text-[14px] font-medium pr-2 overflow-hidden w-full">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-indigo-500 shrink-0 flex items-center justify-center text-xs text-white font-bold shadow-sm shadow-indigo-500/20">
                U
              </div>
              <span className="truncate flex-1 text-left">Username</span>
            </div>
            <MoreHorizontal className="w-4 h-4 shrink-0 text-zinc-400" />
          </button>
        </div>
      </div>
      
      {/* Absolute toggle button when sidebar is closed on desktop */}
      {!isOpen && !isMobile && (
        <button 
          onClick={onToggle}
          className="absolute top-4 left-4 z-40 p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors hidden md:block group"
          title="Open sidebar"
        >
          <PanelLeftClose className="w-5 h-5 group-hover:text-zinc-900 dark:group-hover:text-white rotate-180 transition-transform" />
        </button>
      )}
    </>
  )
}
