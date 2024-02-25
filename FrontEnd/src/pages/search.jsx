import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DeepSearch = () => {
  return (
    <>
      <header className=' flex justify-end flex-row h-[10%] w-[100%] pt-10 pr-20 overflow-hidden mb-1'>
        <Link to={`/dashboard`}>
          <button className='text-black font-semibold bg-custonmGreen hover:bg-custonmGreenHover w-[9rem] h-[2.5rem] rounded-[30px] border-[5px] border-[rgba(0,0,0,0.2)]'>
            Go-Back
          </button>
        </Link>
      </header>
      <section className=' w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[40%] flex justify-center flex-row h-[55%] md:h-[60%]'></section>
    </>
  );
};

export default DeepSearch;
