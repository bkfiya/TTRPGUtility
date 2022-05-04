export default class DiceService {

    rollD20() {
        return this.getRandomInt(1, 21);
    }

    rollD4() {
        return this.getRandomInt(1, 5);
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

}