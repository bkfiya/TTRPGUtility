import DiceService from './dice-service';

export default class WeatherService {

    diceService = new DiceService();

    generateTemperature() {
        let d20 = this.diceService.rollD20();
        let difference = this.diceService.rollD4() * 10;
        if (d20 < 15) {
            return 'Normal';
        } else if (d20 < 18) {            
            return `${difference} degrees colder`;
        } else if (d20 >= 18) {
            return `${difference} degrees hotter`;
        }
    }

    generateWind() {
        let d20 = this.diceService.rollD20();
        if (d20 < 13) {
            return 'None';
        } else if (d20 < 17) {            
            return 'Light';
        } else if (d20 >= 18) {
            return 'Strong';
        }
    }

    generatePrecipitation() {
        let d20 = this.diceService.rollD20();
        if (d20 < 13) {
            return 'None';
        } else if (d20 < 17) {            
            return 'Light';
        } else if (d20 >= 18) {
            return 'Heavy';
        }
    }

    generateMonth(weeksInMonth, daysInWeek) {
        let monthWeather = [];

        for (let i = 0; i < weeksInMonth; i++) {
            let weekWeather = [];

            for (let i2 = 0; i2 < daysInWeek; i2++) {
                weekWeather.push({
                    wind: this.generateWind(),
                    precipitation: this.generatePrecipitation(),
                    temperature: this.generateTemperature(),
                });
            }

            monthWeather.push(weekWeather);
        }

        return monthWeather;
    }

}