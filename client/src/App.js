import './App.css';
import FantasyCalendar from './components/fantasy-calendar';
import FantasyClock from './components/fantasy-clock';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col><FantasyClock /></Col>
          <Col><FantasyCalendar /></Col>
        </Row>
        
      </Container>      
    </div>
  );
}

export default App;
