import React, {useState} from "react";
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup'
import CardPregunta from '../../components/CardPregunta'
import FormControl from 'react-bootstrap/FormControl'

// id_encuesta, titulo_encuesta, descripcion_encuesta, id_pregunta, enunciado_pregunta, id_alternativa, enunciado_alternativa, contador_alternativa

//1. obtener la información de los componentes de la siguiente forma ModalAgregarEncuesta <-- CardPregunta <-- Alternativa
//2. cuando tenga la información guardarlo en los useState, los de preguntas deben ser un arreglo y los de respuestas igual.
//3. 


const ModalAgregarEncuesta = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const encuesta = {
  //   titulo_encuesta: titulo_encuesta,
  //   descripcion_encuesta: descripcion_encuesta,
  //   pregunta:[{
  //     enunciado_pregunta: enunciado_pregunta,
  //     alternativa:[
  //       {
  //       enunciado_alternativa: enunciado_alternativa,
  //       },
  //       {
  //         otra alternativa 
  //       }
  //     ]
  //   },
  //   {
  //     otra pregunta
  //   }
  //   ]
  // }

  // const encuesta = {
  //   preguntas: preguntas
  // }


  // const handleSubmit = (e) => {
  //   axios.post('http://localhost:5000/saveEncuesta', {encuesta} )
  //     .then(res => {
  //       console.log(res);
  //     })
  //   handleClose(true);
  // }

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
                type="text"
                autoFocus
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
                type="text"
                autoFocus
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
          <Button variant="primary" onClick={vaciarCardList}>
            Guardar Encuesta
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAgregarEncuesta;