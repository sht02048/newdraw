import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type {
  InitialState,
  LocationData,
  ToolType,
} from "../types/slice.paint";
import { LineCap, LineJoin } from "konva/lib/Shape";
import { DEFAULT_VALUE, TOOL_TYPE } from "../constant";
import type { Circle, Curve, Line, Polygon, Rectangle } from "../types/shape";

const initialState: InitialState = {
  historyStep: 0,
  history: [],
  toolType: TOOL_TYPE.RECTANGLE,
  color: DEFAULT_VALUE.COLOR,
  stroke: DEFAULT_VALUE.STROKE,
  strokeWidth: DEFAULT_VALUE.STROKE_WIDTH,
  vertex: DEFAULT_VALUE.VERTEX,
  lines: [],
  curves: [],
  circles: [],
  rects: [],
  polygons: [],
};

const paintSlice = createSlice({
  name: "paint",
  initialState,
  reducers: {
    undo: (state) => {
      if (state.historyStep === 0) return;

      state.historyStep -= 1;
    },
    redo: (state) => {
      if (state.history.length - 1 === state.historyStep) return;

      state.historyStep += 1;
    },
    clearPaint: () => {
      sessionStorage.clear();

      return initialState;
    },
    changeTool: (state, action: PayloadAction<{ toolType: ToolType }>) => {
      state.toolType = action.payload.toolType;
    },
    changeColor: (state, action: PayloadAction<{ color: string }>) => {
      state.color = action.payload.color;
    },
    changeStrokeWidth: (
      state,
      action: PayloadAction<{ strokeWidth: string }>,
    ) => {
      state.strokeWidth = action.payload.strokeWidth;
    },
    changeVertex: (state, action: PayloadAction<{ vertex: string }>) => {
      state.vertex = action.payload.vertex;
    },
    setRects: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const { color, stroke, strokeWidth } = state;
      const newRect: Rectangle = {
        x: Number(x),
        y: Number(y),
        width: 0,
        height: 0,
        fill: color,
        stroke,
        strokeWidth: Number(strokeWidth),
        id,
      };

      state.rects.push(newRect);
    },
    updateRect: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const currentRect: Rectangle | undefined = state.rects.find(
        (rect) => rect.id === id,
      );

      if (!currentRect) return;

      currentRect.width = x - currentRect.x;
      currentRect.height = y - currentRect.y;
    },
    setCircles: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const { color, stroke, strokeWidth } = state;
      const newCircle: Circle = {
        x: Number(x),
        y: Number(y),
        radius: 1,
        fill: color,
        stroke,
        strokeWidth: Number(strokeWidth),
        id,
      };

      state.circles.push(newCircle);
    },
    updateCircle: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const currentCircle: Circle | undefined = state.circles.find(
        (circle) => circle.id === id,
      );

      if (!currentCircle) return;

      currentCircle.radius =
        ((x - currentCircle.x) ** 2 + (y - currentCircle.y) ** 2) ** 0.5;
    },
    setLines: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const { stroke, strokeWidth } = state;
      const intX = Number(x);
      const intY = Number(y);
      const newLine: Line = {
        id,
        points: [intX, intY, intX, intY],
        stroke,
        strokeWidth: Number(strokeWidth),
        lineCap: DEFAULT_VALUE.LINE_CAP as LineCap,
        lineJoin: DEFAULT_VALUE.LINE_JOIN as LineJoin,
      };

      state.lines.push(newLine);
    },
    updateLine: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const currentLine: Line | undefined = state.lines.find(
        (line) => line.id === id,
      );

      if (!currentLine) return;

      currentLine.points[2] = Number(x);
      currentLine.points[3] = Number(y);
    },
    setCurves: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const { stroke, strokeWidth } = state;
      const intX = Number(x);
      const intY = Number(y);
      const newCurve: Curve = {
        id,
        points: [intX, intY, intX, intY, intX, intY],
        stroke,
        strokeWidth: Number(strokeWidth),
        lineCap: DEFAULT_VALUE.LINE_CAP as LineCap,
        lineJoin: DEFAULT_VALUE.LINE_JOIN as LineJoin,
        tension: DEFAULT_VALUE.TENSION,
      };

      state.curves.push(newCurve);
    },
    updateCurve: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const currentCurve: Curve | undefined = state.curves.find(
        (curve) => curve.id === id,
      );

      if (!currentCurve) return;

      currentCurve.points[2] = (x + currentCurve.points[0]) / 2;
      currentCurve.points[3] = y - 50;
      currentCurve.points[4] = Number(x);
      currentCurve.points[5] = Number(y);
    },
    setPolygons: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const { color, stroke, strokeWidth, vertex } = state;
      const intX = Number(x);
      const intY = Number(y);
      const intVertex = Number(vertex);
      const newPolygon: Polygon = {
        x: intX,
        y: intY,
        sides: intVertex,
        radius: 1,
        fill: color,
        stroke,
        strokeWidth: Number(strokeWidth),
        id,
      };

      state.polygons.push(newPolygon);
    },
    updatePolygon: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const currentPolygon: Polygon | undefined = state.polygons.find(
        (polygon) => polygon.id === id,
      );

      if (!currentPolygon) return;

      currentPolygon.radius =
        ((x - currentPolygon.x) ** 2 + (y - currentPolygon.y) ** 2) ** 0.5;
    },
  },
});

export const {
  undo,
  redo,
  setRects,
  updateRect,
  clearPaint,
  changeTool,
  changeColor,
  changeStrokeWidth,
  changeVertex,
  setCircles,
  updateCircle,
  setLines,
  updateLine,
  setCurves,
  updateCurve,
  setPolygons,
  updatePolygon,
} = paintSlice.actions;

export default paintSlice.reducer;
