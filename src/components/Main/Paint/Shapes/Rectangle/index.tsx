import { memo } from "react";
import { Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

import {
  moveDiagram,
  saveShape,
  transformRect,
} from "../../../../../slices/paint";
import { TOOL_TYPE } from "../../../../../constant";
import { useAppDispatch, useAppSelector } from "../../../../../lib/redux/hooks";

export default memo(Rectangle);

type Props = {
  onClick: (e: KonvaEventObject<MouseEvent>) => void;
};

function Rectangle({ onClick }: Props) {
  const dispatch = useAppDispatch();
  const rects = useAppSelector((state) => state.paint.rects);
  const toolType = useAppSelector((state) => state.paint.toolType);
  const isDraggable = toolType === TOOL_TYPE.SELECT;

  function handleDragEnd(e: KonvaEventObject<MouseEvent>) {
    const x = e.target.x();
    const y = e.target.y();
    const id = e.target.id();

    dispatch(moveDiagram({ x, y, id, shape: TOOL_TYPE.RECTANGLE }));
    dispatch(saveShape({ shape: TOOL_TYPE.RECTANGLE }));
  }

  function handleTransform(e: KonvaEventObject<MouseEvent>) {
    const shape = e.target;

    const id = e.target.id();
    const width = shape.width() * shape.scaleX();
    const height = shape.height() * shape.scaleY();

    const x = shape.x();
    const y = shape.y();

    dispatch(
      transformRect({
        x,
        y,
        id,
        width,
        height,
        shape: TOOL_TYPE.RECTANGLE,
      }),
    );
    dispatch(saveShape({ shape: TOOL_TYPE.RECTANGLE }));

    shape.scaleX(1);
    shape.scaleY(1);
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
          onClick={onClick}
          onTransformEnd={handleTransform}
        />
      ))}
    </>
  );
}
