import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext, PlaylistContext } from "../../context/Context";

const Weekly = () => {
  const { userPlaylist } = useContext(PlaylistContext);
  const { token } = useContext(TokenContext);
  const [data, setData] = useState(null);

  return <div>Weekly</div>;
};

export default Weekly;
