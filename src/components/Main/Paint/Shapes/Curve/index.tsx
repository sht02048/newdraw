import { memo } from "react";
import { Line as KonvaLine } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

import { TOOL_TYPE } from "../../../../../constant";
import { moveLine, saveShape } from "../../../../../slices/paint";
import { useAppSelector, useAppDispatch } from "../../../../../lib/redux/hooks";

export default memo(Curve);

type Props = {
  onClick: (e: KonvaEventObject<MouseEvent>) => void;
};

function Curve({ onClick }: Props) {
  const dispatch = useAppDispatch();
  const curves = useAppSelector((state) => state.paint.curves);
  const toolType = useAppSelector((state) => state.paint.toolType);
  const isDraggable = toolType === TOOL_TYPE.SELECT;

  function handleDragEnd(e: KonvaEventObject<MouseEvent>) {
    const x = e.target.x();
    const y = e.target.y();
    const id = e.target.id();

    dispatch(moveLine({ x, y, id, shape: TOOL_TYPE.CURVE }));
    dispatch(saveShape({ shape: TOOL_TYPE.CURVE }));
  }

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
          onDragEnd={handleDragEnd}
          onClick={onClick}
        />
      ))}
    </>
  );
}
