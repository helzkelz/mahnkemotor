import create from "zustand";

type Persona =
  | "creative-wizard"
  | "chaos-muppet"
  | "cozycore"
  | "satirium-agent"
  | null;

type Intent = "create" | "ritual" | "aftercare" | "satire" | null;

interface GodmodeStore {
  persona: Persona;
  setPersona: (p: Persona) => void;
  intent: Intent;
  setIntent: (i: Intent) => void;
}

export const useStore = create<GodmodeStore>((set) => ({
  persona: null,
  setPersona: (persona) => set({ persona }),
  intent: null,
  setIntent: (intent) => set({ intent }),
}));