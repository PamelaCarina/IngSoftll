import React from 'react'

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const CardPregunta = () => {
    return(
        <>
            <Card>
                <Card.Header>
                <Form.Group  controlId="FormEncuesta">
                    <Form.Control
                    type="text"
                    placeholder="Pregunta 5"
                    autoFocus
                    />
                </Form.Group>
                </Card.Header>
                <Card.Body>
                <Form>
                    <div>
                    <Form.Check
                        label="1"
                        name="group1"
                        type="radio"
                        id="ola"
                    />
                    <Form.Check
                        label="1"
                        name="group1"
                        type="radio"
                        id="ola"
                    />
                    </div>
                </Form>
                </Card.Body>
            </Card>
        </>
    );
}

export default CardPregunta;