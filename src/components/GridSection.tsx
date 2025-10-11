import { useGridStore } from "../stores/gridStore";

export const GridSection = () => {
  const { grid, layout, maxRenderCount } = useGridStore();
  return (
    <div className={layout === "even" ? "grid-even" : "grid-mixed"}>
      {grid.slice(0, maxRenderCount).map((g) => (
        <div
          className="tile"
          style={{
            backgroundColor: g.color,
            backgroundImage: `url(${g.image})`,
          }}
        >
          {g.text}
        </div>
      ))}
    </div>
  );
};
