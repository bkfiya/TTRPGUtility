import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { Component } from 'react';
import DiceInput from './dice-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DiceHistory from './dice-history';
import { toast } from 'react-toastify';
import DicePools from './dice-pools';
import Button from 'react-bootstrap/Button';

export default class DiceRoller extends Component {

    constructor(props) {
        super(props);

        this.d4Ref = React.createRef();
        this.d6Ref = React.createRef();
        this.d8Ref = React.createRef();
        this.d10Ref = React.createRef();
        this.d12Ref = React.createRef();
        this.d20Ref = React.createRef();
        this.diceHistory = React.createRef();
        this.dicePools = React.createRef();

        this.state = {
            additionalValue: 0,
            name: "",
            rerollValues: "",        
        }

        this.roll = this.roll.bind(this);
        this.clearValues = this.clearValues.bind(this);
        this.save = this.save.bind(this);
        this.loadPool = this.loadPool.bind(this);
    }

    render() {
        return <Container fluid>
            <Row>
                <Col>
                    <DiceInput ref={this.d4Ref} die="4"></DiceInput>
                    <DiceInput ref={this.d6Ref} die="6"></DiceInput>
                    <DiceInput ref={this.d8Ref} die="8"></DiceInput>
                    <DiceInput ref={this.d10Ref} die="10"></DiceInput>
                    <DiceInput ref={this.d12Ref} die="12"></DiceInput>
                    <DiceInput ref={this.d20Ref} die="20"></DiceInput>
                    <Row>
                        <Col xs="5"><input type="number"
                            value={this.state.additionalValue}                     
                            onChange={(e) => {this.setState({additionalValue: e.target.value})}}></input></Col>
                        <Col xs="1"><h6>Additional</h6></Col>
                        <Col xs="6"></Col>
                    </Row>
                    <Row>
                        <Col xs="5"><input type="text"
                            value={this.state.rerollValues}                     
                            onChange={(e) => {this.setState({rerollValues: e.target.value})}}></input></Col>
                        <Col xs="2"><h6>Reroll Values (Comma seperated)</h6></Col>
                        <Col xs="5"></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={this.roll}>Roll</Button>                            
                        </Col>
                        <Col>
                            <Button variant="warning" onClick={this.clearValues}>Clear Values</Button>                            
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="text"
                            value={this.state.name}  
                            placeholder="Dice Pool Name"                   
                            onChange={(e) => {this.setState({name: e.target.value})}}></input>
                        </Col>
                        <Col>
                            <Button variant="secondary" onClick={this.save}>Save</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DiceHistory ref={this.diceHistory}></DiceHistory>
                        </Col>
                    </Row>
                </Col>                
                <Col>
                    <DicePools ref={this.dicePools} loadPool={this.loadPool}></DicePools>
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
        for (let i = 0; i < rerollValues; i++) rerollValues[i] = Number(rerollValues[i]);
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
        
        data.log = `${data.total}=${data.log}`;

        this.diceHistory.current.add(data.log);
        toast(data.total);
    }

    clearValues() {
        this.d4Ref.current.clear();
        this.d6Ref.current.clear();
        this.d8Ref.current.clear();
        this.d10Ref.current.clear();
        this.d12Ref.current.clear();
        this.d20Ref.current.clear();
        this.setState({
            additionalValue: 0,
            rerollValues: ""
        });
    }

    adjustValues(roll, data) {
        if (roll === null) return {};

        data.total += roll.total;
        data.log += data.appender + roll.log;
        data.appender = ", ";
    }

    save() {
        let dicePool = {
            d4Dice : this.d4Ref.current.getValue(),
            d6Dice : this.d6Ref.current.getValue(),
            d8Dice : this.d8Ref.current.getValue(),
            d10Dice : this.d10Ref.current.getValue(),
            d12Dice : this.d12Ref.current.getValue(),
            d20Dice : this.d20Ref.current.getValue(),
            additionalValue : this.state.additionalValue,
            rerollValues : this.state.rerollValues
        }

        this.dicePools.current.addDicePool(this.state.name, dicePool);

        this.setState({name: ""});
        toast("Saved!");
    }

    loadPool(diePool) {
        this.d4Ref.current.setValue(diePool.d4Dice);
        this.d6Ref.current.setValue(diePool.d6Dice);            
        this.d8Ref.current.setValue(diePool.d8Dice);
        this.d10Ref.current.setValue(diePool.d10Dice);            
        this.d12Ref.current.setValue(diePool.d12Dice);            
        this.d20Ref.current.setValue(diePool.d20Dice);            
        this.setState({
            additionalValue: diePool.additionalValue,
            rerollValues: diePool.rerollValues
        });
    }

}