import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Component } from 'react';
import WeatherService from '../services/weather-service';

export default class FantasyCalendar extends Component {
    //I recognize this won't generate a perfect calendar that accounts for different days in months, and leap years, but I built it for what i needed first and figured i'd evolve as i go
    weatherService = new WeatherService();

    data = {
        configuration: {
            months: ['Hammer', 'Alturiak', 'Ches', 'Tarsakh', 'Mirtul', 'Kythorn', 'Flamerule', 'Eleasis', 'Eleint', 'Marpenoth', 'Uktar', 'Nightal']
            , daysInWeek: 10 //TODO: allow this to be an array instead
            , names: []
            , weeksInMonth: 3
            , currentEra: 'ER'
            , startingYear: 2000
            , calendarStartDay: 1
        }
    }

    monthsInYear = this.data.configuration.months.length;        
    daysInYear = this.data.configuration.daysInWeek * this.data.configuration.weeksInMonth * this.monthsInYear;

    constructor(props) {
        super(props);

        this.state = {
            currentDay: 200
        }
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
    }

    render() {            
        let currentYear = this.calculateCurrentYear(this.daysInYear) + this.data.configuration.startingYear;
        let currentDaysInYear = this.calculateCurrentDayInYear(this.daysInYear);
        let currentMonth = this.calculateCurrentMonth(currentDaysInYear);        
        //TODO: Generate name days, if there are any
        return <Container fluid>
            {this.renderHeader(currentMonth, currentYear)}
            {this.renderDays(currentMonth, currentDaysInYear)}
        </Container>
    }

    calculateCurrentYear(daysInYear) {        
        return parseInt(this.state.currentDay / daysInYear);
    }

    calculateCurrentDayInYear(daysInYear) {
        let days = this.state.currentDay < daysInYear ? this.state.currentDay : this.state.currentDay - daysInYear;
        return days;
    }

    calculateCurrentMonth(days) {
        //TODO: when days in a month get more complicated, this needs updated        
        let currentMonth = days / (this.data.configuration.daysInWeek * this.data.configuration.weeksInMonth);
        return parseInt(currentMonth);
    }

    previous() {
        this.setState({currentDay: this.state.currentDay-1});
    }

    next() {        
        this.setState({currentDay: this.state.currentDay+1});
    }

    renderHeader(currentMonth, currentYear) {
        return <Row>
            <Col><Button onClick={this.previous}>Previous</Button></Col>
            <Col xs="8">
                <h3>{this.data.configuration.months[currentMonth]} {currentYear} {this.data.configuration.currentEra}</h3>
            </Col>
            <Col><Button onClick={this.next}>Next</Button></Col>
        </Row>
    }

    renderDays(currentMonth, currentDaysInYear) {
        let startingDay = 1;
        let currentDay = currentDaysInYear - currentMonth * this.data.configuration.daysInWeek * this.data.configuration.weeksInMonth;
        let weeks = [];        
        for (let i = 0; i < this.data.configuration.weeksInMonth; i++) {            
            weeks.push(this.renderWeek(i, startingDay, currentDay));
            startingDay += this.data.configuration.daysInWeek;
        }
        
        return weeks;
    }

    renderWeek(weekKey, startOfWeekNumber, currentDay) {
        let week = [];

        for (let i = 0; i < this.data.configuration.daysInWeek; i++) {            
            let className = currentDay === startOfWeekNumber ? 'current-day' : 'calendar-day';            
            week.push(<Col className={className} key={`Day${startOfWeekNumber}`}>
                <h6 className={"bold"}>{startOfWeekNumber}</h6>
                <label>Temp: {this.weatherService.generateTemperature()}</label>
                <label>Wind: {this.weatherService.generateWind()}</label>
                <label>Preci: {this.weatherService.generatePrecipitation()}</label>
            </Col>)
            startOfWeekNumber++;
        }

        return <Row key={`Week${weekKey}`}>
            {week}
        </Row>
    }
}