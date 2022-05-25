import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container, Button, Card, ListGroup, Row} from "react-bootstrap";
import { useParams} from 'react-router-dom'

const EncuestaRespondible = () => {
    const [encuesta, setEncuesta] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    const [alternativas, setAlternativas] = useState([]);
    const id= useParams();
    const url = `http://localhost:5000/showEncuesta/${id.id}`;

    useEffect(() => {
        axios.get(`${url}`).then(response => {
            //console.log(response.data)
            //console.log(response.data[0])
            setEncuesta(response.data[0])
            //console.log(response.data[1])
            setPreguntas(response.data[1])
            //console.log(response.data[2])
            setAlternativas(response.data[2])
        }).catch(err => console.log(err))
    }, [])

    const arr = encuesta.map(encuesta => {
        const titulo = encuesta.titulo_encuesta
        const descripcion = encuesta.descripcion_encuesta
        const preguntiwis = preguntas.map(preguntasE => {
            const enunciado = preguntasE.enunciado_pregunta
            const alternatiwis = alternativas.map(alternativasP => {
                const enunciadoA = alternativasP.enunciado_alternativa
                return (
                    <div className="justify-content-md-center">
                        {
                            (preguntasE.id_pregunta === alternativasP.id_pregunta) && (<ListGroup.Item action>{enunciadoA}</ListGroup.Item>)
                        }
                    </div>
                );
            })
            return (
                <Card>
                    <ListGroup>
                        <Card.Title>{enunciado}</Card.Title>
                        {alternatiwis}
                    </ListGroup>
                </Card>

            );
        })
        return (
            <Row className='justify-content-md-center'>
                <h1>{titulo}</h1>
                <p>{descripcion}</p>
                {preguntiwis}
            </Row>
        );
    })

    return(
        <Container>
            {arr}
            <Button>Enviar encuesta</Button>
        </Container>
    );
}

export default EncuestaRespondible;
