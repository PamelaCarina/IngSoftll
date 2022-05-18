import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Container, Button, Navbar} from "react-bootstrap";
import EncuestaRespondible from '../../components/encuestaRespondible'

const Encuesta = () => {
    const {id} = useParams();
    const [encuestiwi, setEncuestiwi] = useState('')
    const [show, setShow] = useState(true)
    const showComponent = () => {
        setEncuestiwi(<EncuestaRespondible id={id}/>)
        setShow(false)
    }
    let nav = useNavigate();
    const redirectHome = () =>{
        nav(`/`);
    }
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="">SurveyCado</Navbar.Brand>
                </Container>
            </Navbar>
            <Container className="justify-content-md-center" style={{marginTop: "50px", marginBottom:"50px"}}>
                {encuestiwi}
                {
                    show?<Button onClick={showComponent}>Sos Valiente</Button>:null
                }
                {
                    show?<Button variant='danger' onClick={redirectHome}>Sos Valientent</Button>:null
                }
            </Container>
        </>
    );
}

export default Encuesta;