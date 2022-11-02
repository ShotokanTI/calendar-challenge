import { createSlice, configureStore } from "@reduxjs/toolkit";

const dateReducer = createSlice({
  name: "date",
  initialState: {
    dateChoise: null,
  },
  reducers: {
    setData: (state, { payload }) => {
      const { reminderTitle } = payload;
      state.dateChoise = reminderTitle;
    },
  },
});

export const { setData } = dateReducer.actions;

export default dateReducer.reducer;
