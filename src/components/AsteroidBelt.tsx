"use client";

import { useMemo } from "react";
import Asteroid from "./Asteroid";

interface AsteroidBeltProps {
  innerRadius: number;
  outerRadius: number;
  count: number;
}

export default function AsteroidBelt({ innerRadius, outerRadius, count }: AsteroidBeltProps) {
  const asteroids = useMemo(() => {
    const positions: Array<[number, number, number]> = [];
    
    for (let i = 0; i < count; i++) {
      // Random angle
      const angle = Math.random() * Math.PI * 2;
      
      // Random radius between inner and outer
      const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
      
      // Random height variation
      const height = (Math.random() - 0.5) * 2;
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      positions.push([x, height, z]);
    }
    
    return positions;
  }, [innerRadius, outerRadius, count]);

  return (
    <>
      {asteroids.map((position, index) => {
        const size = 0.05 + Math.random() * 0.1; // Small random size
        const rotationSpeed = 0.5 + Math.random() * 1; // Random rotation speed
        
        return (
          <Asteroid
            key={index}
            position={position}
            size={size}
            rotationSpeed={rotationSpeed}
          />
        );
      })}
    </>
  );
}

