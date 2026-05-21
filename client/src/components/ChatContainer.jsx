import React, { useContext, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Image as ImageIcon, Send, HelpCircle, Shield, MessageSquare, Check, CheckCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import assets from '../assets/assets';
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import ChatSphereLogo from './ChatSphereLogo.jsx';

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const chatContainerRef = useRef();
  const [input, setInput] = useState('');

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  // Handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };
  
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
      window.scrollTo(0, 0);
    }
  }, [selectedUser]);
  
  useEffect(() => {
    if (chatContainerRef.current && messages) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full min-h-0 flex flex-col relative z-20 bg-[#0F172A]/5 overflow-hidden">
      
      {/* ================= HEADER PANEL ================= */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800/60 bg-[#0F172A]/10 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          
          {/* Mobile Back Button */}
          <motion.button
            onClick={() => setSelectedUser(null)}
            className="md:hidden p-2 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>

          {/* User Profile Image */}
          <div className="relative shrink-0">
            <img
              src={selectedUser.profilePic || assets.avatar_icon}
              alt={selectedUser.fullName}
              className="w-10 h-10 rounded-full border border-slate-800 object-cover bg-slate-850"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#020617] shadow-[0_0_8px_#10B981]" />
            )}
          </div>

          {/* User Name and Online Tag */}
          <div className="flex flex-col leading-tight min-w-0">
            <p className="font-bold text-slate-200 text-sm truncate">
              {selectedUser.fullName}
            </p>
            <span className={`text-[10px] uppercase tracking-wider font-semibold ${onlineUsers.includes(selectedUser._id) ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`}>
              {onlineUsers.includes(selectedUser._id) ? 'Active Now' : 'Offline'}
            </span>
          </div>

        </div>

        {/* Security / Help Badges */}
        <div className="flex items-center gap-3 shrink-0 text-slate-400">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/15 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 stroke-[2px]" />
            Encrypted
          </div>
          <HelpCircle className="w-5 h-5 text-slate-500 hover:text-slate-350 cursor-pointer hidden md:block transition-all" />
        </div>
      </div>

      {/* ================= CHAT CONVERSATION AREA ================= */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 custom-scrollbar bg-cover bg-center">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => {
            const isSelf = msg.senderId === authUser._id;
            
            return (
              <motion.div
                key={msg._id || index}
                className={`flex items-end gap-3 max-w-[85%] ${isSelf ? "ml-auto" : "mr-auto flex-row-reverse"}`}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                
                {/* Text or Image block */}
                <div className="flex flex-col gap-1">
                  
                  {msg.image ? (
                    <motion.div 
                      className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900 shadow-lg relative group cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                    >
                      <img
                        src={msg.image}
                        alt="Shared upload"
                        className="max-w-[240px] max-h-[320px] object-contain sm:max-w-xs"
                      />
                    </motion.div>
                  ) : (
                    <p
                      className={`p-3.5 text-sm rounded-2xl leading-relaxed shadow-sm break-words ${
                        isSelf 
                          ? "bg-gradient-to-br from-[#10B981]/25 via-[#14B8A6]/18 to-[#06B6D4]/12 text-slate-100 border border-teal-500/20 rounded-tr-none shadow-[0_2px_12px_-3px_rgba(20,184,166,0.1)]" 
                          : "bg-slate-900/60 border border-slate-800/80 text-slate-200 rounded-tl-none shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </p>
                  )}

                  {/* Timestamp & Meta Row */}
                  <div className={`flex items-center gap-1.5 px-1 mt-0.5 text-[10px] text-slate-500 ${isSelf ? 'justify-end' : 'justify-start'}`}>
                    <span>{formatMessageTime(msg.createdAt)}</span>
                    {isSelf && (
                      <CheckCheck className="w-3.5 h-3.5 text-teal-400 stroke-[2.2px]" />
                    )}
                  </div>

                </div>

                {/* Sender Profile image */}
                <div className="shrink-0 flex flex-col items-center">
                  <img
                    src={
                      isSelf
                        ? authUser?.profilePic || assets.avatar_icon
                        : selectedUser?.profilePic || assets.avatar_icon
                    }
                    alt=""
                    className="w-7 h-7 rounded-full object-cover border border-slate-800 bg-slate-850"
                  />
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ================= BOTTOM BAR: TEXT TOOLBAR ================= */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800/60 bg-[#0F172A]/5 flex items-center gap-3 shrink-0">
        
        {/* Gallery / Attachment Picker */}
        <input
          onChange={handleSendImage}
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          hidden
        />
        <motion.label 
          htmlFor="image" 
          className="p-2.5 rounded-xl border border-slate-800/80 bg-[#020617]/50 text-slate-400 hover:text-teal-400 hover:bg-slate-800/40 transition-all cursor-pointer flex items-center justify-center shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Share an image"
        >
          <ImageIcon className="w-4 h-4" />
        </motion.label>

        {/* Input Text Box */}
        <div className="flex-1 flex items-center bg-[#020617]/50 border border-slate-800/80 rounded-2xl px-4 py-1.5 focus-within:border-teal-500/80 transition-all duration-300 relative group">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Write your message..."
            className="flex-1 text-sm bg-transparent border-none outline-none text-slate-200 placeholder-slate-500 py-1.5 focus:ring-0"
          />
        </div>

        {/* Send Action Trigger */}
        <motion.button
          type="submit"
          disabled={input.trim() === ""}
          className={`p-3 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 ${
            input.trim() !== "" 
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-teal-500/15 border border-teal-400/25" 
              : "bg-slate-800/40 text-slate-500 border border-slate-850 cursor-not-allowed"
          }`}
          whileHover={input.trim() !== "" ? { scale: 1.05 } : {}}
          whileTap={input.trim() !== "" ? { scale: 0.95 } : {}}
        >
          <Send className="w-4 h-4 stroke-[2.2px]" />
        </motion.button>

      </form>
    </div>
  ) : (
    
    // ================= WELCOME SCREEN STATE =================
    <div className="flex flex-col items-center justify-center gap-4 text-center p-8 flex-1 bg-[#0F172A]/5 relative overflow-hidden z-20 max-md:hidden">
      
      {/* Cinematic Glowing Background Node */}
      <div className="absolute w-72 h-72 rounded-full bg-radial from-[#14B8A6]/8 via-transparent to-transparent blur-[80px] pointer-events-none" />

      <motion.div 
        animate={{
          y: [0, -8, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="mb-2 shrink-0 relative"
      >
        <ChatSphereLogo className="w-24 h-24" />
      </motion.div>

      <div className="flex flex-col gap-1.5 max-w-sm relative z-10">
        <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
          ChatSphere Dashboard
        </h2>
        <p className="text-xs text-slate-450 leading-relaxed font-light">
          Select a chat contact from the sidebar panel to begin exchanging instant secured messages in real-time.
        </p>
      </div>

    </div>
  );
};

export default ChatContainer;
