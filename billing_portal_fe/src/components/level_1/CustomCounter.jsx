import React, { useState } from "react";

function CustomCounter({ setCounter, counter }) {
  const increment = () => {
    setCounter((prev) => prev + 1);
  };
  const decrement = () => {
    setCounter((prev) => (prev > 0 ? prev - 1 : 0));
  };
  return (
    <div className="flex items-center justify-center   border border-[#9a9b9e] rounded-sm ">
      <button
        onClick={decrement}
        className="text-lg font-semibold text-black px-2 m-1 hover:bg-slate-100 border-1 border-black rounded-md"
      >
        -
      </button>
      <input
        type="number"
        value={counter}
        readOnly
        className="text-center text-lg font-semibold border border-gray-300 rounded-lg w-16"
      />
      <button
        onClick={increment}
        className="text-lg font-semibold text-black px-2 m-1 hover:bg-slate-400 border-1 border-black rounded-md"
      >
        +
      </button>
    </div>
  );
}

export default CustomCounter;
