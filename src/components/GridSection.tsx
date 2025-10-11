import { useGridStore } from "../stores/gridStore";

export const GridSection = () => {
  const { grid, layout } = useGridStore();
  return (
    <div className={layout === "even" ? "grid-even" : "grid-mixed"}>
      {grid.map((g) => (
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
