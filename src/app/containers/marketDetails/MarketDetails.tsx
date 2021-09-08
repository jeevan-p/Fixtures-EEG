import { useState, useEffect } from 'react';
import DisplayText from '../../components/displayText/DisplayText';
import TabComponent from '../../components/tabComponent/TabComponent';
import Tooltip from '../../components/tooltip/Tooltip';
import { isStatusSelectable } from '../../utils/isStatusSelectable';
import { getIconClass } from '../../utils/getIconClass';
import './marketDetails.scss';

function MarketDetails(props: MarketDetailsProps) {
    const {
      marketName,
      marketStatus,
      marketSelections
    } = props;
    const [selectedTab, setSelectedTab] = useState('');
    const [selectableMarket, setSelectableMarket] = useState(false);

    useEffect(() => {
        setSelectableMarket(isStatusSelectable(marketStatus));
        setSelectedTab('');
    }, [marketStatus]);

    const onTabSelect = (selectedId: string) => {
      setSelectedTab(selectedTab === selectedId ? '' : selectedId);
    }

    const selectionTabs = marketSelections.map((selectionListItem: SelectionListType) =>
      <TabComponent
        key={selectionListItem.id}
        preHeader={selectionListItem.name}
        header={selectionListItem.price}
        disabledTab={!selectableMarket}
        selected={selectionListItem.id === selectedTab}
        onTabSelect={() => onTabSelect(selectionListItem.id)} />
    );
    
    return (
      <div className="market-details">
        <DisplayText customClass='market-name' textColor='medium' textType='smallest'>
          {marketName}
          <Tooltip
            content={marketStatus.replace('_', ' ')}
            iconClass={getIconClass(marketStatus)}
          />
        </DisplayText>
        <div className="selection-container">
          {selectionTabs}
        </div>
      </div>
    );
}

interface SelectionListType {
  id: string,
  name: string,
  price: number
}

interface MarketDetailsProps {
    marketName: string,
    marketStatus: string,
    marketSelections: SelectionListType[]
}

export default MarketDetails;