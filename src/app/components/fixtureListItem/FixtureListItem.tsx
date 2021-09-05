import React from 'react';
import FixtureDateComponent from '../fixtureDateComponent/FixtureDateComponent';
import MarketDetails from '../marketDetails/MarketDetails';
import MarketSelectionTab from '../marketSelectionTab/MarketSelectionTab';
import './fixtureListItem.scss';

const FixtureListItem = React.memo(function FixtureListItem(props: FixtureItem) {
  return (
    <div className="fixture-list-item">
      <div className="fixture-details">
        <div className="fixture-details-container">
          <><FixtureDateComponent date={props.fixtureDetails.startTime} /></>
          <div className="fixture-name">{props.fixtureDetails.name}</div>
        </div>
      </div>
      <div className="market-details-component">
        {props.fixtureDetails.markets.map((marketData) =>
          <MarketDetails
            key={marketData.id}
            marketName={marketData.name}
            marketStatus={marketData.status}>
              <div className="selection-container">
              {
                marketData.selections.map((selectionListItem) =>
                  <div className="selection-list-item" key={selectionListItem.id}>
                    <MarketSelectionTab name={selectionListItem.name} price={selectionListItem.price} />
                  </div>
              )}
              </div>
          </MarketDetails>)}
      </div>
    </div>
  );
});

interface FixtureItem {
  fixtureDetails: {
    id: string,
    name: string,
    startTime: string,
    markets: {
      id: string,
      name: string,
      status: string,
      selections: {
        id: string,
        name: string,
        price: number
      }[]
    }[]
  }
}

export default FixtureListItem;
// {props.fixtureDetails.markets[0].selections[0].price} : {props.fixtureDetails.markets[0].selections[1].price}