import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';


export interface Item {
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
export interface FixState {
  fixtures: Item[],
}

type InitialItem = Item[];

const initialState: FixState = {
  fixtures: []
};

export const fixtureSlice = createSlice({
  name: 'fixture',
  initialState,
  reducers: {
    updateState:  (state, action: PayloadAction<InitialItem>) => {
      state.fixtures = action.payload;
    },
    changeFixture: (state, action: PayloadAction<Item>) => {
      let itemToChange = state.fixtures.find((list) => {
        return list.id === action.payload.id;
      });
      if(itemToChange) {
        itemToChange.markets = action.payload.markets;
        itemToChange.name = action.payload.name;
        itemToChange.startTime = action.payload.startTime;
      }
    }
  }
});

export const { changeFixture, updateState } = fixtureSlice.actions;

export const getCurrentState = (state: RootState) => state.counter;

export default fixtureSlice.reducer;
