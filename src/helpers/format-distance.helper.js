const SECOND = 1;
const M_IN_S = SECOND * 60;
const H_IN_S = M_IN_S * 60;
const D_IN_S = H_IN_S * 24;

const formatNumber = (num) => (num < 10 ? `0${num}` : num);

export const formatDistance = (distance) => {
  if (distance < SECOND) {
    return { days: 0, time: '00:00:00', isFinished: true };
  }

  const days = Math.floor(distance / D_IN_S);
  const hours = formatNumber(Math.floor((distance % D_IN_S) / H_IN_S));
  const minutes = formatNumber(Math.floor((distance % H_IN_S) / M_IN_S));
  const seconds = formatNumber(Math.floor((distance % M_IN_S) / SECOND));

  return { days, time: `${hours}:${minutes}:${seconds}`, isFinished: false };
};
