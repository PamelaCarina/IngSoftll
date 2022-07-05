import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';

import BotonAgregarEncuesta from '../../components/BotonAgregarEncuesta'; //porfis no sacar esto o sino queda la senda cagá
import ModalAgregarEncuesta from '../../components/ModalAgregarEncuesta';
import MyNavbar from '../../components/Navbar';
import ModalEnviarCorreo from '../../components/ModalEnviarCorreo';
import ListaEncuestas from '../../components/ListaEncuestas'
import {useParams} from "react-router-dom";
import axios from "axios";

let menuNavbar = [
    {
        name: "Cerrar Sesión",
        rute: "/"
    }
]

const Administrador = () => {
    const [user, setUser] = useState('')
    const idE = useParams();
    //DEVELOPMENT URL
    const urlE = `http://localhost:5000/getUser/${idE.idEd}`
    //DEPLOYMENT URL 152.74.52.191
    //const urlE = `http://152.74.52.191:5009/getUser/${idE.idEd}`
    useEffect(() =>{
        axios.get(`${urlE}`).then(response => {
            //console.log(response.data[0].correo_editor)
            setUser(response.data[0].username_editor)
            console.log(user)
        }).catch(err => console.log(err))
    })
    return (
        <>
            <MyNavbar menuNavbarAdmin={menuNavbar}/>
            
            <Container style={{marginTop: "20px"}}>
                <h1 style={{marginBottom:"50px"}}> ¡Bienvenido {user}! </h1>
                <ModalAgregarEncuesta idE={idE}> </ModalAgregarEncuesta>
                <ListaEncuestas idE={idE}> </ListaEncuestas>
                {/* <BotonAgregarEncuesta> </BotonAgregarEncuesta> */}
            </Container>

        </>
    );
}

export default Administrador;