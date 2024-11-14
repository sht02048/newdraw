import { memo } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { Circle as KonvaCircle } from "react-konva";

import { TOOL_TYPE } from "../../../../../constant";
import { moveDiagram, saveDiagram } from "../../../../../slices/paint";
import { useAppDispatch, useAppSelector } from "../../../../../lib/redux/hooks";

export default memo(Circle);

type Props = {
  onClick: (e: KonvaEventObject<MouseEvent>) => void;
};

function Circle({ onClick }: Props) {
  const dispatch = useAppDispatch();
  const circles = useAppSelector((state) => state.paint.circles);
  const toolType = useAppSelector((state) => state.paint.toolType);
  const isDraggable = toolType === TOOL_TYPE.SELECT;

  function handleDragEnd(e: KonvaEventObject<MouseEvent>) {
    const x = e.target.x();
    const y = e.target.y();
    const id = e.target.id();

    dispatch(moveDiagram({ action: "move", x, y, id, shape: "CIRCLE" }));
    dispatch(saveDiagram({ id, shape: "CIRCLE" }));
  }

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
          onDragEnd={handleDragEnd}
          onClick={onClick}
        />
      ))}
    </>
  );
}
