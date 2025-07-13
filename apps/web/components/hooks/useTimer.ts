import { useState, useEffect } from 'react';

export const useTimer = (startTime: Date | null): string => {
  const [time, setTime] = useState('00:00');

  useEffect(() => {
    if (!startTime) {
      setTime('00:00');
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startTime.getTime();
      
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      
      setTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return time;
};