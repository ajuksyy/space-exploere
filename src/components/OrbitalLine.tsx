"use client";

import { useMemo } from "react";
import { BufferGeometry, Float32BufferAttribute } from "three";

interface OrbitalLineProps {
  radius: number;
}

export default function OrbitalLine({ radius }: OrbitalLineProps) {
  const points = useMemo(() => {
    const segments = 128;
    const vertices = [];
    
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      vertices.push(x, 0, z);
    }
    
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    return geometry;
  }, [radius]);

  return (
    <line geometry={points}>
      <lineBasicMaterial color="#ffffff" opacity={0.2} transparent />
    </line>
  );
}

