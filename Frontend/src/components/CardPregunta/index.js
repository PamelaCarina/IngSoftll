import React, {useState, FC} from 'react'

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alternativa from '../../components/Alternativa';
import Button from 'react-bootstrap/esm/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

interface props{
    count: number;
}

const CardPregunta: FC<props> = ({count}) => {

    const [ansList, setAnsList] = useState([]);
    const [countAns, setCountAns] = useState(1);

    const [enunciado_alternativaCard, setEnunciado_alternativaCard] = useState({});

    const obtenerAlternativaCard = (enunciado_alternativa) => {
        setEnunciado_alternativaCard(enunciado_alternativa);
        console.log("ALTERNATIVA CARD:", enunciado_alternativa);
    }

    const onAddAnswerClick = event => {
        setCountAns(countAns+1);
        setAnsList(ansList.concat(<Alternativa countAns={countAns} obtenerAlternativaCard={obtenerAlternativaCard}/>));
    }

    return(
        <>
            <Card>
                <Card.Header>
                    <InputGroup controlId="FormEncuesta">
                        <FormControl
                            placeholder={`Pregunta ${count}`}
                            aria-label="Título"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                            Listo
                        </Button>
                    </InputGroup>
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
        </>
    );
}

export default CardPregunta;