import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FRAMER_FADE_INOUT } from '../util/framer';

const Search = () => {
  return (
    <>
      <motion.section
        {...FRAMER_FADE_INOUT}
        className='sm:border-[5px] border-[3px] border-[rgba(0,0,0,0.1)] rounded-[15px]  flex justify-center items-center overflow-hidden sm:mt-1.5 mt-1 sm:ml-1.5 ml-1 sm:mr-1.5 mr-1 bg-yellow-600'>
        <Link to={`search`}>
          <img
            src={`/Search.jpg`}
            alt='Discover Weekly'
            className='rounded-[15px] hover:scale-[1.03] opacity-80 hover:opacity-50 transition duration-150 ease-in'
          />
        </Link>
      </motion.section>
    </>
  );
};

export default Search;
