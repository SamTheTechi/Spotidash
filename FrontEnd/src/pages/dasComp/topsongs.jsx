import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from "../../context/Context";

const TopSongs = ({ width }) => {
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
  }, [token]);

  return (
    <>
      <section
        className={`flex flex-col ml-1.5 mr-1.5 bg-orange-600 overflow-auto w-[${width}%] rounded-[15px] scrollbar-hide border-[5px] border-[rgba(0,0,0,0.1)]`}
      >
        {data.map((items) => {
          let imgUrl = items.album.images.find(
            (item) => item.height === 64
          ).url;
          let Name = items.name;
          let Artist = items.artists.map((artist) => artist.name)?.join(", ");
          let PreviewUrl = items.preview_url;
          // console.log(PreviewUrl);
          let key = items.uri.split(":")[2];
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
            />
          );
        })}
      </section>
    </>
  );
};

const SongLayer = ({ imgUrl, Name, Artist, PreviewUrl }) => {
  return (
    <>
      <article className="p-1.5 pb-2 flex hover:scale-105 transition-[2s] hover:text-black">
        <audio src={PreviewUrl}></audio>
        <img
          src={imgUrl}
          alt={Name}
          className=" aspect-square h-[64px] rounded-[8px]"
        />
        <div className="flex flex-col p-1 justify-around">
          <div className=" text-base">{Name}</div>
          <div className="font-thin text-xs">{Artist}</div>
        </div>
      </article>
    </>
  );
};

export default TopSongs;
