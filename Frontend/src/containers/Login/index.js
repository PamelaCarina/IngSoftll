import React from 'react';
import Container from 'react-bootstrap/Container';
import FormLogin from '../../components/FormLogin';

const Login = () => {
  return (
    <>
      <Container style={{marginTop: "150px", marginBottom:"350px"}}>
        <FormLogin/>
      </Container>
    </>
  );
}

export default Login;