import { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';

export default class DiceHistory extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            history: []
        }
    }

    render() {
        return <div>
            <Row><Col><h5>History</h5></Col></Row>
            {this.renderHistory()}
        </div>
    }

    renderHistory() {
        let vars = this.state.history.map((x, index) => {
            return <Row key={index}>
                <Col><h6>{x}</h6></Col>
            </Row>
        });

        return vars;
    }

    add(log) {
        let history = this.state.history.slice();
        if (history.length === 3) history.pop();
        log = `${moment().format("H:mm:ss")} ${log}`;
        history.splice(0, 0, log);
        this.setState({history});
    }

}