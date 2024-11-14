import Line from "./Line";
import Curve from "./Curve";
import Circle from "./Circle";
import Polygon from "./Polygon";
import Rectangle from "./Rectangle";
import { KonvaEventObject } from "konva/lib/Node";

type Props = {
  onClick: (e: KonvaEventObject<MouseEvent>) => void;
};

export default function Shapes({ onClick }: Props) {
  return (
    <>
      <Line onClick={onClick} />
      <Curve onClick={onClick} />
      <Circle onClick={onClick} />
      <Rectangle onClick={onClick} />
      <Polygon onClick={onClick} />
    </>
  );
}
