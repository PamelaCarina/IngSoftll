import React, { useState, useRef } from 'react';
import { withRouter } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.services";

import { isEmail } from "validator";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import './index.css';
const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          ¡Recuerda completar todos los campos!
        </div>
      );
    }
  };
  
const validemail = (value) => {
    if (!isEmail(value)) {
        return (
        <div className="alert alert-danger" role="alert">
            Correo inválido
        </div>
        );
    }
};

const MyFormLogin = ({history}) => {
    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
          AuthService.login(email, password).then(
            () => {
            history.push('/menu');
            },
            (error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            setLoading(false);
            setMessage(resMessage);
            }
        );
        } else {
        setLoading(false);
        }
    }

    const mystyle = {
      position: 'relative',
      top: "10px",
      alignItems: 'center',
      justifyContent: 'center'
    }

    return(
      <>
        <Container style={{marginTop: "150px"}}>
        <Col md={{ span: 3, offset: 4}} >

          <h3>Iniciar Sesión</h3>
          <Form onSubmit={handleSubmit} ref={form}>
                <label htmlFor="email">Correo Electrónico</label>
                <Input 
                  type="email" 
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  validations={[required, validemail]}
                />
                <label htmlFor="password">Contraseña</label>  
                <Input 
                  type="password" 
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  validations={[required]}
                  />
                
                  <Button variant="danger" block type="submit" style={mystyle} disabled={loading}>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Login</span>
                  </Button>
              
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}

              <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </Col>
        </Container>
      </>
    )
}

export default withRouter(MyFormLogin);