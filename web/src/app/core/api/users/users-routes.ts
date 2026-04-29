import { environment } from "../../../../environments/environment";

export class UsersRoutes {
  private readonly baseUrl = `${environment.apiUrl}users`;

  public getAll(search: string, page: number, limit: number): string {
    return (
      this.baseUrl + `?search=${encodeURIComponent(search)}` + `&page=${page}` + `&limit=${limit}`
    );
  }
}