import { useEffect } from 'react';
import {
  listenCountdownTick,
  listenFlowStatus,
  postFlowStatusMessage,
} from '../../helpers/post-message.helper';
import { EXPLORATION_TIME, FLOW_STATUS } from '../../constants';

const planted = new Audio('/audio/cs-bomb-planted.mp3');
const ticking = new Audio('/audio/cs-bomb-ticking.mp3');
const explosion = new Audio('/audio/cs-bomb-explosion.mp3');
window.explosion = explosion;

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
      if (secondsLeft < 43) {
        ticking.addEventListener('ended', () => {
          explosion.play();
        });
        ticking.loop = false;
      }
    });

    let run = false;
    explosion.addEventListener('timeupdate', (event) => {
      if (!run && explosion.currentTime > EXPLORATION_TIME) {
        run = true;
        postFlowStatusMessage(FLOW_STATUS.FINISHED);
      }
    });

    listenCountdownTick((seconds) => {
      if (explosion.currentTime === 0) {
        return;
      }
      const difference = EXPLORATION_TIME - explosion.currentTime - seconds;
      if (Math.abs(difference) > 0.03) {
        explosion.playbackRate = 1 + difference / 5;
      } else {
        explosion.playbackRate = 1;
      }
    });
  }, []);

  return null;
};
