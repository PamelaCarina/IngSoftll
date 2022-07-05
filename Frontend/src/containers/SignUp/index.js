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

            <Container style={{marginTop: "80px"}}>
                <h1>Bienvenido a Surveycado</h1>
                <FormSignUp/>
            </Container>
            {/* <MyFooter/> */}
        </>
    );
}

export default SignUp;