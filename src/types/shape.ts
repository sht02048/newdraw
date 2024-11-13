import { Coordinate } from "./slice.paint";
import { LineCap, LineJoin } from "konva/lib/Shape";

type Shape = {
  id: string;
  stroke: string;
  strokeWidth: number;
};

type Rectangle = Shape &
  Coordinate & {
    width: number;
    height: number;
    fill: string;
  };

type Circle = Shape &
  Coordinate & {
    radius: number;
    fill: string;
  };

type Line = Shape & {
  points: number[];
  lineCap: LineCap;
  lineJoin: LineJoin;
};

export type { Rectangle, Circle, Line };
