import { useEffect, useState } from 'react';

function Timer({ date }: { date: string }) {
  const [isBirthday, setIsBirthday] = useState<boolean>(false);
  const [timer, setTimer] = useState({ targetDateTime: new Date(), timeRemaining: 0, isRunning: false });

  useEffect(() => {
    const birthday = new Date(date);
    const today = new Date();

    birthday.setHours(0);
    birthday.setFullYear(today.getFullYear());

    if (birthday < today) birthday.setFullYear(new Date().getFullYear() + 1);
    if (today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth()) setIsBirthday(true);
    if (!isBirthday) setTimer({ targetDateTime: birthday, timeRemaining: calculateTimeRemaining(birthday), isRunning: true });
  }, [date, isBirthday]);

  useEffect(() => {
    let timerInterval: number | null = null;

    const updateTimer = () => {
      setTimer((prevTimer) => {
        const targetTime = new Date(prevTimer.targetDateTime).getTime();
        const currentTime = new Date().getTime();
        const timeRemaining = Math.max(Math.floor((targetTime - currentTime) / 1000), 0);

        if (timeRemaining === 0 && timerInterval) {
          clearInterval(timerInterval);
          return {
            ...timer,
            isRunning: false,
            timeRemaining: 0,
          };
        }

        return { ...timer, timeRemaining };
      });
    };

    if (timer.isRunning && timer.timeRemaining > 0 && !isBirthday) {
      timerInterval = setInterval(updateTimer, 1000);
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [timer, isBirthday]);

  const calculateTimeRemaining = (targetTime: Date) => {
    const timeDifference = targetTime.getTime() - new Date().getTime();
    const secondsRemaining = Math.max(Math.floor(timeDifference / 1000), 0);
    return secondsRemaining;
  };

  const formatTimeRemaining = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds: remainingSeconds,
    };
  };

  const timeRemaining = formatTimeRemaining(timer.timeRemaining);

  return (
    <div>
      {isBirthday ? (
        <h1>Happy Birthday🎉</h1>
      ) : (
        <div>
          <div>
            <div>
              <h1>
                <strong>{timeRemaining.days}</strong>
              </h1>
            </div>
            <div>days</div>
          </div>
          <div>
            <div>
              <h1>
                <strong>{timeRemaining.hours}</strong>
              </h1>
            </div>
            <div>hours</div>
          </div>
          <div>
            <div>
              <h1>
                <strong>{timeRemaining.minutes}</strong>
              </h1>
            </div>
            <div>minutes</div>
          </div>
          <div>
            <div>
              <h1>
                <strong>{timeRemaining.seconds}</strong>
              </h1>
            </div>
            <div>seconds</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Timer;
