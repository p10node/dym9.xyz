// Copyright 2021 - 2024 Transflox LLC. All rights reserved.

import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import toastReducer from "../components/Toast/toastReducer";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    toast: toastReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
