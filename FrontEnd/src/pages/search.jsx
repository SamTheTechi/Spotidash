import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TokenContext } from '../context/Context';

const DeepSearch = () => {
  const { token } = useContext(TokenContext);
  const [input, setInput] = useState(null);

  useEffect(() => {}, []);

  return (
    <>
      <header className=' flex justify-end flex-row lg:h-[10%] w-[100%] pr-6 lg:pt-5 lg:pr-12 overflow-hidden mb-8 sm:mb-12'>
        <Link to={`/dashboard`}>
          <button className='text-black font-semibold bg-custonmGreen hover:bg-custonmGreenHover w-[7rem] lg:w-[9rem] h-[2rem] lg:h-[2.5rem] rounded-[30px] border-[5px] border-[rgba(0,0,0,0.2)]'>
            Go-Back
          </button>
        </Link>
      </header>
      <section className=' w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[40%] flex justify-center flex-row h-[55%] md:h-[60%]'>
        <div className='flex  items-start w-[100%]'>
          <input
            type='text'
            className='w-[80%] rounded-[10px] text-zinc-900 pl-2 pr-2 border-[3px] border-customLightGray'
          />
        </div>
        <div></div>
      </section>
    </>
  );
};

export default DeepSearch;

const Tracks = () => {
  return (
    <>
      <div>
        <img src='' alt='' />
        <div>
          <span></span>
          <span></span>
        </div>
        <button></button>
      </div>
    </>
  );
};
