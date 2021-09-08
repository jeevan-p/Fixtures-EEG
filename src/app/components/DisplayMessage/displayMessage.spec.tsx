import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import DisplayMessage from './DisplayMessage';

test('Render DisplayMessage component', () => {
    render(<DisplayMessage>Some Message</DisplayMessage>);
    expect(screen.getByText('Some Message')).toBeInTheDocument();
});