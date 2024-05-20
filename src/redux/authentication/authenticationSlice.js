import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
  name: "authentication_user",
  initialState: {
    name: null,
    profileImage: null,
    isAuthenticated: false,
    loading: true
  },
  reducers: {
    set_Authentication: (state, action) => {
      state.name = action.payload.name;
      state.profileImage = action.payload.profile_image;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.loading = action.payload.loading;
      console.log("from reducer in the redux",action.payload.isAuthenticated);
    },
  },
});

export const {set_Authentication} = authenticationSlice.actions;
export default authenticationSlice.reducer;