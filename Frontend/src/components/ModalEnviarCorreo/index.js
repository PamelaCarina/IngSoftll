import React, {useEffect, useState, FC} from "react";
import {Modal, Button, Form} from "react-bootstrap"
import axios from 'axios'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

interface props {
  titulo : String;
  idEncuesta : Number;
}


const ModalAgregarCorreo: FC<props> = ({titulo, idEncuesta}) => {
	const [show, setShow] = useState(false);
  const urlView = `http://localhost:5000/viewCorreos`;
  const urlSend = `http://localhost:5000/sendCorreos/`;
  const handleClose = () => setShow(false);
  const handleShow = () => {
    axios.get(`${urlView}`).then(response => {
    console.log(response.data)
     setCorreos(response.data)
    });
    setShow(true); 
  }

  const [correos,setCorreos] = useState([]);

  const sendCorreos = () => {
    axios.post(`${urlSend}`,{idEncuesta});
    handleClose(); 
  }

  const correosHTML = correos.map(correo => {
    let email = correo  
    return( 
      <tr>
        <td>{email}</td>
      </tr>);
	});
  return(

    <>
     <Button variant="success" onClick={handleShow}>
       Enviar encuesta
         </Button>
          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>

          <Modal.Title>{titulo}</Modal.Title>
          </Modal.Header>

        <Modal.Body>
          
             <table class = "table table-hover">
              <thead>
                <tr>
                  <th scope = "col">correo</th>
                </tr>
              </thead>
              <tbody>
                {correosHTML}
              </tbody>
              </table>  
              

            

          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={sendCorreos}>
            Enviar
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
    
}

export default ModalAgregarCorreo;