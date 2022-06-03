import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Col } from "react-bootstrap";
//import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  

  return (
    <div className="Login">
        <Col md={{ span: 3, offset: 4}} >
          <h3>Iniciar Sesión</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Button variant="success" block="true" size="lg" type="submit" disabled={!validateForm()}>
                Ingresar
              </Button>
            </Container>
          </Form>
        </Col>
    </div>
  );
}