import counterReducer, {
  CounterState,
  changeFixture,
  updateState
} from './fixtureSlice';

describe('counter reducer', () => {
  const initialState: CounterState = {
    fixtures: []
  };
  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual([]);
  });

  it('should handle updateState', () => {
    const actual = counterReducer(initialState, updateState([{
      id: 'abc',
      name: 'abc',
      startTime: 'abc',
      markets: []
    }]));

    expect(actual.fixtures).toEqual([{
      id: 'abc',
      name: 'abc',
      startTime: 'abc',
      markets: []
    }]);
  });

  it('should handle changeFixture', () => {
    const actual = counterReducer(initialState, changeFixture({
      id: 'abc',
      name: 'abc',
      startTime: 'abc',
      markets: []
    }));

    expect(actual.fixtures).toEqual([{
      id: 'abc',
      name: 'abc',
      startTime: 'abc',
      markets: []
    }]);
  });
});
