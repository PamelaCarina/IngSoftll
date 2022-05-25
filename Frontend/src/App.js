import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Administrador from './containers/Administrador';
import Encuesta from './containers/Encuesta';
import Home from './containers/Home';


export default function App() {
  return (
      <Router>
        <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route path="/admin/:idEd" element={<Administrador/>}></Route>
            <Route path="/encuesta/:id" element={<Encuesta/>}></Route>
        </Routes>
      </Router>
  );
}