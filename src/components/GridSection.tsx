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
    <>
      {chunkedGrid.map((group, index) => (
        <div key={index} className="grid">
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
                <a
                  href={g.link}
                  target="_blank"
                  key={`${i}-${g.image ?? "noimg"}`}
                  className="tile"
                  style={{
                    backgroundImage: isValidUrl(g.image)
                      ? `url(${g.image})`
                      : g.color,
                  }}
                >
                  {g.text}
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};
