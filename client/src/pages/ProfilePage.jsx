import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, User, FileText, Camera, Check } from "lucide-react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import ChatSphereLogo from "../components/ChatSphereLogo";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser?.fullName || "");
  const [bio, setBio] = useState(authUser?.bio || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (!selectedImg) {
        await updateProfile({ fullName: name, bio });
        navigate("/");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(selectedImg);
      reader.onload = async () => {
        const base64Image = reader.result;
        await updateProfile({ profilePic: base64Image, fullName: name, bio });
        navigate("/");
      };
    } catch (err) {
      console.error("Save profile error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-y-auto relative select-none z-10">
      
      {/* Dynamic Profile Card Container */}
      <motion.div 
        className="w-full max-w-2xl bg-[#0F172A]/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative flex flex-col md:flex-row items-center gap-6 md:gap-8 hover:border-teal-500/20 transition-all duration-500 shadow-[0_0_50px_-12px_rgba(20,184,166,0.08)]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        
        {/* ================= LEFT / TOP SECTION: FORM DETAILS ================= */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1 w-full">
          
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <motion.button 
                type="button"
                onClick={() => navigate("/")}
                className="p-2 rounded-full bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Back to chat dashboard"
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.button>
              <h2 className="font-bold text-2xl tracking-tight text-slate-100">
                Profile Details
              </h2>
            </div>
            <p className="text-sm text-slate-450 ml-1">
              Manage your ChatSphere public identity and bio.
            </p>
          </div>

          <hr className="border-slate-800/60" />

          {/* Avatar Upload Controller */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">
              Profile Picture
            </label>
            
            <label
              htmlFor="avatar"
              className="flex items-center gap-4 cursor-pointer group bg-[#020617]/30 border border-slate-800/60 rounded-xl p-3.5 hover:border-teal-500/40 hover:bg-[#020617]/50 transition-all duration-300"
            >
              <input
                onChange={(e) => setSelectedImg(e.target.files[0])}
                type="file"
                id="avatar"
                accept=".png, .jpg, .jpeg"
                hidden
              />
              <div className="relative overflow-hidden w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700/60 shrink-0">
                <img
                  src={
                    selectedImg
                      ? URL.createObjectURL(selectedImg)
                      : authUser?.profilePic || assets.avatar_icon
                  }
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="w-5 h-5 text-slate-100" />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-slate-200 group-hover:text-teal-400 transition-colors duration-300">
                  Click to upload
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  PNG, JPG or JPEG (max 2MB)
                </span>
              </div>
            </label>
          </div>

          {/* Full Name Input */}
          <div className="relative flex flex-col gap-1.5 w-full group">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1 transition-colors duration-300 group-focus-within:text-teal-400">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 transition-colors duration-300 group-focus-within:text-teal-400" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                required
                placeholder="John Doe"
                className="w-full bg-[#020617]/40 border border-slate-800/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500/80 focus:ring-1 focus:ring-teal-500/20 hover:border-slate-700/60 transition-all duration-300"
              />
            </div>
          </div>

          {/* Bio Input */}
          <div className="relative flex flex-col gap-1.5 w-full group">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1 transition-colors duration-300 group-focus-within:text-teal-400">
              Short Bio
            </label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-4 text-slate-500 w-4 h-4 transition-colors duration-300 group-focus-within:text-teal-400" />
              <textarea
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                placeholder="Write profile bio..."
                required
                rows={3}
                className="w-full bg-[#020617]/40 border border-slate-800/80 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500/80 focus:ring-1 focus:ring-teal-500/20 hover:border-slate-700/60 transition-all duration-300 resize-none leading-relaxed"
              ></textarea>
            </div>
          </div>

          {/* Submit Save Profile Button */}
          <motion.button
            type="submit"
            disabled={isSaving}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold rounded-xl cursor-pointer shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20 border border-emerald-400/20 text-sm transition-all duration-300 relative overflow-hidden group flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              <Check className="w-4 h-4" />
              {isSaving ? "Saving details..." : "Save Changes"}
            </span>
          </motion.button>
        </form>

        {/* ================= RIGHT / BOTTOM SECTION: AVATAR PREVIEW & LOGO ================= */}
        <div className="flex flex-col items-center justify-center shrink-0 w-full md:w-auto p-4 border-t md:border-t-0 md:border-l border-slate-800/60 gap-6">
          <div className="relative flex flex-col items-center justify-center gap-4">
            
            {/* Logo showcase */}
            <motion.div 
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <ChatSphereLogo className="w-20 h-20" />
            </motion.div>
            
            <div className="text-center">
              <h3 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent mb-0.5">
                ChatSphere
              </h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                Verified Global Member
              </p>
            </div>

            {/* Micro-interactive floating stats */}
            <div className="bg-[#020617]/50 border border-slate-850 px-4 py-2 rounded-xl flex items-center justify-center gap-4 text-center mt-2 shadow-inner">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-300">Status</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  Active
                </span>
              </div>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default ProfilePage;
