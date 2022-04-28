import React, {useState, FC} from 'react'

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alternativa from '../../components/Alternativa';
import Button from 'react-bootstrap/esm/Button';

interface props {
    count: Number;
}

const CardPregunta: FC<props> = ({count}) => {
    const [ansList, setAnsList] = useState([]);

    const [countAns, setCountAns] = useState(1);

    const onAddAnswerClick = event => {
        setCountAns(countAns+1);
        setAnsList(ansList.concat(<Alternativa countAns={countAns}> </Alternativa>));
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
        </>
    );
}

export default CardPregunta;