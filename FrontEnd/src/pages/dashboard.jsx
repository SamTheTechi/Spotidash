import React from "react";
import Player from "./dasComp/player";
import TopSongs from "./dasComp/topsongs";
import TopArtist from "./dasComp/topartist";
import Weekly from "./dasComp/weekly";
import Blend from "./dasComp/blend";
import Deepsearch from "./dasComp/deepsearch";

const Dashboard = () => {
  return (
    <>
      <main className="bg-black h-screen w-screen text-white overflow-x box-border m-0 p-0 flex justify-center items-center">
        <section className=" w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[50%] flex items-center h-[85%]">
          <article className="w-[35%] h-[100%] grid grid-rows-3 ml-1 mt-3 mr-1">
            <Blend />
            <Weekly />
            <Deepsearch />
          </article>
          <article className="w-[65%] h-[100%]">
            <Player height={30} />
            <div className=" h-[70%] flex">
              <TopSongs width={65} />
              <TopArtist width={45} />
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
