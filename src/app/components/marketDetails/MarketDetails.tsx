import './marketDetails.scss';

function MarketDetails(props: marketDetails) {
    return (
      <div className="market-details">
        <div className="market-details-header-content">
          <div className="market-name">{props.marketName}</div>
          <div className="market-status">{props.marketStatus}</div>
        </div>
        {props.children}
      </div>
    );
}

interface marketDetails {
    marketName: string,
    marketStatus: string,
    children: React.ReactNode
}

export default MarketDetails;