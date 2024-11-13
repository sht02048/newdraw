import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Rectangle } from "../types/shape";
import type { InitialState, LocationData } from "../types/slice.paint";

const initialState: InitialState = {
  historyStep: 0,
  history: [],
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
  },
});

export const { undo, redo, setRects, updateRect, clearPaint } =
  paintSlice.actions;

export default paintSlice.reducer;
