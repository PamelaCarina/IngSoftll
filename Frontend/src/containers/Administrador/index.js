import React from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';

import BotonAgregarEncuesta from '../../components/BotonAgregarEncuesta';
import ModalAgregarEncuesta from '../../components/ModalAgregarEncuesta';
import ListaEncuestas from '../../components/ListaEncuestas'
import {useParams} from "react-router-dom";


const Administrador = () => {

    const idE = useParams();
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
            <h1> Bienvenido</h1>
            <Container style={{marginTop: "150px", marginBottom:"50px"}}>
                <ModalAgregarEncuesta> </ModalAgregarEncuesta>
                <ListaEncuestas idE={idE}> </ListaEncuestas>
                <BotonAgregarEncuesta> </BotonAgregarEncuesta>
            </Container>

        </>
    );
}

export default Administrador;