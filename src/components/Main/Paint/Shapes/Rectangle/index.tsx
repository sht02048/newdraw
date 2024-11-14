import { memo } from "react";
import { Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

import { TOOL_TYPE } from "../../../../../constant";
import { moveDiagram } from "../../../../../slices/paint";
import { useAppDispatch, useAppSelector } from "../../../../../lib/redux/hooks";

export default memo(Rectangle);

function Rectangle() {
  const rects = useAppSelector((state) => state.paint.rects);
  const toolType = useAppSelector((state) => state.paint.toolType);
  const isDraggable = toolType === TOOL_TYPE.SELECT;
  const dispatch = useAppDispatch();

  function handleDragEnd(e: KonvaEventObject<MouseEvent>) {
    const x = e.target.x();
    const y = e.target.y();
    const id = e.target.id();

    dispatch(moveDiagram({ action: "move", x, y, id, shape: "RECTANGLE" }));
  }

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
          onDragEnd={handleDragEnd}
        />
      ))}
    </>
  );
}
