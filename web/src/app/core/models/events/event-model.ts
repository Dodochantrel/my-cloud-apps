export class EventModel {
    id: string;
    allDay: boolean;
    start: Date
    end: Date;
    title: string;

    constructor(id: string, allDay: boolean, start: Date, end: Date, title: string) {
        this.id = id;
        this.allDay = allDay;
        this.start = start;
        this.end = end;
        this.title = title;
    }
}
