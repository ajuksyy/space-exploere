"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { usePlanetStore } from "@/store/planetStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function PlanetPanel() {
  const { selectedPlanet, isPanelOpen, closePanel } = usePlanetStore();

  if (!selectedPlanet) return null;

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full max-w-md z-50 p-6"
        >
          <Card className="h-full bg-black/90 border-white/20 text-white backdrop-blur-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-3xl font-bold text-yellow-400">
                {selectedPlanet.name}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={closePanel}
                className="text-white hover:text-yellow-400"
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6 overflow-y-auto">
              <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: selectedPlanet.color + "20" }}
                >
                  <div
                    className="w-32 h-32 rounded-full"
                    style={{
                      backgroundColor: selectedPlanet.color,
                      boxShadow: `0 0 40px ${selectedPlanet.color}`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-yellow-400 mb-1">
                    Description
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {selectedPlanet.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-yellow-400 mb-1">
                      Diameter
                    </h3>
                    <p className="text-gray-300">{selectedPlanet.diameter}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-yellow-400 mb-1">
                      Day Length
                    </h3>
                    <p className="text-gray-300">{selectedPlanet.dayLength}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-yellow-400 mb-1">
                      Distance from Sun
                    </h3>
                    <p className="text-gray-300">
                      {selectedPlanet.distanceFromSun}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-yellow-400 mb-1">
                      Temperature
                    </h3>
                    <p className="text-gray-300">
                      {selectedPlanet.temperatureRange}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-semibold text-yellow-400 mb-1">
                      Number of Moons
                    </h3>
                    <p className="text-gray-300">{selectedPlanet.moons}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

