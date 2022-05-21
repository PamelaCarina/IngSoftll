import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Administrador from './containers/Administrador';
import Login from './containers/Login';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Administrador/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </HashRouter>
  );
}
