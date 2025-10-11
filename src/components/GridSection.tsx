import { useGridStore } from "../stores/gridStore";
import { isValidUrl } from "../utils/utils";

export const GridSection = () => {
  const { grid, layout, maxRenderCount, title, subTitle } = useGridStore();

  const visibleGrid = grid.slice(
    0,
    maxRenderCount < 0 ? grid.length : maxRenderCount
  );

  // chunk grid into groups of 6
  const chunkedGrid = [];
  for (let i = 0; i < visibleGrid.length; i += 6) {
    chunkedGrid.push(visibleGrid.slice(i, i + 6));
  }

  return (
    <div className="">
      {chunkedGrid.map((group, index) => (
        <div key={index} className="grid-section mb-8">
          <div>
            <h2 className="">{subTitle}</h2>
            <h1 className="">{title}</h1>
          </div>

          <div
            className={`gridContainer ${
              layout === "even" ? "grid-even" : "grid-mixed"
            }`}
          >
            {group.map((g, i) => {
              return (
                <div
                  key={`${i}-${g.image ?? "noimg"}`}
                  className="tile"
                  style={{
                    background: g.color,
                    ...(isValidUrl(g.image)
                      ? { backgroundImage: `url(${g.image})` }
                      : {}),
                  }}
                >
                  {g.text}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
