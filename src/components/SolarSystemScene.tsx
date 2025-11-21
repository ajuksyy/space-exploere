"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars as ThreeStars } from "@react-three/drei";
import { usePlanetStore } from "@/store/planetStore";
import { planets } from "@/data/planets";
import Planet from "./Planet";
import Saturn from "./Saturn";

function Sun() {
  const sunRef = useRef<any>(null);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color="#FFD700"
        emissive="#FFA500"
        emissiveIntensity={0.5}
      />
      <pointLight intensity={2} distance={100} />
    </mesh>
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
      // Default view
      camera.position.lerp({ x: 0, y: 15, z: 30 } as any, 0.05);
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

export default function SolarSystemScene() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 15, 30], fov: 50 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 0]} intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          
          <ThreeStars radius={100} depth={50} count={1000} factor={4} />

          <Sun />

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
            minDistance={10}
            maxDistance={100}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

