import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userUpdate: null,
  },
  reducers: {
    setUser(state, action) {
      state.userUpdate = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice;
