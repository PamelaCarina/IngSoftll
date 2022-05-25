import React, {useState, FC} from 'react';
<<<<<<< HEAD

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

interface props {
    countAns:? Number;
    id_pregunta:? Number;
    obtenerAlternativas:? (enunciado_alternativa, id_pregunta) => void;
}

const Alternativa: FC<props> = ({countAns, obtenerAlternativas, id_pregunta}) => {

    const [enunciado_alternativa, setEnunciado_alternativa] = useState('');

    obtenerAlternativas(enunciado_alternativa, id_pregunta);

    return(
        <>
            <InputGroup>
                <Form.Control 
                size="sm" 
                type="text" 
                placeholder={`Respuesta ${countAns}`}
                onChange={(e) => {
                    setEnunciado_alternativa(e.target.value);
                }}
                />
                {/* <Button variant="outline-secondary" id="button-addon2" onClick={AlternativaLista}>
                    Listo
                </Button> */}
=======
import {InputGroup, Form} from 'react-bootstrap';

interface props {
    countAns:? Number;
}

const Alternativa: FC<props> = ({countAns, handleChange, id_preg}) => {
    return(
        <>
            <InputGroup>
                <Form.Control name={`alternativa ${countAns}_${id_preg}`} size="sm" type="text" placeholder={`Alternativa ${countAns}`} onChange={handleChange}/>
>>>>>>> 2739b0ec09c29678a523b20f3cc8af53052764c2
            </InputGroup>
        </>
    )
}
export default Alternativa;