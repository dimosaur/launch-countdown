import './App.css';
import { Countdown } from './Countdown/Countdown';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    const listener = (event) => {
      if (!event.data?.timerStatus) {
        return;
      }
      if (event.data.timerStatus === 'finished') {
        document.body.classList.add('finished');
      }
    };

    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  return (
    <Countdown />
  );
}

export default App;
