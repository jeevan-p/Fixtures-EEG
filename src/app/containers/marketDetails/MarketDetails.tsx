import { useState, useEffect } from 'react';
import DisplayText from '../../components/displayText/DisplayText';
import TabComponent from '../../components/tabComponent/TabComponent';
import Tooltip from '../../components/tooltip/Tooltip';
import { selectableStatus, statusToIconClass } from './../../staticContents.json';
import { isStatusSelectable } from '../../utils/isStatusSelectable';
import { getIconClass } from '../../utils/getIconClass';
import './marketDetails.scss';

function MarketDetails(props: MarketDetailsProps) {
    const [selectedTab, setSelectedTab] = useState('');
    const [selectableMarket, setSelectableMarket] = useState(false);

    useEffect(() => {
        setSelectableMarket(isStatusSelectable(props.marketStatus));
        setSelectedTab('');
    }, [props.marketStatus]);

    const onTabSelect = (selectedId: string) => {
      setSelectedTab(selectedTab === selectedId ? '' : selectedId);
    }

    const selectionTabs = props.marketSelections.map((selectionListItem: SelectionListType) =>
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
          {props.marketName} <Tooltip content={props.marketStatus.replace('_', ' ')} iconClass={getIconClass(props.marketStatus)}/>
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