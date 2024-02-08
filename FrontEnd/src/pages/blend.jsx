import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { PlaylistContext, TokenContext } from "../context/Context";
import { Link } from "react-router-dom";
const baseURL = "http://localhost:5000/api/v1/blendplaylist";

const FilterBlend = () => {
  const { token } = useContext(TokenContext);
  const { userPlaylist } = useContext(PlaylistContext);
  const [selectedBlends, setSelectedBlends] = useState([]);
  const [seletedFilter, setSeletedFilter] = useState([]);
  const [userliked, setUserliked] = useState([]);
  const [holderColorBlend, setHolderColorBlend] = useState("");
  const [holderColorFilter, setHolderColorFilter] = useState("");
  const [selectedItems, setSelectedItems] = useState({
    blendlist: [],
    filterlist: [],
  });

  const Colors = [
    `rgb(192,255,69)`,
    `rgb(152,63,244)`,
    `rgb(246,60,202)`,
    `rgb(189,35,97)`,
    `rgb(233,128,26)`,
    `rgb(248,218,5)`,
    `rgb(110,30,110)`,
  ];

  const onClick = (e) => {
    e.preventDefault();
    window.location.origin;
  };

  const onSubmit = () => {
    e.preventDefault();
    if (selectedBlends.length === 0) {
      console.log(`Blend playlist not found`);
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
      setBlendPlaylistExist(true);
    }, 500);
  };

  useEffect(() => {
    const getLikedsongs = async () => {
      try {
        let offset = 0;
        var allLikedTracks = [];
        do {
          var response = await axios.get(
            `https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const tracks = response.data.items.map((item) => item.track.url);
          allLikedTracks = allLikedTracks.concat(response);
          offset += 50;
        } while (offset < response.data.total);
      } catch (e) {
        throw e;
      }
      setUserliked((prevLiked) => [...prevLiked, ...allLikedTracks]);
      console.log(userliked);
    };
    getLikedsongs();
  }, [token]);

  useEffect(() => {
    let getColor = () => Colors[Math.floor(Math.random() * Colors.length)];
    setHolderColorBlend(getColor());
    setHolderColorFilter(getColor());
  }, [userPlaylist]);

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
        <section className=" w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[40%] flex justify-center flex-row h-[55%] md:h-[60%]">
          <article
            className={`bg-[${holderColorBlend}] bg-yellow-600 p-2 h-[100%] w-[50%] rounded-[15px] mr-2 overflow-auto scrollbar-hide border-[5px] border-[rgba(0,0,0,0.2)] scrollbar-thumb-gray-500`}
            style={{ scrollbarWidth: "thin" }}
          >
            <form>
              {selectedBlends.map((items) => {
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
          <article
            className={`bg-[${holderColorFilter}] bg-pink-600 p-2 h-[100%] w-[50%] rounded-[15px] mr-2 overflow-auto scrollbar-hide border-[5px] border-[rgba(0,0,0,0.2)] scrollbar-thumb-black`}
          >
            <form>
              {/* <SelectPlatlist key={} playlistImage={} playlistName={}/> */}
              {seletedFilter.map((items) => {
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
        <button
          className="text-black font-semibold bg-custonmGreen hover:bg-custonmGreenHover min-w-[25rem] aspect-[8/1] rounded-[30px] pt-[-80px] border-[5px] border-[rgba(0,0,0,0.2)] mt-[5vh] "
          onClick={onSubmit}
        >
          FilterPlaylist
        </button>
      </main>
    </>
  );
};

const SelectPlatlist = ({ playlistName, playlistImage }) => {
  const [cheakBox, setCheakBox] = useState(false);
  const handleSwitch = () => {
    setCheakBox(!cheakBox);
  };

  return (
    <>
      <label
        className={`text-xl p-1.5 flex flex-row ${
          cheakBox
            ? `border-custonmGreenHover bg-[rgba(0,0,0,0.2)]`
            : ` border-custonmGreen bg-[rgba(256,256,256,0.2)]`
        } 
       border-4 rounded-[12px] mb-2 `}
      >
        <img
          src={playlistImage}
          alt={playlistName}
          className="h-[3.5rem] md:h-[3rem] w-[3.5rem] md:w-[3rem] rounded-[8px] pr-1"
        />
        <h4>{playlistName}</h4>
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
