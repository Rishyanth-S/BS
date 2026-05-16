import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Play, Heart } from 'lucide-react';
import { CONFIG } from '../../config';

const Proposal = () => {
  const [hasStarted, setHasStarted] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-500, 500], [5, -5]);
  const rotateY = useTransform(x, [-500, 500], [-5, 5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const startProposal = () => {
    setHasStarted(true);
    const video = document.getElementById('proposal-video');
    if (video) video.play();
  };

  const handleVideoEnd = () => {
    setHasStarted(false);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen py-16 flex flex-col items-center justify-center overflow-hidden px-6 preserve-3d"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(157,78,221,0.15)_0%,_transparent_70%)] mix-blend-screen" />

      {/* Continuous floating romantic particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden preserve-3d">
        {[...Array(8)].map((_, i) => {
          const rand1 = ((i * 17) % 100) / 100;
          const rand2 = ((i * 23) % 100) / 100;
          const rand3 = ((i * 29) % 100) / 100;
          const zDepth = rand1 * 300 - 150;
          return (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-romantic-pink/30 drop-shadow-[0_0_10px_rgba(255,42,122,0.6)]"
              initial={{ 
                x: rand1 * 100 + "vw", 
                y: "110vh",
                scale: rand2 * 0.5 + 0.5,
                z: zDepth,
                rotateX: 0,
                rotateY: 0
              }}
              animate={{ 
                y: "-10vh",
                rotateX: [0, 360],
                rotateY: [0, 360],
                x: `calc(${rand1 * 100}vw + ${Math.sin(i) * 50}px)`
              }}
              transition={{ 
                duration: 15 + rand3 * 20, 
                repeat: Infinity,
                ease: "linear",
                delay: rand1 * 10
              }}
              style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
            >
              <Heart fill="currentColor" size={24} />
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9, z: -50 }}
            animate={{ opacity: 1, scale: 1, z: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="text-center z-10 preserve-3d"
            style={{ rotateX, rotateY }}
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-serif text-white mb-12 text-glow-intense drop-shadow-xl"
              animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ transform: "translateZ(50px)" }}
            >
              One last thing… ❤️
            </motion.h2>
            
            <motion.button
              onClick={startProposal}
              whileHover={{ scale: 1.15, rotateZ: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-32 h-32 mx-auto glass-button flex items-center justify-center shadow-[0_0_50px_rgba(255,42,122,0.8)] group relative overflow-hidden"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-romantic-pink via-white to-romantic-purple opacity-0 group-hover:opacity-40 mix-blend-overlay transition-opacity duration-500" />
              <div className="absolute inset-0 bg-romantic-pink rounded-full animate-ping opacity-20" />
              <Play className="w-12 h-12 text-white fill-current ml-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </motion.button>
            <p className="mt-8 text-white/50 tracking-widest uppercase text-sm font-semibold" style={{ transform: "translateZ(20px)" }}>Click to Play</p>
          </motion.div>
        ) : (
          <motion.div
            key="video"
            initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.5, type: "spring" }}
            className="relative w-full max-w-6xl z-10 preserve-3d"
            style={{ perspective: '2000px' }}
          >
            <motion.div 
              style={{ rotateX, rotateY }}
              className="glass-3d overflow-hidden rounded-3xl shadow-[0_40px_80px_-20px_rgba(255,42,122,0.5)] border border-white/20 relative p-2"
            >
              {/* Theater Ambient Light */}
              <div className="absolute -inset-20 bg-romantic-pink/20 blur-[100px] -z-10 animate-pulse pointer-events-none" />
              
              <div className="relative rounded-2xl overflow-hidden preserve-3d" style={{ transform: "translateZ(30px)" }}>
                <video
                  id="proposal-video"
                  src={CONFIG.proposalVideo}
                  className="w-full aspect-video object-cover"
                  onEnded={handleVideoEnd}
                  controls={true}
                  playsInline
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Proposal;
