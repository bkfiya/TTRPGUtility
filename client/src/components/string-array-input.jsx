import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';

export default class StringArrayInput extends Component {

    constructor(props) {
        super(props);

        this.placeholder = props.placeholder === undefined ? "" : props.placeholder;
        this.addString = this.addString.bind(this);
        this.inputKeyDown = this.inputKeyDown.bind(this);
        this.getValues = this.getValues.bind(this);
        this.state = {
            strings: []
            , newString: ""
        }
    }

    render() {
        return <Container style={{width: "30%"}}>            
            <Row className="bottom-pad">
                <Col><input type="text"                     
                    onKeyDown={this.inputKeyDown}
                    value={this.state.newString}                     
                    onChange={(e) => {this.setState({newString: e.target.value})}} 
                    placeholder={this.placeholder}></input></Col>
                <Col xs="2"><FontAwesomeIcon size='2xl' className='blue' icon={faCirclePlus} onClick={this.addString}></FontAwesomeIcon></Col>
            </Row>
            {this.renderStrings()}
        </Container>
    }

    renderStrings() {
        let rows = this.state.strings.map((x, i) => {
            return <Row className="bottom-pad" key={x}>
                <Col>{x}</Col>
                <Col xs="2"><FontAwesomeIcon size='2xl' icon={faCircleMinus} className="red" onClick={() => {this.removeString(i);}}></FontAwesomeIcon></Col>
            </Row>
        });
        return <div>
            {rows}
        </div>
    }

    inputKeyDown(e) {
        if (e.key === "Enter") {
            this.addString();
        }
    }

    addString() {
        if (this.state.newString.length === 0) {
            toast("Please fill the string field first!!");
            return;
        }
        let strings = this.state.strings.slice();
        strings.push(this.state.newString);
        this.setState({
            newString: ""
            , strings: strings
        });
    }

    removeString(stringIndex) {
        let strings = this.state.strings.slice();
        strings.splice(stringIndex, 1);
        this.setState({
            strings: strings
        });
    }

    getValues() {
        return this.state.strings.slice();
    }
}