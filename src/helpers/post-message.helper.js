export const postStartTickingMessage = (dateTo) => {
  window.postMessage({ action: 'startTicking', dateTo }, '*');
};

export const listenStartTicking = (callback) => {
  const listener = ({ data }) => {
    if (data?.action === 'startTicking') {
      callback(data.dateTo);
    }
  };

  window.addEventListener('message', listener);
};

export const postCountdownTickMessage = (secondsLeft) => {
  window.postMessage({ action: 'timerUpdate', secondsLeft }, '*');
};

export const listenCountdownTick = (callback) => {
  const listener = ({ data }) => {
    if (data?.action === 'timerUpdate') {
      callback(data.secondsLeft);
    }
  };

  window.addEventListener('message', listener);
};
