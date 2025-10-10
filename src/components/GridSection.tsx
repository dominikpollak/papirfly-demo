type GridLayoutType = "even" | "mixed";

interface GridSectionProps {
  layout: GridLayoutType;
}

export const GridSection = ({ layout }: GridSectionProps) => {
  return <div>GridSection</div>;
};
