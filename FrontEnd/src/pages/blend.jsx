import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { PlaylistContext } from "../context/Context";
const baseURL = "http://localhost:5000/api/v1/blendplaylist";

const FilterBlend = () => {
  const { userPlaylist } = useContext(PlaylistContext);
  const [usersBlends, setUsersBlends] = useState([]);
  const [usersFilter, setUsersFilter] = useState([]);

  useEffect(() => {
    const blendIds = userPlaylist.filter(
      (item) =>
        item.description.slice(2, 7) === `Blend` &&
        item.owner.display_name === `Spotify`
    );
    setUsersBlends(blendIds);
    const notBlendIds = userPlaylist.filter((item) => {
      if (item.owner.display_name === `Spotify`) {
        return item.description.slice(2, 7) !== `Blend`;
      } else {
        return (
          item.description.slice(2, 7) !== `Blend` &&
          item.owner.display_name !== `Spotify`
        );
      }
    });
    setUsersFilter(notBlendIds);
  }, [userPlaylist]);
  console.log(usersFilter);
  return (
    <>
      <main className="bg-black h-screen w-screen text-white overflow-x box-border m-0 p-0 flex items-center justify-items-center flex-col">
        <header className=" flex justify-start items-start h-[10%] w-[100%] p-5 overflow-hidden mb-[10vh]">
          <img
            src="https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png"
            alt=""
            className="pr-1 h-[1.6rem]"
          />
          <h2 className="items-center text-[1rem] font-semibold">
            SpotiSearch
          </h2>
        </header>
        <section className=" w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[40%] flex justify-center flex-row h-[55%] md:h-[65%]">
          <article className="bg-pink-400 p-2 h-[100%] w-[50%] rounded-[15px] mr-2 scrollbar-hide overflow-auto border-[5px] border-[rgba(0,0,0,0.1)]">
            <form>
              {usersBlends.map((items) => {
                let Name = items.name;
                let imgUrl = items.images[0].url;
                let Key = items.id;
                return (
                  <SelectPlatlist
                    key={Key}
                    playlistImage={imgUrl}
                    playlistName={Name}
                  />
                );
              })}
            </form>
          </article>
          <article className="bg-yellow-400 p-2 h-[100%] w-[50%] rounded-[15px] mr-2 scrollbar-hide overflow-auto border-[5px] border-[rgba(0,0,0,0.1)]">
            <form>
              {usersFilter.map((items) => {
                let Name = items.name;
                let imgUrl = items.images[0].url;
                let Key = items.id;
                return (
                  <SelectPlatlist
                    key={Key}
                    playlistImage={imgUrl}
                    playlistName={Name}
                  />
                );
              })}
            </form>
          </article>
        </section>
      </main>
    </>
  );
};

const SelectPlatlist = ({ playlistName, playlistImage }) => {
  const [cheakBox, setCheakBox] = useState(false);
  const handleSwitch = () => {
    setCheakBox(!cheakBox);
  };
  console.log(cheakBox);
  return (
    <>
      <label
        className={`text-2xl p-2 flex flex-row ${
          cheakBox
            ? `border-custonmGreenHover bg-[rgba(0,0,0,0.2)]`
            : ` border-custonmGreen bg-[rgba(256,256,256,0.2)]`
        } 
       border-4 rounded-[12px] mb-2 `}
      >
        <img
          src={playlistImage}
          alt={playlistName}
          className="h-[3.5rem] md:h-[3rem] w-[3.5rem] md:w-[3rem] rounded-[8px]"
        />
        <p>{playlistName}</p>
        <input
          type="checkbox"
          id={`checkbox-${playlistName}`}
          checked={cheakBox}
          onClick={handleSwitch}
          className="hidden"
        />
      </label>
    </>
  );
};

export default FilterBlend;
