import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import MarketDetails from './MarketDetails';

test('Render Market Details Component', () => {
    const propsToSend = {
        marketName: 'Test market name',
        marketStatus: 'Test market status',
        marketSelections: [{
            id: 'selection_id_1',
            name: 'selection_name_1',
            price: 10
        },
        {
            id: 'selection_id_2',
            name: 'selection_name_2',
            price: 20
        }]
    }
    render(<MarketDetails {...propsToSend} />);
    expect(screen.getByText('Test market name')).toBeInTheDocument();
    expect(screen.getByText('Test market status')).toBeInTheDocument();
    expect(screen.getByText('selection_name_1')).toBeInTheDocument();
    expect(screen.getByText('selection_name_2')).toBeInTheDocument();
});

test('Render Market Details Component - Tab select scenario', () => {
    const propsToSend = {
        marketName: 'Test market name',
        marketStatus: 'IN_PLAY',
        marketSelections: [{
            id: 'selection_id_1',
            name: 'selection_name_1',
            price: 10
        },
        {
            id: 'selection_id_2',
            name: 'selection_name_2',
            price: 20
        }]
    }
    render(<MarketDetails {...propsToSend} />);
    screen.getAllByRole('button')[0].click();
    expect(screen.getAllByRole('button')[0]).toHaveClass('selected');
    screen.getAllByRole('button')[0].click();
    expect(screen.getAllByRole('button')[0]).not.toHaveClass('selected');
});

test('Render Market Details Component - Disabled scenario', () => {
    const propsToSend = {
        marketName: 'Test market name',
        marketStatus: 'SUSPENDED',
        marketSelections: [{
            id: 'selection_id_1',
            name: 'selection_name_1',
            price: 10
        },
        {
            id: 'selection_id_2',
            name: 'selection_name_2',
            price: 20
        }]
    }
    render(<MarketDetails {...propsToSend} />);
    expect(screen.getAllByRole('button')[0]).toHaveClass('disabled');
    expect(screen.getAllByRole('button')[1]).toHaveClass('disabled');
});