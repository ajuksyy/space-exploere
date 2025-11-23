"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface BulletProps {
  position: [number, number, number];
}

export default function Bullet({ position }: BulletProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(position[0], position[1], position[2]);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial
        color="#ffff00"
        emissive="#ffff00"
        emissiveIntensity={1}
      />
    </mesh>
  );
}

