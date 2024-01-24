import React, { useState } from "react";

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
    console.log(NewplaylistData);
  };

  return (
    <>
      <main className="bg-black h-screen w-screen text-white overflow-x box-border m-0 p-0 flex justify-center items-center">
        <section className=" w-[75%] sm:w-[65%] md:w-[55%] lg:w-[45%] xl:w-[30%] flex items-center h-[55%]">
          <form
            onSubmit={handleSumbit}
            className="flex h-[100%] w-[100%] justify-around items-center flex-col"
          >
            <div>
              <label className="flex justify-center items-start flex-col">
                Name
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  onChange={handleInput}
                  value={NewplaylistData.name}
                  className="text-black"
                />
              </label>
              <label className="flex justify-center items-start flex-col">
                Description
                <input
                  type="text"
                  placeholder="description"
                  name="description"
                  onChange={handleInput}
                  value={NewplaylistData.description}
                  className="text-black"
                />
              </label>
            </div>
            <button
              className="text-black font-semibold bg-custonmGreen hover:bg-custonmGreenHover min-w-[15rem] aspect-[5/1] rounded-[30px] pt-[-80px]"
              type="submit"
            >
              Cleate playlist
            </button>
          </form>
          {NewplaylistData.name}
          {NewplaylistData.description}
        </section>
      </main>
    </>
  );
};

export default DiscoverWeekly;
