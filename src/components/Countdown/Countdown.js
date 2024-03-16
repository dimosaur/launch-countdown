import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';

import styles from './Countdown.module.css';
import {
  listenCountdownTick,
  listenFlowStatus,
  postStartTickingMessage,
} from '../../helpers/post-message.helper';
import { formatDistance } from '../../helpers/format-distance.helper';
import { FLOW_STATUS, LAUNCH_DATE } from '../../constants';

const initialData = {
  days: 0,
  time: '00:00:00',
  isFinished: false,
};

export const Countdown = () => {
  const [{ days, time }, setTimer] = useState(initialData);
  const [timerBlinkingStage, setTimerBlinkingStage] = useState(null);
  const timerBlinkingStageRef = useRef(timerBlinkingStage);
  timerBlinkingStageRef.current = timerBlinkingStage;

  useEffect(() => {
    listenCountdownTick((secondsLeft) => {
      setTimer(formatDistance(secondsLeft));

      if (secondsLeft > 40) {
        return;
      }

      if (secondsLeft <= 18 && secondsLeft / 34 > 0) {
        setTimerBlinkingStage(secondsLeft / 34);
        return;
      }

      if (secondsLeft <= 20) {
        setTimerBlinkingStage(0.5);
        return;
      }

      if (secondsLeft <= 24) {
        if (timerBlinkingStageRef.current !== 0.6) {
          setTimerBlinkingStage(0.6);
        }
        return;
      }

      if (secondsLeft <= 29) {
        if (timerBlinkingStageRef.current !== 0.75) {
          setTimerBlinkingStage(0.75);
        }
        return;
      }

      if (secondsLeft <= 35) {
        if (timerBlinkingStageRef.current !== 0.9) {
          setTimerBlinkingStage(0.9);
        }
        return;
      }

      if (timerBlinkingStageRef.current !== 1.05) {
        setTimerBlinkingStage(1.05);
      }
    });

    listenFlowStatus((status) => {
      if (status === FLOW_STATUS.BOMB_PLANTED) {
        postStartTickingMessage(LAUNCH_DATE);
      }
    });
  }, []);

  return (
    <>
      <h1 className={styles.title}>Retail Sportsbook launch</h1>
      <p className={clsx(styles.text, styles.day)}>
        <span className={styles.dayWrapper}>{days}</span> {days === 1 ? 'day' : 'days'}
      </p>
      <p
        className={clsx(styles.text, styles.timer, {
          [styles.blinkingTimer]: timerBlinkingStage,
        })}
        style={{ animationDuration: `${timerBlinkingStage || 0}s` }}
      >
        {time}
      </p>
    </>
  );
};
