import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap'
const Home = () =>{
    return (
        <>
             <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="">SurveyCado</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/login" >Log in</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            <h1>Bienvenido a Surveycado</h1>
        </>
    );
}

export default Home;