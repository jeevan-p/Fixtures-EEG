import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import DisplayText from './DisplayText';

test('Render DisplayText Component', () => {
    render(<DisplayText>Test</DisplayText>);
    expect(screen.getByText('Test')).toBeInTheDocument();
});