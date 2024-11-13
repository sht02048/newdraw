import { TOOL_TYPE } from "../constant";
import type { Circle, Rectangle } from "./shape";

type ToolType = keyof typeof TOOL_TYPE;

type InitialState = {
  historyStep: number;
  history: [];
  toolType: ToolType;
  color: string;
  stroke: string;
  strokeWidth: string;
  rects: Rectangle[];
  circles: Circle[];
};

type Coordinate = {
  x: number;
  y: number;
};

type LocationData = Coordinate & {
  id: string;
};

export type { InitialState, Coordinate, LocationData, ToolType };
