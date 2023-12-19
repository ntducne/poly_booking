import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
  permission : []
};

const roleSlicer = createSlice({
  initialState,
  name: "role",
  reducers: {
    setRole(state, action) {
      state.role = action.payload.role;
      state.permission = action.payload.permission;
    },
    resetRole(state) {
      state.role = null;
      state.permission = [];
    },
  },
});

export const { setRole, resetRole } = roleSlicer.actions;
export default roleSlicer.reducer;
