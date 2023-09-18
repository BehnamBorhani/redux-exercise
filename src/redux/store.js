import { configureStore } from "@reduxjs/toolkit";
import studentsApi from "./services/studentsApi";
import professorsApi from "./services/professorsApi";

const store = configureStore({
  reducer: {
    [studentsApi.reducerPath]: studentsApi.reducer,
    [professorsApi.reducerPath]: professorsApi.reducer,
  },
  middleware: (getDefaultMiddlerware) => {
    getDefaultMiddlerware().concat(studentsApi.middleware);
    getDefaultMiddlerware().concat(professorsApi.middleware);
  },
});

export default store;
