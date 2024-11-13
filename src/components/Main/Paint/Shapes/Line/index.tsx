import { Line as KonvaLine } from "react-konva";
import { useAppSelector } from "../../../../../lib/redux/hooks";
import { TOOL_TYPE } from "../../../../../constant";

export default function Line() {
  const lines = useAppSelector((state) => state.paint.lines);
  const toolType = useAppSelector((state) => state.paint.toolType);
  const isDraggable = toolType === TOOL_TYPE.SELECT;

  return (
    <>
      {lines.map((line) => (
        <KonvaLine
          key={line.id}
          id={line.id}
          points={line.points}
          stroke={line.stroke}
          strokeWidth={line.strokeWidth}
          lineCap={line.lineCap}
          lineJoin={line.lineJoin}
          draggable={isDraggable}
        />
      ))}
    </>
  );
}
