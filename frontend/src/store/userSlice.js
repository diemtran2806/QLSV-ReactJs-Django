import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    // updateUser: {
    userUpdate: null,
    //},
    // changePass: {
    //   newPassword: null,
    // },
  },
  reducers: {
    setUser(state, action) {
      // state.updateUser.userUpdate = action.payload;
      state.userUpdate = action.payload;
    },
    updatePassword(state, action) {
      state.changePass.newPassword = action.payload;
    },
  },
});

export const { setUser, updatePassword } = userSlice.actions;

export default userSlice;
