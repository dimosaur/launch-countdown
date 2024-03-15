import { useEffect, useState } from 'react';

import { TIMER_STATUS } from '../constants';

import { Terrorists } from './Terrorists';
import { Explosion } from './Explosion';
import { Player } from './Player';
import { Countdown } from './Countdown';

import styles from './App.module.css';

function App() {
  const [isFinished, setIsFinished] = useState(true);

  useEffect(() => {
    const listener = (event) => {
      if (!event.data?.timerStatus) {
        return;
      }
      if (event.data.timerStatus === TIMER_STATUS.FINISHED) {
        document.body.classList.add('finished');
        setIsFinished(true);
      }
    };

    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  return (
    <>
      <div className={styles.content}>
        <Player />
        <Countdown />
      </div>
      {isFinished && (
        <>
          <Terrorists />
          <Explosion />
        </>
      )}
    </>
  );
}

export default App;
