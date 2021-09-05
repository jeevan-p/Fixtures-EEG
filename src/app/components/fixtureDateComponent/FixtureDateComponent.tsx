import React from 'react';
import { dateUtil } from "../../utils/dateUtil";
import './fixtureDateComponent.scss';

const FixtureDateComponent =  React.memo(function FixtureDateComponent(props: { date: string }) {
    const contentToDisplay = dateUtil(props.date);
    return (
      <div className="date-component">
        <div>{contentToDisplay[0]}</div>
        <div>{contentToDisplay[1]}</div>
      </div>
    );
  });
  
  export default FixtureDateComponent;