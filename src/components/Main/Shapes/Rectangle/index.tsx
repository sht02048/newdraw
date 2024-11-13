import { Rect } from "react-konva";
import { useAppSelector } from "../../../../lib/redux/hooks";

export default function Rectangle() {
  const rects = useAppSelector((state) => state.paint.rects);

  return (
    <>
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
    </>
  );
}
