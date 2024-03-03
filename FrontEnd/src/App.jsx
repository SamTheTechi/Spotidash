dimport React, { useContext } from 'react';
import Login from './pages/login';
import DashboardComp from './pages/main';
import { Route, Routes } from 'react-router-dom';
import './Tailwind.css';

const App = () => {
  return ( 
    <div style={{ touchAction: none overflow : 'hidden' }}>
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/dashboard/*' element={<DashboardComp />}></Route>
    </Routes>
      </div>
  );
};

export default App;
