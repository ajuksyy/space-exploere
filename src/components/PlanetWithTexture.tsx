"use client";

import { Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh } from "three";
import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { usePlanetStore } from "@/store/planetStore";
import { Planet as PlanetType } from "@/data/planets";
import { ErrorBoundary } from "./ErrorBoundary";
import { playPlanetClickSound } from "@/lib/sounds";

interface PlanetWithTextureProps {
  planet: PlanetType;
  angle: number;
}

function PlanetMeshFallback({ planet, angle }: PlanetWithTextureProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { selectPlanet, openPanel } = usePlanetStore();

  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const x = Math.cos(angle + time * planet.orbitalSpeed) * planet.orbitalRadius;
      const z = Math.sin(angle + time * planet.orbitalSpeed) * planet.orbitalRadius;
      meshRef.current.position.set(x, 0, z);
      meshRef.current.rotation.y += planet.rotationSpeed * delta;
    }
  });

  const handleClick = () => {
    playPlanetClickSound();
    selectPlanet(planet);
    openPanel();
  };

  return (
    <mesh
      ref={meshRef}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? planet.size * 1.2 : planet.size}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color={hovered ? "#ffff00" : planet.color}
        emissive={hovered ? planet.color : "#000000"}
        emissiveIntensity={hovered ? 0.3 : 0}
      />
    </mesh>
  );
}

function PlanetWithTextureMesh({ planet, angle }: PlanetWithTextureProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { selectPlanet, openPanel } = usePlanetStore();

  // Try to load texture
  const texture = useLoader(TextureLoader, planet.textureUrl);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const x = Math.cos(angle + time * planet.orbitalSpeed) * planet.orbitalRadius;
      const z = Math.sin(angle + time * planet.orbitalSpeed) * planet.orbitalRadius;
      meshRef.current.position.set(x, 0, z);
      meshRef.current.rotation.y += planet.rotationSpeed * delta;
    }
  });

  const handleClick = () => {
    playPlanetClickSound();
    selectPlanet(planet);
    openPanel();
  };

  const materialProps = useMemo(() => {
    if (texture) {
      return {
        map: texture,
        emissive: hovered ? planet.color : "#000000",
        emissiveIntensity: hovered ? 0.2 : 0,
      };
    }
    return {
      color: hovered ? "#ffff00" : planet.color,
      emissive: hovered ? planet.color : "#000000",
      emissiveIntensity: hovered ? 0.3 : 0,
    };
  }, [texture, hovered, planet.color]);

  return (
    <mesh
      ref={meshRef}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? planet.size * 1.2 : planet.size}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial {...materialProps} />
    </mesh>
  );
}

export default function PlanetWithTexture({ planet, angle }: PlanetWithTextureProps) {
  return (
    <ErrorBoundary fallback={<PlanetMeshFallback planet={planet} angle={angle} />}>
      <Suspense fallback={<PlanetMeshFallback planet={planet} angle={angle} />}>
        <PlanetWithTextureMesh planet={planet} angle={angle} />
      </Suspense>
    </ErrorBoundary>
  );
}
