import React, {useState, FC} from 'react';
import {InputGroup, Form} from 'react-bootstrap';

interface props {
    countAns:? Number;
    id_pregunta:? Number;
    obtenerAlternativas:? (enunciado_alternativa, id_pregunta) => void;
}

const Alternativa: FC<props> = ({countAns, obtenerAlternativas, handleChange, id_pregunta, id_preg}) => {

    const [enunciado_alternativa, setEnunciado_alternativa] = useState('');

    const sendAlt = (event) =>{
        obtenerAlternativas(enunciado_alternativa, id_pregunta);
    }

    return(
        <>
            <InputGroup>
                <Form.Control name={`alternativa ${countAns}_${id_preg}`} size="sm" type="text" placeholder={`Alternativa ${countAns}`}
                              onChange={handleChange}
                />
            </InputGroup>
        </>
    )
}
export default Alternativa;