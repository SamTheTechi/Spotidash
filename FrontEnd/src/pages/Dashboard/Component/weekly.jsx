import React, { useState, useEffect, useContext } from "react";
import { PlaylistContext } from "../../../context/Context";
import { Link } from "react-router-dom";

const Weekly = () => {
  const { userPlaylist } = useContext(PlaylistContext);
  const [weeklyPlaylist, setWeeklyPlaylist] = useState([]);
  useEffect(() => {
    const weeklyPlaylistId = userPlaylist
      .filter(
        (item) =>
          item.name === "Discover Weekly" &&
          item.owner.display_name === `Spotify`
      )
      .map((playlist) => playlist.id);
    setWeeklyPlaylist(weeklyPlaylistId);
  }, [userPlaylist]);

  let res =
    weeklyPlaylist.images && weeklyPlaylist.images.length > 0
      ? weeklyPlaylist.images[0].url
      : "https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/L3R8CzbeEOgzsDpZY232anhUcLuPVhrICqXYmpKxkreVx_dOlxiOlH7Np2u5XCf-D8G_P6bQ7t9UOgQPge8YECQFrXI57Y1M0IXM4Rab_HQ=/ODQ6ODI6OTBUMjAtMjAtNA==";

  return (
    <>
      <div className="border-[5px] border-[rgba(0,0,0,0.1)] rounded-[15px]  flex justify-center items-center overflow-hidden m-1.5 bg-pink-400">
        <Link to={`weekly`}>
          <img
            src={res}
            alt="Discover Weekly"
            className="rounded-[15px] object-[0px,-10px] hover:scale-[1.1] hover:blur-[1px] hover:opacity-75 transition-[2s]"
          />
        </Link>
      </div>
    </>
  );
};

export default Weekly;
