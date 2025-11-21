"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SolarSystemScene from "@/components/SolarSystemScene";
import PlanetPanel from "@/components/PlanetPanel";
import { playBackButtonSound } from "@/lib/sounds";

export default function SolarSystemPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Link href="/" onClick={() => playBackButtonSound()} className="absolute top-4 left-4 z-50">
        <Button
          variant="outline"
          className="bg-black/50 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      <SolarSystemScene />
      <PlanetPanel />
    </div>
  );
}

