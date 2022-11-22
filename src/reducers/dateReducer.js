import { createSlice, configureStore } from "@reduxjs/toolkit";

function saveEventToLocalStorage(state) {
  let existingItems = JSON.parse(localStorage.getItem("eventDay")) ?? [];
  localStorage.setItem(
    "eventDay",
    JSON.stringify([...existingItems, { ...state }])
  );
}

const dateReducer = createSlice({
  name: "date",
  initialState: {
    dateChoise: null,
    saveEvent: {},
  },
  reducers: {
    setData: (state, { payload }) => {
      const { reminderTitle } = payload;
      state.dateChoise = reminderTitle;
    },
    setEvent: (state, { payload }) => {
      state.saveEvent = payload;
      saveEventToLocalStorage(state);
    },
  },
});

export const { setData, setEvent } = dateReducer.actions;

export default dateReducer.reducer;
