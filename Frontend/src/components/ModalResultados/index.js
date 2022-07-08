import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Card, ListGroup, Button, Modal } from 'react-bootstrap';
import Chart from "react-apexcharts";

const ModalResultados = ({id_enc}) => {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [encuestas, setEncuestas] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    const [alternativas, setAlternativas] = useState([]);

    //DEVELOPMENT URL
    //const urlEncuesta = `http://localhost:5000/showEncuesta/${id_enc}`;
    //DEPLOYMENT URL
    const urlEncuesta = `http://152.74.52.191:5009/showEncuesta/${id_enc}`;

    useEffect(() => {
        axios.get(`${urlEncuesta}`).then(response => {
            setEncuestas(response.data[0])
            setPreguntas(response.data[1])
            setAlternativas(response.data[2])
        }).catch(err => console.log(err))
    }, [])

    const arr = encuestas?.map(encuesta => {

        const titulo = encuesta.titulo_encuesta
        const descripcion = encuesta.descripcion_encuesta
        const preguntiwis = preguntas.map(preguntasE => {

            const enunciado = preguntasE.enunciado_pregunta
            let enunciadoAlternativas = []
            let contadorAlternativas = []

            const state = {
                series: contadorAlternativas,
                options: {
                    chart: {
                        width: 380,
                        type: 'pie',
                    },
                    labels: enunciadoAlternativas,
                    responsive: [{
                        breakpoint: 480,
                        options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                        }
                    }]
                }
            }

            const alternatiwis = alternativas.map(alternativasP => {

                const enunciadoA = alternativasP.enunciado_alternativa
                const contadorA = alternativasP.contador

                if(preguntasE.id_pregunta === alternativasP.id_pregunta){
                    enunciadoAlternativas.push(enunciadoA);
                    contadorAlternativas.push(contadorA);
                }

                return (
                    (preguntasE.id_pregunta === alternativasP.id_pregunta) && 
                    (
                        // aki van las respuestas
                        <>
                            <ListGroup horizontal>
                                <ListGroup.Item>{enunciadoA}</ListGroup.Item>
                                <ListGroup.Item>{contadorA}</ListGroup.Item>
                            </ListGroup>
                        </>
                    )

                );
            })

            return (
                // aki van las preguntas
                <>
                    <Card className="mb-3">
                        <Card.Header>
                            <Card.Title>{enunciado}</Card.Title>
                        </Card.Header>
                        <ListGroup>
                            {alternatiwis}
                            <Chart options={state.options} series={state.series} type="pie" width={400} />
                        </ListGroup>
                    </Card>
                </>
            );
        })

        //console.log("INFOOOO", arr_infoPregunta);

        return (
            // aki toda la encuesta
            <Card className='justify-content-md-center'>
                    <Card.Header>
                        <Card.Title>{titulo}</Card.Title>
                        <Card.Text>{descripcion}</Card.Text>
                    </Card.Header>
                    <Card.Body>
                        {preguntiwis}
                    </Card.Body>
            </Card>
        );
    })

    return (
        <>
        <Button variant="secondary" onClick={handleShow}>
            Ver Resultados
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Resultados Encuesta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {arr}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default ModalResultados;