import React, { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import { TokenContext } from "../../../context/Context";

const TopArtist = () => {
  const { token } = useContext(TokenContext);
  const [data, setData] = useState([]);

  const Artist = useMemo(() => async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=15`,
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
    Artist();
  }, [token]);

  return (
    <>
      <div
        className={`flex flex-col ml-1.5 bg-green-600 overflow-auto w-[40%] rounded-[15px] scrollbar-hide border-[5px] border-[rgba(0,0,0,0.1)] `}
      >
        {data.map((items) => {
          let key = items.id;
          let Name = items.name;
          let imgUrl = items.images.find(
            (item) => item.height === 160 || item.height === 64
          )?.url;
          let Genres = items.genres.map((genre) => genre.name).join(", ");
          let ArtistUrl = items.external_urls.spotify;

          return (
            <ArtistLayer
              key={key}
              Name={Name}
              imgUrl={imgUrl}
              Genres={Genres}
              ArtistUrl={ArtistUrl}
            />
          );
        })}
      </div>
    </>
  );
};

const ArtistLayer = ({ imgUrl, Name, Genres, ArtistUrl }) => {
  const handleClick = () => {
    window.location.href = ArtistUrl;
  };

  return (
    <>
      <article
        onClick={handleClick}
        className="p-1 pb-3 flex hover:scale-[1.03] hover:text-black hover:underline transition duration-150 ease-in cursor-pointer"
      >
        <img
          src={imgUrl}
          alt={Name}
          className="aspect-square h-[64px] rounded-[8px] shadow-customShadow hover:opacity-90 transition duration-200 ease-in"
        />
        <div className="flex flex-col p-1 pl-2 justify-around">
          <div className=" text-base mb-2 ">{Name}</div>
        </div>
      </article>
    </>
  );
};

export default TopArtist;
