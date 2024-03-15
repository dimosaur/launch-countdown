import { useEffect, useState } from 'react';

import { FLOW_STATUS } from '../constants';
import { listenFlowStatus } from '../helpers/post-message.helper';

import { Player } from './Player';
import { Countdown } from './Countdown';
import { Terrorists } from './Terrorists';
import { Explosion } from './Explosion';
import { Sounds } from './Sounds';

import styles from './Scene.module.css';

export const Scene = () => {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    listenFlowStatus((status) => {
      if (status === FLOW_STATUS.FINISHED) {
        setIsFinished(true);
        document.body.classList.add('finished');
      }
    });
  }, []);

  return (
    <>
      <div className={styles.content}>
        <Sounds />
        <Player />
        <Countdown />
      </div>
      {isFinished && (
        <>
          <Terrorists />
          <Explosion />
        </>
      )}
    </>
  );
};
