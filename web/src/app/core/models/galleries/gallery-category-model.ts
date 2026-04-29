export class GalleryCategoryModel {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    childrens: GalleryCategoryModel[];

    constructor(id: string, name: string, createdAt: Date, updatedAt: Date, childrens:  GalleryCategoryModel[] = []) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.childrens = childrens;
    }
}
