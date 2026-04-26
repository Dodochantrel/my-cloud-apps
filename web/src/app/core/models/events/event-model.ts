import { GroupModel } from '../groups/group-model';
import { EventCategoryModel } from './event-category-model';

export class EventModel {
    id: string;
    allDay: boolean;
    start: Date
    end: Date;
    title: string;
    category: EventCategoryModel | null;
    groups: GroupModel[] = [];

    constructor(id: string, allDay: boolean, start: Date, end: Date, title: string, category: EventCategoryModel | null = null) {
        this.id = id;
        this.allDay = allDay;
        this.start = start;
        this.end = end;
        this.title = title;
        this.category = category;
    }

    get color(): string {
        if (this.category) {
            return `#${this.category.color}`;
        }
        return '#000000'; // Couleur par défaut si aucune catégorie n'est associée
    }
}
