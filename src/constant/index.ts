const SESSION_KEY = "newDraw-state" as const;
const TOOL_TYPE = {
  SELECT: "SELECT",
  LINE: "LINE",
  CURVE: "CURVE",
  CIRCLE: "CIRCLE",
  RECTANGLE: "RECTANGLE",
  POLYGON: "POLYGON",
} as const;
const DEFAULT_VALUE = {
  HISTORY_STEP: -1,
  COLOR: "#2f73bf",
  STROKE: "#000000",
  STROKE_WIDTH: "5",
  LINE_CAP: "round",
  LINE_JOIN: "round",
  TENSION: 1,
  VERTEX: "6",
} as const;
const VERTEX = {
  MAX: 10,
  MIN: 3,
} as const;
const STROKEWIDTH = {
  MAX: 50,
  MIN: 5,
} as const;

export { SESSION_KEY, TOOL_TYPE, DEFAULT_VALUE, VERTEX, STROKEWIDTH };
