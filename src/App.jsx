import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Background from './components/UI/Background';
import MusicPlayer from './components/UI/MusicPlayer';
import Countdown from './components/Sections/Countdown';
import Hero from './components/Sections/Hero';
import Memories from './components/Sections/Memories';
import Wishes from './components/Sections/Wishes';
import Letter from './components/Sections/Letter';
import Proposal from './components/Sections/Proposal';
import AnimeComparison from './components/Sections/AnimeComparison';
import Ending from './components/Sections/Ending';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030005] bg-mesh animate-mesh text-white selection:bg-romantic-pink/30 font-sans">
      {/* Custom Cursor Glow */}
      <div 
        className="cursor-glow hidden md:block"
        style={{ 
          left: mousePos.x, 
          top: mousePos.y 
        }}
      />

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-romantic-pink to-romantic-purple z-[150] origin-left shadow-[0_0_10px_rgba(255,42,122,0.8)]"
        style={{ scaleX }}
      />

      {!isUnlocked ? (
        <Countdown onUnlock={() => setIsUnlocked(true)} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <Background />
          <MusicPlayer autoPlay={true} />
          
          <main className="preserve-3d">
            <Hero />
            <Memories />
            <Wishes />
            <Letter />
            <AnimeComparison />
            <Proposal />
            <Ending />
          </main>

          {/* Surprise Message Easter Egg */}
          <div className="fixed bottom-4 left-4 z-50 group preserve-3d">
            <div className="w-10 h-10 glass-button rounded-full flex items-center justify-center cursor-help transition-all">
              ✨
            </div>
            <div className="absolute bottom-full left-0 mb-3 w-56 p-4 glass-3d text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none translate-z-10">
              <span className="text-glow font-medium">"Psst... you're my favorite human ever! Keep smiling, it lights up my world. ❤️"</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
