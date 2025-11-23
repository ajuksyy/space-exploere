"use client";

import PlanetWithTexture from "./PlanetWithTexture";
import { Planet as PlanetType } from "@/data/planets";

interface PlanetProps {
  planet: PlanetType;
  angle: number;
}

export default function Planet({ planet, angle }: PlanetProps) {
  // Don't render Saturn here - it has its own component
  if (planet.id === "saturn") {
    return null;
  }

  return <PlanetWithTexture planet={planet} angle={angle} />;
}

