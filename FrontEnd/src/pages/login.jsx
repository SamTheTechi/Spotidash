import React, { useEffect } from 'react';

const Login = () => {
  const handleClick = () => {
    window.location.href = `https://spotidash-server.vercel.app/login?redirectUrl=${encodeURI(
      window.location.origin
    )}`;
    // const handleClick = () => {
    //   window.location.href = `http://localhost:5000/login?redirectUrl=${encodeURI(
    //     window.location.origin
    //   )}`;
};

  return (
    <>
      <main className='bg-black text-white overflow-x-hidden h-screen w-screen m-0 p-0  box-border'>
        <header className=' flex justify-start items-start h-[20%] w-[100%] p-5 overflow-hidden'>
          <img
            src='https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png'
            alt=''
            className='pr-1 h-[1.6rem]'
          />
          <h2 className='items-center text-[1rem] font-semibold'>SpotiDash</h2>
        </header>
        <article className='pt-[10vh] flex items-center justify-around flex-col h-[40%]'>
          <section className=' h-[auto] text-3xl font-bold p-5'>
            Login to Countinue <br /> to SpotiDash
          </section>
          <section className=' h-[auto]'>
            <button
              className='text-black font-semibold bg-custonmGreen hover:bg-custonmGreenHover min-w-[15rem] aspect-[5/1] rounded-[30px] pt-[-80px] border-[5px] border-[rgba(0,0,0,0.2)]'
              onClick={handleClick}>
              Log in
            </button>
          </section>
        </article>
      </main>
    </>
  );
};

export default Login;
