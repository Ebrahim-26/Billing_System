"use client";
import React, { useState, useEffect } from "react";

function DashboardCard({ value, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const targetValue = value;
    const duration = 1000;
    const incrementTime = 50;

    const digitCount = targetValue.toString().length;
    const baseStep = Math.max(
      Math.round(targetValue / (duration / incrementTime)),
      1
    );
    let step = baseStep;

    if (digitCount > 5) {
      step = Math.max(baseStep * 2, 10);
    }

    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < targetValue) {
          return Math.min(prevCount + step, targetValue);
        }
        clearInterval(interval);
        return targetValue;
      });
    }, incrementTime);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div
      className={`bg-[#1b1b1d] backdrop-blur-lg text-[#d54217] rounded-lg border-[#d54217] border-2 h-auto max-h-[200px] w-full min-w-[300px] p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl transition-shadow duration-300`}
    >
      <p className="font-bold text-4xl md:text-5xl lg:text-6xl">{count}</p>
      <p className="font-light text-nowrap text-2xl md:text-3xl lg:text-4xl ">
        {label}
      </p>
    </div>
  );
}

export default DashboardCard;
