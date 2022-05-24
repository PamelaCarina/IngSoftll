import React, {useState} from "react";
import {Modal, Button, InputGroup, Form} from 'react-bootstrap'
import CardPregunta from '../../components/CardPregunta';
import axios from 'axios';

// id_encuesta, titulo_encuesta, descripcion_encuesta, id_pregunta, enunciado_pregunta, id_alternativa, enunciado_alternativa, contador_alternativa

const ModalAgregarEncuesta = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cardList, setCardList] = useState([]);
  const [id_pregunta, setId_Pregunta] = useState(1);
  const [inputs, setInputs] = useState({});

  const onAddCardClick = () => {
    setId_Pregunta(id_pregunta+1);
    setCardList(cardList.concat(<CardPregunta id_pregunta={id_pregunta} handleChange={handleChange}/>));
  }

  const vaciarCardList = () => {
    setCardList([]);
    setShow(false);
    setId_Pregunta(1);
  }

  const handleChange = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var dict = []
    var dictP = []
    var dictA = []
    var iterP=1;
    var iterA=1;
    for(let [key,value] of Object.entries(inputs)){
      if(key === 'titulo_encuesta'){
        dict.push({
          titulo_encuesta: value
        });
      }
      if(key === 'descripcion_encuesta'){
        dict.push({
          descripcion_encuesta: value
        });
      }
      /*if(key === 'tag_encuesta'){
        dict.push({
          tag_encuesta: value
        });
      }*/
      if(key === `pregunta ${iterP}`){
        for(let [keyA,valueA] of Object.entries(inputs)){
          if(keyA === `alternativa ${iterA}_${iterP}`){
            dictA.push({
              enunciado_alternativa: valueA
            });
            iterA++;
          }
        }
        dictP.push({
          enunciado_pregunta: value,
          alternativas: dictA
        });
        dictA = [];
        iterP++;
      }
      iterA=1;
    }
    dict.push({
      preguntas: dictP
    });
    //console.log(dict)
    axios.post('http://localhost:5000/saveEncuesta', {dict} )
       .then(res => {
         console.log(res);
         alert("Enviado Crrectamente")
       })
     handleClose(true);
  }
  return (
      <>
        <Button variant="primary" size="lg" onClick={handleShow}>
          Agregar Nueva Encuesta
        </Button>

        <Modal show={show} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Agregar Nueva Encuesta</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <InputGroup className="mb-3">
                <Form.Control name="titulo_encuesta" placeholder="Título" aria-label="Título"
                              aria-describedby="basic-addon2" size="lg" type="text" autoFocus onChange={handleChange}/>
                <Button variant="outline-secondary" id="button-addon2">Listo</Button>
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control name="descripcion_encuesta" placeholder="Descripción" aria-label="Descripción"
                              aria-describedby="basic-addon2" as="textarea" rows={3} type="text" autoFocus
                              onChange={handleChange}/>
                <Button variant="outline-secondary" id="button-addon2">Listo</Button>
              </InputGroup>
              {cardList}
              <Button variant="info" onClick={() => {
                onAddCardClick();
              }}>Agregar Pregunta</Button>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={vaciarCardList}>Cancelar</Button>
              <Button variant="primary" type="submit" onClick={vaciarCardList}>Guardar Encuesta</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
  );
}

export default ModalAgregarEncuesta;