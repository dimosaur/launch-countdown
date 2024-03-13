import { useEffect, useState } from 'react';

import { TIMER_STATUS } from '../constants';

const SEC_IN_MS = 1000;
const MIN_IN_MS = SEC_IN_MS * 60;
const HOUR_IN_MS = MIN_IN_MS * 60;
const DAY_IN_MS = HOUR_IN_MS * 24;
const formatNumber = (num) => num < 10 ? `0${num}` : num;

const initialData = {
  days: 0,
  time: '00:00:00',
  isFinished: false,
};

export const useCountdown = (dateTo) => {
  const [status, setStatus] = useState(TIMER_STATUS.IDLE);
  const [timer, setTimer] = useState(initialData);

  useEffect(() => {
    if (status === TIMER_STATUS.IDLE) {
      return;
    }
    let timerId = null;

    const calculate = () => {
      const distance = dateTo.getTime() - new Date().getTime();

      if (distance < SEC_IN_MS) {
        setTimer({ days: 0, time: '00:00:00', isFinished: true });
        window.postMessage({ timerStatus: TIMER_STATUS.FINISHED }, '*');
        return clearInterval(timerId);
      }

      window.postMessage(
        {
          timerStatus: TIMER_STATUS.PENDING,
          secondsLeft: distance / 1000,
        },
        '*',
      );

      const days = Math.floor(distance / DAY_IN_MS);
      const hours = formatNumber(Math.floor((distance % DAY_IN_MS) / HOUR_IN_MS));
      const minutes = formatNumber(Math.floor((distance % HOUR_IN_MS) / MIN_IN_MS));
      const seconds = formatNumber(Math.floor((distance % MIN_IN_MS) / SEC_IN_MS));

      setTimer({ days, time: `${hours}:${minutes}:${seconds}`, isFinished: false });
    };

    calculate();
    timerId = setInterval(calculate, 1000);
    return () => clearInterval(timerId);
  }, [dateTo, status]);

  useEffect(() => {
    const messageListener = (event) => {
      if (!event.data?.updateTimerStatus) {
        return;
      }
      setStatus(TIMER_STATUS.PENDING);
    };
    window.addEventListener('message', messageListener);
    return () => window.removeEventListener('message', messageListener);
  }, []);

  return timer;
};
