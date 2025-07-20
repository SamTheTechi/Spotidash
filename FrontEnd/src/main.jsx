import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import TokenContextProvider from "./context/tokenContextProvider";
import UserPlaylistProvider from "./context/userPlaylistProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SpeedInsights>
      <TokenContextProvider>
        <UserPlaylistProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserPlaylistProvider>
      </TokenContextProvider>
    </SpeedInsights>
  </React.StrictMode>
);
