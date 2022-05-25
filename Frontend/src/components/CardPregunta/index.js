import React, {useState, FC} from 'react'
import {Card, Button, InputGroup, Form} from 'react-bootstrap'
import Alternativa from '../../components/Alternativa';

<<<<<<< HEAD
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

=======
interface props {
    id_pregunta: Number;
}

const CardPregunta: FC<props> = ({id_pregunta, handleChange}) => {
    const [ansList, setAnsList] = useState([]);
    const [countAns, setCountAns] = useState(1);

    const onAddAnswerClick = () => {
        setCountAns(countAns+1);
        setAnsList(ansList.concat(<Alternativa countAns={countAns} id_preg={id_pregunta} handleChange={handleChange}> </Alternativa>));
    }

>>>>>>> 2739b0ec09c29678a523b20f3cc8af53052764c2
    return(
        <>
            <Card>
                <Card.Header>
<<<<<<< HEAD
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
=======
                    <InputGroup >
                        <Form.Control name={`pregunta ${id_pregunta}`} placeholder={`Pregunta ${id_pregunta}`} aria-label="Título" aria-describedby="basic-addon2" onChange={handleChange}/>
                        <Button variant="outline-secondary" id="button-addon2">Listo</Button>
                    </InputGroup>
                </Card.Header>
                <Card.Body>
                    <div>{ansList}</div>
                    <Button variant="success" onClick={onAddAnswerClick}>Añadir respuesta</Button>
>>>>>>> 2739b0ec09c29678a523b20f3cc8af53052764c2
                </Card.Body>
            </Card>
        </>
    );
}

export default CardPregunta;