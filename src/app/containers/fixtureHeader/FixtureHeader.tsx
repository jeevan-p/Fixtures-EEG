import React from 'react';
import Button from '../../components/button/Button';
import classNames from 'classnames';
import './fixtureHeader.scss';

const FixtureHeader = React.memo(function FixtureHeader(props: Props) {
    const {displayContent, live, loading, startConnection, closeConnection} = props;
    const buttonHandler = () => {
        live ? closeConnection() : startConnection();
    }
    const contentClass = classNames('fixture-header-content', {'yellow': loading }, live ? 'green' : 'red');

    return (
        <div className="fixture-header">
            <div className="fixture-header-content-parent">
                <div className={contentClass}><div className="circle"></div>{displayContent}</div>
            </div>
            <Button
                buttonClass="fixture-header-button"
                onClick={buttonHandler}
                disabled={loading}>
                    {live ? 'Disconnect' : 'Connect'}
            </Button>
        </div>
    );
});

export default FixtureHeader;

interface Props {
    displayContent: string,
    live: boolean,
    loading: boolean,
    startConnection: () => void,
    closeConnection: () => void
}