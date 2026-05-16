import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { CONFIG } from '../../config';

const Hero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-500, 500], [15, -15]);
  const rotateY = useTransform(x, [-500, 500], [-15, 15]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-6 preserve-3d"
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518199266791-739d6ffec6f3?q=80&w=2000')] bg-cover bg-center opacity-10 scale-110 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030005]/80 via-transparent to-[#030005]" />
      </div>

      <motion.div 
        style={{ x: useTransform(x, [-500, 500], [-30, 30]), y: useTransform(y, [-500, 500], [-30, 30]) }}
        className="absolute w-[80vw] h-[80vw] max-w-3xl max-h-3xl bg-romantic-pink/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"
      />

      {/* Main 3D Container */}
      <motion.div 
        style={{ rotateX, rotateY, z: 50 }}
        className="relative z-10 text-center max-w-5xl preserve-3d"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, z: -100 }}
          animate={{ opacity: 1, scale: 1, z: 0 }}
          transition={{ duration: 1.5, type: "spring" }}
          className="mb-8 preserve-3d"
        >
          <motion.div
            className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight leading-tight text-glow-intense preserve-3d"
            style={{ transform: "translateZ(80px)" }}
          >
            Happy Birthday <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-romantic-pink via-white to-romantic-purple animate-gradient drop-shadow-[0_0_30px_rgba(255,42,122,0.8)]">
              {CONFIG.girlfriendName} ❤️
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          style={{ transform: "translateZ(40px)" }}
        >
          <p className="text-2xl md:text-3xl text-white/80 font-serif italic mb-12 drop-shadow-lg">
            "Every moment with you is a cinematic masterpiece."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col items-center gap-4 preserve-3d"
          style={{ transform: "translateZ(20px)" }}
        >
          <motion.div
            animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-32 bg-gradient-to-b from-romantic-pink via-romantic-purple to-transparent rounded-full shadow-[0_0_15px_rgba(255,42,122,0.6)]"
          />
          <span className="text-white/60 text-sm uppercase tracking-[0.4em] font-semibold text-glow">Scroll Down</span>
        </motion.div>
      </motion.div>

      {/* 3D Floating Hearts & Particles */}
      <div className="absolute inset-0 pointer-events-none preserve-3d">
        {[...Array(8)].map((_, i) => {
          const rand1 = ((i * 11) % 100) / 100;
          const rand2 = ((i * 13) % 100) / 100;
          const rand3 = ((i * 17) % 100) / 100;
          const zDepth = rand1 * 200 - 100; // -100 to 100
          
          return (
            <motion.div
              key={i}
              className="absolute text-romantic-pink/40 text-3xl drop-shadow-[0_0_10px_rgba(255,42,122,0.5)]"
              initial={{ 
                x: rand1 * 100 + "vw", 
                y: rand2 * 100 + "vh",
                z: zDepth,
                opacity: 0,
                rotateX: 0,
                rotateY: 0
              }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.2, 0.5],
                rotateX: [0, 180, 360],
                rotateY: [0, 360, 720],
                y: "-=100"
              }}
              transition={{ 
                duration: 6 + rand3 * 6, 
                repeat: Infinity,
                delay: i * 0.4,
                ease: "linear"
              }}
              style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
            >
              {i % 3 === 0 ? "💖" : i % 3 === 1 ? "✨" : "🌸"}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Hero;
