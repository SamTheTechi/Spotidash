import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from "../../context/tokenContext";

const Weekly = () => {
  const { token } = useContext(TokenContext);
  const [data, setData] = useState(null);

  return <div>Weekly</div>;
};

export default Weekly;
