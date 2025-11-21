import { create } from "zustand";
import { Planet } from "@/data/planets";

interface PlanetState {
  selectedPlanet: Planet | null;
  isPanelOpen: boolean;
  selectPlanet: (planet: Planet | null) => void;
  openPanel: () => void;
  closePanel: () => void;
}

export const usePlanetStore = create<PlanetState>((set) => ({
  selectedPlanet: null,
  isPanelOpen: false,
  selectPlanet: (planet) => set({ selectedPlanet: planet }),
  openPanel: () => set({ isPanelOpen: true }),
  closePanel: () => set({ isPanelOpen: false, selectedPlanet: null }),
}));

