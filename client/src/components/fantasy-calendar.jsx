import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Component } from 'react';

export default class FantasyCalendar extends Component {
    data = {
        configuration: {
            months: ['Hammer', 'Alturiak', 'Ches', 'Tarsakh', 'Mirtul', 'Kythorn', 'Flamerule', 'Eleasis', 'Eleint', 'Marpenoth', 'Uktar', 'Nightal']
            , daysInWeek: 10 //TODO: allow this to be an array instead
            , names: []
            , weeksInMonth: 3
            , currentEra: 'ER'
            , startingYear: 2000
            , startingDay: 1
        },
        currentDay: 51
    }

    monthsInYear = this.data.configuration.months.length;        
    daysInYear = this.data.configuration.daysInWeek * this.monthsInYear;


    render() {        
        let currentYear = this.calculateCurrentYear(this.daysInYear) + this.data.configuration.startingYear;
        let currentMonth = this.calculateCurrentMonth(this.daysInYear);        
        //TODO: Generate name days, if there are any
        return <Container fluid>
            {this.generateHeader(currentMonth, currentYear)}
            {this.generateDays(currentMonth)}
        </Container>
    }

    calculateCurrentYear(daysInYear) {        
        return parseInt(this.data.currentDay / daysInYear);
    }

    calculateCurrentMonth(daysInYear) {
        //TODO: when days in a month get more complicated, this needs updated
        let days = this.data.currentDay < daysInYear ? this.data.currentDay : this.data.currentDay - daysInYear;
        let currentMonth = days / (this.data.configuration.daysInWeek * this.data.configuration.weeksInMonth);
        return parseInt(currentMonth);
    }

    generateHeader(currentMonth, currentYear) {
        return <Row>
            <Col>
                <h3>{this.data.configuration.months[currentMonth]} {currentYear} {this.data.configuration.currentEra}</h3>
            </Col>
        </Row>
    }

    generateDays(currentMonth) {
        let startingDay = 1;
        let weeks = [];
        for (let i = 0; i < this.data.configuration.weeksInMonth; i++) {            
            weeks.push(this.generateWeek(i, startingDay));
            startingDay += this.data.configuration.daysInWeek;
        }
        
        return weeks;
    }

    generateWeek(weekKey, startOfWeekNumber) {
        let week = [];

        for (let i = 0; i < this.data.configuration.daysInWeek; i++) {            
            week.push(<Col key={`Day${startOfWeekNumber}`}>{startOfWeekNumber}</Col>)
            startOfWeekNumber++;
        }

        return <Row key={`Week${weekKey}`}>
            {week}
        </Row>
    }
}

//calculate current month, based on the current day.
//generate current month calendar
//highlight current day
//display year readout