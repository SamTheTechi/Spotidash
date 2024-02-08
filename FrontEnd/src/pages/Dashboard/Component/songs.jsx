import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import axios from "axios";
import { TokenContext } from "../../../context/Context";

const TopSongs = () => {
  const { token } = useContext(TokenContext);
  const [data, setData] = useState([]);

  const Tracks = useMemo(() => async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=30`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = response.data.items;
      setData(res);
    } catch (e) {}
  });

  useEffect(() => {
    Tracks();
  }, [token]);

  return (
    <>
      <section
        className={`flex flex-col ml-1.5 mr-1.5 bg-orange-600 overflow-auto w-[60%] rounded-[15px] scrollbar-hide border-[5px] border-[rgba(0,0,0,0.1)]`}
      >
        {data.map((items) => {
          let imgUrl = items.album.images.find(
            (item) => item.height === 64
          ).url;
          let Name = items.name.split(`-`)[0];
          let Artist = items.artists.map((artist) => artist.name)?.join(", ");
          let PreviewUrl = items.preview_url;
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
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(false);

  const handlePreviewSong = () => {
    if (audioRef.current) {
      playing ? audioRef.current.pause() : audioRef.current.play();
      setPlaying(!playing);
    }
  };

  return (
    <>
      <article
        onClick={handlePreviewSong}
        className="p-1.5 pb-3 flex hover:scale-[1.03] hover:text-black transition duration-150 ease-in"
      >
        <audio ref={audioRef} src={PreviewUrl}></audio>
        <img
          src={imgUrl}
          alt={Name}
          className=" aspect-square h-[64px] rounded-[8px] shadow-customShadow hover:opacity-90 transition duration-200 ease-in"
        />
        <div className="flex flex-col p-1 pl-2 justify-around">
          <div className=" text-base">{Name}</div>
          <div className="font-thin text-xs">{Artist}</div>
        </div>
      </article>
    </>
  );
};

export default TopSongs;
