import React, {useState, FC} from 'react';
import {InputGroup, Form} from 'react-bootstrap';

interface props {
    countAns:? Number;
}

const Alternativa: FC<props> = ({countAns, handleChange, id_preg}) => {
    return(
        <>
            <InputGroup>
                <Form.Control 
                    required
                    name={`alternativa ${countAns}_${id_preg}`} 
                    size="sm" 
                    type="text" 
                    placeholder={`Alternativa ${countAns}`} 
                    onChange={handleChange}/>
            </InputGroup>
        </>
    )
}
export default Alternativa;