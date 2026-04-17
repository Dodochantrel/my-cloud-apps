import { EventCategoryModel } from './event-category-model';

export class EventModel {
    id: string;
    allDay: boolean;
    start: Date
    end: Date;
    title: string;
    category: EventCategoryModel | null;

    constructor(id: string, allDay: boolean, start: Date, end: Date, title: string, category: EventCategoryModel | null = null) {
        this.id = id;
        this.allDay = allDay;
        this.start = start;
        this.end = end;
        this.title = title;
        this.category = category;
    }
}
