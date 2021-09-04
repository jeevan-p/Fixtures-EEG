import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  changeFixture,
  updateState,
  selectCount
} from './fixtureSlice';
import styles from './Fixtures.module.scss';

export function Fixtures() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  async function fetchData() {
    const res = await fetch("http://fixtures-over-websockets.thinkmorestupidless.com/fixtures");
    res.json().then((resp: []) => {
      dispatch(updateState(resp));
    });
  }

  useEffect(() => {
    fetchData();
  }, []); 

  console.log('*', count);

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
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
