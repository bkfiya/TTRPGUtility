export default class DiceService {

    rollD20() {
        return this.getRandomInt(1, 21);
    }

    rollD4() {
        return this.getRandomInt(1, 5);
    }

    rollD6() {
        return this.getRandomInt(1, 7);
    }

    rollD8() {
        return this.getRandomInt(1, 9);
    }

    rollD10() {
        return this.getRandomInt(1, 11);
    }

    rollD12() {
        return this.getRandomInt(1, 13);
    }

    rollDie(max) {
        return this.getRandomInt(1, max+1);
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

}