"use client";

import SolarSystemScene from "@/components/SolarSystemScene";
import PlanetPanel from "@/components/PlanetPanel";

export default function SolarSystemPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <SolarSystemScene />
      <PlanetPanel />
    </div>
  );
}

