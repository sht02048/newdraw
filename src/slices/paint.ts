import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  historyStep: 0,
  history: [1, 2, 3],
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
  },
});

export const { undo, redo } = paintSlice.actions;

export default paintSlice.reducer;
