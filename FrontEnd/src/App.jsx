import React, { useContext } from 'react';
import './Tailwind.css';
import Login from './pages/login';
import Dashboard from './pages/Dashboard/dashboard';
import DiscoverWeekly from './pages/weekly';
import FilterBlend from './pages/blend';
import DeepSearch from './pages/search';
import Navbar from './pages/navbar';
import { TokenContext } from './context/Context';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  const { token } = useContext(TokenContext);
  return (
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
    </Routes>
  );
};

const DashboardComp = () => {
  return (
    <>
      <Navbar />
      <Route path='/' element={<Dashboard />}></Route>
      <Route path='/weekly' element={<DiscoverWeekly />}></Route>
      <Route path='/blend' element={<FilterBlend />}></Route>
      <Route path='/search' element={<DeepSearch />}></Route>
    </>
  );
};

export default App;
