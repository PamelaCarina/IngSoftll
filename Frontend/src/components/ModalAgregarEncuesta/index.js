import React, {useState} from "react";
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import CardPregunta from '../../components/CardPregunta'
import ReactDOM from 'react-dom'

// id_encuesta, titulo_encuesta, descripcion_encuesta, id_pregunta, enunciado_pregunta, id_alternativa, enunciado_alternativa, contador_alternativa

//1. obtener la información de los componentes de la siguiente forma ModalAgregarEncuesta <-- CardPregunta <-- Alternativa
//2. cuando tenga la información guardarlo en los useState, los de preguntas deben ser un arreglo y los de respuestas igual.
//3. 


const ModalAgregarEncuesta = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [titulo_encuesta, setTitulo_encuesta] = useState([]);
  const [descripcion_encuesta, setDescripcion_encuesta] = useState([]);

  const [preguntas, setPreguntas] = useState([]);
  const [enunciado_pregunta, setEnunciado_pregunta] = useState([]);

  const [alternativas, setAlternativas] = useState([]);
  const [enunciado_alternativa, setEnunciado_alternativa] = useState([]);

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

  const encuesta = {
    preguntas: preguntas
  }


  const handleSubmit = (e) => {
    axios.post('http://localhost:5000/saveEncuesta', {encuesta} )
      .then(res => {
        console.log(res);
      })
    handleClose(true);
  }
  
  const obtenerPregunta = (enunciado_pregunta) => {
    // let aux = [...enunciado_pregunta];
    // setEnunciado_pregunta(aux);
    setEnunciado_pregunta(enunciado_pregunta);
    console.log("MODAL:",enunciado_pregunta);
  }

  console.log("enunciados preguntas", enunciado_pregunta)

  const obtenerRespuesta = (e) => {
    let aux = [...enunciado_alternativa];
    setEnunciado_alternativa(aux);
  }

  const [cardList, setCardList] = useState([]);

  const [count, setCount] = useState(1);

  const onAddCardClick = event => {
    setCount(count+1);
    console.log(count);
    setCardList(cardList.concat(<CardPregunta count={count} obtenerPregunta={obtenerPregunta} obtenerRespuesta={obtenerRespuesta}> </CardPregunta>));
  }

  const vaciarCardList = event => {
    setCardList([]);
    setShow(false);
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
            <Form.Group className="mb-3" controlId="FormEncuesta">
              <Form.Label>Título</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Ingrese el título de la encuesta"
                autoFocus
                onChange={(e) => setTitulo_encuesta(e.target.value)}
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
                onChange={(e) => setDescripcion_encuesta(e.target.value)}
              />
            </Form.Group>

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
          <Button variant="primary" onClick={handleSubmit}>
            Guardar Encuesta
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAgregarEncuesta;