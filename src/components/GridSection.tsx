import { useGridStore } from "../stores/gridStore";
import type { GridLayoutType } from "../types/gridTypes";

interface GridSectionProps {
  layout: GridLayoutType;
}

export const GridSection = () => {
  const { grid, layout } = useGridStore();
  return (
    <div className={layout === "even" ? "grid-even" : "grid-mixed"}>
      {grid.map((g) => (
        <div
          className="tile"
          style={{
            backgroundColor: g.color,
          }}
        >
          {g.text}
        </div>
      ))}
    </div>
  );
};
