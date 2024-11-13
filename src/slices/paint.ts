import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DEFAULT_VALUE, TOOL_TYPE } from "../constant";
import type { Circle, Rectangle } from "../types/shape";
import type {
  InitialState,
  LocationData,
  ToolType,
} from "../types/slice.paint";

const initialState: InitialState = {
  historyStep: 0,
  history: [],
  toolType: TOOL_TYPE.RECTANGLE,
  color: DEFAULT_VALUE.COLOR,
  stroke: DEFAULT_VALUE.STROKE,
  strokeWidth: DEFAULT_VALUE.STROKE_WIDTH,
  rects: [],
  circles: [],
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
        (rect) => rect.id === id,
      );

      if (!currentCircle) return;

      currentCircle[0].radius =
        ((x - currentCircle[0].x) ** 2 + (y - currentCircle[0].y) ** 2) ** 0.5;
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
} = paintSlice.actions;

export default paintSlice.reducer;
