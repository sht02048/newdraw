import { RegularPolygon } from "react-konva";

import { TOOL_TYPE } from "../../../../../constant";
import { useAppSelector } from "../../../../../lib/redux/hooks";

export default function Polygon() {
  const polygons = useAppSelector((state) => state.paint.polygons);
  const toolType = useAppSelector((state) => state.paint.toolType);
  const isDraggable = toolType === TOOL_TYPE.SELECT;

  return (
    <>
      {polygons.map((polygon) => (
        <RegularPolygon
          key={polygon.id}
          id={polygon.id}
          x={polygon.x}
          y={polygon.y}
          radius={polygon.radius}
          sides={polygon.sides}
          fill={polygon.fill}
          stroke={polygon.stroke}
          strokeWidth={polygon.strokeWidth}
          draggable={isDraggable}
        />
      ))}
    </>
  );
}
