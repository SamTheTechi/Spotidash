import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../context/Context';

const Navbar = () => {
  const { token } = useContext(TokenContext);
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState(null);
  const [variable, setVariable] = useState(true);
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    const userInfo = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const resData = response.data;
        setUserInfo(resData);
        setUserID(resData.id);
        setUserName(resData.display_name);
      } catch (e) {
        throw e;
      }
    };
    userInfo();
    if (variable) {
      let access_token = window.location.search.split(`=`)[1];
      localStorage.setItem('Token', access_token);
      setVariable(false);
    }
  }, [token]);

  useEffect(() => {
    const newUser = async () => {
      try {
        await axios.post(`https://spotidash-server.vercel.app/api/v1/UserId`, {
          userID: userID,
          userName: userName,
          access_token: localStorage.getItem('Token'),
        });
      } catch (e) {
        throw e;
      }
    };
    localStorage.setItem('UserID', userID);
    newUser();
  }, [userInfo]);

  return (
    <header className=' flex justify-between flex-row h-[10%] w-[100%] pt-4 pl-5 pr-4 md:pr-16 overflow-hidden font-semibold'>
      <div className='flex'>
        <img src='/logo.svg' alt='logo' className='h-8 md:h-10 pr-2' />
        <h2 className='items-center text-lg md:text-xl text-customLightGray font-semibold'>
          Welcome,
          <span className='md:text-2xl text:xl text-white'>
            {' '}
            {userInfo.display_name}{' '}
          </span>
          <span className='text-base'>({userInfo.country})</span>
        </h2>
      </div>
      <img
        src={userInfo.images?.[0]?.url || `/UserIcon.png`}
        alt={userInfo.display_name}
        className='h-10 md:h-12 aspect-square object-cover rounded-[50%] border-[3px] border-customLightGray'
      />
    </header>
  );
};

export default Navbar;
