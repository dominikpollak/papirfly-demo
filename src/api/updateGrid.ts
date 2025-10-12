import { useGridStore } from "../stores/gridStore";

export const updateGridData = async () => {
  const { grid, layout, title, subTitle, maxRenderCount } =
    useGridStore.getState();

  try {
    const res = await fetch("some-url", {
      method: "POST",
      body: JSON.stringify({
        grid,
        layout,
        title,
        subTitle,
        maxRenderCount,
      }),
    });
    const data = await res.json();
    return data;
  } catch {
    console.error("Error updating data");
  }
};
