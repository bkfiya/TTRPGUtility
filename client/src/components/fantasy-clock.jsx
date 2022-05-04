import { Component } from 'react';
import ClockService from '../services/clock-service';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

export default class FantasyClock extends Component {
    clockService;

    constructor(props) {
        super(props);

        this.state = {
            currentTime: 8.15
            , customTimeAdd: ''
            , setTime: ''
        }

        this.addDay = props.addDay;
        this.clockService = new ClockService(props.addDay);
        this.addTime = this.addTime.bind(this);
        this.nextDay = this.nextDay.bind(this);
        this.setCustomTime = this.setCustomTime.bind(this);
        this.addCustomTime = this.addCustomTime.bind(this);
    }

    render() {
        return <div>
            <h1>{this.clockService.formatTime(this.state.currentTime)}</h1>
            <Stack>
                <Button onClick={() => {this.addTime(0.10)}}>Add 10 minutes</Button>
                <Button onClick={() => {this.addTime(0.15)}}>Add 15 minutes</Button>
                <Button onClick={() => {this.addTime(1)}}>Add 1 Hour</Button>
                <Button onClick={() => {this.addTime(8)}}>Add 8 Hours</Button>
                <Button onClick={this.nextDay}>Next day at 8 AM</Button>
                <Container fluid>
                    <Row>
                        <Col><input type="text" 
                            value={this.state.customTimeAdd} 
                            onChange={(e) => {this.setState({customTimeAdd: e.target.value})}}
                            placeholder="Add Time (ex: 1.15)">
                        </input></Col>
                        <Col><Button onClick={this.addCustomTime} className={"width100"}>Add Custom Time</Button></Col>
                    </Row>
                    <Row>
                        <Col><input type="text" 
                            value={this.state.setTime} 
                            onChange={(e) => {this.setState({setTime: e.target.value})}}
                            placeholder="Set Time (ex: 8.15)">
                        </input></Col>
                        <Col><Button onClick={this.setCustomTime} className={"width100"}>Set Custom Time</Button></Col>
                    </Row>                    
                </Container>
            </Stack>
        </div>
    }

    addTime(time) {
        time += this.state.currentTime;
        time = Number(time.toFixed(2));
        time = this.clockService.processTime(time);
        this.setState({currentTime: time});
    }

    nextDay() {
        this.addDay();
        this.setState({currentTime: 8});
    }

    setCustomTime() {
        this.setState({
            setTime: ''
            , currentTime: Number(this.state.setTime)
        });
    }

    addCustomTime() {
        this.addTime(Number(this.state.customTimeAdd));
        this.setState({
            customTimeAdd: ''
        });
    }
}