import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Component } from 'react';
import WeatherService from '../services/weather-service';
import StorageService from '../services/storage-service';

export default class FantasyCalendar extends Component {
    //I recognize this won't generate a perfect calendar that accounts for different days in months, and leap years, but I built it for what i needed first and figured i'd evolve as i go
    weatherService = new WeatherService();    
    weather = [];            
    storageService = new StorageService();

    constructor(props) {
        super(props);

        this.configuration = props.configuration;
        this.monthsInYear = this.configuration.months.length;        
        this.daysInYear = this.configuration.daysInWeek * this.configuration.weeksInMonth * this.monthsInYear;        

        this.state = {
            currentDay: !props.configuration.currentDay ? props.configuration.calendarStartDay : props.configuration.currentDay
        }
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.lastMonth = -1;
    }

    render() {            
        let currentYear = this.calculateCurrentYear(this.daysInYear) + this.configuration.startingYear;
        let currentDaysInYear = this.calculateCurrentDayInYear(this.daysInYear);
        let currentMonth = this.calculateCurrentMonth(currentDaysInYear);        
        if (this.lastMonth !== currentMonth) {
            this.loadWeather(this.lastMonth, currentMonth);            
        }
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
        let currentMonth = days / (this.configuration.daysInWeek * this.configuration.weeksInMonth);
        let remainder = days % (this.configuration.daysInWeek * this.configuration.weeksInMonth);
        if (remainder === 0) currentMonth -= 1; //When the math is equal, that means it's not actually the next month
        return parseInt(currentMonth);
    }

    previous() {
        this.configuration.currentDay = this.state.currentDay-1;
        this.storageService.storeValue("configuration", this.configuration);
        this.setState({currentDay: this.state.currentDay-1});
    }

    next() {        
        this.configuration.currentDay = this.state.currentDay+1;
        this.storageService.storeValue("configuration", this.configuration);
        this.setState({currentDay: this.state.currentDay+1});
    }

    renderHeader(currentMonth, currentYear) {
        return <Row>
            <Col><Button onClick={this.previous}>Previous</Button></Col>
            <Col xs="8">
                <h3>{this.configuration.months[currentMonth]} {currentYear} {this.configuration.currentEra}</h3>
            </Col>
            <Col><Button onClick={this.next}>Next</Button></Col>
        </Row>
    }

    renderDays(currentMonth, currentDaysInYear) {
        let startingDay = 1;
        let currentDay = currentDaysInYear - currentMonth * this.configuration.daysInWeek * this.configuration.weeksInMonth;
        let weeks = [];        
        for (let i = 0; i < this.configuration.weeksInMonth; i++) {            
            weeks.push(this.renderWeek(i, startingDay, currentDay));
            startingDay += this.configuration.daysInWeek;
        }
        
        return weeks;
    }

    renderWeek(weekKey, startOfWeekNumber, currentDay) {
        let week = [];

        for (let i = 0; i < this.configuration.daysInWeek; i++) {            
            let className = currentDay === startOfWeekNumber ? 'current-day' : 'calendar-day';            
            week.push(<Col className={className} key={`Day${startOfWeekNumber}`}>
                <h6 className={"bold"}>{startOfWeekNumber}</h6>
                <label>Temp: {this.weather[weekKey][i].temperature}</label>
                <label>Wind: {this.weather[weekKey][i].wind}</label>
                <label>Preci: {this.weather[weekKey][i].precipitation}</label>
            </Col>)
            startOfWeekNumber++;
        }

        return <Row key={`Week${weekKey}`}>
            {week}
        </Row>
    }

    loadWeather(lastMonth, currentMonth) {
        if (lastMonth === -1) {
            let weather = this.storageService.loadKey("weather");
            if (weather) {
                this.weather = weather;                            
            }            
        } 
        
        if (this.weather.length === 0) {
            this.weather = this.weatherService.generateMonth(this.configuration.weeksInMonth, this.configuration.daysInWeek);
            this.storageService.storeValue("weather", this.weather);
        }
                
        this.lastMonth = currentMonth;
    }
}