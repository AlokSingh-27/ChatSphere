import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MoreVertical, User, LogOut, MessageSquare } from 'lucide-react';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext.jsx'; 
import { ChatContext } from '../../context/ChatContext.jsx';
import ChatSphereLogo from './ChatSphereLogo.jsx';

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser,
    unseenMessages, setUnseenMessages } = useContext(ChatContext);

  const { logout, onlineUsers, authUser } = useContext(AuthContext);

  const [input, setInput] = useState('');
  const [showMenu, setShowMenu] = useState(false);
	
  const navigate = useNavigate();
  
  const filteredUsers = input 
    ? (users || []).filter((user) => user?.fullName?.toLowerCase().includes(input.toLowerCase())) 
    : (users || []);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div
      className={`bg-[#0F172A]/15 border-r border-slate-800/60 h-full min-h-0 p-4 flex flex-col text-white relative z-20 
	${selectedUser ? "max-md:hidden" : "w-full"}`}
    >
      {/* ================= HEADER SECTION ================= */}
      <div className="pb-4 flex flex-col shrink-0 gap-4">
        <div className="flex justify-between items-center relative">
          
          {/* Logo & Application Name */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setSelectedUser(null)}>
            <ChatSphereLogo className="w-10 h-10" />
            <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              ChatSphere
            </h2>
          </div>

          {/* Menu Dropdown Trigger */}
          <div className="relative py-2">
            <motion.button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/40 hover:bg-slate-800/80 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MoreVertical className="w-4 h-4" />
            </motion.button>

            {/* Micro-animated dropdown popover */}
            <AnimatePresence>
              {showMenu && (
                <>
                  {/* Backdrop Click Dismiss */}
                  <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)} />
                  
                  <motion.div
                    className="absolute top-full right-0 z-40 w-44 p-1.5 mt-2 rounded-xl bg-[#0F172A]/90 border border-slate-850 backdrop-blur-xl shadow-2xl"
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={() => { setShowMenu(false); navigate("/profile"); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 cursor-pointer text-left transition-all"
                    >
                      <User className="w-3.5 h-3.5 text-teal-400" />
                      Edit Profile
                    </button>
                    <hr className="my-1 border-t border-slate-850" />
                    <button 
                      onClick={() => { setShowMenu(false); logout(); }} 
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 cursor-pointer text-left transition-all"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-450" />
                      Logout Account
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* ================= SEARCH INPUT ================= */}
        <div className="relative group w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 transition-colors duration-300 group-focus-within:text-teal-400">
            <Search className="w-4 h-4" />
          </div>
          <input 
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className="w-full bg-[#020617]/50 border border-slate-800 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/80 focus:ring-1 focus:ring-teal-500/10 hover:border-slate-700/60 transition-all duration-300"
            placeholder="Search active users..."
          /> 
        </div>
      </div>

      {/* ================= CONTACTS SCROLL LIST ================= */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-1 pr-1 custom-scrollbar">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => {
            const isSelected = selectedUser?._id === user._id;
            const isOnline = onlineUsers.includes(user._id);
            const unreadCount = unseenMessages?.[user._id] || 0;

            return (
              <motion.div 
                onClick={() => { 
                  setSelectedUser(user); 
                  setUnseenMessages(prev => ({ ...prev, [user._id]: 0 })); 
                }}
                key={user._id || index} 
                className={`relative flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all duration-300 group ${
                  isSelected 
                    ? 'bg-gradient-to-r from-teal-500/12 via-teal-500/5 to-transparent border-l-[3px] border-teal-500 text-white' 
                    : 'hover:bg-slate-800/40 text-slate-350 hover:text-slate-100'
                }`}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.99 }}
              >
                {/* User avatar with dynamic online indicator */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full border border-slate-850 overflow-hidden bg-slate-850">
                    <img 
                      src={user?.profilePic || assets.avatar_icon} 
                      alt={user.fullName}
                      className="w-full h-full object-cover rounded-full" 
                    />
                  </div>
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#020617] shadow-[0_0_8px_#10B981]" />
                  )}
                </div>

                {/* Info Text block */}
                <div className="flex flex-col flex-1 min-w-0 leading-tight gap-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`font-medium text-sm truncate ${isSelected ? 'text-slate-100 font-semibold' : 'text-slate-300'}`}>
                      {user.fullName}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] uppercase tracking-wider font-semibold ${isOnline ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>

                {/* Unread message count badge */}
                {unreadCount > 0 && (
                  <motion.p 
                    className="shrink-0 text-[10px] font-bold h-5 min-w-5 px-1 flex justify-center items-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-teal-500/10"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                  >
                    {unreadCount}
                  </motion.p>
                )}
              </motion.div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
            <MessageSquare className="w-8 h-8 text-slate-600 stroke-[1.5px]" />
            <p className="text-xs text-slate-500">No active members found</p>
          </div>
        )}
      </div>

      {/* Small self profile tag at the bottom of sidebar */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <img 
            src={authUser?.profilePic || assets.avatar_icon} 
            alt="me" 
            className="w-8 h-8 rounded-full border border-slate-800 object-cover shrink-0 bg-slate-850" 
          />
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-xs font-semibold text-slate-200 truncate">{authUser?.fullName}</span>
            <span className="text-[9px] text-slate-500 uppercase tracking-widest truncate">My Account</span>
          </div>
        </div>
      </div>

    </div>
  ); 
}

export default Sidebar;