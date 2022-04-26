import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Administrador from './containers/Administrador';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Administrador/>} />
      </Routes>
    </HashRouter>
  );
}
