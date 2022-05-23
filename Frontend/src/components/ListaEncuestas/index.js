import React, {useEffect, useState} from "react";
import { useParams} from 'react-router-dom'
import axios from 'axios'
import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button'
import {Card, ListGroupItem} from "react-bootstrap";

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
            <Card>
                <ListGroup.Item action variant="light" className="position-relative position-relative-example">
                    {titulo}
                    <Button variant="primary" className="position-absolute top-50 start-50 translate-middle">Editar</Button>{' '}
                    <Button variant="danger" onClick={deleteEncuesta.bind(this, id_enc)} className="position-absolute top-50 start-100 translate-middle">Eliminar</Button>{' '}
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