"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars as ThreeStars } from "@react-three/drei";
import { planets } from "@/data/planets";
import Planet from "./Planet";

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

export default function SolarSystemPreview() {
  return (
    <div className="w-full h-[60vh] max-h-[600px] rounded-lg overflow-hidden border border-white/20 bg-black/50">
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
            return (
              <Suspense key={planet.id} fallback={null}>
                <Planet planet={planet} angle={angle} />
              </Suspense>
            );
          })}

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={15}
            maxDistance={50}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

