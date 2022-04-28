import React, {useState, FC} from 'react'

import Form from 'react-bootstrap/Form'

interface props {
    countAns: Number;
}

const Alternativa: FC<props> = ({countAns}) => {
    return(
        <Form.Control size="sm" type="text" placeholder={`Respuesta ${countAns}`}>

        </Form.Control>
    )
}

export default Alternativa;