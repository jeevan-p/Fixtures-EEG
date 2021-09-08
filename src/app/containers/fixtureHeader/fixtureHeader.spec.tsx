import FixtureHeader from "./FixtureHeader";
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';

const mockFn = jest.fn();

test('Render FixtureHeader component - Live true', () => {
    const propsToPass = {
        displayContent: 'Some text',
        live: true,
        loading: false,
        startConnection: jest.fn(),
        closeConnection: jest.fn()
    }
    render(<FixtureHeader {...propsToPass} />);
    expect(screen.getByText('Some text')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Disconnect');
});

test('Render FixtureHeader component - Live false', () => {
    const propsToPass = {
        displayContent: 'Some other text',
        live: false,
        loading: false,
        startConnection: jest.fn(),
        closeConnection: jest.fn()
    }
    render(<FixtureHeader {...propsToPass} />);
    expect(screen.getByText('Some other text')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Connect');
});

test('Render FixtureHeader component - Loading true', () => {
    const propsToPass = {
        displayContent: 'Some other text',
        live: false,
        loading: true,
        startConnection: jest.fn(),
        closeConnection: jest.fn()
    }
    render(<FixtureHeader {...propsToPass} />);
    expect(screen.getByText('Some other text')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Connect');
});

test('Render FixtureHeader component - Live true button click should call closeConnection', () => {
    const propsToPass = {
        displayContent: 'Some other text',
        live: true,
        loading: false,
        startConnection: jest.fn(),
        closeConnection: mockFn
    }
    render(<FixtureHeader {...propsToPass} />);
    screen.getByRole('button').click();
    expect(mockFn).toHaveBeenCalled();
});

test('Render FixtureHeader component - Live false button click should call startConnection', () => {
    const propsToPass = {
        displayContent: 'Some other text',
        live: false,
        loading: false,
        startConnection: mockFn,
        closeConnection: jest.fn()
    }
    render(<FixtureHeader {...propsToPass} />);
    screen.getByRole('button').click();
    expect(mockFn).toHaveBeenCalled();
});