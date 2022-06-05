import React, {useEffect, useState} from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';

import BotonAgregarEncuesta from '../../components/BotonAgregarEncuesta';
import ModalAgregarEncuesta from '../../components/ModalAgregarEncuesta';
import ModalEnviarCorreo from '../../components/ModalEnviarCorreo';
import ListaEncuestas from '../../components/ListaEncuestas'
import {useParams} from "react-router-dom";
import axios from "axios";


const Administrador = () => {
    const [user, setUser] = useState('')
    const idE = useParams();
    const urlE = `http://localhost:5000/getUser/${idE.idEd}`
    useEffect(() =>{
        axios.get(`${urlE}`).then(response => {
            //console.log(response.data[0].correo_editor)
            setUser(response.data[0].correo_editor)
        }).catch(err => console.log(err))
    })
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="">SurveyCado</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/" >Log out</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            <h1> Bienvenido usuario {user} </h1> 
            <Container style={{marginTop: "300px", marginBottom:"50px"}}> 
                <ModalAgregarEncuesta> </ModalAgregarEncuesta>
                <ListaEncuestas idE={idE}> </ListaEncuestas>
                <BotonAgregarEncuesta> </BotonAgregarEncuesta>
            </Container>

        </>
    );
}

export default Administrador;