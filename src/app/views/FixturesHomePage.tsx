import { useEffect } from 'react';
import FixtureHeader from '../containers/fixtureHeader/FixtureHeader';
import FixtureListItem from '../containers/fixtureListItem/FixtureListItem';
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

  const fetchData = () => {
    fetchApiUtil(initialApiUrl, (fixturedata: [], error: boolean) => {
      !error && dispatch(updateState(fixturedata));
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className='fixture-container'>
        <FixtureHeader />
        {fixtureList.fixtures.map((fixtureDetails) =>
          <FixtureListItem key={fixtureDetails.id} fixtureDetails={fixtureDetails}/>
        )}
      </div>
    </div>
  );
}
