"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpaceFactBubbleProps {
  fact: string;
  onComplete?: () => void;
}

export default function SpaceFactBubble({ fact, onComplete }: SpaceFactBubbleProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    const typeInterval = setInterval(() => {
      if (currentIndex < fact.length) {
        setDisplayedText(fact.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(typeInterval);
        if (onComplete) {
          // Wait a bit before calling onComplete
          timeoutId = setTimeout(onComplete, 5000); // Show for 5 seconds after typing completes
        }
      }
    }, 30); // Adjust speed: lower = faster typing

    return () => {
      clearInterval(typeInterval);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [fact]); // Only depend on fact, not onComplete

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="absolute left-4 top-28 z-20 max-w-xs pointer-events-none"
      >
        <div className="bg-black/95 backdrop-blur-sm border-2 border-yellow-400/70 rounded-2xl p-4 shadow-2xl">
          {/* Chat bubble tail */}
          <div className="absolute -left-3 top-6 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-black/95"></div>
          
          {/* Fact text */}
          <p className="text-white text-sm leading-relaxed font-normal whitespace-normal">
            {displayedText}
            {!isComplete && (
              <span className="inline-block w-1 h-4 bg-yellow-400 ml-1 animate-pulse">|</span>
            )}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

