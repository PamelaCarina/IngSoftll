import React, {useReducer, useState} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom';
//import './App.css'; //incluir css en este mismo fichero

const Desuscrito = () => {
	const formReducer = (state,event) => {
		return {
			...state,
			[event.name]: event.value
		}
	}
	const [formData, setFormData] = useReducer(formReducer, {});
	const [submitting, setSubmitting] = useState(false);
	let enviado=false;
	const hash_encuestado = useParams();
	const handleSubmit = event => {
		event.preventDefault();
		setSubmitting(true);
		enviado=true;
		let tiempo_resuscripcion=formData.apple
		//DEVELOPMENT URL
		//const urlU = `http://localhost:5000/unsuscribe/${hash_encuestado.hash}`;
		//DEPLOYMENT URL
		const urlU = `http://152.74.52.191:5009/unsuscribe/${hash_encuestado.hash}`;
		axios.post(`${urlU}` ,{tiempo_resuscripcion});
	}
	const handleChange = event => {
		setFormData({
			name: event.target.name,
			value: event.target.value,
		});
	}
	return (
		<div className="wrapper">
		<h1>Cancelación de suscripción</h1>
		{submitting &&
			<div>
			Suscripción cancelada.
			Cierre la pestaña.
			</div>
		}
		<form onSubmit={handleSubmit}>
		<fieldset disabled={submitting || enviado===true}>
			<label>
				<p>Tiempo de cancelación</p>
				<select name="apple" onChange={handleChange} value={formData.apple || ''}>
					<option value="">--Elija una opción--</option>
					<option value="semana">1 semana</option>
					<option value="mes">1 mes</option>
					<option value="año">1 año</option>
					<option value="permanente">para siempre :(</option>
				</select>
			</label>
		</fieldset>
			<button type="submit" disabled={submitting || enviado===true || (formData.apple !=='semana' && formData.apple !=='mes' && formData.apple !=='año')}>Cancelar suscripcion</button>
		</form>
		</div>
	)
}
export default Desuscrito;