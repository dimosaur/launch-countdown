import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

import { PLANTING_STATUSES, TIMER_STATUS } from '../constants';

import styles from './Player.module.css';

const CODE = '7355608';

const planted = new Audio('/audio/cs-bomb-planted.mp3');
const ticking = new Audio('/audio/cs-bomb-ticking.mp3');
const explosion = new Audio('/audio/cs-bomb-explosion.mp3');
window.ticking = ticking;
window.explosion = explosion;

planted.addEventListener('ended', () => {
  ticking.loop = true;
  ticking.play();
});

export const Player = () => {
  const [status, setStatus] = useState(PLANTING_STATUSES.IDLE);
  const [code, setCode] = useState('');

  const handleClick = () => {
    setStatus(PLANTING_STATUSES.STARTED);

    planted.play();

    setTimeout(() => {
      const timerId = setInterval(() => {
        setCode((prevCode) => {
          const nextLength = prevCode.length + 1;
          if (nextLength === CODE.length) {
            setTimeout(() => {
              window.postMessage({ updateTimerStatus: TIMER_STATUS.PENDING }, '*');
              setStatus(PLANTING_STATUSES.FINISHED);
            }, 1600);
            clearInterval(timerId);
          }
          return CODE.slice(0, nextLength);
        });
      }, 300);
    }, 300);
  };

  useEffect(() => {
    if (status !== PLANTING_STATUSES.FINISHED) {
      return;
    }
    const messageListener = (event) => {
      if (!event.data?.timerStatus) {
        return;
      }
      if (event.data.timerStatus === 'pending') {
        if (event.data.secondsLeft < 40) {
          ticking.addEventListener('ended', () => {
            explosion.currentTime = 1;
            explosion.play();
          });
          ticking.loop = false;
        }
      }
    };

    window.addEventListener('message', messageListener);
    return () => window.removeEventListener('message', messageListener);
  }, [status]);

  return (
    <div
      className={
        clsx(styles.overflow, {
          [styles.overflowClear]: status === PLANTING_STATUSES.FINISHED,
        })
      }
    >
      {status === PLANTING_STATUSES.IDLE && (
        <img
          alt={'play'}
          src={'/play.svg'}
          className={styles.playButton}
          onClick={handleClick}
        />
      )}
      {status === PLANTING_STATUSES.STARTED && <div className={styles.code}>{code}</div>}
    </div>
  );
};
