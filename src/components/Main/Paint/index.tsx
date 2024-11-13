import { v4 as uuid } from "uuid";
import { useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

import Shapes from "../Shapes";

import { TOOL_TYPE } from "../../../constant";
import usePaintSize from "../../../hooks/usePaintSize";
import { setRects, updateRect } from "../../../slices/paint";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks";

export default function Paint() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [shapeId, setShapeId] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const { paintWidth, paintHeight } = usePaintSize(stageRef);
  const dispatch = useAppDispatch();
  const drawAction = useAppSelector((state) => state.paint.toolType);
  const isDraggable = drawAction === TOOL_TYPE.SELECT;

  function handleMouseDown(e: KonvaEventObject<MouseEvent>) {
    if (isDraggable) return;

    setIsDrawing(true);
    const position = e.target.getStage()?.getPointerPosition();

    if (!position) return;

    const { x, y } = position;
    const id = uuid();

    setShapeId(id);
    dispatch(setRects({ x, y, id }));
  }

  function handleMouseMove(e: KonvaEventObject<MouseEvent>) {
    if (!isDrawing || !shapeId || isDraggable) return;
    const position = e.target.getStage()?.getPointerPosition();

    if (!position) return;

    const { x, y } = position;
    const currentId = shapeId;

    dispatch(updateRect({ x, y, id: currentId }));
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
          <Shapes />
        </Layer>
      </Stage>
    </div>
  );
}
