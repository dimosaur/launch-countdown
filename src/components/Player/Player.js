import { clsx } from 'clsx';
import { useState } from 'react';

import { FLOW_STATUS } from '../../constants';
import { postFlowStatusMessage } from '../../helpers/post-message.helper';

import styles from './Player.module.css';

const CODE = '7355608';

const STATUSES = {
  IDLE: 'idle',
  STARTED: 'started',
  FINISHED: 'finished',
};

export const Player = () => {
  const [status, setStatus] = useState(STATUSES.IDLE);
  const [code, setCode] = useState('');

  const handleClick = () => {
    postFlowStatusMessage(FLOW_STATUS.START);
    setStatus(STATUSES.STARTED);

    setTimeout(() => {
      const timerId = setInterval(() => {
        setCode((prevCode) => {
          const nextLength = prevCode.length + 1;
          if (nextLength === CODE.length) {
            setTimeout(() => {
              setStatus(STATUSES.FINISHED);
              postFlowStatusMessage(FLOW_STATUS.BOMB_PLANTED);
            }, 1300);
            clearInterval(timerId);
            return CODE;
          }
          return CODE.slice(0, nextLength);
        });
      }, 300);
    }, 300);
  };

  return (
    <div
      className={clsx(styles.overflow, {
        [styles.overflowClear]: status === STATUSES.FINISHED,
      })}
    >
      {status === STATUSES.IDLE && (
        <img
          alt={'play'}
          src={'/play.svg'}
          className={styles.playButton}
          onClick={handleClick}
        />
      )}
      {status === STATUSES.STARTED && <div className={styles.code}>{code}</div>}
    </div>
  );
};
