import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../context/Context';
const baseURL = 'http://localhost:5000/api/v1/UserId';

const Navbar = () => {
  const { token } = useContext(TokenContext);
  const [userID, setUserID] = useState('');
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
      } catch (e) {
        throw e;
      }
    };
    userInfo();
  }, [token]);

  useEffect(() => {
    const newUser = async () => {
      try {
        await axios.post(baseURL, { id: userID });
        setSignal(false);
      } catch (e) {
        throw e;
      }
    };
    newUser();
  }, [userID]);

  return (
    <header className=' flex justify-between flex-row h-[10%] w-[100%] pt-10 pl-5 pr-20 overflow-hidden'>
      <div className='flex'>
        <img
          src='https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png'
          alt=''
          className='pr-1 h-[1.6rem]'
        />
        <h2 className='items-center text-[1rem] font-semibold'>SpotiDash</h2>
      </div>
    </header>
  );
};

export default Navbar;
