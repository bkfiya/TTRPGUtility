import { Component } from 'react';
import StorageService from '../services/storage-service';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default class DicePools extends Component {
    storageService = new StorageService();    

    constructor(props) {
        super(props);

        let dicePools = this.storageService.loadKey("dicePools");
        if (!dicePools) dicePools = {};
        
        this.state = {
            dicePools
        }

        this.loadPool = props.loadPool;
    }

    render() {
        let dicePools = Object.keys(this.state.dicePools);
        let mappedPools = dicePools.map(x => {
            return <Row key={x}>
                <Col><h6>{x}</h6></Col>
                <Col><Button onClick={() => {this.loadPool(this.state.dicePools[x])}}>Load</Button></Col>
                <Col><Button variant="danger" onClick={() => {this.delete(x)}}>Delete</Button></Col>
            </Row>
        });

        return <div>
            <Row>
                <Col><h5>Saved Dice Pools</h5></Col>
            </Row>
            {mappedPools}
        </div>
    }

    addDicePool(name, diePool) {
        let newPool = {};
        newPool[name] = diePool;
        let dicePools = Object.assign(newPool, this.state.dicePools);
        this.storageService.storeValue("dicePools", dicePools);
        this.setState({dicePools});
    }

    delete(poolName) {
        let dicePools = Object.assign({}, this.state.dicePools);
        delete dicePools[poolName];
        this.storageService.storeValue("dicePools", dicePools);
        this.setState({dicePools});
    }

}