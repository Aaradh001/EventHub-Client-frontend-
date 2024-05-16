import { configureStore } from "@reduxjs/toolkit";
import authenticationSliceReducer from "./authentication/authenticationSlice";
import eventSliceReducer from "./event/eventSlice";
// import userBasicDetailsSliceReducer from "./userBasicDetails/userBasicDetailsSlice";

export default configureStore({
  reducer: {
    authentication_user: authenticationSliceReducer,
    event: eventSliceReducer,
  },
});