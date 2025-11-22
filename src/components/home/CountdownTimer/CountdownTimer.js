import React, { useEffect, useState } from "react";

const CountdownTimer = ({ endTime }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(endTime) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (Object.keys(timeLeft).length === 0) {
    return <p className="text-red-600 font-bold">Offer Expired</p>;
  }

  return (
    <div className="flex items-center gap-3 text-lg font-semibold text-orange-600">
      <span>{timeLeft.days}d</span>:
      <span>{timeLeft.hours}h</span>:
      <span>{timeLeft.minutes}m</span>:
      <span>{timeLeft.seconds}s</span>
    </div>
  );
};

export default CountdownTimer;
