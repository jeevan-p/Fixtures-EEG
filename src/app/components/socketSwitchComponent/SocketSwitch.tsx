import { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as websocket } from 'websocket';
import './socketSwitch.scss';
import {
    changeFixture
} from '../../../state/fixtureSlice';
import { useAppDispatch } from '../../../app/hooks';

function SocketSwitch() {
    const [live, setLive] = useState(false);
    const [initialConnection] = useState(true);
    const [loading, setLoading] = useState(true);
    let webSocketObject = useRef<any>(null);
    const dispatch = useAppDispatch();

    const startConnection = () => {
        setLoading(true);
        webSocketObject.current = new websocket("ws://fixtures-over-websockets.thinkmorestupidless.com/ws");
        webSocketObject.current.onopen = () => {
            setLive(true);
            setLoading(false);
        }
        webSocketObject.current.onclose = () => {
            setLive(false);
            setLoading(false);
        }
        webSocketObject.current.onmessage = (fixtureChange: any) => {
            const dataFromSocket = JSON.parse(fixtureChange.data);
            dataFromSocket.type === 'fixtureUpdate' &&
                dispatch(changeFixture(dataFromSocket.data));
        }
        webSocketObject.current.onerror = () => {
            setLive(false);
            setLoading(false);
        }
    }
    const closeConnection = () => {
        webSocketObject.current.close();
        setLoading(true);
    }

    useEffect(() => {
        initialConnection && startConnection();
        return () => {
            live && closeConnection();
        }
    }, []);

    const LiveComp = <div>
        Live!
        <button onClick={() => closeConnection() }>X</button>
    </div>;
    const NoLiveComp = <div>
        Not connected to Server
        <button onClick={() => startConnection() }>Connect</button>
    </div>;
    const LoadingComp = <div>Loading...</div>

    return (
        <div className="socket-switch-component">
            {
                loading
                    ? LoadingComp
                    : live ? LiveComp:NoLiveComp
            }
        </div>
    );
}

interface IfcObject {
    [key: string]: any
}

export default SocketSwitch;
