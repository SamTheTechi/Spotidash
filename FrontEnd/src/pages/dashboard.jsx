import React from "react";

const Dashboard = () => {
  return (
    <>
      <main className="bg-black h-screen w-screen text-white overflow-x box-border m-0 p-0 flex justify-center">
        <div className="h-[100%] w-[65vw] flex items-center">
          <section className="h-[90%] w-[100%] bg-white flex">
            <article className="w-[40%] h-[100%] grid grid-rows-3">
              <div className="bg-red-500"></div>
              <div className="bg-blue-500"></div>
              <div className="bg-green-500"></div>
            </article>
            <article className="w-[60%] h-[100%]">
              {/* <iframe
                src="https://open.spotify.com/embed/playlist/6kQ7sSwrEXpMN68EwzIStS?utm_source=generator"
                width="100%"
                height="30%"
                allowfullscreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              /> */}
              <div className="bg-yellow-500 h-[30%]"></div>
              <div className=" h-[70%] flex">
                <div className="bg-orange-500 h-[100%] w-[55%]"></div>
                <div className="bg-purple-500 h-[100%] w-[45%]"></div>
              </div>
            </article>
          </section>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
