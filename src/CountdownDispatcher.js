import { useEffect } from 'react';

import { FLOW_STATUS } from './constants';
import {
  listenStartTicking,
  postCountdownTickMessage,
  postFlowStatusMessage,
} from './helpers/post-message.helper';

export const CountdownDispatcher = () => {
  useEffect(() => {
    const tickCountdown = (dateTo, timerId) => {
      const distance = dateTo.getTime() - new Date().getTime();
      const secondsLeft = Math.floor(distance / 1000);
      postCountdownTickMessage(secondsLeft);
      if (secondsLeft < 1) {
        clearInterval(timerId);
        postFlowStatusMessage(FLOW_STATUS.FINISHED);
      }
    };

    listenStartTicking((dateTo) => {
      const now = new Date();
      const isLessThanMinute = dateTo.getTime() - now.getTime() < 60 * 1000;
      if (isLessThanMinute) {
        dateTo = new Date(now.getTime() + 60 * 1000);
      }

      tickCountdown(dateTo);
      const timerId = setInterval(() => tickCountdown(dateTo, timerId), 1000);
    });
  }, []);
  return null;
};
