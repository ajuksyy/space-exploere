"use client";

import { useRef, useState, Suspense } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, TextureLoader, RingGeometry, DoubleSide } from "three";
import { usePlanetStore } from "@/store/planetStore";
import { Planet as PlanetType } from "@/data/planets";
import { playPlanetClickSound } from "@/lib/sounds";

interface SaturnProps {
  planet: PlanetType;
  angle: number;
}

function SaturnPlanet({ planet, angle }: SaturnProps) {
  const planetMeshRef = useRef<Mesh>(null);
  const ringMeshRef = useRef<Mesh>(null);
  const cloudMeshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { selectPlanet, openPanel } = usePlanetStore();

  // Load all Saturn textures
  const planetTexture = useLoader(TextureLoader, "/textures/saturn.jpg");
  const ringTexture = useLoader(TextureLoader, "/textures/saturn_ring.png");
  const cloudTexture = useLoader(TextureLoader, "/textures/saturn-clouds.png");

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const x = Math.cos(angle + time * planet.orbitalSpeed) * planet.orbitalRadius;
    const z = Math.sin(angle + time * planet.orbitalSpeed) * planet.orbitalRadius;

    // Move planet and rings together
    if (planetMeshRef.current) {
      planetMeshRef.current.position.set(x, 0, z);
      planetMeshRef.current.rotation.y += planet.rotationSpeed * delta;
    }
    if (ringMeshRef.current) {
      ringMeshRef.current.position.set(x, 0, z);
      ringMeshRef.current.rotation.x = Math.PI / 2; // Tilt rings
    }
    if (cloudMeshRef.current) {
      cloudMeshRef.current.position.set(x, 0, z);
      cloudMeshRef.current.rotation.y += planet.rotationSpeed * delta * 1.1; // Slightly faster rotation for clouds
    }
  });

  const handleClick = () => {
    playPlanetClickSound();
    selectPlanet(planet);
    openPanel();
  };

  const scale = hovered ? planet.size * 1.2 : planet.size;

  return (
    <group>
      {/* Planet sphere */}
      <mesh
        ref={planetMeshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={scale}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={planetTexture}
          emissive={hovered ? planet.color : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      {/* Cloud layer (slightly larger, transparent) */}
      <mesh
        ref={cloudMeshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={scale * 1.02}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={cloudTexture}
          transparent
          opacity={0.6}
          emissive={hovered ? planet.color : "#000000"}
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </mesh>

      {/* Rings */}
      <mesh
        ref={ringMeshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[1.2 * scale, 2.2 * scale, 128]} />
        <meshStandardMaterial
          map={ringTexture}
          side={DoubleSide}
          transparent
          opacity={0.8}
          emissive={hovered ? planet.color : "#000000"}
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </mesh>
    </group>
  );
}

export default function Saturn({ planet, angle }: SaturnProps) {
  return (
    <Suspense fallback={null}>
      <SaturnPlanet planet={planet} angle={angle} />
    </Suspense>
  );
}

