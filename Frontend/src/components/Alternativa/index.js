import { Button } from 'bootstrap';
import React, {useState, FC} from 'react';

import Form from 'react-bootstrap/Form';

interface props {
    countAns:? Number;
    obtenerAlternativas:? (enunciado_alternativa) => void;
}

const Alternativa: FC<props> = ({countAns, obtenerAlternativa}) => {

    const [enunciado_alternativa, setEnunciado_alternativa] = useState({});
    console.log("ALTERNATIVA",enunciado_alternativa);

    
    return(
        <>
            <Form.Control 
            size="sm" 
            type="text" 
            placeholder={`Respuesta ${countAns}`}
            onChange={(e) => setEnunciado_alternativa(e.target.value)}
            />
        </>
    )
}
export default Alternativa;