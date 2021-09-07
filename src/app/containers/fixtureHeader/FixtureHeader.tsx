import { useState, useEffect, useRef } from 'react';
import Button from '../../components/button/Button';
import { w3cwebsocket as websocket } from 'websocket';
import './fixtureHeader.scss';
import {
    changeFixture
} from '../../../state/fixtureSlice';
import { websocketUrl } from './../../staticContents.json';
import { useAppDispatch } from '../../hooks';
import classNames from 'classnames';

function FixtureHeader() {
    const [live, setLive] = useState(false);
    const [initialConnection] = useState(true); // Change to true for initial connection
    const [loading, setLoading] = useState(false);
    const [displayContent, setDisplayContent] = useState('');
    let webSocketObject = useRef<any>(null);
    const dispatch = useAppDispatch();

    const startConnection = () => {
        setLoading(true);
        setDisplayContent("Initiating connection...");
        webSocketObject.current = new websocket(websocketUrl);
        webSocketObject.current.onopen = () => {
            setLive(true);
            setLoading(false);
            setDisplayContent("Connected");
        }
        webSocketObject.current.onclose = () => {
            setLive(false);
            setLoading(false);
            setDisplayContent("Disconnected");
        }
        webSocketObject.current.onmessage = (fixtureChange: any) => {
            const dataFromSocket = JSON.parse(fixtureChange.data);
            dataFromSocket.type === 'fixtureUpdate' &&
                dispatch(changeFixture(dataFromSocket.data));
        }
        webSocketObject.current.onerror = () => {
            setLive(false);
            setLoading(false);
            setDisplayContent("Error! Try Again");
        }
    }
    const closeConnection = () => {
        webSocketObject.current.close();
        setLoading(true);
        setDisplayContent("Disconnecting...");
    }

    const buttonHandler = () => {
        live ? closeConnection() : startConnection();
    }

    useEffect(() => {
        initialConnection && startConnection();
        return () => {
            live && closeConnection();
        }
    }, []);

    const contentClass = classNames('fixture-header-content', {'yellow': loading }, live ? 'green' : 'red');

    return (
        <div className="fixture-header">
            <div className="fixture-header-content-parent">
                {/* <div className={contentClass}></div> */}
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
}

export default FixtureHeader;