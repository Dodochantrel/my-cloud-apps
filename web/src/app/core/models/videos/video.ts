export class Video {
  id: string | null;
  externalId: string;
  title: string;
  type: 'movie' | 'serie';
  fileUrl: string | null;
  releaseDate: Date;
  description: string;
  genres: string[];

  constructor(
    externalId: string,
    title: string,
    type: 'movie' | 'serie',
    releaseDate: Date,
    description: string,
    genres: string[],
    id: string | null,
    fileUrl: string | null,
  ) {
    this.id = id;
    this.externalId = externalId;
    this.title = title;
    this.type = type;
    this.releaseDate = releaseDate;
    this.description = description;
    this.genres = genres;
    this.fileUrl = fileUrl;
  }
}
