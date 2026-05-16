import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { CONFIG } from '../../config';

const AnimeComparison = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

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
    <section className="relative min-h-screen py-16 flex flex-col items-center justify-center overflow-hidden px-6 preserve-3d">
      <div className="absolute inset-0 bg-gradient-to-tr from-romantic-purple/10 via-transparent to-romantic-pink/10 mix-blend-screen" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, z: -50 }}
        whileInView={{ opacity: 1, scale: 1, z: 0 }}
        className="text-center mb-10 z-10 preserve-3d"
      >
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 text-glow-intense drop-shadow-xl">Through the Years</h2>
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-romantic-pink to-transparent mx-auto rounded-full shadow-[0_0_15px_rgba(255,42,122,0.8)]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 w-fit max-w-[95vw] mx-auto group preserve-3d"
        style={{ perspective: '1500px' }}
      >
        {/* Glowing border effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-romantic-pink via-romantic-purple to-romantic-pink rounded-3xl blur-[30px] opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-gradient-xy pointer-events-none" />
        
        <motion.div 
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-fit h-fit rounded-3xl overflow-hidden glass-3d shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] preserve-3d flex justify-center items-center"
        >
          <motion.div
            className="w-fit h-fit preserve-3d"
            style={{ transform: "translateZ(30px)" }}
          >
            <img 
              src={CONFIG.thenAndNowImage} 
              alt="Then and Now" 
              className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Subtle cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030005] via-transparent to-transparent opacity-30" />
            
            {/* Caption over image */}
            <motion.div 
              className="absolute bottom-8 md:bottom-16 left-0 right-0 text-center px-6 preserve-3d"
              style={{ transform: "translateZ(50px)" }}
            >
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-2xl md:text-4xl text-white font-serif leading-relaxed italic text-glow drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              >
                "You were adorable then… <br className="hidden md:block" />
                <span className="text-romantic-pink font-bold">And you are my beautiful everything now ❤️</span>"
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 3D Falling Petals */}
      <div className="absolute inset-0 pointer-events-none preserve-3d">
        {[...Array(8)].map((_, i) => {
          const rand1 = ((i * 41) % 100) / 100;
          const rand2 = ((i * 43) % 100) / 100;
          const rand3 = ((i * 47) % 100) / 100;
          const zDepth = rand1 * 400 - 200;
          return (
            <motion.div
              key={i}
              className="absolute text-pink-200/40 text-2xl drop-shadow-[0_0_10px_rgba(255,42,122,0.4)]"
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
                duration: 15 + rand3 * 15, 
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
              style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
            >
              🌸
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AnimeComparison;
