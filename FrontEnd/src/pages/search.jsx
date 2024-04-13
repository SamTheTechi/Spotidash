import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TokenContext, PlaylistContext } from '../context/Context';

const DeepSearch = () => {
  const { token } = useContext(TokenContext);
  const [searchparam, setSearchparam] = useState(`yours`);
  const [searched, setSearched] = useState();

  const handleInput = (e) => {
    setTimeout(() => {
      setSearchparam(e.target.value);
    }, 750);
  };

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const data = await axios.get(
          `https://api.spotify.com/v1/search?q=${searchparam}&type=track&market=JP`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSearched(data.data.tracks.items);
      } catch (e) {
        throw e;
      }
    };
    handleSubmit();
  }, [token, searchparam]);

  return (
    <>
      <header className=' flex justify-end flex-row lg:h-[10%] w-[100%] pr-6 lg:pt-5 lg:pr-12 overflow-hidden mb-5 sm:mb-0'>
        <Link to={`/dashboard`}>
          <button className='text-black font-semibold bg-custonmGreen hover:bg-custonmGreenHover w-[7rem] lg:w-[9rem] h-[2rem] lg:h-[2.5rem] rounded-[30px] border-[5px] border-[rgba(0,0,0,0.2)]'>
            Go-Back
          </button>
        </Link>
      </header>
      <section className=' w-[100%] flex justify-center flex-row h-[3%] md:h-[3.5%] mb-5'>
        <input
          placeholder='Search for songs....'
          onChange={handleInput}
          type='text'
          className='w-[75%] sm:w-[70%] md:w-[65%] lg:w-[60%] xl:w-[45%] h-[100%] rounded-[8px] text-zinc-900 px-2 border-[2px] border-customLightGray'
        />
      </section>
      <section className='w-[90%] h-[65%] my-3 p-5 overflow-y-auto overflow-x-hidden rounded-[12px] bg-gray-700'>
        {searched &&
          searched.map((songs) => {
            let imageUrl = songs.album.images.find(
              (img) => img.height == 64
            ).url;
            let name = songs.name.split(`-`)[0];
            let preview = songs?.preview;
            let artist = songs.artists.map((artist) => artist.name)?.join(`, `);
            return (
              <Tracks
                imageUrl={imageUrl}
                name={name}
                preview={preview}
                artist={artist}></Tracks>
            );
          })}
      </section>
    </>
  );
};

export default DeepSearch;

const Tracks = ({ imageUrl, name, artist, preview }) => {
  return (
    <>
      <article className={`flex py-2`}>
        <img
          src={`${imageUrl}`}
          alt={name}
          className='`aspect-square mr-2 sm:h-[72px] h-[64px] rounded-[8px] shadow-customShadow'
        />
        <div className='flex flex-col p-0 sm:p-1 sm:pl-2 pl-1 justify-center'>
          <span className='text-base font-semibold sm:text-lg'>{name}</span>
          <span className='font-thin sm:text-base text-sm'>{artist}</span>
        </div>
      </article>
    </>
  );
};
