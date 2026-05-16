import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../../config';
import { Heart } from 'lucide-react';

const Countdown = ({ onUnlock }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const targetDate = new Date(CONFIG.birthdayDate);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setIsUnlocked(true);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    onUnlock();
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#030005] bg-mesh animate-mesh flex items-center justify-center p-6 text-center overflow-hidden preserve-3d">
      <div className="absolute inset-0 bg-romantic-gradient opacity-60 mix-blend-multiply" />
      
      {/* Floating Particles for Countdown */}
      <div className="absolute inset-0 pointer-events-none preserve-3d">
        {[...Array(10)].map((_, i) => {
          const rand1 = ((i * 101) % 100) / 100;
          const rand2 = ((i * 103) % 100) / 100;
          const rand3 = ((i * 107) % 100) / 100;
          const rand4 = ((i * 109) % 100) / 100;
          const zDepth = rand1 * 300 - 150;
          return (
            <motion.div
              key={i}
              className="absolute bg-romantic-pink/30 rounded-full shadow-[0_0_15px_rgba(255,42,122,0.6)]"
              animate={{
                y: ["0vh", "100vh"],
                opacity: [0, 1, 0],
                rotateX: [0, 360]
              }}
              transition={{
                duration: rand1 * 5 + 5,
                repeat: Infinity,
                delay: rand2 * 5,
              }}
              style={{
                left: `${rand3 * 100}%`,
                width: `${rand4 * 6 + 2}px`,
                height: `${rand4 * 6 + 2}px`,
                transform: `translateZ(${zDepth}px)`,
                willChange: "transform, opacity"
              }}
            />
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="relative z-10 max-w-4xl preserve-3d"
      >
        <motion.h2 
          className="text-3xl md:text-5xl font-serif mb-12 text-white drop-shadow-[0_0_20px_rgba(255,42,122,0.8)]"
          animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transform: "translateZ(40px)" }}
        >
          A Special suprise Strats Here ❤️
        </motion.h2>

        {!isUnlocked ? (
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12 preserve-3d">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds },
            ].map((item, index) => (
              <motion.div 
                key={item.label} 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="relative group"
              >
                {/* 3D Glass Ring Effect */}
                <motion.div 
                  className="absolute inset-[-10px] rounded-3xl border border-romantic-pink/30 bg-romantic-pink/5 opacity-0 group-hover:opacity-100 blur-sm"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="glass-3d p-6 md:p-8 min-w-[100px] md:min-w-[140px] flex flex-col items-center justify-center relative overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,42,122,0.4)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-romantic-pink/10 to-transparent" />
                  <motion.div 
                    key={item.value}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-2 text-glow-intense font-sans"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    {String(item.value).padStart(2, '0')}
                  </motion.div>
                  <div className="text-sm md:text-base text-white/70 uppercase tracking-[0.3em] font-semibold" style={{ transform: "translateZ(20px)" }}>
                    {item.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{ transform: "translateZ(50px)" }}
          >
            <motion.button
              onClick={handleUnlock}
              whileHover={{ scale: 1.1, rotateX: 10 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 glass-button text-white font-bold text-xl flex items-center gap-4 mx-auto group"
            >
              UNLOCK YOUR GIFT 
              <Heart className="w-7 h-7 group-hover:fill-romantic-pink group-hover:text-romantic-pink transition-all animate-pulse" />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Countdown;
