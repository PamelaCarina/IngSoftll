import React, {FC} from "react";
import {Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../../img/logo.png";

interface menuNavbar {
    menuNavbarAdmin?:{
        name:String;
        rute:String;
    }[];
    menuNavbarHome?:{
        name:String;
        rute:String;
    }[];
    menuNavbarEncuesta?:{
        name:String;
        rute:String;
    }[];
}

const MyNavbar: FC<menuNavbar>  = ({menuNavbarAdmin, menuNavbarHome, menuNavbarEncuesta}) => {
    return(
        <>
            {(menuNavbarAdmin) && (
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
                        <Nav>
                            <Nav.Link as={Link} key={"#" + '/'} to={'/'}>Cerrar Sesión</Nav.Link>
                        </Nav>
                </Navbar>
            )}
            {(menuNavbarHome) && (
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
            )}
            {(menuNavbarEncuesta) && (
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
            )}
        </>
    );
}

export default MyNavbar;