import { clsx } from 'clsx';

import { useCountdown } from './countdown.hook';

import styles from './Countdown.module.css';

const dateTo = new Date('2024-03-18T08:00:00Z');

export const Countdown = () => {
  const timer = useCountdown(dateTo);

  return (
    <>
      <h1 className={styles.title}>Retail Sportsbook launch</h1>
      <p className={clsx(styles.text, styles.day)}>
        <span className={styles.dayWrapper}>{timer.days}</span> days
      </p>
      <p className={clsx(styles.text, styles.timer)}>{timer.time}</p>
    </>
  );
};
