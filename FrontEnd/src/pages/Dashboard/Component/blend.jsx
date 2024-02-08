import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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

  let res =
    blendPlaylist.images && blendPlaylist.images.length > 0
      ? blendPlaylist.images[0].url
      : "https://blend-playlist-covers.spotifycdn.com/v2/blend_LARGE-gold-yellow-en.jpg";

  return (
    <>
      <div className="border-[5px] border-[rgba(0,0,0,0.1)] rounded-[15px]  flex justify-center items-center overflow-hidden m-1.5 bg-yellow-500">
        <Link to={`blend`}>
          <img
            src={res}
            alt="Blends"
            className="rounded-[15px] hover:scale-[1.03] hover:blur-[1px] hover:opacity-75 transition duration-150 ease-in"
          />
        </Link>
      </div>
    </>
  );
};

export default Blend;
