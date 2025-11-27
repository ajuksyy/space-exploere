"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars as ThreeStars } from "@react-three/drei";
import XWing from "./XWing";
import GameAsteroid from "./GameAsteroid";
import Bullet from "./Bullet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import { playBackButtonSound, playGunShotSound, playExplosionSound } from "@/lib/sounds";
import { spaceFacts } from "@/data/spaceFacts";
import SpaceFactBubble from "./SpaceFactBubble";

interface Asteroid {
  id: number;
  position: [number, number, number];
  size: number;
  rotationSpeed: number;
}

interface BulletData {
  id: number;
  position: [number, number, number];
}

interface GameLogicProps {
  isPaused: boolean;
  gameOver: boolean;
  shipPosition: [number, number, number];
  setAsteroids: React.Dispatch<React.SetStateAction<Asteroid[]>>;
  setBullets: React.Dispatch<React.SetStateAction<BulletData[]>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  asteroidIdRef: React.MutableRefObject<number>;
  bulletIdRef: React.MutableRefObject<number>;
  lastAsteroidSpawn: React.MutableRefObject<number>;
  gameTimeRef: React.MutableRefObject<number>;
}

function GameLogic({
  isPaused,
  gameOver,
  shipPosition,
  setAsteroids,
  setBullets,
  setScore,
  setGameOver,
  asteroidIdRef,
  bulletIdRef,
  lastAsteroidSpawn,
  gameTimeRef,
}: GameLogicProps) {
  useFrame((state, delta) => {
    if (isPaused || gameOver) return;

    gameTimeRef.current += delta;

    // Spawn asteroids
    if (gameTimeRef.current - lastAsteroidSpawn.current > 1.5) {
      const x = (Math.random() - 0.5) * 20;
      const size = 0.5 + Math.random() * 0.8;
      const newAsteroid: Asteroid = {
        id: asteroidIdRef.current++,
        position: [x, 12, 0],
        size,
        rotationSpeed: 0.5 + Math.random() * 1,
      };
      setAsteroids((prev) => [...prev, newAsteroid]);
      lastAsteroidSpawn.current = gameTimeRef.current;
    }

    // Update bullets
    setBullets((prev) =>
      prev
        .map((bullet) => ({
          ...bullet,
          position: [bullet.position[0], bullet.position[1] + 10 * delta, bullet.position[2]] as [number, number, number],
        }))
        .filter((bullet) => bullet.position[1] < 15)
    );

    // Update asteroids and check collisions
    setAsteroids((prev) => {
      const updated = prev
        .map((asteroid) => ({
          ...asteroid,
          position: [asteroid.position[0], asteroid.position[1] - 3 * delta, asteroid.position[2]] as [number, number, number],
        }))
        .filter((asteroid) => {
          // Check collision with ship
          const dx = asteroid.position[0] - shipPosition[0];
          const dy = asteroid.position[1] - shipPosition[1];
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < asteroid.size + 0.5) {
            setGameOver(true);
            return false;
          }
          return asteroid.position[1] > -15;
        });
      return updated;
    });

    // Check bullet-asteroid collisions
    setBullets((prev) => {
      const remainingBullets: BulletData[] = [];
      
      prev.forEach((bullet) => {
        let hit = false;
        setAsteroids((asteroids) => {
          return asteroids.filter((asteroid) => {
            const dx = bullet.position[0] - asteroid.position[0];
            const dy = bullet.position[1] - asteroid.position[1];
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < asteroid.size + 0.2) {
              hit = true;
              playExplosionSound();
              setScore((s) => s + Math.floor(asteroid.size * 10));
              return false; // Remove asteroid
            }
            return true;
          });
        });
        if (!hit) {
          remainingBullets.push(bullet);
        }
      });

      return remainingBullets;
    });
  });

  return null;
}

export default function GameScene() {
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [shipPosition, setShipPosition] = useState<[number, number, number]>([0, -5, 0]);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [bullets, setBullets] = useState<BulletData[]>([]);
  const [keys, setKeys] = useState<Set<string>>(new Set());
  const asteroidIdRef = useRef(0);
  const bulletIdRef = useRef(0);
  const lastAsteroidSpawn = useRef(0);
  const gameTimeRef = useRef(0);
  const [currentFact, setCurrentFact] = useState<string | null>(null);
  const lastFactTimeRef = useRef(0);

  const shoot = useCallback(() => {
    playGunShotSound();
    const newBullet: BulletData = {
      id: bulletIdRef.current++,
      position: [shipPosition[0], shipPosition[1] + 1, 0],
    };
    setBullets((prev) => [...prev, newBullet]);
  }, [shipPosition]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsPaused((prev) => !prev);
        return;
      }
      if (e.key === " " && !isPaused && !gameOver) {
        e.preventDefault();
        shoot();
      }
      setKeys((prev) => new Set(prev).add(e.key.toLowerCase()));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const newKeys = new Set(prev);
        newKeys.delete(e.key.toLowerCase());
        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPaused, gameOver, shoot]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isPaused || gameOver) return;
      const x = (e.clientX / window.innerWidth) * 20 - 10;
      const y = -((e.clientY / window.innerHeight) * 20 - 10) - 5;
      // Clamp to bounds
      const clampedX = Math.max(-10, Math.min(10, x));
      const clampedY = Math.max(-15, Math.min(5, y));
      setShipPosition([clampedX, clampedY, 0]);
    };

    const handleClick = (e: MouseEvent) => {
      if (isPaused || gameOver) return;
      if (e.button === 0) {
        shoot();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
    };
  }, [isPaused, gameOver, shoot]);

  // Ship movement with keyboard
  useEffect(() => {
    if (isPaused || gameOver) return;

    const interval = setInterval(() => {
      setShipPosition((prev) => {
        const moveSpeed = 0.3;
        let newX = prev[0];
        let newY = prev[1];

        if (keys.has("arrowleft") || keys.has("a")) {
          newX -= moveSpeed;
        }
        if (keys.has("arrowright") || keys.has("d")) {
          newX += moveSpeed;
        }
        if (keys.has("arrowup") || keys.has("w")) {
          newY += moveSpeed;
        }
        if (keys.has("arrowdown") || keys.has("s")) {
          newY -= moveSpeed;
        }

        // Clamp ship position to screen bounds
        newX = Math.max(-10, Math.min(10, newX));
        newY = Math.max(-15, Math.min(5, newY));

        return [newX, newY, 0];
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [keys, isPaused, gameOver]);


  const handleResume = () => {
    setIsPaused(false);
  };

  const handleRestart = () => {
    setScore(0);
    setIsPaused(false);
    setGameOver(false);
    setAsteroids([]);
    setBullets([]);
    setShipPosition([0, -5, 0]);
    setCurrentFact(null);
    gameTimeRef.current = 0;
    lastAsteroidSpawn.current = 0;
    lastFactTimeRef.current = 0;
  };

  // Show fact every 45 seconds
  useEffect(() => {
    if (isPaused || gameOver) {
      return;
    }
    
    const factInterval = 12; // Show fact every 45 seconds
    const checkInterval = setInterval(() => {
      if (!isPaused && !gameOver && gameTimeRef.current - lastFactTimeRef.current >= factInterval) {
        // Get a random fact
        const randomIndex = Math.floor(Math.random() * spaceFacts.length);
        const randomFact = spaceFacts[randomIndex].fact;
        setCurrentFact(randomFact);
        lastFactTimeRef.current = gameTimeRef.current;
      }
    }, 1000); // Check every second
    
    return () => clearInterval(checkInterval);
  }, [isPaused, gameOver]);

  const handleFactComplete = useCallback(() => {
    setCurrentFact(null);
  }, []);

  return (
    <>
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[0, 0, 5]} intensity={0.5} />
        <ThreeStars radius={100} depth={50} count={1000} factor={4} />
        <GameLogic
          isPaused={isPaused}
          gameOver={gameOver}
          shipPosition={shipPosition}
          setAsteroids={setAsteroids}
          setBullets={setBullets}
          setScore={setScore}
          setGameOver={setGameOver}
          asteroidIdRef={asteroidIdRef}
          bulletIdRef={bulletIdRef}
          lastAsteroidSpawn={lastAsteroidSpawn}
          gameTimeRef={gameTimeRef}
        />
        <XWing position={shipPosition} />
        {asteroids.map((asteroid) => (
          <GameAsteroid
            key={asteroid.id}
            position={asteroid.position}
            size={asteroid.size}
            rotationSpeed={asteroid.rotationSpeed}
          />
        ))}
        {bullets.map((bullet) => (
          <Bullet key={bullet.id} position={bullet.position} />
        ))}
      </Canvas>

      {/* Score Display */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-black/70 backdrop-blur-sm border border-yellow-500/30 rounded-lg px-6 py-3">
          <h2 className="text-3xl font-bold text-yellow-400">Score: {score}</h2>
        </div>
      </div>

      {/* Pause Menu */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-black/90 border border-yellow-500/30 rounded-lg p-8 flex flex-col gap-4 items-center">
            <h2 className="text-4xl font-bold text-yellow-400 mb-4">Paused</h2>
            <Button
              onClick={handleResume}
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg px-8 py-6 rounded-full shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all hover:scale-105 w-48"
            >
              <Play className="mr-2 h-5 w-5" />
              Resume
            </Button>
            <Link href="/" onClick={() => playBackButtonSound()}>
              <Button
                size="lg"
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg transition-all hover:scale-105 w-48"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Game Over Menu */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-black/90 border border-yellow-500/30 rounded-lg p-8 flex flex-col gap-4 items-center">
            <h2 className="text-4xl font-bold text-red-400 mb-2">Game Over!</h2>
            <p className="text-2xl text-yellow-400 mb-4">Final Score: {score}</p>
            <Button
              onClick={handleRestart}
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg px-8 py-6 rounded-full shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all hover:scale-105 w-48"
            >
              <Play className="mr-2 h-5 w-5" />
              Play Again
            </Button>
            <Link href="/" onClick={() => playBackButtonSound()}>
              <Button
                size="lg"
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg transition-all hover:scale-105 w-48"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!isPaused && !gameOver && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-black/70 backdrop-blur-sm border border-yellow-500/30 rounded-lg px-6 py-3 text-sm text-gray-300">
            <p>Arrow Keys / WASD: Move | Space / Click: Shoot | ESC: Pause</p>
          </div>
        </div>
      )}

      {/* Space Fact Bubble */}
      {!isPaused && !gameOver && currentFact && (
        <SpaceFactBubble fact={currentFact} onComplete={handleFactComplete} />
      )}
    </>
  );
}

