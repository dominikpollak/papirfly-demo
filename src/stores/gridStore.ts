import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GridLayoutType } from "../types/gridTypes";

type GridStore = {
  layout: GridLayoutType;
  grid: any;
  setLayout: (layout: GridLayoutType) => void;
  setGrid: (grid: any) => void;
};

export const useGridStore = create<GridStore>()(
  persist(
    (set, get) => ({
      layout: "even",
      setLayout: (layout) => set({ layout }),
      grid: {},
      setGrid: (grid) =>
        set(() => ({
          grid,
        })),
    }),
    {
      name: "grid-store",
    }
  )
);
