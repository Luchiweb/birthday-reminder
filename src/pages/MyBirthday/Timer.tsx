import { useEffect, useMemo, useState } from 'react';
import { isTodayBirthday } from '../../helpers/birthdate';

function Timer({ date }: { date: string }) {
  const birthday = useMemo(() => new Date(date), [date]);
  const isBirthday = useMemo(() => isTodayBirthday(birthday), [birthday]);
  const [timer, setTimer] = useState({
    targetDateTime: birthday,
    timeRemaining: calculateTimeRemaining(birthday),
    isRunning: !isBirthday,
  });

  useEffect(() => {
    let timerInterval: number | null = null;

    const updateTimer = () => {
      setTimer((prevTimer) => {
        const targetTime = prevTimer.targetDateTime.getTime();
        const currentTime = new Date().getTime();
        const timeRemaining = Math.max(Math.floor((targetTime - currentTime) / 1000), 0);

        if (timeRemaining === 0 && timerInterval) {
          clearInterval(timerInterval);
          return { ...prevTimer, isRunning: false, timeRemaining: 0 };
        }

        return { ...prevTimer, timeRemaining };
      });
    };

    if (timer.isRunning && timer.timeRemaining > 0 && !isBirthday) {
      timerInterval = setInterval(updateTimer, 1000);
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [timer, isBirthday]);

  function calculateTimeRemaining(targetTime: Date) {
    const timeDifference = targetTime.getTime() - new Date().getTime();
    const secondsRemaining = Math.max(Math.floor(timeDifference / 1000), 0);
    return secondsRemaining;
  }

  const formatTimeRemaining = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return { days, hours, minutes, seconds: remainingSeconds };
  };

  const { days, hours, minutes, seconds } = formatTimeRemaining(timer.timeRemaining);

  return (
    <>
      {isBirthday ? (
        <div>
          <h1 className="text-center font-bold text-6xl">Happy Birthday🎉</h1>
          <p className="mt-4 text-center">
            May this day be filled with joy, laughter and unforgettable moments. May your life be filled with bright colors of
            happiness, love and success. May each new day bring you only good memories and prosperity. Happiness, health and
            inspiration to you on this special day and always! 🎂🥳
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-10">
          <div className="text-center">
            <div className="font-bold text-3xl md:text-8xl lg:text-9xl font-mono">{days}</div>
            <div>days</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-3xl md:text-8xl lg:text-9xl font-mono">{hours}</div>
            <div>hours</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-3xl md:text-8xl lg:text-9xl font-mono">{minutes}</div>
            <div>minutes</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-3xl md:text-8xl lg:text-9xl font-mono">{seconds}</div>
            <div>seconds</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Timer;
