import { TOOL_TYPE } from "../constant";
import type {
  Circle,
  Curve,
  Diagram,
  Line,
  Path,
  Polygon,
  Rectangle,
} from "./shape";

type ToolType = keyof typeof TOOL_TYPE;

type MovedInfo = Coordinate & {
  id: string;
  shape: ToolType;
};

type TransformInfo = MovedInfo & {
  width: number;
  height: number;
};

type InitialState = {
  historyStep: number;
  history: History[];
  toolType: ToolType;
  color: string;
  stroke: string;
  strokeWidth: string;
  vertex: string;
  lines: Line[];
  curves: Curve[];
  circles: Circle[];
  rects: Rectangle[];
  polygons: Polygon[];
};

type History = {
  shape: ToolType;
  shapeState: Path | Diagram[];
};

type Coordinate = {
  x: number;
  y: number;
};

type LocationData = Coordinate & {
  id: string;
};

export type {
  InitialState,
  Coordinate,
  LocationData,
  ToolType,
  MovedInfo,
  TransformInfo,
};
