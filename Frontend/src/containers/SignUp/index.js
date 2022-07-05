import React from 'react'
import Container from 'react-bootstrap/Container';
import FormSignUp from '../../components/FormSignUp';
import MyNavbar from "../../components/Navbar";
let menuNavbar = [
    {
        name: "",
        rute: ""
    }
]

const SignUp = () =>{
    return (
        <>
            <MyNavbar menuNavbarSignUp={menuNavbar}/>
            <Container style={{marginTop: "20px"}}>
                <h1 style={{textAlign:"center", marginBottom:"40px"}}>Bienvenido a Surveycado</h1>
                <FormSignUp/>
            </Container>
            {/* <MyFooter/> */}
        </>
    );
}

export default SignUp;