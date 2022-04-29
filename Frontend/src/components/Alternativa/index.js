import { Button } from 'bootstrap';
import React, {useState, FC} from 'react';

import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

interface props {
    countAns:? Number;
    obtenerAlternativaCard:? (enunciado_alternativa) => void;
}

const Alternativa: FC<props> = ({countAns, obtenerAlternativaCard}) => {

    const [enunciado_alternativa, setEnunciado_alternativa] = useState({});

    return(
        <>
            <InputGroup>
                <Form.Control 
                size="sm" 
                type="text" 
                placeholder={`Respuesta ${countAns}`}
                onChange={(e) => setEnunciado_alternativa(e.target.value)}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={obtenerAlternativaCard(enunciado_alternativa)}>
                    Listo
                </Button>
            </InputGroup>
            
        </>
        
        
    )
}
export default Alternativa;