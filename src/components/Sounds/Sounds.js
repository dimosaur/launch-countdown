import { useEffect } from 'react';
import {
  listenCountdownTick,
  listenFlowStatus,
  postFlowStatusMessage,
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
    });
    listenCountdownTick((secondsLeft) => {
      if (secondsLeft < 42) {
        ticking.addEventListener('ended', () => {
          explosion.currentTime = 1;
          explosion.play();
        });
        ticking.loop = false;
      }
    });

    let run = false;
    explosion.addEventListener('timeupdate', (event) => {
      if (explosion.currentTime > 39) {
        run = true;
        run && postFlowStatusMessage(FLOW_STATUS.FINISHED);
      }
    });
  }, []);

  return null;
};
