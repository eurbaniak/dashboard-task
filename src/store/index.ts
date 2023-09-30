import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import jobsReducer from "./features/jobs/jobsSlice";

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
