export class ProductionCompany {
  id: number;
  fileUrl: string | null;
  name: string;

  constructor(id: number, fileUrl: string | null, name: string) {
    this.id = id;
    this.fileUrl = fileUrl;
    this.name = name;
  }

  get fileUrlOrEmpty(): string {
    return this.fileUrl ?? '/images/placeholder.svg';
  }
}
