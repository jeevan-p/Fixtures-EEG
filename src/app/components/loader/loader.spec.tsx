import { render } from '@testing-library/react';
import Loader from './Loader';

test('Render DisplayText Component', () => {
    const component = render(<Loader />);
    expect(component).toBeTruthy();
    expect(component.container.firstElementChild?.classList[0]).toBe('loading-spinner');
});