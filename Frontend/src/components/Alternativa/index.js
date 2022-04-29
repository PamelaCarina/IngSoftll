import React, {useState, FC} from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

interface props {
    countAns: Number;
}

const Alternativa: FC<props> = ({countAns}) => {
    return(
        <>
            <InputGroup>
                <Form.Control size="sm" type="text" placeholder={`Respuesta ${countAns}`}>

                </Form.Control>
                <Button variant="outline-secondary" id="button-addon2">
                    Listo
                </Button>
            </InputGroup>
            
        </>
        
        
    )
}

export default Alternativa;