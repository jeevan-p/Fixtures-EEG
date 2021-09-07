import React from 'react';
import MarketDetails from '../marketDetails/MarketDetails';
import DisplayText from '../../components/displayText/DisplayText';
import { dateUtil } from '../../utils/dateUtil';
import { FixItem } from '../../../state/fixtureSlice';
import './fixtureListItem.scss';

const FixtureListItem = React.memo(function FixtureListItem(props: FixtureItem) {

  const marketDetailsComponent = props.fixtureDetails.markets.map((marketData) =>
    <MarketDetails
      key={marketData.id}
      marketName={marketData.name}
      marketStatus={marketData.status}
      marketSelections={marketData.selections} />
  );

  return (
    <div className="fixture-list-item">
      <div className="fixture-details">
        <DisplayText
          customClass='fixture-date'
          textColor='medium'
          textType='small'>
            {dateUtil(props.fixtureDetails.startTime).map((text: string, index: number) => <div key={index}>{text}</div>)}
        </DisplayText>
        <DisplayText
          customClass='fixture-name'
          textColor='primary'
          textType='large'>
            {props.fixtureDetails.name}
        </DisplayText>
      </div>
      <div className="market-details-component">
        {marketDetailsComponent}
      </div>
    </div>
  );
});

interface FixtureItem {
  fixtureDetails: FixItem
}

export default FixtureListItem;