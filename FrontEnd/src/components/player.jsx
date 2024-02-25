import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { TokenContext } from '../context/Context';

const Player = ({ height }) => {
  const [songs, setSongs] = useState(``);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const Tracks = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/top/tracks?time_range=short_term`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const res = response.data.items.map((item) => item.uri.split(':')[2]);
        setSongs(res[0]);
      } catch (e) {}
    };
    Tracks();
  }, [token]);

  if (!token) {
    return <h1 className='h-[30%] flex p-5 text-3xl items-center'>Loading...</h1>;
  }
  return (
    <>
      <iframe
        style={{
          paddingTop: '1rem',
          overflow: 'hidden',
          backgroundColor: 'transparent',
        }}
        src={`https://open.spotify.com/embed/track/${songs}?utm_source=generator`}
        width='100%'
        height={`${height}%`}
        allowFullScreen=''
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        loading='lazy'></iframe>
    </>
  );
};

export default Player;

// import React, { useRef, useEffect, useState } from "react";
// import type { ChartData, ChartArea } from "chart.js";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Chart } from "react-chartjs-2";
// import faker from "faker";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// );

// const labels = ["January", "February", "March", "April", "May", "June", "July"];
// const colors = [
//   "red",
//   "orange",
//   "yellow",
//   "lime",
//   "green",
//   "teal",
//   "blue",
//   "purple",
// ];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//     },
//     {
//       label: "Dataset 2",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//     },
//   ],
// };

// function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
//   const colorStart = faker.random.arrayElement(colors);
//   const colorMid = faker.random.arrayElement(
//     colors.filter((color) => color !== colorStart)
//   );
//   const colorEnd = faker.random.arrayElement(
//     colors.filter((color) => color !== colorStart && color !== colorMid)
//   );

//   const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

//   gradient.addColorStop(0, colorStart);
//   gradient.addColorStop(0.5, colorMid);
//   gradient.addColorStop(1, colorEnd);

//   return gradient;
// }

// export function App() {
//   const chartRef = useRef < ChartJS > null;
//   const [chartData, setChartData] =
//     useState <
//     ChartData <
//     "bar" >>
//       {
//         datasets: [],
//       };

//   useEffect(() => {
//     const chart = chartRef.current;

//     if (!chart) {
//       return;
//     }

//     const chartData = {
//       ...data,
//       datasets: data.datasets.map((dataset) => ({
//         ...dataset,
//         borderColor: createGradient(chart.ctx, chart.chartArea),
//       })),
//     };

//     setChartData(chartData);
//   }, []);

//   return <Chart ref={chartRef} type="line" data={chartData} />;
// }
