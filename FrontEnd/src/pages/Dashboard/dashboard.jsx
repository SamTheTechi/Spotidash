import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from "../../context/Context";
import Player from "./Component/player";
import TopSongs from "./Component/songs";
import TopArtist from "./Component/artist";
import Weekly from "./Component/weekly";
import Blend from "./Component/blend";
import Search from "./Component/search";
const baseURL = "http://localhost:5000/api/v1/UserId";

const Dashboard = () => {
  const { token } = useContext(TokenContext);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const userInfo = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const resID = response.data.id;
        setUserID(resID);
      } catch (e) {
        throw e;
      }
    };
    userInfo();
  }, [token]);

  useEffect(() => {
    const newUser = async () => {
      try {
        await axios.post(baseURL, { id: userID });
        console.log(`data send`);
      } catch (e) {
        throw e;
      }
    };
    newUser();
  }, [userID]);

  return (
    <>
      <main className="bg-black h-screen w-screen text-white overflow-x box-border m-0 p-0 flex justify-center items-center">
        <section className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[50%] flex items-center h-[85%] transition duration-400 ease-out">
          <article className="w-[33%] h-[100%] grid grid-rows-3 ml-1 mt-3 mr-1">
            <Blend />
            <Weekly />
            <Search />
          </article>

          <article
            className="w-[67%] h-[100%]"
            style={{ transition: "1s ease" }}
          >
            <Player height={30} />
            <div className="w-[100%] h-[70%] flex">
              <TopSongs />
              <TopArtist />
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
