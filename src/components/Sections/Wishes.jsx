import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { CONFIG } from '../../config';
import { Sparkles, Gift, Heart as HeartIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

const Typewriter = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let timeout;
    const timeoutStart = setTimeout(() => {
      let currentText = '';
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          currentText += text[index];
          setDisplayText(currentText);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutStart);
      setDisplayText('');
    };
  }, [text, delay]);

  return <span>{displayText}</span>;
};

const WishCard = ({ wish, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const triggerHearts = (e) => {
    if (!e || !e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = (rect.left + rect.width / 2) / window.innerWidth;
    const cy = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 15,
      spread: 70,
      origin: { x: cx, y: cy },
      colors: ['#ff2a7a', '#ff0000', '#9d4edd'],
      shapes: ['heart'],
    });
  };

  const initialRotation = ((index * 83) % 10) - 5;
  
  return (
    <motion.div
      style={{ rotateX, rotateY, z: 0 }}
      initial={{ opacity: 0, scale: 0.8, rotateZ: initialRotation, z: -50 }}
      whileInView={{ opacity: 1, scale: 1, rotateZ: 0, z: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, type: "spring" }}
      whileHover={{ 
        z: 50,
        scale: 1.05,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={triggerHearts}
      className="glass-3d p-8 md:p-10 relative group cursor-pointer overflow-hidden flex flex-col items-center justify-center min-h-[250px] preserve-3d"
    >
      {/* Decorative Ribbon */}
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none" style={{ transform: "translateZ(10px)" }}>
        <div className="absolute top-4 right-[-20px] w-24 h-8 bg-romantic-pink/60 rotate-45 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-tighter shadow-lg">
          Love Inside
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mb-6 relative preserve-3d"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="absolute inset-0 bg-romantic-pink blur-2xl opacity-30 group-hover:opacity-80 transition-opacity" />
        <Gift className="w-12 h-12 text-romantic-pink relative z-10 drop-shadow-[0_0_15px_rgba(255,42,122,0.8)]" />
      </motion.div>

      <p 
        className="text-2xl md:text-3xl text-white font-handwritten text-center leading-relaxed text-glow"
        style={{ transform: "translateZ(20px)" }}
      >
        <Typewriter text={wish} delay={index * 0.2 + 0.5} />
      </p>

      {/* Sparkles around active cards */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity preserve-3d" style={{ transform: "translateZ(40px)" }}>
        {[...Array(6)].map((_, i) => {
          const rand1 = (((i + index) * 89) % 200) - 100;
          const rand2 = (((i + index) * 97) % 200) - 100;
          return (
            <motion.div
              key={i}
              className="absolute text-yellow-200 text-lg drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]"
              animate={{ 
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                x: rand1,
                y: rand2,
                rotateZ: [0, 180]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              ✨
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

const Wishes = () => {
  return (
    <section className="relative min-h-screen py-16 px-6 flex flex-col items-center justify-center overflow-hidden preserve-3d">
      {/* Dynamic Background Blur Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-romantic-pink/15 blur-[150px] rounded-full animate-pulse mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-romantic-purple/15 blur-[150px] rounded-full animate-pulse delay-1000 mix-blend-screen" />

      <motion.div
        initial={{ opacity: 0, y: 30, z: -50 }}
        whileInView={{ opacity: 1, y: 0, z: 0 }}
        className="text-center mb-24 relative z-10 preserve-3d"
      >
        <div className="inline-flex items-center gap-2 px-6 py-2 glass-3d text-romantic-pink text-xs uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(255,42,122,0.3)]">
          <Sparkles className="w-4 h-4 animate-pulse" /> Premium Surprise
        </div>
        <h2 className="text-6xl md:text-8xl font-serif text-white mb-6 text-glow-intense">Unakkaga Mattum ❤️</h2>
        <p className="text-white/60 italic font-serif text-2xl drop-shadow-md">"Every word here is from the bottom of my heart..."</p>
      </motion.div>

      {/* Wishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl w-full z-10 preserve-3d" style={{ perspective: '1500px' }}>
        {CONFIG.wishes.map((wish, index) => (
          <WishCard key={index} wish={wish} index={index} />
        ))}
      </div>

      {/* Floating Roses and Hearts in Background */}
      <div className="absolute inset-0 pointer-events-none preserve-3d">
        {[...Array(12)].map((_, i) => {
          const rand1 = ((i * 71) % 100) / 100;
          const rand2 = ((i * 73) % 100) / 100;
          const rand3 = ((i * 79) % 100) / 100;
          const zDepth = rand1 * 400 - 200;
          return (
            <motion.div
              key={`deco-${i}`}
              className="absolute text-4xl drop-shadow-[0_0_15px_rgba(255,42,122,0.5)]"
              initial={{ 
                x: rand1 * 100 + "vw", 
                y: "110vh",
                z: zDepth,
                opacity: 0
              }}
              animate={{ 
                y: "-10vh",
                x: (rand2 * 100) + "vw",
                opacity: [0, 0.6, 0],
                rotateX: [0, 360],
                rotateY: [0, 360]
              }}
              transition={{ 
                duration: 20 + rand3 * 10, 
                repeat: Infinity,
                ease: "linear",
                delay: i * 2
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {i % 2 === 0 ? "🌹" : "💖"}
            </motion.div>
          );
        })}
      </div>

      {/* Scroll indicator for this section */}
      <div className="mt-24 flex flex-col items-center gap-4 opacity-50 preserve-3d" style={{ transform: "translateZ(20px)" }}>
        <div className="w-1 h-16 bg-gradient-to-b from-romantic-pink to-transparent rounded-full" />
        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-glow">Sweet Memories Ahead</span>
      </div>
    </section>
  );
};

export default Wishes;
