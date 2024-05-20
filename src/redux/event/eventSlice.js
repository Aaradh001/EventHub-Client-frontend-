import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    event_id:"",
    name: "",
    thumbnail: null,
    start_date: null,
    end_date: null,
    event_cat: null,
    guest_count: null,
    initiated:false,
    is_completed: false,
    status: "",
    venue:""
  },
reducers: {
    set_Event: (state, action) => {
        state.event_id = action.payload.event_id;
        state.name = action.payload.name;
        state.thumbnail = action.payload.thumbnail;
        state.start_date = action.payload.start_date;
        state.end_date = action.payload.end_date;
        state.event_cat = action.payload.event_cat;
        state.guest_count = action.payload.guest_count;
        state.initiated = action.payload.initiated;
        state.is_completed = action.payload.is_completed;
        state.status = action.payload.status;
        state.venue = action.payload.venue;

    },
  },
});

export const {set_Event} = eventSlice.actions;
export default eventSlice.reducer;