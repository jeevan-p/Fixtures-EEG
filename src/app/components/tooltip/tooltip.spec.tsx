import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Tooltip from './Tooltip';

test('Render Tooltip Component', () => {
    render(<Tooltip content="test content" />);
    expect(screen.getByText('test content')).toBeInTheDocument();
});