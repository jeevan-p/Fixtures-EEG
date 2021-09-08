import counterReducer, {
  FixState,
  changeFixture,
  updateState
} from './fixtureSlice';

const itemObject = {
  id: 'testId',
  name: 'testName',
  startTime: 'testStartTime',
  markets: []
};

describe('counter reducer', () => {
  const initialState = {
    fixtures: []
  };
  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({"fixtures": []});
  });

  it('should handle updateState', () => {
    const actual = counterReducer(initialState, updateState([itemObject]));

    expect(actual.fixtures).toEqual([itemObject]);
  });

  it('should handle changeFixture', () => {
    const newItemObject = {
      id: 'testId',
      name: 'newName',
      startTime: 'newStartTime',
      markets: []
    }
    const newState = counterReducer(initialState, updateState([itemObject]));
    const response = counterReducer(newState, changeFixture(newItemObject));

    expect(response.fixtures).toEqual([newItemObject]);
  });

  it('should handle changeFixture when a list item comes which is not there in the list', () => {
    const newItemObject = {
      id: 'newId',
      name: 'newName',
      startTime: 'newStartTime',
      markets: []
    }
    const newState = counterReducer(initialState, updateState([itemObject]));
    const response = counterReducer(newState, changeFixture(newItemObject));

    expect(response.fixtures).toEqual([itemObject]);
  });
});
