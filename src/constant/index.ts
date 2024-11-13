const SESSION_KEY = "newDraw-state" as const;
const TOOL_TYPE = {
  SELECT: "SELECT",
  LINE: "LINE",
  CIRCLE: "CIRCLE",
  RECTANGLE: "RECTANGLE",
  TRIANGLE: "TRIANGLE",
} as const;

export { SESSION_KEY, TOOL_TYPE };
