import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container, Button, Card, ListGroup, Row, ListGroupItem} from "react-bootstrap";
import {useNavigate, useParams} from 'react-router-dom'

const EncuestaRespondible = () => {
    const [encuesta, setEncuesta] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    const [alternativas, setAlternativas] = useState([]);
    const [act, setAct] = useState(new Map());
    const id= useParams();
    const urlS = `http://localhost:5000/showEncuesta/${id.id}`;
    const urlA = `http://localhost:5000/saveRespuestas`;

    useEffect(() => {
        axios.get(`${urlS}`).then(response => {
            setEncuesta(response.data[0])
            setPreguntas(response.data[1])
            setAlternativas(response.data[2])
        }).catch(err => console.log(err))
    }, [])

    let nav = useNavigate();
    const redirectHome = () =>{
        nav(`/`);
    }
    const enviarEncuesta = async () =>{
        var dict = []
        var pregMap = new Map(
            preguntas.map(id =>{
                return [id['id_pregunta'],0]
            })
        )
        var existen = 0;
        var faltantes= false;
        for (let [key,value] of act){
            if(pregMap.has(value)){
                pregMap.set(value,1);
            }
            existen++;
            dict.push({
                idAlt: key
            });
        }
        if(existen!==pregMap.size){
            faltantes=true;
            console.log("hola")
        }
        if(faltantes){
            alert("Faltan preguntas por contestar")
        }else{
            const res = await axios.put(`${urlA}`,{dict})
            alert("Felicitaciones has respondido la encuesta ctm")
            redirectHome()
        }
    }


    const arr = encuesta.map(encuesta => {
        const titulo = encuesta.titulo_encuesta
        const descripcion = encuesta.descripcion_encuesta
        const preguntiwis = preguntas.map(preguntasE => {
            const enunciado = preguntasE.enunciado_pregunta
            const idP = preguntasE.id_pregunta
            const alternatiwis = alternativas.map(alternativasP => {
                const enunciadoA = alternativasP.enunciado_alternativa
                const idA = alternativasP.id_alternativa
                return (
                    (preguntasE.id_pregunta === alternativasP.id_pregunta) && (<ListGroup.Item key={idA} active={act.has(idA)?true:false} onClick={ () => {
                        if(act.has(idA)){
                            act.delete(idA);
                            setAct(new Map(act))
                        }else{
                            if(act.size !== 0){
                                var count=0;
                                var s = act.size;
                                for(let [key,value] of act){
                                    if(value === idP){
                                        act.delete(key);
                                        setAct(new Map(act.set(idA,idP)));
                                        break;
                                    }
                                    count++;
                                }
                                if(count === s){
                                    setAct(new Map(act.set(idA,idP)));
                                }
                            }else{
                                setAct(new Map(act.set(idA,idP)));
                            }
                        }
                    }
                    }>{enunciadoA}</ListGroup.Item>)
                );
            })
            return (
                <Card>
                    <Card.Header>
                        <Card.Title>{enunciado}</Card.Title>
                    </Card.Header>
                    <ListGroup>
                        {alternatiwis}
                    </ListGroup>
                </Card>
            );
        })
        return (
            <Card className='justify-content-md-center'>
                <Card.Header>
                    <Card.Title>{titulo}</Card.Title>
                    <Card.Text>{descripcion}</Card.Text>
                </Card.Header>
                <Card.Body>{preguntiwis}</Card.Body>
            </Card>
        );
    })
    return(
        <Container>
            {arr}
            <Button onClick={enviarEncuesta}>Enviar encuesta</Button>
        </Container>
    );
}

export default EncuestaRespondible;
