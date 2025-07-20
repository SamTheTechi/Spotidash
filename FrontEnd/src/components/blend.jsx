import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PlaylistContext } from '../context/Context';

const Blend = () => {
  return (
    <>
      <div className='border-[3px] sm:border-[5px] hover:shadow-customWhiteShadow border-[rgba(0,0,0,0.1)] rounded-[15px]  flex justify-center items-center overflow-hidden sm:m-1.5 m-1 bg-blue-500'>
        <Link to={`blend`}>
          <img
            src={`/Blend.jpg`}
            alt='Blends'
            className='rounded-[15px] hover:scale-[1.03] opacity-80 hover:opacity-50 transition duration-150 ease-in'
          />
        </Link>
      </div>
    </>
  );
};

export default Blend;
