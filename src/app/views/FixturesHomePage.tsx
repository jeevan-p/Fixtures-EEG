import { useEffect, useState } from 'react';
import FixtureHeader from '../containers/fixtureHeader/FixtureHeader';
import FixtureListItem from '../containers/fixtureListItem/FixtureListItem';
import DisplayText from '../components/displayText/DisplayText';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  updateState,
  getCurrentState
} from '../../state/fixtureSlice';
import { fetchApiUtil } from '../utils/fetchApi';
import { initialApiUrl } from './../staticContents.json';
import './fixturesHomePage.scss';

export default function Fixtures() {
  const fixtureList = useAppSelector(getCurrentState);
  const dispatch = useAppDispatch();
  const [errorApi, setErrorApi] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);

  const fetchData = () => {
    setErrorApi(false);
    setLoadingApi(true);
    fetchApiUtil(initialApiUrl, (fixturedata: [], error: boolean) => {
      !error && dispatch(updateState(fixturedata));
      error && setErrorApi(true);
      setLoadingApi(false);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className='fixture-container'>
        <FixtureHeader />
        {loadingApi && <div className='loading-spinner'></div>}
        {errorApi &&
          <>
            <DisplayText textColor='medium' textType='small' customClass="fixture-other-text">
              Unable to fetch data from Server.
              <div className="fixture-try-again">
                <a onClick={() => fetchData()}>Try again</a>
              </div>
            </DisplayText>
          </>
        }
        {fixtureList.fixtures.map((fixtureDetails) =>
          <FixtureListItem key={fixtureDetails.id} fixtureDetails={fixtureDetails}/>
        )}
      </div>
    </div>
  );
}
