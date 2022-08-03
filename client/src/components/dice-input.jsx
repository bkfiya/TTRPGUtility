import { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DiceService from '../services/dice-service';

export default class DiceInput extends Component {
    diceService = new DiceService();

    constructor(props) { 
        super(props);

        this.state = {
            numDice: ''
        }

        this.dieText = 'D' + props.die;
        this.maxValue = Number(props.die);
    }

    render() {
        return <Row>
            <Col><input type="text"
                value={this.state.numDice}                     
                onChange={(e) => {this.setState({numDice: e.target.value})}}></input></Col>
            <Col xs="1"><h6>{this.dieText}</h6></Col>
        </Row>
    }

    clear() {
        this.setValue("");
    }

    getValue() {
        return this.state.numDice;
    }

    setValue(value) {
        this.setState({numDice: value});
    }

    roll(rerollValues) {
        if (this.state.numDice.length === 0 || isNaN(this.state.numDice)) {
            return null;
        }

        let total = 0;
        let log = this.dieText + "(";
        let numDice = Number(this.state.numDice);
        let appender = "";

        for (var i = 0; i < numDice; i++) {
            let value = this.diceService.rollDie(this.maxValue);
            if (rerollValues.indexOf(value) > -1) {
                value = this.diceService.rollDie(this.maxValue);
                log += `${appender}${value}R`;
            } else {
                log += `${appender}${value}`;
            }
            
            total += value;
            log += `${appender}${value}`;
            appender = ",";
        }

        log += ")";

        return {
            total
            , log
        }
    }

}