import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <h1> Bienvenido, Cristian</h1>
        <div>
          <Button variant="primary" size="lg">Agregar</Button>{' '}
          <Button variant="secondary" size="lg">Cerrar sesión</Button>{' '}
        </div>
        <div>
          <ListGroup>
            <ListGroup.Item action> Encuesta 1 
              <Button>
                Editar
              </Button>
            </ListGroup.Item>
            <ListGroup.Item action> Encuesta 2 </ListGroup.Item>
            <ListGroup.Item action> Encuesta 3 </ListGroup.Item>
          </ListGroup>
        </div>
      </header>
      
    </div>
  );
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hoy es un gran día.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/ 
export default App;
