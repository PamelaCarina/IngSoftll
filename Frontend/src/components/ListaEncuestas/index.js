import React, {useEffect, useState} from "react";
import { useParams} from 'react-router-dom'
import axios from 'axios'
import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button'

const ListaEncuestas = () => {
    const [encuestas, setEncuestas] = useState([]);
    const idE = useParams();
    const url = `http://localhost:5000/listadoEncuestas/${idE.idEd}`;

    useEffect(() => {
        axios.get(`${url}`).then(response => {
            setEncuestas(response.data)
        }).catch(err => console.log(err))
    }, [])

    const enc = encuestas.map(encE =>{
        const titulo = encE.titulo_encuesta
        return (
            <ListGroup.Item action variant="light" className="position-relative position-relative-example">
                {titulo}
                <Button variant="primary" className="position-absolute top-50 start-50 translate-middle">Editar</Button>{' '}
                <Button variant="danger" className="position-absolute top-50 start-100 translate-middle">Eliminar</Button>{' '}
            </ListGroup.Item>
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