import { Line as KonvaLine } from "react-konva";

import { TOOL_TYPE } from "../../../../../constant";
import { useAppSelector } from "../../../../../lib/redux/hooks";

export default function Curve() {
  const curves = useAppSelector((state) => state.paint.curves);
  const toolType = useAppSelector((state) => state.paint.toolType);
  const isDraggable = toolType === TOOL_TYPE.SELECT;

  return (
    <>
      {curves.map((curve) => (
        <KonvaLine
          key={curve.id}
          id={curve.id}
          points={curve.points}
          stroke={curve.stroke}
          strokeWidth={curve.strokeWidth}
          lineCap={curve.lineCap}
          lineJoin={curve.lineJoin}
          tension={curve.tension}
          draggable={isDraggable}
        />
      ))}
    </>
  );
}
