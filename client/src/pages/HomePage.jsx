import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext.jsx";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8 relative z-10">
      <motion.div
        className={`bg-[#0F172A]/25 backdrop-blur-2xl border border-slate-800/70 rounded-none sm:rounded-3xl overflow-hidden w-full h-full max-w-7xl shadow-2xl relative grid grid-cols-1 shadow-[0_0_50px_-12px_rgba(20,184,166,0.06)] min-h-0 
      ${selectedUser ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]" : "md:grid-cols-2"}`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </motion.div>
    </div>
  );
};

export default HomePage;
