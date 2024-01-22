import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from "../../context/tokenContext";

const TopArtist = ({ width }) => {
  const { token } = useContext(TokenContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const Tracks = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10`,
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
        className={`flex flex-col ml-1.5 bg-green-600 overflow-auto w-[${width}%] rounded-[15px] scrollbar-hide border-[5px] border-[rgba(0,0,0,0.1)] `}
      >
        {data.map((items) => {
          let key = items.id;
          let Name = items.name;
          let imgUrl = items.images.find(
            (item) => item.height === 160 || item.height === 64
          )?.url;
          let Genres = items.genres.map((genre) => genre.name).join(", ");
          return (
            <ArtistLayer
              key={key}
              Name={Name}
              imgUrl={imgUrl}
              Genres={Genres}
            />
          );
        })}
      </section>
    </>
  );
};

const ArtistLayer = ({ imgUrl, Name, Genres }) => {
  return (
    <>
      <article className="p-1 pb-2 flex">
        <img
          src={imgUrl}
          alt={Name}
          className="aspect-square h-[64px] rounded-[8px]"
        />
        <div className="flex flex-col p-1">
          <div className=" text-base">{Name}</div>
          <div className="font-thin">{Genres}</div>
        </div>
      </article>
    </>
  );
};

export default TopArtist;
