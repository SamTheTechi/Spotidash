import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { TokenContext } from '../context/Context';

const TopSongs = () => {
  const { token } = useContext(TokenContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const Tracks = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=30`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const res = response.data.items;
        setData(res);
      } catch (e) {}
    };
    Tracks();
    audioRef.current.volume = 0.4;
  }, [token]);

  const [song, setSong] = useState(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (playing && song) {
      audioRef.current.src = song;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playing, song]);

  const handlePreviewSong = (PreviewUrl) => {
    if (PreviewUrl === song) {
      setPlaying(!playing);
    } else {
      setSong(PreviewUrl);
      setPlaying(true);
    }
  };

  return (
    <>
      <section
        className={`flex flex-col sm:ml-1.5 ml-1 sm:mr-1.5 mr-1 bg-orange-600 overflow-auto w-[60%] overflow-x-hidden rounded-[15px] scrolll border-[5px] border-[rgba(0,0,0,0.1)] hover:shadow-customWhiteShadow`}>
        <audio ref={audioRef} src={song}></audio>
        {data.map((items) => {
          let imgUrl = items.album.images.find((item) => item.height === 64).url;
          let Name = items.name.split(`-`)[0];
          let Artist = items.artists.map((artist) => artist.name)?.join(', ');
          let PreviewUrl = items.preview_url;
          let key = items.uri.split(':')[2];
          if (!imgUrl) {
            return <p>no valid image</p>;
          }
          return (
            <SongLayer
              key={key}
              imgUrl={imgUrl}
              Name={Name}
              Artist={Artist}
              PreviewUrl={PreviewUrl}
              handlePreviewSong={() => handlePreviewSong(PreviewUrl)}
            />
          );
        })}
      </section>
    </>
  );
};

const SongLayer = ({ imgUrl, Name, Artist, PreviewUrl, handlePreviewSong }) => {
  return (
    <>
      <article
        onClick={handlePreviewSong}
        className='p-1 sm:pb-3 pb-2 flex hover:scale-[1.03] hover:text-black transition duration-150 ease-in cursor-pointer'>
        <img
          src={imgUrl}
          alt={Name}
          className={`aspect-square sm:h-[64px] h-[38px] rounded-[8px] shadow-customShadow transition duration-200 ease-in
          ${PreviewUrl ? `brightness-100` : `brightness-50 blur-[1px]`}`}
        />
        <div className='flex flex-col p-0 sm:p-1 sm:pl-2 pl-1 justify-around'>
          <div className='text-xs sm:text-base'>{Name}</div>
          <div className='font-thin hidden text-sm sm:block'>{Artist}</div>
        </div>
      </article>
    </>
  );
};

export default TopSongs;
