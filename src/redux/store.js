import { configureStore } from "@reduxjs/toolkit";
import studentsApi from "./services/studentsApi";
import professorsApi from "./services/professorsApi";
import coursesApi from "./services/coursesApi";
import selectUnitCounterReducers from "./selectUnitCounterSlice";

const store = configureStore({
  reducer: {
    [studentsApi.reducerPath]: studentsApi.reducer,
    [professorsApi.reducerPath]: professorsApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    counter: selectUnitCounterReducers,
  },
  middleware: (getDefaultMiddlerware) =>
    getDefaultMiddlerware().concat(
      studentsApi.middleware,
      professorsApi.middleware,
      coursesApi.middleware
    ),
});

export default store;
