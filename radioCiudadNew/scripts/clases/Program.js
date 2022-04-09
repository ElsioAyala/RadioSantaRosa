export default class Program {
    constructor(name,days,start,ends){
        this.name = name;
        this.days = days;
        this.start = start;
        this.ends = ends;
        this.hour = start.substr(0,2);
        this.minutes = start.substr(3);
        this.locutor = [];
        this.id = (Math.random() * (1000 - this.hour) + this.hour).replace(/\./g, '');

    }
    getName(){
        return this.name
    }

    getStart(){
        return this.start
    }

    getEnds(){
        return this.ends
    }

    getLocutor(){
        return this.locutor
    }

    setLocutor(locutor){
        this.locutor = locutor
    }
}