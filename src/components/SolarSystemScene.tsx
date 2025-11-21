"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars as ThreeStars } from "@react-three/drei";
import { TextureLoader } from "three";
import { usePlanetStore } from "@/store/planetStore";
import { planets } from "@/data/planets";
import Planet from "./Planet";
import Saturn from "./Saturn";
import OrbitalLine from "./OrbitalLine";
import AsteroidBelt from "./AsteroidBelt";
import { ErrorBoundary } from "./ErrorBoundary";

function SunMesh() {
  const sunRef = useRef<any>(null);
  const texture = useLoader(TextureLoader, "/textures/sun.jpg");

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      <sphereGeometry args={[4.5, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        emissive="#FFA500"
        emissiveIntensity={0.8}
      />
      <pointLight intensity={2} distance={100} />
    </mesh>
  );
}

function SunFallback() {
  const sunRef = useRef<any>(null);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      <sphereGeometry args={[4.5, 32, 32]} />
      <meshStandardMaterial
        color="#FFD700"
        emissive="#FFA500"
        emissiveIntensity={0.5}
      />
      <pointLight intensity={2} distance={100} />
    </mesh>
  );
}

function Sun() {
  return (
    <ErrorBoundary fallback={<SunFallback />}>
      <Suspense fallback={<SunFallback />}>
        <SunMesh />
      </Suspense>
    </ErrorBoundary>
  );
}

function CameraController() {
  const { selectedPlanet, isPanelOpen } = usePlanetStore();
  const cameraRef = useRef<any>(null);

  useFrame((state) => {
    if (!cameraRef.current) return;
    const camera = state.camera;

    if (selectedPlanet && isPanelOpen) {
      // Zoom into planet
      const targetX = Math.cos(0) * selectedPlanet.orbitalRadius;
      const targetZ = Math.sin(0) * selectedPlanet.orbitalRadius;
      const targetY = 2;

      camera.position.lerp(
        { x: targetX, y: targetY, z: targetZ + 3 } as any,
        0.05
      );
      camera.lookAt(targetX, 0, targetZ);
    } else {
      // Default view - further back to see entire solar system
      camera.position.lerp({ x: 0, y: 25, z: 60 } as any, 0.05);
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

export default function SolarSystemScene() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 25, 60], fov: 50 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 0]} intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          
          <ThreeStars radius={100} depth={50} count={1000} factor={4} />

          <Sun />

          {/* Orbital lines for each planet */}
          {planets.map((planet) => (
            <OrbitalLine key={`orbit-${planet.id}`} radius={planet.orbitalRadius} />
          ))}

          {/* Asteroid belt between Mars and Jupiter */}
          <AsteroidBelt innerRadius={22} outerRadius={26} count={200} />

          {/* Additional scattered asteroids throughout the solar system */}
          <AsteroidBelt innerRadius={30} outerRadius={35} count={150} />
          <AsteroidBelt innerRadius={40} outerRadius={45} count={100} />
          <AsteroidBelt innerRadius={50} outerRadius={55} count={80} />

          {planets.map((planet, index) => {
            const angle = (index / planets.length) * Math.PI * 2;
            if (planet.id === "saturn") {
              return <Saturn key={planet.id} planet={planet} angle={angle} />;
            }
            return <Planet key={planet.id} planet={planet} angle={angle} />;
          })}

          <CameraController />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={20}
            maxDistance={150}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

