import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from "axios";
//import "./Login.css";

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function validateForm() {
    return correo.length > 0 && password.length > 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //DEVELOPMENT POST
    axios.post('http://localhost:5000/login', {correo,password} )
    //DEPLOYMENT POST
    //axios.post('http://152.74.52.191:5009/login', {correo,password} )
      .then(res => {
        //console.log(res);
        //console.log(res.statusText);
        if(res.data=='Correo o contraseña incorrectos'){
          swal("Incorrecto", "Arriba las manos usurpador de identidades", "error")
        }
        else{
          //console.log('ELSE');
          navigate(`/admin/${res.data[0]}`);
        }
      })
  }

  

  return (
    <>
      <Col md={{ span: 3, offset: 4}} >
        <h3>Iniciar Sesión</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Container style={{marginTop: "5px"}}>
            <Button variant="success" size="lg" type="submit" disabled={!validateForm()}>
              Ingresar
            </Button>
          </Container>
        </Form>
      </Col>
    </>
  );
}