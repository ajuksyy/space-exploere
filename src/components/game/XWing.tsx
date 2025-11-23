"use client";

import { useRef, Suspense, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Mesh, Group } from "three";
import { ErrorBoundary } from "../ErrorBoundary";

// Preload the model for better performance
useGLTF.preload("/attributes/T-65 X-Wing Starfighter.glb");

interface XWingProps {
  position: [number, number, number];
}

function XWingMesh({ position }: XWingProps) {
  const groupRef = useRef<Group>(null);
  
  // Load GLB model
  const { scene } = useGLTF("/attributes/T-65 X-Wing Starfighter.glb");

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.set(position[0], position[1], position[2]);
      // No idle rotation - keep ship fully still when no input
    }
  });

  const scale = 2.0;

  return (
    <group 
      ref={groupRef} 
      scale={[scale, scale, scale]}
      rotation={[Math.PI / 2, -Math.PI / 2, 0]} 
    >
      <primitive object={scene.clone()} />
    </group>
  );
}

function XWingFallback({ position }: XWingProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(position[0], position[1], position[2]);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 1, 3]} />
      <meshStandardMaterial 
        color="#4a90e2" 
        emissive="#2a5a9a" 
        emissiveIntensity={0.5}
      />
      {/* Add wings */}
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[0.3, 0.8, 1.5]} />
        <meshStandardMaterial color="#4a90e2" emissive="#2a5a9a" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[0.3, 0.8, 1.5]} />
        <meshStandardMaterial color="#4a90e2" emissive="#2a5a9a" emissiveIntensity={0.5} />
      </mesh>
    </mesh>
  );
}

export default function XWing(props: XWingProps) {
  return (
    <ErrorBoundary fallback={<XWingFallback {...props} />}>
      <Suspense fallback={<XWingFallback {...props} />}>
        <XWingMesh {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

