export class VideoCasting {
    id: string;
    name: string;
    popularity?: number;
    character?: string;
    order?: number;
    fileUrl?: string;

    constructor(id: string, name: string, popularity?: number, character?: string, order?: number, fileUrl?: string) {
        this.id = id;
        this.name = name;
        this.popularity = popularity;
        this.character = character;
        this.order = order;
        this.fileUrl = fileUrl;
    }

    get fileUrlOrEmpty(): string {
        return this.fileUrl ?? '/images/placeholder.svg';
    }
}