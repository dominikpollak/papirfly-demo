import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Grid, GridLayoutType } from "../types/gridTypes";

type GridStore = {
  layout: GridLayoutType;
  grid: Grid[];
  setLayout: (layout: GridLayoutType) => void;
  setGrid: (grid: Grid[]) => void;
  maxRenderCount: number;
  setMaxRenderCount: (count: number) => void;
};

export const useGridStore = create<GridStore>()(
  persist(
    (set) => ({
      layout: "even",
      setLayout: (layout) => set({ layout }),
      grid: [],
      setGrid: (grid) =>
        set(() => ({
          grid,
        })),
      maxRenderCount: -1,
      setMaxRenderCount: (count) =>
        set(() => ({
          maxRenderCount: count,
        })),
    }),
    {
      name: "grid-store",
    }
  )
);
