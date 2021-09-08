import { useEffect, useState, useRef, useCallback } from 'react';
import FixtureHeader from '../containers/fixtureHeader/FixtureHeader';
import FixtureListItem from '../containers/fixtureListItem/FixtureListItem';
import DisplayMessage from '../components/DisplayMessage/DisplayMessage';
import Loader from '../components/loader/Loader';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  updateState,
  changeFixture,
  getCurrentState
} from '../../state/fixtureSlice';
import { fetchApiUtil } from '../utils/fetchApi';
import { connectToWebSocket } from '../utils/webSocketConnection';
import { initialApiUrl, websocketUrl, apiFetchErrorText } from './../staticContents.json';
import './fixturesHomePage.scss';

export default function Fixtures() {
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [webSocketLoading, setWebSocketLoading] = useState(true);
  const [webSocketLive, setWebSocketLive] = useState(false);
  const [headerContent, setHeaderContent] = useState('');
  const [webSocketError, setWebSocketError] = useState(false);

  let webSocketObject = useRef<any>(null);
  const fixtureList = useAppSelector(getCurrentState);
  const dispatch = useAppDispatch();

  const startConnection = useCallback(
    () => {
      setWebSocketLoading(true);
      setWebSocketError(false);
      setHeaderContent("Initiating connection...");
      webSocketObject.current = connectToWebSocket(websocketUrl, onWsOpen, onWsClose, onWsMessage, onWsError);
    },
    [],
  );

  const closeConnection = useCallback(
    () => {
      setWebSocketLoading(true);
      setWebSocketError(false);
      setHeaderContent("Disconnecting...");
      webSocketObject.current.close();
    },
    [],
  );

  const onWsOpen = () => {
    setWebSocketLoading(false);
    setWebSocketLive(true);
    setHeaderContent("Connected");
  }

  const onWsClose = () => {
    setWebSocketLoading(false);
    setWebSocketLive(false);
    setHeaderContent("Disconnected");
  }

  const onWsMessage = (message: WebsocketMessage) => {
    const dataFromSocket = JSON.parse(message.data);
    dataFromSocket.type === 'fixtureUpdate' &&
        dispatch(changeFixture(dataFromSocket.data));
  }

  const onWsError = () => {
    setWebSocketLoading(false);
    setWebSocketLive(false);
    setWebSocketError(true);
  }

  const fetchData = () => {
    setApiError(false);
    setApiLoading(true);
    fetchApiUtil(initialApiUrl, (fixturedata: [], error: boolean) => {
      if(!error) {
        startConnection();
        dispatch(updateState(fixturedata));
      }
      error && setApiError(true);
      setApiLoading(false);
    });
  }

  const fixtureListComponent = fixtureList.fixtures.map((fixtureDetails) =>
    <FixtureListItem key={fixtureDetails.id} fixtureDetails={fixtureDetails}/>
  );

  useEffect(() => {
    fetchData();
    return () => {
      // clean-up
      webSocketLive && closeConnection();
      dispatch(updateState([]));
    }
  }, []);

  return (
    <div>
      <div className='fixture-container'>
        <FixtureHeader
          displayContent={webSocketError ? 'Connection failed' : headerContent}
          live={webSocketLive}
          loading={webSocketLoading}
          startConnection={startConnection}
          closeConnection={closeConnection}/>
        {apiLoading && <Loader />}
        {apiError &&
            <DisplayMessage customClass="fixture-other-text">
                {apiFetchErrorText.mainText}
                <div className="fixture-try-again">
                  <span onClick={() => fetchData()}>{apiFetchErrorText.retryText}</span>
                </div>
            </DisplayMessage>
        }
        {fixtureListComponent}
      </div>
    </div>
  );
}

interface WebsocketMessage {
  type: string,
  data: string
}