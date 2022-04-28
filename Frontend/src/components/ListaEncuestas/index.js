import React from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button'

const ListaEncuestas = () => {

    return(
        <>
            <ListGroup>
                <ListGroup.Item action variant="light" className="position-relative position-relative-example">
                    Encuesta 1
                    <Button variant="primary" className="position-absolute top-50 start-50 translate-middle">Editar</Button>{' '}
                    <Button variant="danger" className="position-absolute top-50 start-100 translate-middle">Eliminar</Button>{' '}
                </ListGroup.Item>
                <ListGroup.Item action variant="light">
                    Encuesta 2
                    <Button variant="primary" className="position-absolute top-50 start-50 translate-middle">Editar</Button>{' '}
                    <Button variant="danger" className="position-absolute top-50 start-100 translate-middle">Eliminar</Button>{' '}
                </ListGroup.Item>
                <ListGroup.Item action variant="light">
                    Encuesta 3
                    <Button variant="primary" className="position-absolute top-50 start-50 translate-middle">Editar</Button>{' '}
                    <Button variant="danger" className="position-absolute top-50 start-100 translate-middle">Eliminar</Button>{' '}
                </ListGroup.Item>
            </ListGroup>
        </>
    );
}

export default ListaEncuestas;