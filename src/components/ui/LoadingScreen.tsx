'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Cpu, Terminal } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps = {}) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING SYSTEM');

  useEffect(() => {
    // Progreso continuo hasta el 100% en ~1.3 segundos
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const texts = [
      'INITIALIZING SYSTEM',
      'LOADING MODULES',
      'CONFIGURING ENVIRONMENT',
      'ESTABLISHING CONNECTION',
      'SYSTEM READY'
    ];
    
    const textInterval = setInterval(() => {
      const index = Math.floor(progress / 20);
      if (texts[index]) {
        setLoadingText(texts[index]);
      }
    }, 400);

    return () => clearInterval(textInterval);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-[#0A0A0F] flex items-center justify-center overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      
      {/* Animated lines */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [-1000, 1000] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
        />
        <motion.div
          animate={{ x: [1000, -1000] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute top-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"
        />
        <motion.div
          animate={{ x: [-1000, 1000] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
          className="absolute top-3/4 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
        />
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-red-500/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-orange-500/5 to-transparent blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 max-w-lg w-full">
        {/* Logo container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 -m-8"
          >
            <div className="w-32 h-32 rounded-full border border-red-500/20 border-dashed" />
          </motion.div>

          {/* Middle ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 -m-6"
          >
            <div className="w-28 h-28 rounded-full border border-orange-500/20" />
          </motion.div>

          {/* Core logo */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-[#0F0F1A] to-[#1C1C28] rounded-lg flex items-center justify-center border border-red-500/30 shadow-lg shadow-red-500/10">
            <Code2 className="w-8 h-8 text-red-400/80" strokeWidth={1.5} />
            
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-red-500/50" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-red-500/50" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-red-500/50" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-red-500/50" />
          </div>

          {/* Pulse effect */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 w-16 h-16 bg-red-500/20 rounded-lg blur-xl"
          />
        </motion.div>

        {/* System info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center space-y-2"
        >
          <div className="flex items-center justify-center gap-2 text-red-400/60 text-xs font-mono mb-3">
            <Terminal className="w-3 h-3" />
            <span>GARCÍA LABS v2.0.25</span>
          </div>
          
          <h1 className="text-xl sm:text-2xl font-bold tracking-wider text-gray-300/90 font-mono">
            SYSTEM INTERFACE
          </h1>
          
          <p className="text-xs sm:text-sm text-gray-500 font-mono uppercase tracking-widest">
            {loadingText}
          </p>
        </motion.div>

        {/* Progress section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full space-y-3"
        >
          {/* Progress bar */}
          <div className="relative h-1 bg-[#1C1C28] rounded-sm overflow-hidden border border-red-500/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-red-500/80 to-orange-500/80 relative"
            >
              {/* Scanning line effect */}
              <motion.div
                animate={{ x: [-20, 120] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
              />
            </motion.div>
          </div>

          {/* Status info */}
          <div className="flex justify-between items-center text-xs font-mono">
            <div className="flex items-center gap-2 text-gray-500">
              <Cpu className="w-3 h-3" />
              <span>LOADING...</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">[</span>
              <span className="text-red-400 tabular-nums">{progress}%</span>
              <span className="text-gray-600">]</span>
            </div>
          </div>

          {/* System metrics */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-mono text-gray-600">
            <div className="flex flex-col items-center p-2 bg-[#0F0F1A] border border-red-500/10 rounded">
              <span className="text-red-500/60">CPU</span>
              <span className="text-white/40 mt-1">{Math.min(progress + 20, 100)}%</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-[#0F0F1A] border border-red-500/10 rounded">
              <span className="text-red-500/60">RAM</span>
              <span className="text-white/40 mt-1">{Math.min(progress + 15, 95)}%</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-[#0F0F1A] border border-red-500/10 rounded">
              <span className="text-red-500/60">NET</span>
              <span className="text-white/40 mt-1">{Math.min(progress + 10, 100)}%</span>
            </div>
          </div>
        </motion.div>

        {/* Status indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-3 items-center"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: progress > i * 25 ? [0.3, 1, 0.3] : 0.1 
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="w-1.5 h-1.5 bg-red-400 rounded-full shadow-lg shadow-red-400/50"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}