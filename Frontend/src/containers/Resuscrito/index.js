import React from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom';

const Resuscrito = () => {
	const hash_encuestado = useParams();
	//DEVELOPMENT URL
	//const urlU = `http://localhost:5000/resuscribe/${hash_encuestado.hash}`;
	//DEPLOYMENT URL
	const urlU = `http://152.74.52.191:5009/resuscribe/${hash_encuestado.hash}`;
	axios.get(`${urlU}`,{});
	return (
		<div className="wrapper">
		<h1>Se ha vuelto a suscribir</h1>
		</div>
	)
}
export default Resuscrito;