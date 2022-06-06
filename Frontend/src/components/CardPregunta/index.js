import React, {useState, FC} from 'react'
import {Card, Button, InputGroup, Form} from 'react-bootstrap'
import Alternativa from '../../components/Alternativa';
import swal from 'sweetalert';

interface props {
    id_pregunta: Number;
}

const CardPregunta: FC<props> = ({id_pregunta, handleChange}) => {
    const [ansList, setAnsList] = useState([]);
    const [countAns, setCountAns] = useState(1);

    const onAddAnswerClick = () => {
        if(ansList.length < 10){
            setCountAns(countAns+1);
            setAnsList(ansList.concat(<Alternativa countAns={countAns} id_preg={id_pregunta} handleChange={handleChange}> </Alternativa>));
        }
        else{
            swal("Alto!", "No puedes añadir más respuestas, eso va contra la ley", "error")
        }
    }

    return(
        <>
            <Card className="mb-3">
                <Card.Header>
                    <InputGroup >
                        <Form.Control 
                        required
                        name={`pregunta ${id_pregunta}`} 
                        placeholder={`Pregunta ${id_pregunta}`} 
                        aria-label="Título" 
                        aria-describedby="basic-addon2" 
                        onChange={handleChange}/>
                    </InputGroup>
                </Card.Header>
                <Card.Body>
                    <div>{ansList}</div>
                    <Button variant="success" onClick={onAddAnswerClick}>Añadir respuesta</Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default CardPregunta;