"use client";

import { useRef, Suspense } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import { ErrorBoundary } from "../ErrorBoundary";

interface GameAsteroidProps {
  position: [number, number, number];
  size: number;
  rotationSpeed: number;
}

function GameAsteroidMesh({ position, size, rotationSpeed }: GameAsteroidProps) {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, "/textures/asteroid.jpg");

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * delta;
      meshRef.current.rotation.y += rotationSpeed * delta * 0.7;
      meshRef.current.rotation.z += rotationSpeed * delta * 0.5;
      meshRef.current.position.set(position[0], position[1], position[2]);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function GameAsteroidFallback({ position, size, rotationSpeed }: GameAsteroidProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * delta;
      meshRef.current.rotation.y += rotationSpeed * delta * 0.7;
      meshRef.current.rotation.z += rotationSpeed * delta * 0.5;
      meshRef.current.position.set(position[0], position[1], position[2]);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color="#8B7355" />
    </mesh>
  );
}

export default function GameAsteroid(props: GameAsteroidProps) {
  return (
    <ErrorBoundary fallback={<GameAsteroidFallback {...props} />}>
      <Suspense fallback={<GameAsteroidFallback {...props} />}>
        <GameAsteroidMesh {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

