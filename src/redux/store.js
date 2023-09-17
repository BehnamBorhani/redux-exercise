import { configureStore } from "@reduxjs/toolkit";
import studentsApi from "./services/studentsApi";

const store = configureStore({
  reducer: {
    [studentsApi.reducerPath]: studentsApi.reducer,
  },
  middleware: (getDefaultMiddlerware) =>
    getDefaultMiddlerware().concat(studentsApi.middleware),
});

export default store;
