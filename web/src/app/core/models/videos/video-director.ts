export class VideoDirector {
    id: string;
    name: string;
    fileUrl: string | null;

    constructor(id: string, name: string, fileUrl: string | null) {
        this.id = id;
        this.name = name;
        this.fileUrl = fileUrl;
    }
}
