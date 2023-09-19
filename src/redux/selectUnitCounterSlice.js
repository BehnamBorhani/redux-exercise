import { createSlice } from "@reduxjs/toolkit";

const selectUnitCounterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    select: (state, action) => {
      if (state.count + action.payload <= 20) {
        state.count += action.payload;
      }
    },
    unselect: (state, action) => {
      if (state.count - action.payload >= 0) {
        state.count -= action.payload;
      }
    },
  },
});

export default selectUnitCounterSlice.reducer;
export const { select, unselect } = selectUnitCounterSlice.actions;
