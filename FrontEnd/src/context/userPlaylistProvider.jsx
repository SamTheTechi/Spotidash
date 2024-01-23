import { TokenContext, PlaylistContext } from "./Context";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

const UserPlaylistProvider = ({ children }) => {
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
        const res = response.data.items;
        setUserPlaylist(res);
      } catch (e) {
        throw e;
      }
    };
    getPlaylist();
  }, [token]);

  return (
    <PlaylistContext.Provider value={{ userPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export default UserPlaylistProvider;
