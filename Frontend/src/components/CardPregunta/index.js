import React, {useState, FC} from 'react'

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alternativa from '../../components/Alternativa';
import Button from 'react-bootstrap/esm/Button';

interface props {
    count: Number;
    obtenerPregunta: (enunciado_pregunta) => void;
    obtenerRespuesta: (enunciado_respuesta) => void;
}

const CardPregunta: FC<props> = ({count, obtenerPregunta, obtenerRespuesta}) => {

    const [ansList, setAnsList] = useState([]);
    const [countAns, setCountAns] = useState(1);

    const [enunciado_pregunta, setEnunciado_pregunta] = useState([]);
    const [enunciado_respuesta, setEnunciado_respuesta] = useState([]);

    const onAddAnswerClick = event => {
        obtenerPregunta(enunciado_pregunta)
        console.log("CARD",enunciado_pregunta);
        console.log("RESPUESTA", ansList);
        setCountAns(countAns+1);
        setAnsList(ansList.concat(<Alternativa countAns={countAns} obtenerRespuestas={obtenerRespuestas}> </Alternativa>));
    }

    const obtenerRespuestas = (e) => {
        setEnunciado_respuesta()
    }

    return(
        <>
            <Card>
                <Card.Header>
                <Form.Group  controlId="FormEncuesta">
                    <Form.Control
                    type="text"
                    placeholder = {`Pregunta ${count}`}
                    autoFocus
                    onChange={(e) => setEnunciado_pregunta(e.target.value)}
                    />
                </Form.Group>
                </Card.Header>
                <Card.Body>
                <Form>
                    <div>
                    {ansList}
                    </div>
                    <Button variant="success" onClick={onAddAnswerClick}>
                        Añadir respuesta
                    </Button>
                </Form>
                </Card.Body>
            </Card>

            
            {obtenerRespuesta(enunciado_respuesta)}
        </>
    );
}

export default CardPregunta;