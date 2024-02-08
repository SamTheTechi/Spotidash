import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DeepSearch = () => {
  return (
    <>
      <main className="bg-black h-screen w-screen text-white overflow-x box-border m-0 p-0 flex items-center justify-items-center flex-col">
        <header className=" flex justify-between flex-row h-[10%] w-[100%] pt-10 pl-5 pr-20 overflow-hidden mb-5">
          <div className="flex">
            <img
              src="https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png"
              alt=""
              className="pr-1 h-[1.6rem]"
            />
            <h2 className="items-center text-[1rem] font-semibold">
              SpotiDash
            </h2>
          </div>
          <Link to={`/dashboard`}>
            <button className="text-black font-semibold bg-custonmGreen hover:bg-custonmGreenHover w-[9rem] h-[2.5rem] rounded-[30px] border-[5px] border-[rgba(0,0,0,0.2)]">
              Go-Back
            </button>
          </Link>
        </header>
        <section className=" w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[40%] flex justify-center flex-row h-[55%] md:h-[60%]"></section>
      </main>
    </>
  );
};

export default DeepSearch;
