"use client";

import { useRef, Suspense } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, TextureLoader, BoxGeometry } from "three";
import { ErrorBoundary } from "../ErrorBoundary";

interface AsteroidProps {
  position: [number, number, number];
  size: number;
  rotationSpeed: number;
}

function AsteroidMesh({ position, size, rotationSpeed }: AsteroidProps) {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, "/textures/asteroid.jpg");

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * delta;
      meshRef.current.rotation.y += rotationSpeed * delta * 0.7;
      meshRef.current.rotation.z += rotationSpeed * delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function AsteroidFallback({ position, size, rotationSpeed }: AsteroidProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * delta;
      meshRef.current.rotation.y += rotationSpeed * delta * 0.7;
      meshRef.current.rotation.z += rotationSpeed * delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color="#8B7355" />
    </mesh>
  );
}

export default function Asteroid(props: AsteroidProps) {
  return (
    <ErrorBoundary fallback={<AsteroidFallback {...props} />}>
      <Suspense fallback={<AsteroidFallback {...props} />}>
        <AsteroidMesh {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

