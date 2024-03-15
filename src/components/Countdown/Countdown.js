import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

import styles from './Countdown.module.css';
import {
  listenCountdownTick,
  listenFlowStatus,
  postStartTickingMessage,
} from '../../helpers/post-message.helper';
import { formatDistance } from '../../helpers/format-distance.helper';
import { FLOW_STATUS } from '../../constants';

const dateTo = new Date('2024-03-18T08:00:00Z');

const initialData = {
  days: 0,
  time: '00:00:00',
  isFinished: false,
};

export const Countdown = () => {
  const [{ days, time }, setTimer] = useState(initialData);

  useEffect(() => {
    listenCountdownTick((secondsLeft) => {
      setTimer(formatDistance(secondsLeft));
    });

    listenFlowStatus((status) => {
      if (status === FLOW_STATUS.BOMB_PLANTED) {
        postStartTickingMessage(new Date());
      }
    });
  }, []);

  return (
    <>
      <h1 className={styles.title}>Retail Sportsbook launch</h1>
      <p className={clsx(styles.text, styles.day)}>
        <span className={styles.dayWrapper}>{days}</span> days
      </p>
      <p className={clsx(styles.text, styles.timer)}>{time}</p>
    </>
  );
};
