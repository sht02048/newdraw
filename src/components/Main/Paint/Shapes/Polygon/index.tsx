import { memo } from "react";
import { RegularPolygon } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

import { TOOL_TYPE } from "../../../../../constant";
import { moveDiagram, saveShape } from "../../../../../slices/paint";
import { useAppDispatch, useAppSelector } from "../../../../../lib/redux/hooks";

export default memo(Polygon);

type Props = {
  onClick: (e: KonvaEventObject<MouseEvent>) => void;
};

function Polygon({ onClick }: Props) {
  const dispatch = useAppDispatch();
  const polygons = useAppSelector((state) => state.paint.polygons);
  const toolType = useAppSelector((state) => state.paint.toolType);
  const isDraggable = toolType === TOOL_TYPE.SELECT;

  function handleDragEnd(e: KonvaEventObject<MouseEvent>) {
    const x = e.target.x();
    const y = e.target.y();
    const id = e.target.id();

    dispatch(moveDiagram({ x, y, id, shape: TOOL_TYPE.POLYGON }));
    dispatch(saveShape({ shape: TOOL_TYPE.POLYGON }));
  }

  return (
    <>
      {polygons.map((polygon) => (
        <RegularPolygon
          key={polygon.id}
          id={polygon.id}
          x={polygon.x}
          y={polygon.y}
          radius={polygon.radius}
          sides={polygon.sides}
          fill={polygon.fill}
          stroke={polygon.stroke}
          strokeWidth={polygon.strokeWidth}
          draggable={isDraggable}
          onDragEnd={handleDragEnd}
          onClick={onClick}
        />
      ))}
    </>
  );
}
