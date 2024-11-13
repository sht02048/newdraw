import { Rect } from "react-konva";
import { TOOL_TYPE } from "../../../../../constant";
import { useAppSelector } from "../../../../../lib/redux/hooks";

export default function Rectangle() {
  const rects = useAppSelector((state) => state.paint.rects);
  const toolType = useAppSelector((state) => state.paint.toolType);
  const isDraggable = toolType === TOOL_TYPE.SELECT;

  return (
    <>
      {rects.map((rect) => (
        <Rect
          key={rect.id}
          id={rect.id}
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          fill={rect.fill}
          stroke={rect.stroke}
          strokeWidth={rect.strokeWidth}
          draggable={isDraggable}
        />
      ))}
    </>
  );
}
