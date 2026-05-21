import React from 'react';
import { motion } from 'framer-motion';

const ChatSphereLogo = ({ className = "w-24 h-24" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Dynamic blurred backdrop glow */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-radial from-[#14B8A6]/35 via-[#06B6D4]/12 to-transparent blur-xl"
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Orbit ring */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute w-full h-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke="url(#orbitGradient)" 
          strokeWidth="1.2" 
          strokeDasharray="8 12" 
          className="opacity-50"
        />
        {/* Floating node on the orbit */}
        <circle
          cx="50"
          cy="5"
          r="3"
          fill="#2DD4BF"
          className="shadow-[0_0_8px_#2DD4BF]"
        />
      </motion.svg>

      {/* Main Sphere Globe + Chat bubble container */}
      <motion.div
        className="relative w-[76%] h-[76%] rounded-full flex items-center justify-center cursor-pointer select-none"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_0_12px_rgba(20,184,166,0.35)]">
          <defs>
            {/* Main sphere gradient */}
            <linearGradient id="sphereGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>

            {/* Orbit dashed ring gradient */}
            <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.7" />
            </linearGradient>

            {/* Overlay glow gradient */}
            <radialGradient id="sphereHighlight" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sphere Base */}
          <circle cx="40" cy="40" r="32" fill="url(#sphereGrad)" />

          {/* Globe Grid lines (latitude & longitude) representing the "sphere/globe" aspect */}
          <path 
            d="M 12,40 A 28,28 0 0,0 68,40" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="1" 
            strokeOpacity="0.2" 
          />
          <path 
            d="M 40,8 A 32,32 0 0,0 40,72" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="1" 
            strokeOpacity="0.2" 
          />
          <path 
            d="M 40,8 A 16,32 0 0,0 40,72" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="1" 
            strokeOpacity="0.3" 
          />
          <path 
            d="M 40,8 A 16,32 0 0,1 40,72" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="1" 
            strokeOpacity="0.3" 
          />

          {/* Chat Bubble Cutout / Overlay inside the sphere */}
          <path 
            d="M 28,32 
               H 52 
               A 6,6 0 0,1 58,38 
               V 48 
               A 6,6 0 0,1 52,54 
               H 36 
               L 28,60 
               V 54 
               A 6,6 0 0,1 22,48 
               V 38 
               A 6,6 0 0,1 28,32 Z" 
            fill="#020617" 
            fillOpacity="0.12" 
            stroke="#ffffff" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Three modern chatting dots inside the chat bubble */}
          <circle cx="34" cy="43" r="2" fill="#ffffff" />
          <circle cx="40" cy="43" r="2" fill="#ffffff" fillOpacity="0.8" />
          <circle cx="46" cy="43" r="2" fill="#ffffff" fillOpacity="0.6" />

          {/* Glass highlight glare (for a 3D translucent feel) */}
          <circle cx="40" cy="40" r="32" fill="url(#sphereHighlight)" pointerEvents="none" />
        </svg>
      </motion.div>
    </div>
  );
};

export default ChatSphereLogo;
