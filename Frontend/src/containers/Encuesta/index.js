import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Container, Button, Navbar, Card} from "react-bootstrap";
import EncuestaRespondible from '../../components/encuestaRespondible'
import MyNavbar from '../../components/Navbar';

let menuNavbar = [
    {
        name: "",
        rute: ""
    }
]

const Encuesta = () => {
    const {id} = useParams();
    const [encuestiwi, setEncuestiwi] = useState('')
    const [show, setShow] = useState(true)

    let nav = useNavigate();
    const redirectHome = () =>{
        nav(`/`);
    }
    const showComponent= () =>{
        setShow(false)
    }
    useEffect(() =>{
        setEncuestiwi(<EncuestaRespondible id={id}/>)
    })

    return (
        <>
            <MyNavbar menuNavbarEncuesta={menuNavbar}/>
            <Container className="justify-content-md-center" style={{marginTop: "50px", marginBottom:"50px"}}>
                {!(show) && encuestiwi}
                {
                    (show) && (<Card>
                        <Card.Header>
                            <Card.Title>
                                ¿Desea contestar esta encuesta?
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Button onClick={showComponent}>Acepto</Button>
                            <Button variant='danger' onClick={redirectHome}>Rechazo</Button>
                        </Card.Body>
                    </Card>)
                }
            </Container>
        </>
    );
}

export default Encuesta;