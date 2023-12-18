import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
};

const roleSlicer = createSlice({
  initialState,
  name: "role",
  reducers: {
    setRole(state, action) {
      state.role = action.payload.role;
    },
    resetRole(state) {
      state.role = null;
    },
  },
});

export const { setRole, resetRole } = roleSlicer.actions;
export default roleSlicer.reducer;
