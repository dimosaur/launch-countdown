import { clsx } from 'clsx';

import styles from './Explosion.module.css';

export const Explosion = () => {
  return (
    <div className={styles.root}>
      <img src="/explosion.gif" className={styles.video} alt="" />
      <img
        src="/explosion.gif"
        className={clsx(styles.video, styles.mirrored)}
        alt=""
      />
    </div>
  );
};
