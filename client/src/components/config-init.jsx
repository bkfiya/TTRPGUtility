import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import StringArrayInput from './string-array-input';
import { toast } from 'react-toastify';

export default class ConfigInit extends Component {

    constructor(props) {
        super(props);

        this.setData = props.setData;

        this.state = {
            weeksInMonth: ""
            , startingYear: ""
            , currentEra: ""
            , adventureStartDay: ""
        }

        this.submit = this.submit.bind(this);    
        this.submitData = this.submitData.bind(this);
        this.stringInput = React.createRef();    
    }

    render() {
        return <div >
            <h5>Please enter the names of your months</h5>
            <StringArrayInput placeholder="Month Name" ref={this.stringInput} />
            <div className='bottom-pad'>
                <input type="number"                    
                        value={this.state.weeksInMonth}                     
                        onChange={(e) => {this.setState({weeksInMonth: e.target.value})}} 
                        placeholder="Weeks In Month"></input>
            </div>
            <div className='bottom-pad'>
                <input type="number"                   
                        value={this.state.startingYear}                     
                        onChange={(e) => {this.setState({startingYear: e.target.value})}} 
                        placeholder="Starting Year"></input>
            </div>
            <div className='bottom-pad'>
                <input type="text"                    
                        value={this.state.currentEra}                     
                        onChange={(e) => {this.setState({currentEra: e.target.value})}} 
                        placeholder="Current Era (BC, AC)"></input>
            </div>
            <div className='bottom-pad'>
                <input type="number"                    
                        onKeyDown={this.submitData}
                        value={this.state.adventureStartDay}                     
                        onChange={(e) => {this.setState({adventureStartDay: e.target.value})}} 
                        placeholder="Adventure Start Day"></input>
            </div>                     
            <Button onClick={this.submit}>Submit</Button>                        
        </div>
    }

    submitData(e) {
        if (e.key === "Enter") {
            this.submit();
        }
    }

    submit() {                                
        let months = this.stringInput.current.getValues();
        if (months.length === 0 
            || this.state.weeksInMonth.length === 0
            || this.state.startingYear.length === 0
            || this.state.currentEra.length === 0
            || this.state.adventureStartDay.length === 0) {
            toast("Please fill in all fields!");
            return;
        }

        this.setData(months, Number(this.state.weeksInMonth), Number(this.state.startingYear), this.state.currentEra, Number(this.state.adventureStartDay));
    }

}