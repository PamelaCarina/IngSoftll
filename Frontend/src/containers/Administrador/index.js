import React from 'react';
// import axios from 'axios';

import BotonAgregarEncuesta from '../../components/BotonAgregarEncuesta';
import ModalAgregarEncuesta from '../../components/ModalAgregarEncuesta';
import ListaEncuestas from '../../components/ListaEncuestas'

const Administrador = () => {

    // const [agregarEncuesta, setAgregarEncuesta] = useState([]);  

    // const handleAgregarEncuesta = (data) => {
    //     useEffect(()=>{
    //         axios.get(`http://localhost:5000/saveEncuesta`)
    //         .then(res => {
    //         setAgregarEncuesta(res.data)
    //         })
    //     },[])
    // }

    return (
        <>
            <h1> Bienvenido</h1>
            <ModalAgregarEncuesta handleAgregarEncuesta ={handleAgregarEncuesta}/>
            <ListaEncuestas/>
            <BotonAgregarEncuesta/>
        
        </>
    );
}

export default Administrador;