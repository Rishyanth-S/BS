import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { CONFIG } from '../../config';

const Letter = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen py-16 px-6 flex flex-col items-center justify-center overflow-hidden preserve-3d">
      {/* Cinematic Glowing Background effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,42,122,0.15)_0%,_transparent_60%)] animate-pulse mix-blend-screen" />

      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 10, z: -100 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
        transition={{ duration: 1.5, type: "spring" }}
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-3xl preserve-3d"
      >
        <motion.div 
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative glass-3d p-8 md:p-16 rounded-3xl overflow-hidden group preserve-3d"
        >
          {/* Subtle Internal Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-romantic-pink/10 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-romantic-pink/20 blur-[120px] rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-romantic-purple/20 blur-[120px] rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-1000 delay-300" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
            className="relative z-10 preserve-3d"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-sm uppercase tracking-widest font-sans font-bold text-glow opacity-80 text-romantic-pink">Classified Love</span>
              <div className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full italic font-serif text-xl shadow-[0_0_15px_rgba(255,42,122,0.5)]">
                {CONFIG.girlfriendName[0]}
              </div>
            </div>

            <pre className="whitespace-pre-wrap font-sans text-xl md:text-2xl leading-relaxed mb-12 text-white/90 drop-shadow-md">
              {CONFIG.letterContent.split('❤️').map((text, i, arr) => (
                <React.Fragment key={i}>
                  {text}
                  {i < arr.length - 1 && (
                    <motion.span 
                      className="inline-block mx-2 text-romantic-pink drop-shadow-[0_0_10px_rgba(255,42,122,0.8)]"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    >
                      ❤️
                    </motion.span>
                  )}
                </React.Fragment>
              ))}
            </pre>

            <div className="mt-16 flex flex-col items-end">
              <span className="text-sm italic mb-2 text-white/60">Forever yours,</span>
              <motion.span 
                className="font-handwritten text-5xl md:text-6xl text-glow-intense text-white drop-shadow-[0_0_20px_rgba(157,78,221,0.8)]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 1 }}
              >
                {CONFIG.ownerName}
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 3D Floating Rose Petals */}
      <div className="absolute inset-0 pointer-events-none preserve-3d">
        {[...Array(8)].map((_, i) => {
          const rand1 = ((i * 53) % 100) / 100;
          const rand2 = ((i * 59) % 100) / 100;
          const rand3 = ((i * 61) % 100) / 100;
          const zDepth = rand1 * 400 - 200;
          return (
            <motion.div
              key={i}
              className="absolute text-romantic-pink/40 text-4xl drop-shadow-[0_0_10px_rgba(255,42,122,0.4)]"
              initial={{ 
                x: rand1 * 100 + "vw", 
                y: "-10vh",
                z: zDepth,
                opacity: 0,
                rotateX: 0,
                rotateY: 0 
              }}
              animate={{ 
                y: "110vh",
                x: (rand2 * 100) + "vw",
                opacity: [0, 1, 0],
                rotateX: [0, 360],
                rotateY: [0, 360]
              }}
              transition={{ 
                duration: 15 + rand3 * 10, 
                repeat: Infinity,
                ease: "linear",
                delay: i * 2
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              🌹
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16 text-white/40 font-serif italic text-center drop-shadow-md">
        "Listen to the silence, it speaks our name..."
      </div>
    </section>
  );
};

export default Letter;
