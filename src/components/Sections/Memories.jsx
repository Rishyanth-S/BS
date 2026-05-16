import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../../config';

const Memories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CONFIG.memories.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen py-16 flex flex-col items-center justify-center bg-transparent overflow-hidden preserve-3d">
      <motion.div
        initial={{ opacity: 0, y: 20, translateZ: -50 }}
        whileInView={{ opacity: 1, y: 0, translateZ: 0 }}
        className="text-center mb-10 z-10 preserve-3d"
      >
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 text-glow-intense drop-shadow-2xl">Journey Memories</h2>
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-romantic-pink to-transparent mx-auto rounded-full shadow-[0_0_15px_rgba(255,42,122,0.8)]" />
      </motion.div>

      <div className="relative w-fit h-fit max-w-[95vw] mx-auto z-10 preserve-3d flex flex-col items-center justify-center" style={{ perspective: '2000px' }}>
        <div className="relative w-fit h-fit glass-3d overflow-hidden p-2 group transition-transform duration-1000 hover:rotate-x-2 hover:rotate-y-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, rotateY: 20, scale: 0.9, z: -100 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1, z: 0 }}
              exit={{ opacity: 0, rotateY: -20, scale: 1.1, z: 100 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="relative rounded-2xl overflow-hidden preserve-3d flex justify-center items-center"
            >
              <motion.img
                src={CONFIG.memories[currentIndex].url}
                alt="Memory"
                className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-cover rounded-xl"
                initial={{ scale: 1.05, x: "-1%" }}
                animate={{ scale: 1.0, x: "1%" }}
                transition={{ duration: 8, ease: "linear" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030005] via-[#030005]/20 to-transparent opacity-80 rounded-xl" />
              
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.8, duration: 1, type: "spring" }}
                className="absolute bottom-12 left-12 right-12 text-center"
                style={{ transform: "translateZ(50px)" }}
              >
                <p className="text-3xl md:text-5xl text-white font-serif italic text-glow drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                  "{CONFIG.memories[currentIndex].caption}"
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Ambient Inner Glow */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(255,42,122,0.2)] pointer-events-none rounded-2xl" />
        </div>

        {/* 3D Slideshow Progress Indicators */}
        <div className="flex justify-center gap-4 mt-12 preserve-3d" style={{ transform: "translateZ(30px)" }}>
          {CONFIG.memories.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 transition-all duration-700 rounded-full shadow-[0_0_10px_rgba(255,42,122,0.5)] ${
                i === currentIndex ? 'w-16 bg-romantic-pink' : 'w-4 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Floating Light Leaks */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen">
        <motion.div
          animate={{
            x: ["-20%", "120%"],
            opacity: [0, 0.4, 0],
            rotate: [10, -10]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-romantic-pink/10 to-transparent skew-x-12 blur-3xl"
        />
      </div>
    </section>
  );
};

export default Memories;
