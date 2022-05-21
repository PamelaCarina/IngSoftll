import React, {useState, FC} from 'react'

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alternativa from '../../components/Alternativa';
import Button from 'react-bootstrap/esm/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

interface props{
    id_pregunta: number;
    // obtenerAlternativaModal:? (enunciado_alternativaCard) => void;
    obtenerAlternativas:? (enunciado_alternativa, id_pregunta) => void;
}

// const alternativas = [];

const CardPregunta: FC<props> = ({id_pregunta, /*obtenerAlternativaModal*/ obtenerAlternativas}) => {

    const [ansList, setAnsList] = useState([]);
    const [countAns, setCountAns] = useState(1);

    //const [enunciado_alternativaCard, setEnunciado_alternativaCard] = useState({});
    
    const onAddAnswerClick = event => {
        
        setCountAns(countAns+1);
        setAnsList(ansList.concat(<Alternativa countAns={countAns} obtenerAlternativas={obtenerAlternativas} id_pregunta={id_pregunta}/>));
    }

    // const obtenerAlternativas = (enunciado_alternativa, id_pregunta) => {
    //     console.log("ALTERNATIVA CARD:", enunciado_alternativa);
        
    //     // while(alternativas.length > 0){
    //     //     alternativas.pop();
    //     // }

    //     alternativas.push(enunciado_alternativa, id_pregunta);
    // }
    // console.log("ARREGLO ALTERNATIVA CARD", alternativas);
    // obtenerAlternativaModal(AlternativasCard);

    return(
        <>
            <Card>
                <Card.Header>
                    <InputGroup controlId="FormEncuesta">
                        <FormControl
                            placeholder={`Pregunta ${id_pregunta}`}
                            aria-label="Título"
                            aria-describedby="basic-addon2"
                        />
                        {/* <Button variant="outline-secondary" id="button-addon2">
                            Listo
                        </Button> */}
                    </InputGroup>
                </Card.Header>
                <Card.Body>
                <Form>
                    <>
                    {ansList}
                    </>
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