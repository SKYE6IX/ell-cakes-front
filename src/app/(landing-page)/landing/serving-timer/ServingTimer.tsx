"use client";
import { useEffect, useState } from "react";
import "./serving-timer.scss";

const timerOptions = [
  { minutes: 15, label: "15 мин", variant: "" },
  { minutes: 30, label: "30 мин", variant: "ghost" },
];

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

function ServingTimer() {
  const [total, setTotal] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning && secondsLeft <= 0) {
      setIsRunning(false);
      setSecondsLeft(0);
      setIsDone(true);
    }
  }, [isRunning, secondsLeft]);

  const handleStart = (minutes: number) => {
    const seconds = minutes * 60;
    if (isRunning && total === seconds) {
      setIsRunning(false);
      setSecondsLeft(seconds);
      return;
    }
    setIsDone(false);
    setTotal(seconds);
    setSecondsLeft(seconds);
    setIsRunning(true);
  };

  return (
    <>
      <div className="serving-timer">
        <span className="serving-timer__clock" aria-live="polite">
          {formatTime(secondsLeft)}
        </span>
        <div className="serving-timer__btns">
          {timerOptions.map((option) => (
            <button
              key={option.minutes}
              type="button"
              className={["serving-timer__btn", option.variant].join(" ")}
              onClick={() => handleStart(option.minutes)}
            >
              {isRunning && total === option.minutes * 60
                ? "Стоп"
                : option.label}
            </button>
          ))}
        </div>
      </div>
      {isDone && <span className="serving-timer__done">Можно подавать!</span>}
    </>
  );
}

export default ServingTimer;
