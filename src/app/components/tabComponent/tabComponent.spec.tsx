import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import TabComponent from './TabComponent';

jest.useFakeTimers();

test('Render TabComponent', () => {
    const propsToSend = {
        header: 100,
        preHeader: "test pre header"
    };
    render(<TabComponent {...propsToSend} />);
    expect(screen.getByText('test pre header')).toBeInTheDocument();
});

test('Render TabComponent - Selected tab', () => {
    const propsToSend = {
        header: 100,
        preHeader: "test pre header",
        selected: true
    };
    render(<TabComponent {...propsToSend} />);
    expect(screen.getByRole('button')).toHaveClass('selected');
});

test('Render TabComponent - Disabled tab', () => {
    const propsToSend = {
        header: 100,
        preHeader: "test pre header",
        disabledTab: true
    };
    render(<TabComponent {...propsToSend} />);
    expect(screen.getByRole('button')).toHaveClass('disabled');
});

test('Render TabComponent - Click handler', () => {
    const mockFn = jest.fn();
    const propsToSend = {
        header: 100,
        preHeader: "test pre header",
        onTabSelect: mockFn
    };
    render(<TabComponent {...propsToSend} />);
    screen.getByRole('button').click();
    expect(mockFn).toHaveBeenCalled();
});

test('Render TabComponent - Click handler with Disabled Tab', () => {
    const mockFn = jest.fn();
    const propsToSend = {
        header: 100,
        preHeader: "test pre header",
        onTabSelect: mockFn,
        disabledTab: true

    };
    render(<TabComponent {...propsToSend} />);
    screen.getByRole('button').click();
    expect(mockFn).not.toHaveBeenCalled();
});