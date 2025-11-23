"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Play, HelpCircle, Gamepad2, Pause, X } from "lucide-react";
import { useQuizStore } from "@/store/quizStore";
import { quizQuestions } from "@/data/quizQuestions";
import { playButtonClickSound, playBackButtonSound } from "@/lib/sounds";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Home() {
  const { openQuiz, startQuiz } = useQuizStore();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleQuizClick = () => {
    playButtonClickSound();
    // Shuffle questions and take 10 random ones
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    startQuiz(shuffled.slice(0, 10));
    openQuiz();
  };

  const handleButtonClick = () => {
    playButtonClickSound();
  };

  const handleVideoClick = () => {
    playButtonClickSound();
    setIsVideoOpen(true);
    setIsPlaying(true);
    setIsHovered(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleTimeUpdate = () => updateProgress();
    const handleLoadedMetadata = () => updateProgress();

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [isVideoOpen]);

  const togglePlayPause = () => {
    playBackButtonSound();
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * video.duration;

    video.currentTime = newTime;
    setProgress(percentage * 100);
    playBackButtonSound();
  };

  const handleClose = () => {
    playBackButtonSound();
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setIsVideoOpen(false);
    setIsPlaying(false);
    setProgress(0);
    setIsHovered(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 relative"
        >
          <div className="absolute -top-30 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-[-10]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="max-w-full h-auto max-h-32 sm:max-h-48"
            >
              <source src="/gifs/Timeline 2.gif.mp4" type="video/mp4" />
            </video>
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-2">
            Space Explorer
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto">
            Journey through our cosmic neighborhood
          </p>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/solar-system" onClick={handleButtonClick}>
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 rounded-full shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Start Exploration
            </Button>
          </Link>
        </motion.div>

        {/* Additional Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Button
            onClick={handleQuizClick}
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6 rounded-full shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all hover:scale-105"
          >
            <HelpCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Quiz
          </Button>
          <Button
            onClick={handleVideoClick}
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6 rounded-full shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all hover:scale-105"
          >
            <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Play Video
          </Button>
          <Link href="/game" onClick={handleButtonClick}>
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6 rounded-full shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all hover:scale-105"
            >
              <Gamepad2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Let's Play
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Video Dialog */}
      <Dialog open={isVideoOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-[100vw] max-h-[100vh] w-screen h-screen p-0 bg-black border-0 text-white overflow-hidden [&>button]:hidden flex items-center justify-center m-0 left-0 top-0 translate-x-0 translate-y-0 rounded-none">
          <DialogTitle className="sr-only">Solar System Video Player</DialogTitle>
          <div 
            className="w-full h-full flex items-center justify-center p-[60px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full h-full rounded-2xl border-4 border-solid border-yellow-500 overflow-hidden">
              {/* Video */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="/videos/Solar System Video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Custom Cartoonish Controls */}
              {/* Exit X Button - Top Left */}
              <motion.button
                onClick={handleClose}
                className={`absolute top-3 left-3 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.4)] border-4 border-[#f0b100] flex items-center justify-center transition-all hover:scale-110 active:scale-95 transform ${
                  isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                } transition-opacity duration-300`}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[4] drop-shadow-lg" />
              </motion.button>

              {/* Pause/Play Button - Top Right */}
              <motion.button
                onClick={togglePlayPause}
                className={`absolute top-3 right-3 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.4)] border-4 border-[#f0b100] flex items-center justify-center transition-all hover:scale-110 active:scale-95 transform ${
                  isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                } transition-opacity duration-300`}
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? (
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="w-2 h-5 sm:w-2.5 sm:h-6 bg-white rounded-sm drop-shadow-lg"></div>
                    <div className="w-2 h-5 sm:w-2.5 sm:h-6 bg-white rounded-sm drop-shadow-lg"></div>
                  </div>
                ) : (
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[4] drop-shadow-lg ml-0.5" />
                )}
              </motion.button>

              {/* Progress Bar - Bottom */}
              <div className={`absolute bottom-3 left-3 right-3 z-50 transition-opacity duration-300 ${
                isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}>
                <div
                  onClick={handleProgressClick}
                  className="w-full h-6 sm:h-7 bg-white/20 rounded-full cursor-pointer border-4 border-[#f0b100] shadow-[0_8px_16px_rgba(0,0,0,0.4)] overflow-hidden backdrop-blur-sm hover:bg-white/30 transition-all"
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 rounded-full shadow-inner"
                    style={{ width: `${progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
