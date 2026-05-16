import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Heart, RefreshCw } from 'lucide-react';
import { CONFIG } from '../../config';

const Ending = () => {
  const replay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen py-16 flex flex-col items-center justify-center overflow-hidden px-6 preserve-3d"
    >
      {/* 3D Glowing Background mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,42,122,0.1)_0%,_transparent_60%)] mix-blend-screen" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-romantic-pink/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-romantic-purple/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

      {/* Floating Light Lanterns */}
      <div className="absolute inset-0 pointer-events-none preserve-3d">
        {[...Array(15)].map((_, i) => {
          const rand1 = ((i * 31) % 100) / 100;
          const rand2 = ((i * 37) % 100) / 100;
          const zDepth = rand1 * 400 - 200;
          return (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-t from-yellow-500/40 to-romantic-pink/40 w-10 h-16 rounded-t-full rounded-b-lg shadow-[0_0_20px_rgba(255,150,50,0.6)]"
              initial={{
                x: rand1 * 100 + "vw",
                y: "110vh",
                opacity: 0.8,
                z: zDepth
              }}
              animate={{
                y: "-10vh",
                x: (rand2 * 100) + "vw",
                opacity: [0.8, 0.4, 0]
              }}
              transition={{
                duration: 20 + rand1 * 15,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2
              }}
              style={{ filter: 'blur(6px)', transformStyle: "preserve-3d" }}
            />
          );
        })}
      </div>

      <motion.div 
        style={{ rotateX, rotateY }}
        className="relative z-10 text-center max-w-4xl preserve-3d"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, z: -50 }}
          whileInView={{ opacity: 1, scale: 1, z: 0 }}
          transition={{ duration: 1.5, type: "spring" }}
          className="mb-12 glass-3d p-12 md:p-20 preserve-3d overflow-hidden"
        >
          {/* Inner glass highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-romantic-pink mb-10 inline-block drop-shadow-[0_0_20px_rgba(255,42,122,0.8)]"
            style={{ transform: "translateZ(60px)" }}
          >
            <Heart className="w-24 h-24 fill-current" />
          </motion.div>

          <h2 
            className="text-5xl md:text-7xl font-serif text-white mb-8 text-glow-intense"
            style={{ transform: "translateZ(40px)" }}
          >
            Thank you for being part of my life ❤️
          </h2>

          <p 
            className="text-2xl md:text-3xl text-white/70 italic mb-12 drop-shadow-md"
            style={{ transform: "translateZ(30px)" }}
          >
            "No gift can express how much you mean to me."
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="text-4xl md:text-5xl font-serif text-romantic-pink text-glow"
            style={{ transform: "translateZ(50px)" }}
          >
            Happy Birthday My Love ❤️
          </motion.div>
        </motion.div>

        <div className="flex flex-col items-center gap-10 mt-16 preserve-3d" style={{ transform: "translateZ(20px)" }}>
          <motion.button
            onClick={replay}
            whileHover={{ scale: 1.1, rotateZ: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 px-10 py-5 glass-button text-white font-bold text-xl transition-all shadow-[0_0_30px_rgba(255,42,122,0.4)]"
          >
            <RefreshCw className="w-6 h-6" />
            Replay Memories ❤️
          </motion.button>

          <div className="text-white/40 text-sm tracking-[0.5em] uppercase font-bold text-glow">
            Made with all my heart
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Ending;
