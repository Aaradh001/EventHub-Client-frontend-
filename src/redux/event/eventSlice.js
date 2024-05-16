import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    launched:false,
    name: "",
    thumbnail: null,
    startDate: null,
    endDate: null,
    eventType: null,
    guestCount: null
},
reducers: {
    set_Event: (state, action) => {
        state.name = action.payload.name;
        state.thumbnail = action.payload.thumbnail;
        state.startDate = action.payload.startDate;
        state.endDate = action.payload.endDate;
        state.eventType = action.payload.eventType;
        state.guestCount = action.payload.guestCount;
        state.launched - action.payload.launched;
    },
  },
});

export const {set_Event} = eventSlice.actions;
export default eventSlice.reducer;