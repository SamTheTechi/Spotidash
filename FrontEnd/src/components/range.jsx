import React, { useState, useContext, useEffect } from 'react';
import { TimeRangeContext } from '../context/Context';

const Player = () => {
  const { setRange } = useContext(TimeRangeContext);

  const ChangeRange = (e) => {
    setRange(e.target.value);
  };

  return (
    <>
      <section
        className={`flex flex-row sm:m-1.5 m-1  bg-purple-700 h-[14%] overflow-auto overflow-x-hidden rounded-[15px] border-[3px] font-medium text-[12px] sm:text-lg sm:border-[5px] border-[rgba(0,0,0,0.1)] justify-evenly items-center`}>
        <button onClick={ChangeRange} value={`long`}>
          long
        </button>
        <button onClick={ChangeRange} value={`medium`}>
          medium
        </button>
        <button onClick={ChangeRange} value={`short`}>
          short
        </button>
      </section>
    </>
  );
};

export default Player;
