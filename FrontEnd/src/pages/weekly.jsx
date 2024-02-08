import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { PlaylistContext } from "../context/Context";
import { Link } from "react-router-dom";
const baseURL = "http://localhost:5000/api/v1/weeklyplaylist";

const DiscoverWeekly = () => {
  const { userPlaylist } = useContext(PlaylistContext);
  const [weeklyPlaylist, setWeeklyPlaylist] = useState("");
  const [weeklyPlaylistExist, setweeklyPlaylistExist] = useState(false);
  const [NewplaylistData, setNewplaylistData] = useState({
    name: "",
    description: "",
    weeklyPlaylistId: "",
  });

  useEffect(() => {
    const weeklyPlaylistid = userPlaylist
      .filter(
        (item) =>
          item.name === "Discover Weekly" &&
          item.owner.display_name === `Spotify`
      )
      .map((playlist) => playlist.id)[0];
    setWeeklyPlaylist(weeklyPlaylistid);
    setNewplaylistData((prevData) => ({
      ...prevData,
      weeklyPlaylistId: weeklyPlaylistid,
    }));
  }, [userPlaylist]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewplaylistData({
      ...NewplaylistData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (weeklyPlaylist.length === 0) {
      console.log("Discover Weekly playlist not found");
      return;
    }
    const postPlaylistData = async () => {
      try {
        await axios.post(baseURL, NewplaylistData);
      } catch (e) {
        throw e;
      }
    };
    postPlaylistData();
    setTimeout(() => {
      setweeklyPlaylistExist(true);
    }, 500);
  };

  if (weeklyPlaylistExist === true) {
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
          <section className=" w-[75%] sm:w-[65%] md:w-[55%] lg:w-[45%] xl:w-[30%] flex items-center justify-center h-[55%] text-4xl">
            Songs Added!
          </section>
        </main>
      </>
    );
  } else {
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
          <section className=" w-[75%] sm:w-[65%] md:w-[55%] lg:w-[45%] xl:w-[30%] flex items-center h-[55%]">
            <form
              onSubmit={handleSubmit}
              className="flex h-[100%] w-[100%] justify-around items-center flex-col"
            >
              <div>
                <label className="flex justify-center items-start flex-col p-2">
                  Playlist Name
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={handleInput}
                    value={NewplaylistData.name}
                    className=" min-w-[18rem] aspect-[7/1] mt-1.5 pl-2 pr-2 bg-customGray border-[2px] rounded-md border-[rgb(100,100,100)] hover:border-white"
                  />
                </label>
                <label className="flex justify-center items-start flex-col p-2">
                  Playlist Description
                  <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    onChange={handleInput}
                    value={NewplaylistData.description}
                    className=" min-w-[18rem] aspect-[7/1] mt-1.5 pl-2 pr-2 bg-customGray border-[2px] rounded-md border-[rgb(100,100,100)] hover:border-white"
                  />
                </label>
              </div>
              <button
                className="text-black font-semibold bg-custonmGreen hover:bg-custonmGreenHover min-w-[18rem] aspect-[6/1] rounded-[30px] border-[5px] border-[rgba(0,0,0,0.2)] mb-20"
                type="submit"
              >
                Cleate playlist
              </button>
            </form>
          </section>
        </main>
      </>
    );
  }
};

export default DiscoverWeekly;
