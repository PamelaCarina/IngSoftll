import React from 'react'
import Container from 'react-bootstrap/Container';
import FormLogin from '../../components/FormLogin';
import MyNavbar from "../../components/Navbar";
import MyFooter from "../../components/Footer";

let menuNavbar = [
    {
        name: "",
        rute: ""
    }
]

const Home = () =>{
    return (
        <>
            <MyNavbar menuNavbarHome={menuNavbar}/>
            <h1>Bienvenido a Surveycado</h1>
            <Container style={{marginTop: "80px"}}>
                <FormLogin/>
            </Container>
            {/* <MyFooter/> */}
        </>
    );
}

export default Home;