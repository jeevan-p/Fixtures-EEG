import React, { useEffect } from 'react';
import SocketSwitch from '../components/socketSwitchComponent/SocketSwitch';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  updateState,
  getCurrentState
} from '../../state/fixtureSlice';
import { fetchApiUtil } from '../utils/fetchApi';
import FixtureListItem from '../components/fixtureListItem/FixtureListItem';
import './fixturesHomePage.scss';

export default function Fixtures() {
  const fixtureList = useAppSelector(getCurrentState);
  const dispatch = useAppDispatch();

  const fetchData = () => {
    fetchApiUtil("http://fixtures-over-websockets.thinkmorestupidless.com/fixtures", (fixturedata: [], error: boolean) => {
      !error && dispatch(updateState(fixturedata));
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className='fixture-container'>
        <SocketSwitch />
        {fixtureList.fixtures.map((fixtureDetails) => <FixtureListItem key={fixtureDetails.id} fixtureDetails={fixtureDetails}/>)}
      </div>
    </div>
  );
}
