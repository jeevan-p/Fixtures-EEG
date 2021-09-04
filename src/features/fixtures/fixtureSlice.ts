import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface CounterState {
  fixtures: { 
    id: string,
    name: string,
    startTime: string,
    markets: {
      id: string,
      name: string,
      status: string,
      selections: {
        id: string,
        name: string,
        price: number
      }[]
    }[] 
  }[],
}

const initialState: CounterState = {
  fixtures: []
};

interface Item {
  id: string,
  name: string,
  startTime: string,
  markets: {
    id: string,
    name: string,
    status: string,
    selections: {
      id: string,
      name: string,
      price: number
    }[]
  }[]
}

type InitialItem = Item[];

export const fixtureSlice = createSlice({
  name: 'fixture',
  initialState,
  reducers: {
    updateState:  (state, action: PayloadAction<InitialItem>) => {
      state.fixtures = state.fixtures.concat(action.payload);
    },
    changeFixture: (state, action: PayloadAction<Item>) => {
      state.fixtures.push(action.payload);
    }
  }
});

export const { changeFixture, updateState } = fixtureSlice.actions;

export const selectCount = (state: RootState) => state.counter;

export default fixtureSlice.reducer;
