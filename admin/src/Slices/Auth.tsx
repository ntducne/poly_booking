import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
  permission : [],
  user: {}
};

const roleSlicer = createSlice({
  initialState,
  name: "role",
  reducers: {
    setRole(state, action) {
      state.role = action.payload.role;
      state.permission = action.payload.permission;
      state.user = action.payload.user;
    },
    resetRole(state) {
      state.role = null;
      state.permission = [];
      state.user = {};
    },
  },
});

export const { setRole, resetRole } = roleSlicer.actions;
export default roleSlicer.reducer;
