import React, {useEffect, useState, FC} from "react";
import {Modal, Button, Form} from "react-bootstrap"
import axios from 'axios'
import swal from "sweetalert";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Typeahead } from 'react-bootstrap-typeahead';


interface props {
  titulo : String;
  idEncuesta : Number;
}


const ModalAgregarCorreo: FC<props> = ({titulo, idEncuesta}) => {
    const [show, setShow] = useState(false);
    //DEVELOPMENT URL
    //const urlView = `http://localhost:5000/viewCorreos`;
    //const urlSend = `http://localhost:5000/sendCorreos/`;
    //const urlTag = `http://localhost:5000/listaTags/`;
    //const urlTagsEncuestados = `http://localhost:5000/tagsEncuestados/`;
    //DEPLOYMENT URL 152.74.52.191
    const urlView = `http://152.74.52.191:5009/viewCorreos`;
    const urlSend = `http://152.74.52.191:5009/sendCorreos/`;
    const urlTag = `http://152.74.52.191:5009/listaTags/`;
    const urlTagsEncuestados = `http://152.74.52.191:5009/tagsEncuestados/`;
    const handleClose = () => setShow(false);
    const handleShow = () => {
        axios.get(`${urlView}`).then(response => {
            console.log(response.data)
            setCorreos(response.data)});
        axios.get(`${urlTag}`).then(response => {
            setTags(response.data)});
        setShow(true);
    }

    const [correos,setCorreos] = useState([]);

    const sendCorreos = () => {
      axios.post(`${urlSend}`,{idEncuesta})
          .then(res => {
              swal('Correcto!','Correo enviado Satisfactoriamente','success')
          });
      handleClose();
    }

    //funcion para ver los tags
    const [tags,setTags] = useState([]);
    const viewTags = () => {
      axios.get(`${urlTag}`).then(response => {
          setTags(response.data)});
      }
    //mapeo de los tags
    const tagsHTML  = tags.map(tag  => {
      return(
      <tr>
        <td>{tag}</td>
        </tr>);
      })

    const [query, setQuery] = useState([ ])

    const filtrarCorreos = () => {
      axios.get(`${urlTagsEncuestados}/${query}`).then(response => {
        setCorreos(response.data)
      })}

  const correosHTML = correos.map(correo => {
    let email = correo  
    return( 
      <tr>
        <td>{email}</td>
      </tr>);
	});
    console.log({tagsHTML})
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

          <label>

          <Typeahead
            id="tags-select"
            labelKey="tags"
            onChange={setQuery}
            options={tags}
            placeholder="Escoge los tags..."
            selected={query}
/>
          </label>


          <Button variant="warning" onClick={filtrarCorreos}>
            Filtrar

          </Button>

             <table class = "table table-hover">
              <thead>
                <tr>
                  <th scope = "col">Lista de correos relacionados</th>
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