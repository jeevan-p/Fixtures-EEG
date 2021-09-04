import { useState } from 'react';
// import { Fixtures } from './app/views/FixturesHomePage';
import './socketSwitch.scss';

function SocketSwitch() {
    const [live, setLive] = useState(true);

    const liveComp = <div>Live</div>;
    const noLiveComp = <div>No Live</div>
    
    return (
        <div className="socket-switch-component">
            {live ? liveComp:noLiveComp }
        </div>
    );
}

export default SocketSwitch;
