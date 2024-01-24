import React, { useState } from "react";
import axios from "axios";

const DiscoverWeekly = () => {
  const [weeklyPlaylistExist, setweeklyPlaylistExist] = useState(false);
  const [weeklyPlaylistUrl, setweeklyPlaylistUrl] = useState("");
  const [NewplaylistData, setNewplaylistData] = useState({
    name: "",
    description: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewplaylistData({
      ...NewplaylistData,
      [name]: value,
    });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    const postPlaylistData = async () => {
      try {
        const playlistData = await axios.post("", {});
      } catch (e) {
        throw e;
      }
    };
    console.log(NewplaylistData);
  };

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
        <section className=" w-[75%] sm:w-[65%] md:w-[55%] lg:w-[45%] xl:w-[30%] flex items-center h-[55%] justify-items-start ">
          <form
            onSubmit={handleSumbit}
            className="flex h-[100%] w-[100%] justify-around items-center flex-col"
          >
            <div>
              <label className="flex justify-center items-start flex-col p-2">
                Playlist Name
                <input
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
              {/* <label className="flex justify-center items-start flex-col p-2">
                Playlist Image
                <input
                  type="file"
                  name="image"
                  // onChange={handleInput}
                  // value={NewplaylistData.description}
                  className=" min-w-[15rem] aspect-[8/1] mt-1.5 pl-2 pr-2 "
                />
              </label> */}
            </div>
            <button
              className="text-black font-semibold bg-custonmGreen hover:bg-custonmGreenHover min-w-[18rem] aspect-[6/1] rounded-[30px] pt-[-80px]"
              type="submit"
            >
              Cleate playlist
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default DiscoverWeekly;
