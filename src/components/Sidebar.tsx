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
        className={`fixed md:relative flex flex-col h-full bg-white dark:bg-[#060606] w-[300px] shrink-0 z-50 transition-[transform,width,opacity] duration-300 ease-in-out border-r border-zinc-200 dark:border-std-border before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-zinc-800 dark:before:via-white before:to-transparent before:opacity-60 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:opacity-0 md:overflow-hidden'
        }`}
      >
        <div className="flex items-center justify-between p-5 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-2.5 h-2.5 bg-black dark:bg-white rounded-full shadow-[0_0_8px_rgba(0,0,0,0.8)] dark:shadow-[0_0_8px_rgba(255,255,255,0.8)] shrink-0"></div>
             <span className="text-[13px] font-bold tracking-[3px] uppercase text-zinc-900 dark:text-white opacity-80 font-display">Standard</span>
          </div>
          <button 
            onClick={onToggle}
            className="w-8 h-8 flex items-center justify-center rounded-none bg-transparent hover:border-zinc-400 dark:hover:border-white text-zinc-500 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-std-border transition-colors hidden md:flex"
            title="Close sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>
        
        <div className="h-[1px] bg-zinc-200 dark:bg-std-border mx-5 shrink-0"></div>

        <div className="px-3 pt-4 shrink-0">
           <button 
             onClick={onNewChat}
             className="w-full relative flex items-center content-center gap-3 px-[14px] py-3 border border-zinc-200 dark:border-std-border hover:border-zinc-400 dark:hover:border-std-border-hi text-zinc-900 dark:text-white text-[14px] font-bold tracking-[1px] uppercase transition-all overflow-hidden group/new"
             style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
           >
             <div className="absolute inset-0 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] opacity-0 group-hover/new:opacity-[0.04] dark:group-hover/new:opacity-[0.08] transition-opacity bg-[size:8px_8px] pointer-events-none"></div>
             <Plus className="w-4 h-4 shrink-0 z-10" />
             <span className="truncate z-10 font-display">New Chat</span>
           </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 mt-4 pb-2 custom-scrollbar fade-edge">
          {groupOrder.map(group => {
            if (!grouped[group] || grouped[group].length === 0) return null;
            return (
              <div key={group} className="mb-4">
                <h3 className="text-[11px] font-bold tracking-[3px] uppercase text-zinc-500 dark:text-zinc-500 mb-2 px-[14px] font-display">{group}</h3>
                <ul className="space-y-1">
                  {grouped[group].map(conv => (
                    <li key={conv.id} className="relative group">
                      <button
                        onClick={() => onSelect(conv.id)}
                        className={`w-full flex items-center gap-3 px-[14px] py-3 text-[14px] text-left transition-colors truncate font-semibold box-border border nav-item-active-bar ${
                          activeId === conv.id ? 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-std-border text-zinc-900 dark:text-white active-nav' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 border-transparent hover:border-zinc-200 dark:hover:border-std-border dark:hover:text-white'
                        }`}
                      >
                        <span className="truncate flex-1 relative pr-6">
                           {conv.title}
                        </span>
                      </button>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-100 dark:bg-[#101010] shadow-[-10px_0_10px_rgba(244,244,244,0)] dark:shadow-[-10px_0_10px_rgba(16,16,16,1)] rounded-none px-1">
                        <button className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="h-[1px] bg-zinc-200 dark:bg-std-border mx-5 shrink-0"></div>
        <div className="p-4 relative z-20 shrink-0">
          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="absolute bottom-[66px] left-4 w-[calc(100%-32px)] bg-white dark:bg-std-surface border border-zinc-200 dark:border-std-border overflow-hidden mb-2 py-1 z-50 text-zinc-900 dark:text-zinc-50 shadow-xl"
                style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
              >
                <div className="px-4 py-3 border-b border-zinc-100 dark:border-std-border mb-1">
                  <p className="text-[12px] font-bold tracking-[1.5px] uppercase font-display text-zinc-600 dark:text-zinc-400">Free Plan</p>
                </div>
                <button 
                  onClick={() => {toggleDarkMode(); setUserMenuOpen(false);}}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-semibold hover:bg-zinc-100 dark:hover:bg-std-surface2 text-left transition-colors"
                >
                  {isDarkMode ? <Sun className="w-4 h-4 text-zinc-500" /> : <Moon className="w-4 h-4 text-zinc-500" />}
                  {isDarkMode ? 'Light mode' : 'Dark mode'}
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-semibold hover:bg-zinc-100 dark:hover:bg-std-surface2 text-left transition-colors">
                  <Settings className="w-4 h-4 text-zinc-500" />
                  Settings & Beta
                </button>
                <div className="border-t border-zinc-100 dark:border-std-border my-1"></div>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-semibold hover:bg-zinc-100 dark:hover:bg-std-surface2 text-left transition-colors text-red-600 dark:text-red-400">
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full flex items-center justify-between px-[14px] py-3 border border-transparent hover:border-zinc-200 dark:hover:border-std-border hover:bg-zinc-50 dark:hover:bg-std-surface2 text-zinc-900 dark:text-white transition-all nav-item-active-bar"
          >
            <div className="flex items-center gap-3 text-[14px] font-bold pr-2 overflow-hidden w-full font-display uppercase tracking-[1px]">
              <div className="w-8 h-8 bg-zinc-900 dark:bg-white shrink-0 flex items-center justify-center text-xs text-white dark:text-zinc-900 shadow-[0_0_12px_rgba(0,0,0,0.2)] dark:shadow-[0_0_12px_rgba(255,255,255,0.2)]" style={{ clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))' }}>
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
          className="absolute top-5 left-5 z-40 w-11 h-11 flex items-center justify-center bg-white dark:bg-std-surface2 border border-zinc-200 dark:border-std-border text-zinc-500 dark:text-white hover:border-zinc-400 dark:hover:border-zinc-400 hover:shadow-[0_0_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_16px_rgba(255,255,255,0.2)] transition-all hidden md:flex group"
          title="Open sidebar"
          style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
        >
          <PanelLeftClose className="w-5 h-5 group-hover:text-zinc-900 dark:group-hover:text-white rotate-180 transition-transform" />
        </button>
      )}
    </>
  )
}
