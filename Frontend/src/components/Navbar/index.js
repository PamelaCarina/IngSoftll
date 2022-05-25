import React from "react";
import {Container, Navbar} from 'react-bootstrap';
import logo from "../../img/logo.png";


const MyNavbar = () => {
    return(
        <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    <img
                    alt=""
                    src={logo}
                    width="100"
                    height="90"
                    className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Brand href="">SurveyCado</Navbar.Brand>
        </Navbar>
    );
}

export default MyNavbar;