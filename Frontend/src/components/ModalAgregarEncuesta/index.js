import React, {useState} from "react";
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// id_encuesta, titulo_encuesta, descripcion_encuesta, id_pregunta, enunciado_pregunta, id_alternativa, enunciado_alternativa, contador_alternativa

// interface props{
//   handleAgregarEncuesta: (nuevaEncuesta) => void;
//   // agregarEncuesta:{
//   //   id_encuesta: number;
//   //   titulo_encuesta: string;
//   //   descripcion_encuesta: string;
//   //   id_pregunta: number;
//   //   enunciado_pregunta: string;
//   //   id_alternativa: number;
//   //   enunciado_alternativa: string;
//   //   contador_alternativa: number;
//   // }[];
// }
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import CardPregunta from '../../components/CardPregunta'
import ReactDOM from 'react-dom'



const ModalAgregarEncuesta = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [validated, setValidated] = useState(false);


  const [titulo_encuesta, setTitulo_encuesta] = useState(false);
  const [descripcion_encuesta, setDescripcion_encuesta] = useState(false);
  const [enunciado_pregunta, setEnunciado_pregunta] = useState(false);
  const [enunciado_alternativa, setEnunciado_alternativa] = useState(false);
  const [contador_alternativa, setContador_alternativa] = useState(false);

  //encuesta => meter todo a un arreglo

  const encuesta = {
    titulo_encuesta: titulo_encuesta,
    descripcion_encuesta: descripcion_encuesta,
    pregunta:{
      enunciado_pregunta: enunciado_pregunta,
      alternativa:{
        enunciado_alternativa: enunciado_alternativa,
        contador_alternativa: contador_alternativa
      }
    }
  }

  const handleSubmit = (e) => {
    axios.post('http://localhost:5000/saveEncuesta', {encuesta} )
      .then(res => {
        console.log(res);
      })
  }
  


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
          <Form validated={validated} onSubmit = {handleSubmit}>
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