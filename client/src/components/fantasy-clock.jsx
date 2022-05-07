import { Component } from 'react';
import ClockService from '../services/clock-service';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';

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
            <Container fluid>
                <Row className="bottom-pad">
                    <Col><Button onClick={() => {this.addTime(0.10)}}>+10m</Button></Col>
                    <Col><Button onClick={() => {this.addTime(0.15)}}>+15m</Button></Col>
                    <Col><Button onClick={() => {this.addTime(1)}}>+1h</Button></Col>
                    <Col><Button onClick={() => {this.addTime(8)}}>+8h</Button></Col>
                    <Col><Button onClick={this.nextDay}>ND</Button></Col>
                </Row>                
                <Row className="bottom-pad">
                    <Col><input type="number" 
                        value={this.state.customTimeAdd} 
                        onChange={(e) => {this.setState({customTimeAdd: e.target.value})}}
                        onKeyDown={(e) => {this.inputKeyDown(e, this.addCustomTime)}}
                        placeholder="Add Time (ex: 1.15)">
                    </input></Col>
                    <Col><Button onClick={this.addCustomTime} className={"width100"}>Add Custom Time</Button></Col>
                </Row>
                <Row className="bottom-pad">
                    <Col><input type="number" 
                        value={this.state.setTime} 
                        onChange={(e) => {this.setState({setTime: e.target.value})}}
                        onKeyDown={(e) => {this.inputKeyDown(e, this.setCustomTime)}}
                        placeholder="Set Time (ex: 8.15)">
                    </input></Col>
                    <Col><Button onClick={this.setCustomTime} className={"width100"}>Set Custom Time</Button></Col>
                </Row>              
                <Row>
                    <Col><h6>For custom time, enter values such as: 1.15 for an hour and 15 minutes.</h6></Col>
                </Row>
            </Container>
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
        if (this.state.setTime.length === 0 || isNaN(this.state.setTime)) {
            toast("Please enter a valid decimal");
            return;
        }
        this.setState({
            setTime: ''
            , currentTime: Number(this.state.setTime)
        });
    }

    addCustomTime() {
        if (this.state.customTimeAdd.length === 0 || isNaN(this.state.customTimeAdd)) {
            toast("Please enter a valid decimal");
            return;
        }
        this.addTime(Number(this.state.customTimeAdd));
        this.setState({
            customTimeAdd: ''
        });
    }

    inputKeyDown(e, submitFunction) {
        if (e.key === "Enter") {
            submitFunction();
        }
    }
}