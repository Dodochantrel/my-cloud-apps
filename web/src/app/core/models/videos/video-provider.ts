export class VideoProvider {
  id: number;
  fileUrl: string;
  name: string;

  constructor(id: number, fileUrl: string, name: string) {
    this.id = id;
    this.fileUrl = fileUrl;
    this.name = name;
  }
}
