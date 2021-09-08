import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Button from './Button';

test('Render Button component', () => {
    render(<Button>Some child</Button>);
    expect(screen.getByText('Some child')).toBeInTheDocument();
});

test('Render Button component with custom class', () => {
    render(<Button buttonClass="test_class">Some child</Button>);
    expect(screen.getByText('Some child')).toHaveClass('test_class');
});

test('Render Button component as disabled', () => {
    render(<Button disabled={true}>Some child</Button>);
    expect(screen.getByText('Some child')).toHaveClass('disabled');
});

test('Render Button component - onClick handler', () => {
    const mockFn = jest.fn();
    render(<Button onClick={() => mockFn()}>Some child</Button>);
    screen.getByRole('button').click();
    expect(mockFn).toHaveBeenCalled();
});

test('Render Button component - onClick handler should not be called if disabled', () => {
    const mockFn = jest.fn();
    render(<Button onClick={() => mockFn()} disabled>Some child</Button>);
    screen.getByRole('button').click();
    expect(mockFn).not.toHaveBeenCalled();
});