import { environment } from "../../../../environments/environment";

export class GalleriesCategoriesRoutes {
  private readonly baseUrl = `${environment.apiUrl}galleries-categories`;

  public getAll(search: string, page: number, limit: number): string {
    return (
      this.baseUrl + `?search=${encodeURIComponent(search)}` + `&page=${page}` + `&limit=${limit}`
    );
  }
}