import type { Rectangle } from "./shape";

type InitialState = {
  historyStep: number;
  history: [];
  rects: Rectangle[];
};

type Coordinate = {
  x: number;
  y: number;
};

type LocationData = Coordinate & {
  id: string;
};

export type { InitialState, Coordinate, LocationData };
