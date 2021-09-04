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
    fetchApiUtil("http://fixtures-over-websockets.thinkmorestupidless.com/fixtures", (fixturedata: []) => {
      dispatch(updateState(fixturedata));
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
        <button
          className='button'
          aria-label="Decrement value"
          onClick={() => dispatch(changeFixture({
            id: 'abc',
            name: 'abc',
            startTime: 'abc',
            markets: []
          }))}
        >
          Check
        </button>
      </div>
    </div>
  );
}
