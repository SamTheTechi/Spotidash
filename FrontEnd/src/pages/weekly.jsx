import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { PlaylistContext } from '../context/Context';
import { Link } from 'react-router-dom';
const weeklyEndpoint = `${import.meta.env.VITE_OAUTH}api/v1/weeklyplaylist`;

const DiscoverWeekly = () => {
  const { userPlaylist } = useContext(PlaylistContext);
  const [weeklyPlaylist, setWeeklyPlaylist] = useState('');
  const [weeklyPlaylistExist, setweeklyPlaylistExist] = useState(false);
  const [NewplaylistData, setNewplaylistData] = useState({
    name: '',
    description: '',
    weeklyPlaylistId: '',
    access_token: localStorage.getItem('Token'),
    userID: localStorage.getItem('UserID'),
  });

  useEffect(() => {
    const weeklyPlaylistid = userPlaylist
      .filter((item) => item.name === 'Discover Weekly' && item.owner.display_name === `Spotify`)
      .map((playlist) => playlist.id)[0];
    setWeeklyPlaylist(weeklyPlaylistid);
    setNewplaylistData((prevData) => ({
      ...prevData,
      weeklyPlaylistId: weeklyPlaylistid,
    }));
  }, [userPlaylist]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewplaylistData({
      ...NewplaylistData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (weeklyPlaylist.length === 0) {
      console.log('Discover Weekly playlist not found');
      return;
    }
    const postPlaylistData = async () => {
      try {
        await axios.post(weeklyEndpoint, NewplaylistData);
      } catch (e) {
        throw e;
      }
    };
    postPlaylistData();
    setTimeout(() => {
      setweeklyPlaylistExist(true);
    }, 500);
  };

  if (weeklyPlaylistExist === true) {
    return (
      <>
        <header className=' flex justify-end flex-row h-[10%] w-[100%] pr-6 lg:pt-5 lg:pr-12 overflow-hidden '>
          <Link to={`/dashboard`}>
            <button className='text-black font-semibold bg-custonmGreen hover:bg-custonmGreenHover w-[7rem] lg:w-[9rem] h-[2rem] lg:h-[2.5rem] rounded-[30px] border-[5px] border-[rgba(0,0,0,0.2)]'>
              Go-Back
            </button>
          </Link>
        </header>
        <section className=' w-[75%] sm:w-[65%] md:w-[55%] lg:w-[45%] xl:w-[30%] flex items-center justify-center h-[55%] text-4xl text-center'>
          Your Weekly gonna <br /> Roll Now!
        </section>
      </>
    );
  } else {
    return (
      <>
        <header className=' flex justify-end flex-row lg:h-[10%] w-[100%] pr-6 lg:pt-5 lg:pr-12 overflow-hidden mb-20 '>
          <Link to={`/dashboard`}>
            <button className='text-black font-semibold bg-custonmGreen hover:bg-custonmGreenHover w-[7rem] lg:w-[9rem] h-[2rem] lg:h-[2.5rem] rounded-[30px] border-[5px] border-[rgba(0,0,0,0.2)]'>
              Go-Back
            </button>
          </Link>
        </header>
        <section className=' w-[75%] sm:w-[65%] md:w-[55%] lg:w-[45%] xl:w-[30%] flex items-center h-[40%] pt-5 lg:pt-0 lg:h-[45%] bg-gray-900 border-2 border-gray-800 rounded-[15px] '>
          <form
            onSubmit={handleSubmit}
            className='flex h-[100%] w-[100%] justify-around items-center flex-col'>
            <div>
              <label className='flex justify-center items-start flex-col p-2'>
                Playlist Name
                <input
                  required
                  type='text'
                  placeholder='Name'
                  name='name'
                  onChange={handleInput}
                  value={NewplaylistData.name}
                  className=' lg:min-w-[18rem] aspect-[7/1] mt-1.5 pl-2 pr-2 bg-customGray border-[2px] rounded-md border-[rgb(100,100,100)] hover:border-white'
                />
              </label>
              <label className='flex justify-center items-start flex-col p-2'>
                Playlist Description
                <input
                  type='text'
                  placeholder='Description'
                  name='description'
                  onChange={handleInput}
                  value={NewplaylistData.description}
                  className=' lg:min-w-[18rem] aspect-[7/1] mt-1.5 pl-2 pr-2 bg-customGray border-[2px] rounded-md border-[rgb(100,100,100)] hover:border-white'
                />
              </label>
            </div>
            <button
              className='text-black font-semibold bg-custonmGreen hover:bg-custonmGreenHover lg:min-w-[18rem] aspect-[6/1] rounded-[30px] border-[5px] border-[rgba(0,0,0,0.2)] mb-5'
              type='submit'>
              Cleate playlist
            </button>
          </form>
        </section>
      </>
    );
  }
};

export default DiscoverWeekly;
