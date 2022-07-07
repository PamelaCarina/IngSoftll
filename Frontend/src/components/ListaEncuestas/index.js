import React, {useEffect, useState} from "react";
import { useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import swal from "sweetalert";
import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button'
import ModalEnviarCorreo from '../../components/ModalEnviarCorreo';
import {Card, ListGroupItem, ButtonGroup} from "react-bootstrap";
//import ModalEditarEncuesta from "../ModalEditarEncuesta";

const ListaEncuestas = () => {
    const [encuestas, setEncuestas] = useState([]);
    const idE = useParams();
    //DEVELOPMENT URL
    const urlList = `http://localhost:5000/listadoEncuestas/${idE.idEd}`;
    const urlDel = `http://localhost:5000/deleteEncuesta/`;
    //DEPLOYMENT URL 152.74.52.191
    //const urlList = `http://152.74.52.191:5009/listadoEncuestas/${idE.idEd}`;
    //const urlDel = `http://152.74.52.191:5009/deleteEncuesta/`;
    useEffect(() => {
        axios.get(`${urlList}`).then(response => {
            setEncuestas(response.data)
        }).catch(err => console.log(err))
    }, [])

    let nav = useNavigate();
    const refresh = () =>{
        nav(`/admin/${idE.idEd}`);
    }

    const deleteEncuesta = (idE) => {
        //console.log(idE)
        axios.delete(`${urlDel}${idE}`)
            .then(res =>{
                swal('Correcto!','Encuesta eliminada correctamente','success')
            });
        refresh();
    }

    const enc = encuestas.map(encE =>{
        const titulo = encE.titulo_encuesta
        const desc = encE.descripcion_encuesta
        const id_enc = encE.id_encuesta

        return (
            <Card className="mb-3">
                <ListGroup.Item variant="dark" className="d-flex align-items-center justify-content-between ">
                    <span style={{fontWeight:'bold'}}>{titulo}</span>
                    <ButtonGroup className="d-flex justify-content-end">
                        <ModalEnviarCorreo titulo= {titulo} idEncuesta = {id_enc}> </ModalEnviarCorreo>
                        <Button variant="danger" onClick={deleteEncuesta.bind(this, id_enc)}>Eliminar</Button>{' '}
                    </ButtonGroup>
                </ListGroup.Item>
                <ListGroup.Item>
                    {desc}
                </ListGroup.Item>
            </Card>
        );
    })
    
    return(
        <>
            <ListGroup>
                {enc}
            </ListGroup>
        </>
    );
}

export default ListaEncuestas;