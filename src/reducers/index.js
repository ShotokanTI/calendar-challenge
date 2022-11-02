import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./dateReducer";

export const store = configureStore({
  reducer: {
    date: dateReducer,
  },
});
