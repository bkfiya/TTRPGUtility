import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { Component } from 'react';
import DiceInput from './dice-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow, faBroom } from '@fortawesome/free-solid-svg-icons'

export default class DiceRoller extends Component {

    constructor(props) {
        super(props);

        this.d4Ref = React.createRef();
        this.d6Ref = React.createRef();
        this.d8Ref = React.createRef();
        this.d10Ref = React.createRef();
        this.d12Ref = React.createRef();
        this.d20Ref = React.createRef();

        this.state = {
            additionalValue: 0,
            name: "",
            rerollValues: ""
        }

        this.roll = this.roll.bind(this);
        this.clearValues = this.clearValues.bind(this);
    }

    render() {
        return <Container fluid>
            <DiceInput ref={this.d4Ref} die="4"></DiceInput>
            <DiceInput ref={this.d6Ref} die="6"></DiceInput>
            <DiceInput ref={this.d8Ref} die="8"></DiceInput>
            <DiceInput ref={this.d10Ref} die="10"></DiceInput>
            <DiceInput ref={this.d12Ref} die="12"></DiceInput>
            <DiceInput ref={this.d20Ref} die="20"></DiceInput>
            <Row>
                <Col><input type="number"
                    value={this.state.additionalValue}                     
                    onChange={(e) => {this.setState({additionalValue: e.target.value})}}></input></Col>
                <Col xs="1"><h6>Additional</h6></Col>
            </Row>
            <Row>
                <Col><input type="text"
                    value={this.state.additionalValue}                     
                    onChange={(e) => {this.setState({additionalValue: e.target.value})}}></input></Col>
                <Col xs="2"><h6>Reroll Values (Comma seperated)</h6></Col>
            </Row>
            <Row>
                <Col>
                    <FontAwesomeIcon size='2xl' className='blue' icon={faLocationArrow} onClick={this.roll}></FontAwesomeIcon>
                </Col>
                <Col>
                    <FontAwesomeIcon size='2xl' className='blue' icon={faBroom} onClick={this.clearValues}></FontAwesomeIcon>
                </Col>
            </Row>
        </Container>
    }

    roll() {
        let data = {
            total: 0
            , log: ''
            , appender: ''
        }
        let rerollValues = this.state.rerollValues.split(",");
        let additionalValue = isNaN(this.state.additionalValue) ? 0 : Number(this.state.additionalValue);

        let d4Roll = this.d4Ref.current.roll(rerollValues);
        let d6Roll = this.d6Ref.current.roll(rerollValues);
        let d8Roll = this.d8Ref.current.roll(rerollValues);
        let d10Roll = this.d10Ref.current.roll(rerollValues);
        let d12Roll = this.d12Ref.current.roll(rerollValues);
        let d20Roll = this.d20Ref.current.roll(rerollValues);

        this.adjustValues(d4Roll, data);
        this.adjustValues(d6Roll, data);
        this.adjustValues(d8Roll, data);
        this.adjustValues(d10Roll, data);
        this.adjustValues(d12Roll, data);
        this.adjustValues(d20Roll, data);

        if (additionalValue != 0) {
            data.total += additionalValue;
            data.log += `+${additionalValue}`;
        }            

        console.log(`Total: ${data.total}`);
        console.log(data.log);
    }

    clearValues() {
        this.d4Ref.current.clear();
        this.d6Ref.current.clear();
        this.d8Ref.current.clear();
        this.d10Ref.current.clear();
        this.d12Ref.current.clear();
        this.d20Ref.current.clear();
    }

    adjustValues(roll, data) {
        if (roll === null) return {};

        data.total += roll.total;
        data.log += data.appender + roll.log;
        data.appender = ", ";
    }

}