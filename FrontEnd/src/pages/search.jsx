import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TokenContext, PlaylistContext } from '../context/Context';

const DeepSearch = () => {
  const { token } = useContext(TokenContext);
  const { userPlaylist } = useContext(PlaylistContext);
  const [searchparam, setSearchparam] = useState(``);
  const [searched, setSearched] = useState();

  const handleInput = (e) => {
    console.log(`aalo`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`dagta`);
  };

  useEffect(() => {
    const SearchedSongs = async () => {
      try {
        const data = await axios.get(
          'https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=track',
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
    SearchedSongs();
  }, [token]);

  console.log(searched);
  return (
    <>
      <header className=' flex justify-end flex-row lg:h-[10%] w-[100%] pr-6 lg:pt-5 lg:pr-12 overflow-hidden mb-8 sm:mb-12'>
        <Link to={`/dashboard`}>
          <button className='text-black font-semibold bg-custonmGreen hover:bg-custonmGreenHover w-[7rem] lg:w-[9rem] h-[2rem] lg:h-[2.5rem] rounded-[30px] border-[5px] border-[rgba(0,0,0,0.2)]'>
            Go-Back
          </button>
        </Link>
      </header>
      <div className=' w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[40%] flex justify-center flex-row h-[55%] md:h-[60%]'>
        <div className='flex  items-start w-[100%]'>
          <input
            onChange={handleInput}
            onClick={handleSubmit}
            type='text'
            className='w-[80%] rounded-[10px] text-zinc-900 pl-2 pr-2 border-[3px] border-customLightGray'
          />
        </div>
      </div>
      <div>
        {searched.map((songs) => {
          let imageUrl = songs.album.images.find((img) => img.height == 64).url;
          let name = songs.name.split(`-`)[0];
          let preview = songs?.preview;
          let artist = songs.artists.map((artist) => artist.name)?.join(`, `);
          return (
            <>
              <Tracks
                imageUrl={imageUrl}
                name={name}
                preview={preview}
                artist={artist}></Tracks>
            </>
          );
        })}
      </div>
    </>
  );
};

export default DeepSearch;

const Tracks = ({ imageUrl, name, artist, preview }) => {
  return (
    <>
      <section>
        <img src={`${imageUrl}`} alt={name} c />
        <div>
          <span>{name}</span>
          <span>{artist}</span>
        </div>
        <button>{preview}</button>
        <button>+</button>
      </section>
    </>
  );
};
