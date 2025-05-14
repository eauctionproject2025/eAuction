"use client";
import { useEffect, useState } from "react";

function CountdownTimer({ startTime, endTime }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) {
    const seconds = Math.floor((start - now) / 1000);
    return <p className="text-yellow-200 py-1">Auction starts in: {formatTime(seconds)}</p>;
  }

  if (now > end) {
    return <p className="text-red-200 py-1">Auction has ended</p>;
  }

  const secondsLeft = Math.floor((end - now) / 1000);
  return <p className="text-green-200 py-1">Time remaining: {formatTime(secondsLeft)}</p>;
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
}
export default CountdownTimer;