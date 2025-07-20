import React, { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import { PlaylistContext, TokenContext } from "../context/Context";
import { Link } from "react-router-dom";
const baseURL = "http://localhost:5000/api/v1/blendplaylist";

const FilterBlend = () => {
  const { token } = useContext(TokenContext);
  const { userPlaylist } = useContext(PlaylistContext);
  const [selectedBlends, setSelectedBlends] = useState([]);
  const [seletedFilter, setSeletedFilter] = useState([]);
  const [playlistExist, setPlaylistExist] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    blendlist: [],
    filterlist: [],
  });

  useEffect(() => {
    const blendIds = userPlaylist.filter(
      (item) =>
        item.description.slice(2, 7) === `Blend` &&
        item.owner.display_name === `Spotify`
    );
    setSelectedBlends(blendIds);
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
    setSeletedFilter(notBlendIds);
  }, [userPlaylist]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBlends.length === 0) {
      console.log(`Blend playlist not found`);
      return;
    }
    const postPlaylistData = async () => {
      try {
        await axios.post(baseURL, selectedItems);
      } catch (e) {
        throw e;
      }
    };
    postPlaylistData();
    setTimeout(() => {
      setPlaylistExist(true);
    }, 500);
  };

  if (playlistExist === true) {
    return (
      <>
        <main className="bg-black h-screen w-screen text-white overflow-x box-border m-0 p-0 flex items-center justify-items-center flex-col">
          <header className=" flex justify-between flex-row h-[10%] w-[100%] pt-10 pl-5 pr-20 overflow-hidden mb-28">
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
          <section className="flex items-center justify-center w-[75%] sm:w-[65%] md:w-[55%] lg:w-[45%] xl:w-[30%] h-[55%]">
            <div className="flex flex-col text-4xl">
              Playlist Added!
              <span className=" text-lg text-center mt-1">
                might take a few while
              </span>
            </div>
          </section>
        </main>
      </>
    );
  } else {
    return (
      <>
        <main className="bg-black h-screen w-screen text-white overflow-x box-border m-0 p-0 flex items-center justify-items-center flex-col">
          <header className=" flex justify-between flex-row h-[10%] w-[100%] pt-10 pl-5 pr-20 overflow-hidden mb-16">
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

          <section className=" w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[40%] flex justify-center flex-row h-[55%] md:h-[60%]">
            <article
              className={` bg-yellow-500 p-2 h-[100%] w-[50%] rounded-[15px] mr-2 overflow-auto scrollbar-hide border-[5px] border-[rgba(0,0,0,0.2)] scrollbar-thumb-gray-500`}
            >
              <form>
                {selectedBlends.map((items) => {
                  let Name = items.name;
                  let imgUrl = items.images[0]?.url;
                  let Key = items.id;
                  return (
                    <SelectPlatlist
                      key={Key}
                      playlistImage={imgUrl}
                      playlistName={Name}
                      playlistIds={Key}
                      setSelectedItems={setSelectedItems}
                      selectedList="blendlist"
                    />
                  );
                })}
              </form>
            </article>
            <article
              className={` bg-purple-800 p-2 h-[100%] w-[50%] rounded-[15px] mr-2 overflow-auto scrollbar-hide border-[5px] border-[rgba(0,0,0,0.2)] scrollbar-thumb-black`}
            >
              <form>
                {/* <SelectPlatlist key={} playlistImage={} playlistName={}/> */}
                {seletedFilter.map((items) => {
                  let Name = items.name;
                  let imgUrl = items.images[0]?.url;
                  let Key = items.id;
                  return (
                    <SelectPlatlist
                      key={Key}
                      playlistImage={imgUrl}
                      playlistName={Name}
                      playlistIds={Key}
                      setSelectedItems={setSelectedItems}
                      selectedList="filterlist"
                    />
                  );
                })}
              </form>
            </article>
          </section>
          <button
            className="text-black font-semibold bg-custonmGreen hover:bg-custonmGreenHover min-w-[25rem] aspect-[8/1] rounded-[30px] pt-[-80px] border-[5px] border-[rgba(0,0,0,0.2)] mt-[5vh] "
            onClick={handleSubmit}
          >
            FilterPlaylist
          </button>
        </main>
      </>
    );
  }
};

const SelectPlatlist = ({
  playlistName,
  playlistImage,
  playlistIds,
  setSelectedItems,
  selectedList,
}) => {
  const [cheakBox, setCheakBox] = useState(false);

  const handleSwitch = (e) => {
    const { checked, id } = e.target;
    setCheakBox(checked);

    setSelectedItems((prev) => ({
      ...prev,
      [selectedList]: checked
        ? [...prev[selectedList], id]
        : prev[selectedList].filter((item) => item !== id),
    }));
  };

  return (
    <>
      <label
        className={`text-xl p-1 pt-2 pb-2 mt-2 flex flex-row items-center shadow-customShadow transition ease-out duration-100 ${
          cheakBox
            ? ` border-gray-600 bg-[rgba(0,0,0,0.2)] text-gray-400 scale-[0.95]`
            : ` border-gray-500  bg-[rgba(255,252,252,0.1)] hover:scale-[1.05] hover:text-gray-900`
        } 
        border-4 rounded-[12px] mb-2 `}
      >
        <img
          src={playlistImage}
          alt={playlistName}
          className="h-[3.5rem] md:h-[3rem] w-[3.5rem] md:w-[3rem] rounded-[8px] shadow-customShadow"
        />
        <h4 className="pl-2">{playlistName}</h4>
        <input
          type="checkbox"
          id={playlistIds}
          checked={cheakBox}
          onChange={handleSwitch}
          className="hidden"
        />
      </label>
    </>
  );
};

export default FilterBlend;

// const [holderColorBlend, setHolderColorBlend] = useState("");
// const [holderColorFilter, setHolderColorFilter] = useState("");
// useEffect(() => {
//   let getColor = () => Colors[Math.floor(Math.random() * Colors.length)];
//   setHolderColorBlend(getColor());
//   setHolderColorFilter(getColor());
// }, [userPlaylist]);
// const Colors = [
//   `rgb(192,255,69)`,
//   `rgb(152,63,244)`,
//   `rgb(246,60,202)`,
//   `rgb(189,35,97)`,
//   `rgb(233,128,26)`,
//   `rgb(248,218,5)`,
//   `rgb(110,30,110)`,
// ];
