import { v4 as uuid } from "uuid";
import { useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

import Shapes from "./Shapes";

import {
  createShape,
  saveDiagram,
  saveLine,
  setCircles,
  setCurves,
  setLines,
  setPolygons,
  setRects,
  updateCircle,
  updateCurve,
  updateLine,
  updatePolygon,
  updateRect,
} from "../../../slices/paint";
import { TOOL_TYPE } from "../../../constant";
import usePaintSize from "../../../hooks/usePaintSize";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks";

export default function Paint() {
  const dispatch = useAppDispatch();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [shapeId, setShapeId] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const toolType = useAppSelector((state) => state.paint.toolType);
  const { paintWidth, paintHeight } = usePaintSize(stageRef);
  const isDraggable = toolType === TOOL_TYPE.SELECT;

  function handleMouseDown(e: KonvaEventObject<MouseEvent>) {
    if (isDraggable) return;

    setIsDrawing(true);
    const position = e.target.getStage()?.getPointerPosition();

    if (!position) return;

    const { x, y } = position;
    const id = uuid();

    setShapeId(id);

    const toolActions = {
      [TOOL_TYPE.LINE]: setLines,
      [TOOL_TYPE.CURVE]: setCurves,
      [TOOL_TYPE.CIRCLE]: setCircles,
      [TOOL_TYPE.RECTANGLE]: setRects,
      [TOOL_TYPE.POLYGON]: setPolygons,
    };

    const action = toolActions[toolType];

    if (action) {
      dispatch(action({ x, y, id }));
    }
  }

  function handleMouseMove(e: KonvaEventObject<MouseEvent>) {
    if (!isDrawing || !shapeId || isDraggable) return;
    const position = e.target.getStage()?.getPointerPosition();

    if (!position) return;

    const { x, y } = position;
    const currentId = shapeId;

    const toolActions = {
      [TOOL_TYPE.LINE]: updateLine,
      [TOOL_TYPE.CURVE]: updateCurve,
      [TOOL_TYPE.CIRCLE]: updateCircle,
      [TOOL_TYPE.RECTANGLE]: updateRect,
      [TOOL_TYPE.POLYGON]: updatePolygon,
    };

    const action = toolActions[toolType];

    if (action) {
      dispatch(action({ x, y, id: currentId }));
    }
  }

  function handleMouseUp() {
    if (!shapeId || !isDrawing) return;
    const payload = { id: shapeId };

    dispatch(createShape(payload));

    if (
      toolType === TOOL_TYPE.CIRCLE ||
      toolType === TOOL_TYPE.RECTANGLE ||
      TOOL_TYPE.POLYGON
    ) {
      dispatch(saveDiagram({ id: shapeId, shape: toolType }));
    } else {
      dispatch(saveLine({ id: shapeId, shape: toolType }));
    }

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
