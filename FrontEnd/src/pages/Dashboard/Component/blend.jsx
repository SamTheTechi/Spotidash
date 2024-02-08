import React, { useState, useEffect, useContext } from "react";
import { PlaylistContext } from "../../../context/Context";

const Blend = () => {
  const { userPlaylist } = useContext(PlaylistContext);
  const [blendPlaylist, setblendPlaylist] = useState([]);
  useEffect(() => {
    const blends = userPlaylist
      .filter(
        (item) =>
          item.description.slice(2, 7) == `Blend` &&
          item.owner.display_name === `Spotify`
      )
      .map((playlis) => playlis.id);
    setblendPlaylist(blends);
  }, [userPlaylist]);

  const handleClick = (e) => {
    e.preventDefault();

    window.location.pathname = "dashboard/blend";
  };

  let res =
    blendPlaylist.images && blendPlaylist.images.length > 0
      ? blendPlaylist.images[0].url
      : "https://blend-playlist-covers.spotifycdn.com/v2/blend_LARGE-gold-yellow-en.jpg";

  return (
    <>
      <div
        onClick={handleClick}
        className="border-[5px] border-[rgba(0,0,0,0.1)] rounded-[15px]  flex justify-center items-center overflow-hidden m-1.5 bg-yellow-500"
      >
        <img
          src={res}
          alt="Blends"
          className="rounded-[15px] object-[0px,-10px] hover:scale-[1.1] hover:blur-[1px] hover:opacity-75 transition-[2s]"
        />
      </div>
    </>
  );
};

export default Blend;
