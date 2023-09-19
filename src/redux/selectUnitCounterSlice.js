import { createSlice } from "@reduxjs/toolkit";

const selectUnitCounterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    select: (state) => {
      if (state.count < 20) {
        state.count += 1;
      }
    },
    unselect: (state) => {
      if (state.count > 0) {
        state.count -= 1;
      }
    },
  },
});

export default selectUnitCounterSlice;
export const { select, unselect } = selectUnitCounterSlice.actions;
