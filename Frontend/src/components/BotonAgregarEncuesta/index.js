import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'

const BotonAgregarEncuesta = () =>{
  
  return (
    <div className="App">
        <div>
          <Button variant="primary" size="lg">Agregar</Button>{' '}
          <Button variant="secondary" size="lg">Cerrar sesión</Button>{' '}
        </div>
    </div>
  );
}

export default BotonAgregarEncuesta;