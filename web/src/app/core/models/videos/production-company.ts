export class ProductionCompany {
  id: number;
  fileUrl: string | null;
  name: string;
  originCountry: string;

  constructor(id: number, fileUrl: string | null, name: string, originCountry: string) {
    this.id = id;
    this.fileUrl = fileUrl;
    this.name = name;
    this.originCountry = originCountry;
  }

  get fileUrlOrEmpty(): string {
    return this.fileUrl ?? '/images/placeholder.svg';
  }
}
