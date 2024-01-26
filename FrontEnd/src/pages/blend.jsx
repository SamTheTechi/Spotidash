import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { PlaylistContext } from "../context/Context";
const baseURL = "http://localhost:5000/api/v1/blendplaylist";

const FilterBlend = () => {
  const { userPlaylist } = useContext(PlaylistContext);

  return (
    <>
      <main className="bg-black h-screen w-screen text-white overflow-x box-border m-0 p-0 flex items-center justify-items-center flex-col">
        <header className=" flex justify-start items-start h-[10%] w-[100%] p-5 overflow-hidden mb-[8vh]">
          <img
            src="https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png"
            alt=""
            className="pr-1 h-[1.6rem]"
          />
          <h2 className="items-center text-[1rem] font-semibold">
            SpotiSearch
          </h2>
        </header>
        <section className=" w-[75%] sm:w-[65%] md:w-[55%] lg:w-[45%] xl:w-[30%] flex justify-center flex-row h-[70%]">
          <article className="bg-pink-400 p-2 h-[100%] w-[50%] rounded-[15px] mr-1.5 scrollbar-hide border-[5px] border-[rgba(0,0,0,0.1)]"></article>
          <article className="bg-yellow-500 p-2 h-[100%] w-[50%] rounded-[15px] ml-1.5 scrollbar-hide border-[5px] border-[rgba(0,0,0,0.1)]"></article>
        </section>
      </main>
    </>
  );
};

export default FilterBlend;
