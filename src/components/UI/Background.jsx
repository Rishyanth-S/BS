import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050208]">
      <div className="absolute inset-0 bg-romantic-gradient opacity-60" />
      
      {/* Animated Stars/Particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white opacity-20"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: ["0%", "-10%", "0%"],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: Math.random() * 3 + "px",
            height: Math.random() * 3 + "px",
            filter: 'blur(1px)',
          }}
        />
      ))}

      {/* Floating Hearts */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-romantic-pink opacity-10"
          initial={{
            x: Math.random() * 100 + "%",
            y: "110%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: "-10%",
            x: (Math.random() * 100) + "%",
            rotate: [0, 45, -45, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ❤️
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
    </div>
  );
};

export default Background;
