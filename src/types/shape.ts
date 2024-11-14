import { Coordinate } from "./slice.paint";
import { LineCap, LineJoin } from "konva/lib/Shape";

type Shape = {
  id: string;
  stroke: string;
  strokeWidth: number;
};

type Circle = Shape &
  Coordinate & {
    radius: number;
    fill: string;
  };

type Rectangle = Shape &
  Coordinate & {
    width: number;
    height: number;
    fill: string;
  };

type Polygon = Circle & {
  sides: number;
};

type Line = Shape & {
  points: number[];
  lineCap: LineCap;
  lineJoin: LineJoin;
};

type Curve = Line & {
  tension: number;
};

type Diagram = Circle | Rectangle | Polygon;

export type { Rectangle, Circle, Line, Curve, Polygon, Diagram };
