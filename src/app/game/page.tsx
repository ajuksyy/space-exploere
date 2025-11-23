"use client";

import { Suspense } from "react";
import GameScene from "@/components/game/GameScene";

export default function GamePage() {
  return (
    <div className="fixed inset-0 w-full h-full">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center text-white text-2xl">
          Loading Game...
        </div>
      }>
        <GameScene />
      </Suspense>
    </div>
  );
}

