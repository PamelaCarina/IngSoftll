import React from 'react';

import BotonAgregarEncuesta from '../../components/BotonAgregarEncuesta';
import ModalAgregarEncuesta from '../../components/ModalAgregarEncuesta';
import ListaEncuestas from '../../components/ListaEncuestas'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


const Administrador = () => {


    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="">SurveyCado</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="" className='position-absolute start-50'>Home</Nav.Link>
                <Nav.Link href="">Features</Nav.Link>
                <Nav.Link href="">Pricing</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            <h1> Bienvenido</h1>
            <Container style={{marginTop: "150px", marginBottom:"50px"}}>
                <ModalAgregarEncuesta> </ModalAgregarEncuesta>
                <ListaEncuestas> </ListaEncuestas>
                <BotonAgregarEncuesta> </BotonAgregarEncuesta>
            </Container>
            
            
            
            
        
        </>
    );
}

export default Administrador;