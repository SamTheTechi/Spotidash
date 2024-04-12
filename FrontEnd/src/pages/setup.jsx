
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PlaylistContext } from '../context/Context';
import { Link } from `react-router-dom`;
const blendEndpoint =
  'https://spotidash-server.vercel.app/api/v1/blendplaylist';

const FilterBlend = () => {
  const { PlaylistContext } = useContext(PlaylistContext);
  
}