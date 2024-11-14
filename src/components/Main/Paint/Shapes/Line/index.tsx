import { memo } from "react";
import { Line as KonvaLine } from "react-konva";

import { TOOL_TYPE } from "../../../../../constant";
import { useAppSelector } from "../../../../../lib/redux/hooks";

export default memo(Line);

function Line() {
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
