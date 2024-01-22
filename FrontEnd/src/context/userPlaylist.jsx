import { TokenContext, PlaylistContext } from "./tokenContext";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

const UserPlaylistProvider = ({ Children }) => {
  const { token } = useContext(TokenContext);
  const [userPlaylist, setUserPlaylist] = useState([]);

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/playlists`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserPlaylist(response.data);
      } catch (e) {
        throw e;
      }
    };
    getPlaylist();
  }, [token]);

  return (
    <>
      <PlaylistContext.Provider value={userPlaylist}>
        {Children}
      </PlaylistContext.Provider>
    </>
  );
};

export default UserPlaylistProvider;
