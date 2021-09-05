import './marketSelectionTab.scss';

function MarketSelectionTab(props: Props) {
    return (
      <div className="market-selection-tab">
          <div className="market-selection-name">{props.name}</div>
          <div className="market-selection-price">{props.price}</div>
      </div>
    );
}

interface Props {
    name: string,
    price: number
}

export default MarketSelectionTab;