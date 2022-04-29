import React, {useState} from "react";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup'
import CardPregunta from '../../components/CardPregunta'
import FormControl from 'react-bootstrap/FormControl'



const ModalAgregarEncuesta = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [cardList, setCardList] = useState([]);

  const [count, setCount] = useState(1);

  const onAddCardClick = event => {
    setCount(count+1);
    console.log(count);
    setCardList(cardList.concat(<CardPregunta count={count}> </CardPregunta>));
  }

  const vaciarCardList = event => {
    setCardList([]);
    setShow(false);
    setCount(1);
  } 

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
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Título"
                aria-label="Título"
                aria-describedby="basic-addon2"
                size="lg"
              />
              <Button variant="outline-secondary" id="button-addon2">
                Listo
              </Button>
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl
                placeholder="Descripción"
                aria-label="Descripción"
                aria-describedby="basic-addon2"
                as="textarea"
                rows={3}
              />
              <Button variant="outline-secondary" id="button-addon2">
                Listo
              </Button>
            </InputGroup>

            {cardList}
            <Button variant="info" onClick={onAddCardClick}>
              Agregar Pregunta
            </Button>
          </Form>
          
          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={vaciarCardList}>
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