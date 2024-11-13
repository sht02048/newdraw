import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DEFAULT_VALUE, TOOL_TYPE } from "../constant";
import type { Rectangle } from "../types/shape";
import type {
  InitialState,
  LocationData,
  ToolType,
} from "../types/slice.paint";

const initialState: InitialState = {
  historyStep: 0,
  history: [],
  toolType: TOOL_TYPE.RECTANGLE,
  rects: [],
  color: DEFAULT_VALUE.COLOR,
  stroke: DEFAULT_VALUE.STROKE,
  strokeWidth: DEFAULT_VALUE.STROKE_WIDTH,
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
    setRects: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const { color, stroke, strokeWidth } = state;
      const newRect = {
        x: Number(x),
        y: Number(y),
        width: 0,
        height: 0,
        fill: color,
        stroke,
        strokeWidth,
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
    changeTool: (state, action: PayloadAction<{ toolType: ToolType }>) => {
      state.toolType = action.payload.toolType;
    },
    changeColor: (state, action: PayloadAction<{ color: string }>) => {
      state.color = action.payload.color;
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
} = paintSlice.actions;

export default paintSlice.reducer;
