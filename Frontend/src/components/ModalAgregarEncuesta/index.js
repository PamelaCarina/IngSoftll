import React, {useState} from "react";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import CardPregunta from '../../components/CardPregunta'

const ModalAgregarEncuesta = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Button variant="primary" size= "lg" onClick={handleShow}>
        Agregar Nueva Encuesta
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nueva Encuesta</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="FormEncuesta">
              <Form.Label>Título</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Ingrese el título de la encuesta"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder="Ingrese la descripción de la encuesta"
                autoFocus
              />
            </Form.Group>
            
            <ListGroup as="ol" numbered>
              <ListGroup.Item as="li">
                <Card>
                  <Card.Header>
                    <Form.Group  controlId="FormEncuesta">
                      <Form.Control
                        type="text"
                        placeholder="Pregunta 1"
                        autoFocus
                      />
                    </Form.Group>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <div>
                        <Form.Check
                          label="1"
                          name="group1"
                          type="radio"
                          id="ola"
                        />
                        <Form.Check
                          label="1"
                          name="group1"
                          type="radio"
                          id="ola"
                        />
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </ListGroup.Item>

              <ListGroup.Item as="li">
                <CardPregunta></CardPregunta> 
              </ListGroup.Item>
              
              <ListGroup.Item as="li">
                <CardPregunta></CardPregunta> 
              </ListGroup.Item>
              
              <ListGroup.Item as="li">
                <CardPregunta></CardPregunta> 
              </ListGroup.Item>
              
              <ListGroup.Item as="li">
                <CardPregunta></CardPregunta> 
              </ListGroup.Item>

              <ListGroup.Item as="li">
                <CardPregunta></CardPregunta> 
              </ListGroup.Item>

            </ListGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar Encuesta
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAgregarEncuesta;