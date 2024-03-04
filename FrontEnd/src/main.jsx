import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import TokenContextProvider from './context/tokenContextProvider';
import UserPlaylistProvider from './context/userPlaylistProvider';
import { SpeedInsights } from '@vercel/speed-insights/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <SpeedInsights />
    <React.StrictMode>
      <TokenContextProvider>
        <UserPlaylistProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserPlaylistProvider>
      </TokenContextProvider>
    </React.StrictMode>
  </>
);
