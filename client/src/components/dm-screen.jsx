import React, {Component} from 'react';
import FantasyCalendar from './fantasy-calendar';
import FantasyClock from './fantasy-clock';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class DMScreen extends Component {

    constructor(props) {
        super(props);

        this.fantasyCalendarRef = React.createRef();
        this.addDay = this.addDay.bind(this);
    }

    render() {
        return <Container fluid>
            <Row>
            <Col xs="3"><FantasyClock addDay={this.addDay} /></Col>
            <Col><FantasyCalendar ref={this.fantasyCalendarRef} /></Col>
            </Row>        
        </Container>      
    }

    addDay() {
        this.fantasyCalendarRef.current.next();
    }
}