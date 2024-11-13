import { Coordinate } from "./slice.paint";

type Shape = Coordinate & {
  id: string;
  fill: string;
  stroke: string;
  strokeWidth: number;
};

type Rectangle = Shape & {
  width: number;
  height: number;
};

type Circle = Shape & {
  radius: number;
};

export type { Rectangle, Circle };
