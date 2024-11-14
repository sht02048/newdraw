import { memo } from "react";
import { Line as KonvaLine } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

import { TOOL_TYPE } from "../../../../../constant";
import { moveLine, saveLine } from "../../../../../slices/paint";
import { useAppDispatch, useAppSelector } from "../../../../../lib/redux/hooks";

export default memo(Line);

type Props = {
  onClick: (e: KonvaEventObject<MouseEvent>) => void;
};

function Line({ onClick }: Props) {
  const dispatch = useAppDispatch();
  const lines = useAppSelector((state) => state.paint.lines);
  const toolType = useAppSelector((state) => state.paint.toolType);
  const isDraggable = toolType === TOOL_TYPE.SELECT;

  function handleDragEnd(e: KonvaEventObject<MouseEvent>) {
    const x = e.target.x();
    const y = e.target.y();
    const id = e.target.id();

    dispatch(moveLine({ x, y, id, action: "move", shape: "LINE" }));
    dispatch(saveLine({ id, shape: "LINE" }));
  }

  return (
    <>
      {lines.map((line) => {
        return (
          <KonvaLine
            key={line.id}
            id={line.id}
            points={line.points}
            stroke={line.stroke}
            strokeWidth={line.strokeWidth}
            lineCap={line.lineCap}
            lineJoin={line.lineJoin}
            draggable={isDraggable}
            onDragEnd={handleDragEnd}
            onClick={onClick}
          />
        );
      })}
    </>
  );
}
