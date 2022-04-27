import React from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button'

const ListaEncuestas = () => {

    return(
        <>
            <ListGroup>
                <ListGroup.Item action variant="light" className="d-grid gap-3">
                    Encuesta 1
                    <Button variant="primary">Editar</Button>{' '}
                    <Button variant="danger">Eliminar</Button>{' '}
                </ListGroup.Item>
                <ListGroup.Item action variant="light">
                    Encuesta 2
                </ListGroup.Item>
                <ListGroup.Item action variant="light">
                    Encuesta 3
                </ListGroup.Item>
            </ListGroup>
        </>
    );
}

export default ListaEncuestas;