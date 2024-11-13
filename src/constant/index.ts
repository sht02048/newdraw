const SESSION_KEY = "newDraw-state" as const;
const TOOL_TYPE = {
  SELECT: "SELECT",
  LINE: "LINE",
  CIRCLE: "CIRCLE",
  RECTANGLE: "RECTANGLE",
  TRIANGLE: "TRIANGLE",
} as const;
const DEFAULT_VALUE = {
  COLOR: "#2f73bf",
  STROKE: "#000000",
  STROKE_WIDTH: "5",
};

export { SESSION_KEY, TOOL_TYPE, DEFAULT_VALUE };
