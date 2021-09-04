import React, { useState, useEffect } from 'react';
import SocketSwitch from '../components/socketSwitchComponent/SocketSwitch';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  changeFixture,
  updateState,
  getCurrentState
} from '../../state/fixtureSlice';
import { fetchApiUtil } from '../utils/fetchApi';
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

  console.log('-->', fixtureList);

  return (
    <div>
      <div className='fixture-container'>
        <SocketSwitch />
        {
          fixtureList.fixtures.map((fixtureDetails, index) => <div>
            {fixtureDetails.name} - {fixtureDetails.markets[0].selections[0].price} : {fixtureDetails.markets[0].selections[1].price}
          </div>)
        }
      </div>
    </div>
  );
}
