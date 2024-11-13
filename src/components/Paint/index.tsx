import { v4 as uuid } from "uuid";
import { useRef, useState } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage, Layer, Rect } from "react-konva";

import usePaintSize from "../../hooks/usePaintSize";
import type { Rectangle } from "../../types/shape";

export default function Paint() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [rects, setRects] = useState<Rectangle[]>([]);
  const [shapeId, setShapeId] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const { paintWidth, paintHeight } = usePaintSize(stageRef);

  function handleMouseDown(e: KonvaEventObject<MouseEvent>) {
    setIsDrawing(true);
    const position = e.target.getStage()?.getPointerPosition();

    if (!position) return;

    const { x, y } = position;
    const id = uuid();

    setShapeId(id);
    setRects((prevRects) => [
      ...prevRects,
      {
        x: Number(x),
        y: Number(y),
        width: 0,
        height: 0,
        fill: "red",
        stroke: "blue",
        strokeWidth: 2,
        id,
      },
    ]);
  }

  function handleMouseMove(e: KonvaEventObject<MouseEvent>) {
    if (!isDrawing) return;
    const position = e.target.getStage()?.getPointerPosition();

    if (!position) return;

    const { x, y } = position;
    const currentId = shapeId;

    setRects((prevRects) =>
      prevRects?.map((prevRect) =>
        prevRect.id === currentId
          ? {
              ...prevRect,
              height: y - prevRect.y,
              width: x - prevRect.x,
            }
          : prevRect,
      ),
    );
  }

  function handleMouseUp() {
    setIsDrawing(false);
  }

  return (
    <div className="w-full bg-white shadow-inner h-5/6" ref={stageRef}>
      <Stage
        width={paintWidth}
        height={paintHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {rects.map((rect) => (
            <Rect
              key={rect.id}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              fill={rect.fill}
              stroke={rect.stroke}
              strokeWidth={rect.strokeWidth}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
