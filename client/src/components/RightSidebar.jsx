import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, LogOut, Info, ShieldAlert } from 'lucide-react';
import assets from '../assets/assets';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  // Get all the images from the messages and set them to state
  useEffect(() => {
    if (messages) {
      setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
    }
  }, [messages]);

  return (
    selectedUser && (
      <div
        className={`bg-[#0F172A]/10 border-l border-slate-800/60 text-slate-200 w-full h-full min-h-0 relative p-6 flex flex-col gap-6 overflow-y-auto shrink-0 z-20 custom-scrollbar ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        {/* ================= USER DETAIL OVERVIEW ================= */}
        <div className="pt-8 flex flex-col items-center gap-3 text-center">
          
          {/* Avatar Container */}
          <div className="relative group">
            <div className="w-20 h-20 rounded-full border border-slate-800 overflow-hidden bg-slate-850 shadow-md">
              <img
                src={selectedUser?.profilePic || assets.avatar_icon}
                alt={selectedUser.fullName}
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-1.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#020617] shadow-[0_0_8px_#10B981]" />
            )}
          </div>

          {/* User Name & Bio */}
          <div className="flex flex-col gap-1 leading-tight mt-1 min-w-0 w-full">
            <h3 className="font-extrabold text-slate-100 text-lg truncate px-4">
              {selectedUser.fullName}
            </h3>
            <p className="text-xs text-slate-400 font-light leading-relaxed px-4 break-words">
              {selectedUser.bio || "No custom status bio set."}
            </p>
          </div>

        </div>

        <hr className="border-slate-800/60 my-1" />

        {/* ================= SHARED MEDIA GRID ================= */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-1">
            <ImageIcon className="w-3.5 h-3.5 text-teal-400 stroke-[2px]" />
            Shared Media
          </div>
          
          {msgImages.length > 0 ? (
            <div className="max-h-56 overflow-y-auto grid grid-cols-2 gap-2.5 p-1 rounded-xl bg-slate-950/20 border border-slate-900/50 custom-scrollbar">
              {msgImages.map((url, index) => (
                <motion.div
                  key={index}
                  onClick={() => window.open(url)}
                  className="aspect-square cursor-pointer rounded-lg overflow-hidden border border-slate-800 bg-slate-900 relative group flex items-center justify-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img src={url} alt="Shared" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[9px] font-semibold text-white uppercase tracking-wider bg-teal-500/80 px-2 py-0.5 rounded">View</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center gap-2 border border-dashed border-slate-800/80 rounded-2xl bg-[#020617]/20">
              <ImageIcon className="w-6 h-6 text-slate-700 stroke-[1.5px]" />
              <span className="text-[10px] text-slate-500 font-light">No images shared in this chat</span>
            </div>
          )}
        </div>

        {/* ================= RED TINTED GLASS LOGOUT TRIGGER ================= */}
        <motion.button 
          onClick={() => logout()}
          className="w-full py-3 bg-gradient-to-r from-rose-500/10 to-red-600/20 hover:from-rose-500/20 hover:to-red-600/30 text-rose-250 font-semibold border border-rose-500/35 text-[11px] tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-2 mt-auto shrink-0 shadow-[0_2px_10px_rgba(239,68,68,0.05)] transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-3.5 h-3.5 stroke-[2.2px] text-rose-450" />
          LOGOUT ACCOUNT
        </motion.button>

      </div>
    )
  );
};

export default RightSidebar;
