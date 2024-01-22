import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { TokenContext } from "../../context/Context";

const Player = ({ height }) => {
  const [songs, setSongs] = useState(``);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const Tracks = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const res = response.data.items.map((item) => item.uri.split(":")[2]);
        setSongs(res[0]);
      } catch (e) {}
    };
    Tracks();
  }, [token]);
  if (!token) {
    return <h1>loading..</h1>;
  }
  return (
    <>
      <iframe
        style={{
          paddingTop: "1rem",
          overflow: "hidden",
          backgroundColor: "transparent",
        }}
        src={`https://open.spotify.com/embed/track/${songs}?utm_source=generator`}
        width="100%"
        height={`${height}%`}
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </>
  );
};

export default Player;
