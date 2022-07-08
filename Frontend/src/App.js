import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import Administrador from './containers/Administrador';
import Encuesta from './containers/Encuesta';
import Home from './containers/Home';
import SignUp from './containers/SignUp';
import Resuscrito from "./containers/Resuscrito";
import Desuscrito from "./containers/Desuscrito";


export default function App() {
  return (
      <Router>
        <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/signup" element={<SignUp/>}></Route>
            <Route path="/unsuscribe/:hash" element={<Desuscrito/>}></Route>
            <Route path="/resuscribe/:hash" element={<Resuscrito/>}></Route>
            <Route path="/admin/:idEd" element={<Administrador/>}></Route>
            <Route path="/encuesta/:id" element={<Encuesta/>}></Route>
        </Routes>
      </Router>
  );
}