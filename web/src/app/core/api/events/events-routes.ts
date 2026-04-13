import { environment } from "../../../../environments/environment";

export class EventsRoutes {
  private readonly baseUrl = `${environment.apiUrl}events`;

  constructor() {}

  getAll(startDate: Date, endDate: Date): string {
    return `${this.baseUrl}?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
  }
}
