import { render, act } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import Fixtures from './FixturesHomePage';

const mockFetchApi = jest.fn();
let closeFunction: () => void,
    messageFunction: ({}) => void,
    errorfunction: () => void;
let mockApiCallbackFunction: (data: any, error: boolean) => void;
jest.mock('../utils/fetchApi', () => ({
    fetchApiUtil: (url: string, callBack: (data: any, error: boolean) => void) => {
        mockApiCallbackFunction = callBack;
        mockFetchApi();
    }
}));
jest.mock('../utils/webSocketConnection', () => ({
    connectToWebSocket: (url: string, openFn: () => void, closeFn: () => void, messageFn: () => void, errorFn: () => void) => {
        openFn();
        closeFunction = closeFn;
        messageFunction = messageFn;
        errorfunction = errorFn;
        return {close: jest.fn()};
    }
}));

test('Tests Fixtures Home Page connected', () => {
  render(
    <Provider store={store}>
        <Fixtures />
    </Provider>
  );
  act(() => {
    mockApiCallbackFunction([{id: 'test', name: 'test', startTime: '2021-09-07T15:05:22.909Z', markets: []}], false);
  });
  expect(screen.getByText('Connected')).toBeInTheDocument();
  expect(screen.getByText('7 Sep')).toBeInTheDocument();
  expect(screen.getByText('16:05')).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveTextContent('Disconnect');
});

test('Tests Fixtures Home Page disconnected', () => {
    render(
        <Provider store={store}>
            <Fixtures />
        </Provider>
    );
    act(() => {
        mockApiCallbackFunction([{id: 'test', name: 'test', startTime: '2021-09-07T15:05:22.909Z', markets: []}], false);
        closeFunction();
    });
    expect(screen.getByText('Disconnected')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Connect');
});

test('Tests Fixtures Home Page on error from websocket', () => {
    render(
        <Provider store={store}>
            <Fixtures />
        </Provider>
    );
    act(() => {
        mockApiCallbackFunction([{id: 'test', name: 'test', startTime: '2021-09-07T15:05:22.909Z', markets: []}], false);
        errorfunction()
    });
    expect(screen.getByText('Connection failed')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Connect');
});

test('Tests Fixtures Home Page on message from websocket', () => {
    render(
        <Provider store={store}>
            <Fixtures />
        </Provider>
    );
    act(() => {
        mockApiCallbackFunction([{id: 'test', name: 'test', startTime: '2021-09-07T15:05:22.909Z', markets: []}], false);
        messageFunction({type: 'fixtureUpdate', data: '{"test": "testData"}'});
    });
    expect(screen.getByText('Connected')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Disconnect');
});

test('Tests Fixtures Home Page Disconnecting by simulating button click', () => {
    render(
      <Provider store={store}>
          <Fixtures />
      </Provider>
    );
    act(() => {
        mockApiCallbackFunction([{id: 'test', name: 'test', startTime: '2021-09-07T15:05:22.909Z', markets: []}], false);
    });
    act(() => {
        screen.getByText('Disconnect').click();
    });
    expect(screen.getByText('Disconnecting...')).toBeInTheDocument();
});

test('Tests Fixtures API failed scenario', () => {
    render(
        <Provider store={store}>
            <Fixtures />
        </Provider>
    );
    act(() => {
        mockApiCallbackFunction('Error', true);
    });
    expect(screen.getByText('Unable to fetch data from server.')).toBeInTheDocument();
});

test('Tests Fixtures API failed Try again scenario', () => {
    render(
        <Provider store={store}>
            <Fixtures />
        </Provider>
    );
    act(() => {
        mockApiCallbackFunction('Error', true);
    });
    screen.getByText('Try again').click();
    expect(mockFetchApi).toHaveBeenCalled()
});