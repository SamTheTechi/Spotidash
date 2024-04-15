import React, { useState, useEffect, useContext } from 'react';
import { PlaylistContext } from '../context/Context';
import { motion } from 'framer-motion';
import { FRAMER_FADE_INOUT } from '../util/framer';

import { Link } from 'react-router-dom';

const Weekly = () => {
  return (
    <>
      <motion.section
        {...FRAMER_FADE_INOUT}
        className='sm:border-[5px] border-[3px] border-[rgba(0,0,0,0.1)] rounded-[15px]  flex justify-center items-center overflow-hidden sm:m-1.5 m-1 bg-pink-400'>
        <Link to={`weekly`}>
          <img
            src={`/Weekly.jpg`}
            alt='Discover Weekly'
            className='rounded-[15px] hover:scale-[1.03] opacity-80 hover:opacity-50 transition duration-150 ease-in'
          />
        </Link>
      </motion.section>
    </>
  );
};

export default Weekly;
