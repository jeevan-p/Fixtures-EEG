import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import FixtureListItem from './FixtureListItem';

test('Test for FixtureListItem - renders correctly', () => {
    const propsToSend = {
        fixtureDetails: {
            id: 'some_id',
            name: 'some_name',
            startTime: 'some_start_time',
            markets: []
        }
    }
    render(<FixtureListItem {...propsToSend} />);
    expect(screen.getByText('some_name')).toBeInTheDocument();
});

test('Test for FixtureListItem - check Market details are rendered', () => {
    const marketDetails = {
        id: 'market_id',
        name: 'market_name',
        status: 'IN_PLAY',
        selections: [{
            id: 'selection_id_1',
            name: 'selection_name_1',
            price: 10
        },
        {
            id: 'selection_id_2',
            name: 'selection_name_2',
            price: 20
        }]
    };
    
    const propsToSend = {
        fixtureDetails: {
            id: 'some_id',
            name: 'some_name',
            startTime: 'some_start_time',
            markets: [marketDetails]
        }
    }
    render(<FixtureListItem {...propsToSend} />);
    expect(screen.getByText('some_name')).toBeInTheDocument();
    expect(screen.getByText('IN PLAY')).toBeInTheDocument();
    expect(screen.getByText('selection_name_1')).toBeInTheDocument();
    expect(screen.getByText('selection_name_2')).toBeInTheDocument();
})