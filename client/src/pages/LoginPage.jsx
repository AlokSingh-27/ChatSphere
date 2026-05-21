import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  ArrowLeft, 
  Check
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext.jsx";
import ChatSphereLogo from "../components/ChatSphereLogo.jsx";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === 'Sign up' ? 'signup' : 'login', { fullName, email, password, bio });
  };

  // Generate 15 floating particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100, // percentage
    y: Math.random() * 100, // percentage
    delay: Math.random() * 5,
    duration: Math.random() * 15 + 10,
  }));

  return (
    <div className="min-h-screen w-full bg-[#020617] text-white flex items-center justify-center p-4 md:p-8 overflow-hidden relative font-sans select-none">
      
      {/* --- Premium Layered Background Glowing Blobs --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-radial from-[#10B981]/15 via-transparent to-transparent blur-[120px] animate-float-1 pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-radial from-[#06B6D4]/15 via-transparent to-transparent blur-[120px] animate-float-2 pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[15%] w-[45vw] h-[45vw] rounded-full bg-radial from-[#14B8A6]/10 via-transparent to-transparent blur-[120px] animate-float-3 pointer-events-none z-0" />

      {/* --- Subtle Vignette Overlay for Depth --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#020617_90%)] pointer-events-none z-10" />

      {/* --- Animated Floating Particle Layer --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-[#2DD4BF]/20 blur-[1px]"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: ["0vh", "-100vh"],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* --- Core Split-Style Content Grid --- */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center justify-center z-20">
        
        {/* ================= LEFT SECTION: BRANDING & FEATURES ================= */}
        <motion.div 
          className="hidden lg:flex flex-col col-span-7 items-start justify-center text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo container with micro-animations */}
          <div className="mb-6">
            <ChatSphereLogo className="w-24 h-24" />
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            ChatSphere
          </h1>
          <p className="text-xl text-slate-400 font-light leading-relaxed mb-10">
            Connect instantly across your world.
          </p>

          {/* Styled and animated glassmorphic feature pills */}
          <div className="flex flex-col gap-4 w-full max-w-md">
            {[
              {
                icon: ShieldCheck,
                color: "text-emerald-400 bg-emerald-500/10",
                borderGlow: "hover:border-emerald-500/35 hover:shadow-emerald-500/5",
                title: "End-to-end encrypted by default",
                description: "Your conversations are fully secure, readable only by you and the recipient."
              },
              {
                icon: Zap,
                color: "text-teal-400 bg-teal-500/10",
                borderGlow: "hover:border-teal-500/35 hover:shadow-teal-500/5",
                title: "Premium real-time messaging",
                description: "Experience zero latency, high fidelity delivery for text, media, and events."
              },
              {
                icon: Smartphone,
                color: "text-cyan-400 bg-cyan-500/10",
                borderGlow: "hover:border-cyan-500/35 hover:shadow-cyan-500/5",
                title: "Available across every device",
                description: "Seamlessly synchronize your chats between your phone, tablet, and desktop."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                className={`bg-[#0F172A]/40 backdrop-blur-md border border-slate-800/80 p-4 rounded-2xl flex items-start gap-4 transition-all duration-300 ${feature.borderGlow} hover:shadow-xl cursor-default`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
                whileHover={{ x: 6 }}
              >
                <div className={`p-2.5 rounded-xl ${feature.color} flex items-center justify-center shrink-0`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 text-sm mb-0.5">{feature.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= RIGHT SECTION: AUTH CARD ================= */}
        <motion.div 
          className="col-span-1 lg:col-span-5 flex justify-center w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <div className="w-full max-w-[440px] bg-[#0F172A]/30 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative hover:border-teal-500/20 transition-all duration-500 flex flex-col gap-6 shadow-[0_0_50px_-12px_rgba(20,184,166,0.12)]">
            
            {/* Logo display on mobile viewports only */}
            <div className="lg:hidden flex flex-col items-center justify-center gap-2 mb-2">
              <ChatSphereLogo className="w-16 h-16" />
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                ChatSphere
              </h1>
              <p className="text-sm text-slate-400">Connect instantly across your world.</p>
            </div>

            {/* Form Container */}
            <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
              
              {/* Card Header (with back button for 2-step setup) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center">
                  {currState === "Sign up" && isDataSubmitted && (
                    <motion.button 
                      type="button"
                      onClick={() => setIsDataSubmitted(false)}
                      className="mr-3 p-1.5 rounded-full bg-slate-800/55 border border-slate-700/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Back to account info"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </motion.button>
                  )}
                  <h2 className="font-bold text-2xl tracking-tight text-slate-100">
                    {currState === "Sign up" 
                      ? (isDataSubmitted ? "About Yourself" : "Create Account") 
                      : "Welcome Back"}
                  </h2>
                </div>
                <p className="text-sm text-slate-400">
                  {currState === "Sign up"
                    ? (isDataSubmitted ? "Introduce yourself to the network." : "Join thousands chatting on ChatSphere.")
                    : "Sign in to continue your conversations."}
                </p>
              </div>

              {/* Progressive stepper bar on Sign Up */}
              {currState === "Sign up" && (
                <div className="flex items-center gap-2 h-1 w-full bg-slate-800/40 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ease-out ${!isDataSubmitted ? 'w-1/2 bg-gradient-to-r from-emerald-500 to-teal-500' : 'w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500'}`} />
                </div>
              )}

              {/* Form Input fields wrapped in AnimatePresence for smooth transitions */}
              <div className="flex flex-col gap-4 relative min-h-[170px] justify-center">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: Name, Email, Password (both Sign Up and Login, except Name is SignUp only) */}
                  {!isDataSubmitted ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-4 w-full"
                    >
                      {/* Full Name (Sign Up only) */}
                      {currState === "Sign up" && (
                        <div className="relative flex flex-col gap-1 w-full group">
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1 transition-colors duration-300 group-focus-within:text-teal-400">
                            Full Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 transition-colors duration-300 group-focus-within:text-teal-400" />
                            <input 
                              onChange={(e) => setFullName(e.target.value)} 
                              value={fullName} 
                              type="text" 
                              className="w-full bg-[#020617]/40 border border-slate-800/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500/80 focus:ring-1 focus:ring-teal-500/20 hover:border-slate-700/60 transition-all duration-300" 
                              placeholder="John Doe" 
                              required
                            />
                          </div>
                        </div>
                      )}

                      {/* Email Address */}
                      <div className="relative flex flex-col gap-1 w-full group">
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1 transition-colors duration-300 group-focus-within:text-teal-400">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 transition-colors duration-300 group-focus-within:text-teal-400" />
                          <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            type="email" 
                            className="w-full bg-[#020617]/40 border border-slate-800/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500/80 focus:ring-1 focus:ring-teal-500/20 hover:border-slate-700/60 transition-all duration-300" 
                            placeholder="johndoe@example.com" 
                            required
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div className="relative flex flex-col gap-1 w-full group">
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1 transition-colors duration-300 group-focus-within:text-teal-400">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 transition-colors duration-300 group-focus-within:text-teal-400" />
                          <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            type="password" 
                            className="w-full bg-[#020617]/40 border border-slate-800/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500/80 focus:ring-1 focus:ring-teal-500/20 hover:border-slate-700/60 transition-all duration-300" 
                            placeholder="••••••••" 
                            required
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    // STEP 2: Bio Textarea (Sign Up step 2 only)
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-4 w-full"
                    >
                      <div className="relative flex flex-col gap-1 w-full group">
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1 transition-colors duration-300 group-focus-within:text-teal-400">
                          Short Bio
                        </label>
                        <div className="relative">
                          <textarea 
                            onChange={(e) => setBio(e.target.value)} 
                            value={bio}
                            rows={5} 
                            className="w-full bg-[#020617]/40 border border-slate-800/80 rounded-xl py-3 px-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500/80 focus:ring-1 focus:ring-teal-500/20 hover:border-slate-700/60 transition-all duration-300 resize-none leading-relaxed" 
                            placeholder="Provide a short bio..." 
                            required
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <motion.button 
                type="submit" 
                className="w-full py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold rounded-xl cursor-pointer shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20 border border-emerald-400/20 text-sm mt-2 transition-all duration-300 relative overflow-hidden group flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Glossy overlay sheen effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10">
                  {currState === "Sign up" 
                    ? (isDataSubmitted ? "Create Account" : "Create Account") 
                    : "Login Now"}
                </span>
              </motion.button>

              {/* Terms checkbox */}
              <div className="flex items-start gap-2.5 mt-1">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    id="terms-checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="sr-only peer"
                    required
                  />
                  <div 
                    onClick={() => setAgreeTerms(!agreeTerms)}
                    className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all duration-200 ${agreeTerms ? 'border-teal-500 bg-teal-500/10 text-teal-400' : 'border-slate-700 bg-slate-950/40 text-transparent'}`}
                  >
                    <Check className="w-3 h-3 stroke-[3px]" />
                  </div>
                </div>
                <label htmlFor="terms-checkbox" className="text-xs text-slate-500 cursor-pointer select-none leading-none pt-0.5">
                  Agree to the terms of use & privacy policy.
                </label>
              </div>

              {/* Switch state footer */}
              <div className="border-t border-slate-800/80 pt-4 text-center mt-1">
                {currState === "Sign up" ? (
                  <p className="text-xs text-slate-500">
                    Already have an account?{" "}
                    <span 
                      onClick={() => { setCurrState("Login"); setIsDataSubmitted(false); }} 
                      className="font-semibold text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text cursor-pointer hover:from-teal-300 hover:to-cyan-300 transition-all duration-300"
                    >
                      Login
                    </span>
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">
                    Create an account?{" "}
                    <span 
                      onClick={() => { setCurrState("Sign up"); setIsDataSubmitted(false); }} 
                      className="font-semibold text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text cursor-pointer hover:from-emerald-300 hover:to-teal-300 transition-all duration-300"
                    >
                      Click here
                    </span>
                  </p>
                )}
              </div>

            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LoginPage;
