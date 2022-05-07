import React, {Component} from 'react';
import FantasyCalendar from './fantasy-calendar';
import FantasyClock from './fantasy-clock';
import ConfigInit from './config-init';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class DMScreen extends Component {     

    constructor(props) {
        super(props);

        this.state = {
            configuration: null
        }

        this.fantasyCalendarRef = React.createRef();
        this.addDay = this.addDay.bind(this);
        this.setData = this.setData.bind(this);
    }

    render() {
        if (!this.state.configuration)
            return this.renderConfigInit();
        else return this.renderCalendar();     
    }

    renderConfigInit() {
        return <Container>
            <ConfigInit setData={this.setData} />
        </Container>
    }

    renderCalendar() {
        return <Container fluid>
            <Row>
                <Col xs="3"><FantasyClock addDay={this.addDay} /></Col>
                <Col><FantasyCalendar configuration={this.state.configuration} ref={this.fantasyCalendarRef} /></Col>
            </Row>        
        </Container>
    }

    addDay() {
        this.fantasyCalendarRef.current.next();
    }

    setData(months, weeksInMonths, startingYear, currentEra, adventureStartDay) {
        let configuration = {
            months: months
            , daysInWeek: 10 //TODO: allow this to be an array instead
            , names: [] //TODO: this is names of days
            , weeksInMonth: weeksInMonths
            , currentEra: currentEra
            , startingYear: startingYear
            , calendarStartDay: adventureStartDay
        };
        this.setState({configuration});
    }
}