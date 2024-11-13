import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TOOL_TYPE } from "../constant";
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
      return initialState;
    },
    setRects: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const newRect = {
        x: Number(x),
        y: Number(y),
        width: 0,
        height: 0,
        fill: "red",
        stroke: "blue",
        strokeWidth: 2,
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
  },
});

export const { undo, redo, setRects, updateRect, clearPaint, changeTool } =
  paintSlice.actions;

export default paintSlice.reducer;
