import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom'
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

jest.mock('./app/views/FixturesHomePage', () => () => (<div>MockFixturesHomePage</div>));

test('renders app.tsx', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText('MockFixturesHomePage')).toBeInTheDocument();
});
