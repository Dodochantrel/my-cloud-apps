export class GalleryCategory {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    childrens: GalleryCategory[];

    constructor(id: string, name: string, createdAt: Date, updatedAt: Date, childrens: GalleryCategory[] = []) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.childrens = childrens;
    }
}
