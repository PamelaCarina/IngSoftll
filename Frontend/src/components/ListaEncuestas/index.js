import React, {useEffect, useState} from "react";
import { useParams} from 'react-router-dom'
import axios from 'axios'
import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button'
import {Card, ListGroupItem, ButtonGroup} from "react-bootstrap";

const ListaEncuestas = () => {
    const [encuestas, setEncuestas] = useState([]);
    const idE = useParams();
    const urlList = `http://localhost:5000/listadoEncuestas/${idE.idEd}`;
    const urlDel = `http://localhost:5000/deleteEncuesta/`;

    useEffect(() => {
        axios.get(`${urlList}`).then(response => {
            setEncuestas(response.data)
        }).catch(err => console.log(err))
    }, [])

    const deleteEncuesta = (idE) => {
        //console.log(idE)
        axios.delete(`${urlDel}${idE}`);
    }

    const enc = encuestas.map(encE =>{
        const titulo = encE.titulo_encuesta
        const desc = encE.descripcion_encuesta
        const id_enc = encE.id_encuesta

        return (
            <Card className="mb-3">
                <ListGroup.Item variant="dark" className="d-flex align-items-center justify-content-between ">
                    {titulo}
                    <ButtonGroup className="d-flex justify-content-end">
                        <Button variant="primary" >Editar</Button>{' '}
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