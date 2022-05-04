export default class ClockService {

    constructor(addDay) {
        this.addDay = addDay;
    }

    formatTime(time) {
        let fixedTime = time.toFixed(2);
        let splitTime = fixedTime.split(".");
        return `${splitTime[0]}:${splitTime[1]}`;
    }

    processTime(time) {        
        let fixedTime = time.toFixed(2);
        let splitTime = fixedTime.toString().split(".");        
        while (splitTime[1] >= 60) {
            time += 1;
            splitTime[1] -= 60;
            time -= .60;
        }
        while (time >= 24) {
            time -= 24;
            this.addDay();
        }        
        return time;
    }

}