import React from 'react'
import Container from 'react-bootstrap/Container';
//import FormLogin from '../../components/FormLogin';
import MyNavbar from "../../components/Navbar";
import MyFooter from "../../components/Footer";

const Home = () =>{
    return (
        <>
            <MyNavbar/>
            <h1>Bienvenido a Surveycado</h1>
            <Container style={{marginTop: "150px", marginBottom:"350px"}}>
            <h1>hola soy un login</h1>
            {/* <FormLogin/> */}
            </Container>
            {/* <MyFooter/> */}
        </>
    );
}

export default Home;