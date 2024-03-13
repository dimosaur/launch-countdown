import { useEffect } from 'react';

import { Countdown } from './Countdown/Countdown';
import { Player } from './Player/Player';
import { TIMER_STATUS } from './constants';

import './App.css';

function App() {
  useEffect(() => {
    const listener = (event) => {
      if (!event.data?.timerStatus) {
        return;
      }
      if (event.data.timerStatus === TIMER_STATUS.FINISHED) {
        document.body.classList.add('finished');
      }
    };

    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  return (
    <>
      <Player />
      <Countdown />
    </>
  );
}

export default App;
