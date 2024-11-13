import { Circle as KonvaCircle } from "react-konva";

import { TOOL_TYPE } from "../../../../../constant";
import { useAppSelector } from "../../../../../lib/redux/hooks";

export default function Circle() {
  const circles = useAppSelector((state) => state.paint.circles);
  const toolType = useAppSelector((state) => state.paint.toolType);
  const isDraggable = toolType === TOOL_TYPE.SELECT;

  return (
    <>
      {circles.map((circle) => (
        <KonvaCircle
          key={circle.id}
          id={circle.id}
          x={circle.x}
          y={circle.y}
          radius={circle.radius}
          fill={circle.fill}
          stroke={circle.stroke}
          strokeWidth={circle.strokeWidth}
          draggable={isDraggable}
        />
      ))}
    </>
  );
}
