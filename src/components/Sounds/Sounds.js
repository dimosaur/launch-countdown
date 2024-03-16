import { useEffect } from 'react';
import {
  listenCountdownTick,
  listenFlowStatus,
} from '../../helpers/post-message.helper';
import { FLOW_STATUS } from '../../constants';

const planted = new Audio('/audio/cs-bomb-planted.mp3');
const ticking = new Audio('/audio/cs-bomb-ticking.mp3');
const explosion = new Audio('/audio/cs-bomb-explosion.mp3');

export const Sounds = () => {
  useEffect(() => {
    listenFlowStatus((status) => {
      if (status === FLOW_STATUS.START) {
        planted.play();
        planted.addEventListener('ended', () => {
          ticking.loop = true;
          ticking.play();
        });
      }
      if (status === FLOW_STATUS.FINISHED) {
        explosion.currentTime = 39;
      }
    });
    listenCountdownTick((secondsLeft) => {
      if (secondsLeft < 40) {
        ticking.addEventListener('ended', () => {
          explosion.currentTime = 1;
          explosion.play();
        });
        ticking.loop = false;
      }
    });
  }, []);

  return null;
};
