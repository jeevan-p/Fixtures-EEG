import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import fixtureReducer from '../state/fixtureSlice';

export const store = configureStore({
  reducer: {
    stateData: fixtureReducer,
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
