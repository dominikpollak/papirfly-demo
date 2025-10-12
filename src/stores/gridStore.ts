import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Grid, GridLayoutType } from "../types/gridTypes";

type GridStore = {
  layout: GridLayoutType;
  grid: Grid[];
  setLayout: (layout: GridLayoutType) => void;
  //prevState like logic to prevent putting grid in useCallback dependency array
  setGrid: (grid: Grid[] | ((currentGrid: Grid[]) => Grid[])) => void;
  maxRenderCount: number;
  setMaxRenderCount: (count: number) => void;
  title: string;
  setTitle: (title: string) => void;
  subTitle: string;
  setSubTitle: (subTitle: string) => void;
};

export const useGridStore = create<GridStore>()(
  persist(
    (set) => ({
      layout: "even",
      setLayout: (layout) => set({ layout }),
      grid: [],
      setGrid: (grid) =>
        set((state) => ({
          grid: typeof grid === "function" ? grid(state.grid) : grid,
        })),
      maxRenderCount: -1,
      setMaxRenderCount: (count) =>
        set(() => ({
          maxRenderCount: count,
        })),
      title: "",
      setTitle: (title) =>
        set(() => ({
          title,
        })),
      subTitle: "",
      setSubTitle: (subTitle) =>
        set(() => ({
          subTitle,
        })),
    }),
    {
      name: "grid-store",
    }
  )
);
