import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DEFAULT_VALUE, TOOL_TYPE } from "../constant";
import type { Circle, Line, Rectangle } from "../types/shape";
import type {
  InitialState,
  LocationData,
  ToolType,
} from "../types/slice.paint";
import { LineCap, LineJoin } from "konva/lib/Shape";

const initialState: InitialState = {
  historyStep: 0,
  history: [],
  toolType: TOOL_TYPE.RECTANGLE,
  color: DEFAULT_VALUE.COLOR,
  stroke: DEFAULT_VALUE.STROKE,
  strokeWidth: DEFAULT_VALUE.STROKE_WIDTH,
  rects: [],
  circles: [],
  lines: [],
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
      const currentRect: Rectangle[] | undefined = state.rects.filter(
        (rect) => rect.id === id,
      );

      if (!currentRect) return;

      currentRect[0].width = x - currentRect[0].x;
      currentRect[0].height = y - currentRect[0].y;
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
      const currentCircle: Circle[] | undefined = state.circles.filter(
        (circle) => circle.id === id,
      );

      if (!currentCircle) return;

      currentCircle[0].radius =
        ((x - currentCircle[0].x) ** 2 + (y - currentCircle[0].y) ** 2) ** 0.5;
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
      const currentLine: Line[] | undefined = state.lines.filter(
        (line) => line.id === id,
      );

      if (!currentLine) return;

      currentLine[0].points[2] = Number(x);
      currentLine[0].points[3] = Number(y);
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
  setCircles,
  updateCircle,
  setLines,
  updateLine,
} = paintSlice.actions;

export default paintSlice.reducer;
