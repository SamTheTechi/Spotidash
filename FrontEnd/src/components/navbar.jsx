import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../context/Context';
const baseURL = 'http://localhost:5000/api/v1/UserId';

const Navbar = () => {
  const { token } = useContext(TokenContext);
  const [userID, setUserID] = useState(null);
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
    <header className=' flex justify-between flex-row h-[10%] w-[100%] pt-4 pl-5 pr-16 overflow-hidden'>
      <div className='flex'>
        <h2 className='items-center text-xl text-customLightGray font-semibold'>
          Welcome,
          <span className='text-2xl text-white'> {userInfo.display_name} </span>
          <span className='text-base'>({userInfo.product})</span>
        </h2>
      </div>
      <img
        src={userInfo.images?.[0]?.url || `/UserIcon.png`}
        alt={userInfo.display_name}
        className='h-18  aspect-square object-cover rounded-[50%] border-[5px] border-customLightGray'
      />
    </header>
  );
};

export default Navbar;
